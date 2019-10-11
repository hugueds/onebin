const PLCClass = require('./PLCClass');

class OneBinPLC extends PLCClass {

    constructor(ip, rack, slot) {
        super(ip, rack, slot);
        this.dbInterface = {
            number: 1111, // process.env.DB_NUMBER
            start: 0, // process.env.DB_START
            size: 20 // process.env.DB_SIZE
        };
        this.instanceSize = 12;
        this.trigger = 0;
    }


    async getTriggers() {

        if (!this.s7.Connected())
            return false;
            
        try {
            this.locked = true;
            const db = this.dbInterface;
            const res = await this.s7.DBRead(db.number, db.start, db.size);
            if (!res) {
                this._handleReadError();
                return;
            }
            return res;
        } catch(e) {
            this._handleReadError(e);
        } finally {
            this.locked = false;
        }
    }

    async setTrigger(index) {

        try {
            this.locked = true;
            const db = this.dbInterface;
            const buffer = Buffer.alloc(1);
            buffer[0] = 0x02;
            const res = await this.s7.DBWrite(db.number, index, 1, buffer);
            return res;
        } catch (error) {
            this._handleReadError(error);            
            return;
        } finally {
            this.locked = false;
        }

    }

    async getInstance(index) {

        try {
            this.locked = true;
            const db = this.dbInterface;
            const start = 20 + (index * this.instanceSize);
            const res = await this.s7.DBRead(db.number, start, this.instanceSize);            
            if (!res) {
                this._handleReadError();
                return;
            }
            const instance = {
                number: res[0],
                popid: res.toString('UTF-8',4, 10).trim()
            }            
            return instance;
        } catch (e) {
            this._handleReadError(e);
        }
        finally {
            this.locked = false;
        }
    }

    async sendPopid(popid) {
        try {
            this.locked = true;
            const db = this.dbInterface;
            const buffer = Buffer.alloc(10);            
            buffer.write(popid)
            const res = await this.s7.DBWrite(db.number, 34, 8, buffer);
            return res;
        } catch (error) {
            this._handleReadError(error);            
            return;
        } finally {
            this.locked = false;
        }
    }

}

module.exports = OneBinPLC;
