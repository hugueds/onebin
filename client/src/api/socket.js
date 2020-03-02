import socketIOClient from 'socket.io-client';

class SocketService {
    
    socket = socketIOClient.Socket;
    url = process.env.REACT_APP_WEBSOCKET;
    // url = 'http://10.33.22.137:8083'
    // url = 'http://localhost:9999/'

    ipAddress = '';

    constructor() {
        this.socket = socketIOClient(this.url, { path: '/kanban/socket.io' } );
        this.socket.on('connect', () => {
            console.log('Web Socket Connected at ' + this.url);            
        });

        this.socket.on('reload', (ip) => {
            if (!ip) {
                window.location.reload();
            } 
            if (ip === this.ipAddress) {
                window.location.reload();
            }            
        });

        this.socket.on('ip', (ip) => this.ipAddress = ip);

    }

}

export default new SocketService()
