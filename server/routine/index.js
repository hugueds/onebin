const OneBinPLC = require('../plc/OneBinPLC');
const PartNumberApi = require('../api/PartNumber');
const Instance = require('../models/Instance');
const address = process.env.PLC_ADDRESS;
const rack = +process.env.PLC_RACK;
const slot = +process.env.PLC_SLOT;
const plc = new OneBinPLC(address, rack, slot);

class Routine {

    constructor() {
        this.interval = null;
        this.lastInstance = { number: '', popid: '' };
        this.connectionInterval = null;
        this.running = false;
        this.plc = plc;
        this.intervalTime = +process.env.INTERVAL_TIME;
    }

    start(socketServer) {
        this.socket = socketServer;
        console.log('Starting PLC Routine');
        setTimeout(() => {
            this.plc.connect();
            this.loop();
        }, 5000);
    }

    stop() {
        this.running = false;
        clearInterval(this.interval);
        this.plc.disconnect();
    }

    async loop() {

        if (this.running) {
            return;
        }

        this.running = true;

        this.interval = setInterval(async () => {

            const buffer = await plc.getTriggers();

            if (!buffer) {
                console.error('Buffer is empty, try to reconnect PLC');
                plc.reconnect();
                return false;
            }

            for (let i = 0; i < buffer.length; i++) {

                if (buffer[i] === 0x01) {
                    const instance = await plc.getInstance(i);
                    const cimi = await PartNumberApi.getCimi(instance.popid);
                    instance.cimi = cimi;
                    console.log(`[POPID] => ${instance.popid}, CIMI: ${instance.cimi}, Instance ${instance.number}`);
                    if (instance.number == this.lastInstance.number && instance.popid == this.lastInstance.popid) {
                        console.log('[REPEATED]', instance, this.lastInstance);
                        this.lastInstance = instance;
                        await plc.setTrigger(i);
                        return false;
                    } else {
                        console.log('[NEW]');
                        this.lastInstance = instance;
                        console.log(instance, this.lastInstance);
                        await plc.setTrigger(i);
                        await this.updateInstance(instance);
                    }
                }
            }

            return true;

        }, this.intervalTime);

    }

    async updateInstance(instance) {

        try {
            const partNumbers = await PartNumberApi.getByPopid(instance.popid, instance.cimi);
            if (!partNumbers) throw new Error();
            const regex = getRegex(instance);
            const fPartNumber = partNumbers.filter(p => p.too === 'PAR').map(p => p.obj);
            const parList = fPartNumber.join(' ').match(regex.p).map(t => t.replace(regex.r, ''));
            console.log('[PARTNUMBERS]', parList);
            const o = await Instance.findOne({ number: instance.number }); // ORIGINAL
            // const o = await Instance.findOne({ number: instance.number - 1 }); // TEST
            const instanceObj = o.toObject();
            const { boxes } = instanceObj;

            const parCopy = [...parList];

            parCopy.map((t) => {
                boxes.map((b, i) => {
                    if (b.quantity === 0) {
                        let d = boxes.find(c => c.partNumber === b.partNumber && c.order !== b.order);
                        if (d) {
                            b.currentOrder = false;
                            d.currentOrder = true;
                            if (+t === d.partNumber && d.quantity > 0 && b.order === 1) {
                                console.log(`Removing from BOX ${d.order + 1} <-> Part Number: ${t}`);
                                d.quantity--;
                            }
                        }
                    }
                    else if (+t === b.partNumber && b.quantity > 0 && b.currentOrder) {
                        b.quantity--;
                        let idx = parList.indexOf(t)
                        parList.splice(idx, 1);
                    }
                    return b;
                });
                return t;
            });

            const id = instanceObj._id;
            delete instanceObj._id;

            await Instance.findByIdAndUpdate(id, instanceObj, { new: true, upsert: true, useFindAndModify: false });
            this.socket.send('new popid', { popid: instance.popid, parameters: parCopy, instance: instance.number });
            
        } catch (e) {
            console.error(e);
            console.error(`POPID ${instance.popid} not found in database`);
        }

    }

    checkPLCConnection() {

    }

}


function getRegex(instance) {
    switch (instance.number) {
        case 0:
            return { p: /TQ(\d+)/g, r: 'TQ' };
        case 1:
            return { p: /TQ(\d+)/g, r: 'TQ' };
        case 2:
            break;
        default:
            return { p: /\w+/g, r: '' };
    }
}

module.exports = new Routine();
