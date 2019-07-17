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
            return;
        }

        try {
            const conn = await this.s7.ConnectTo(this.ip, this.rack, this.slot);
            if (conn) {
                console.log(`[INFO] PLC: ${this.ip} connected`);
            }
        } catch (err) {
            this._handleConnectionError(err);
        } 
    }

    disconnect() {
        return this.s7.Disconnect();
    }

    reconnect() {
        console.warn(`[WARNING] PLC ${this.ip} is reloading...`);
        this.locked = false;
        this.disconnect();    
        this.connect();
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

        if (this.locked) {
            console.log('[WARNING] Object locked - Connection Error');
            return;
        }

        this.locked = true;

        console.log(`[ERROR] ${err} PLC ${this.ip} not connected, trying to reconnect...`);

        setTimeout(() => {
            this.locked = false;
            this.s7.Disconnect();
            this.connect();
        }, 5000);
    }

    _handleReadError(err) {

        if (this.locked) {
            console.error('[ERROR] Object locked - Read Error');
            return;
        }

        console.error('[ERROR] Reading error: ' + err);
        if (!this.s7.Connected() || err === '589856') {
            this._handleConnectionError(err);
        }

    }

    _handleWriteError(err) {

        if (this.locked) {
            console.error('[ERROR] Object locked - Write Error');
            return;
        }

        console.error('[ERROR] Write Error: ' + err);
        if (!this.s7.Connected()) {
            this._handleConnectionError(err);
            return;
        }
    }


};


module.exports = PLC;
