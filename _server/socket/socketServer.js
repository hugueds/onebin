const server = require('socket.io');
const Log = require('../models/Log');

class SocketServer {         

    io = null;      
    clients = [];

    connect(http) {
        this.io = server(http);       
        this.handlers();
    }

    emit(topic, message) {
        if (this.io)
            this.io.sockets.emit(topic, message);
    }

    handlers() {

        this.io.on('connection', (socket) => {''

            const ip = socket.handshake.address.slice(7);
            console.log('Client connected: ' + ip);
            socket.emit('ip', ip);

            const idx = this.clients.indexOf(ip);
            if (idx === -1) {
                this.clients.push(ip);
            }

            socket.on('disconnect', () => {
                const idx = this.clients.indexOf(ip);
                if (idx > -1) {
                    this.clients.splice(idx, 1);
                    return;
                }
            });

            socket.on('clients', () => {                
                console.log(this.clients);
                socket.emit('clients', this.clients);
            });
            
            socket.on('subscribe', (data) => {                
                
            })

            socket.on('logs', (data) => {
                const log = new Log();
                socket.emit('logs client', log.find());
            })
            // socket.on('')

        });
    }






}

module.exports = new SocketServer();
