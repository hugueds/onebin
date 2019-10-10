const snap7 = require('node-snap7');
class PLC {

    constructor(ip, rack, slot) {
        this.s7 = new snap7.S7Client();
        this.ip = ip;
        this.rack = rack;
        this.slot = slot;
        this.locked = false;
    }

    async connect() {

        if (this.locked) {
            console.log('[WARNING] Object locked - Connect method');
            return false;
        }

        try {
            const conn = await this.s7.ConnectTo(this.ip, this.rack, this.slot);
            if (conn) {
                console.log(`[INFO] PLC: ${this.ip} connected`);
                return true;
            } else {
                console.error("Can't connect to PLC, check your connection or parameters");
                throw new Error();
            }
        } catch (err) {
            this._handleConnectionError(err);
            return false;
        } finally {
            this.locked = false;
        }
    }

    checkConnection() {
        const conn = this.s7.Connected();
        console.log('Checking connection', conn);
        if (!conn) {
            this.connect();
        }
    }

    async disconnect() {
        this.locked = false;
        return await this.s7.Disconnect();
    }

    reconnect() {

        if (this.locked)
            return;

        this.locked = true;            
        console.warn(`PLC ${this.ip} is reloading...`);
        setTimeout(async () => {
            this.locked = false;
            await this.disconnect();
            await this.connect();
        }, 5000);

    }

    async getPLCInfo() {

        if (this.locked) {
            return;
        }

        this.locked = true;
        console.log('Getting CPU Info');

        try {
            const res = await this.s7.GetCpuInfo();
            return res;
        } catch (err) {
            console.error(err);
        } finally {
            this.locked = false;
        }

        return;
    }

    _handleConnectionError(err) {

        console.log(`${err} PLC ${this.ip} not connected, trying to reconnect...`);

        setTimeout(() => {
            this.reconnect();
        }, 5000);
    }

    _handleReadError(err) {


    }

    _handleWriteError(err) {

        if (this.locked) {
            console.error('Object locked - Write Error');
            return;
        }

        console.error('Write Error: ' + err);
        if (!this.s7.Connected()) {
            this._handleConnectionError(err);
            return;
        }
    }


};


module.exports = PLC;
