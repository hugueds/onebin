const PLCClass = require('./PLCClass');

class OneBinPLC extends PLCClass {

    constructor(ip, rack, slot) {
        super(ip, rack, slot);
        this.dbInterface = {
            number: 164,
            start: 56,
            size: 10
        }
        this.trigger = 0;
    }


    async getTrigger() {

        try {
            this.locked = true;
            const db = this.dbInterface;
            const res = await this.s7.DBRead(db.number, db.start, db.size);
            return res;
        } catch(e) {
            console.error(e);
        } finally {
            this.locked = false;
        }
    }

}

module.exports = OneBinPLC;