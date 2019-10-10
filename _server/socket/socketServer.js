const server = require('socket.io');
const Tablet = require('../models/Tablet');
const Log = require('../models/Log');
const Routine = require('../routine');

class SocketServer {

    constructor() {
        this.clients = [];        
        this.io = null;
        this.server = server;
    }

    connect(http) {
        this.io = this.server(http);        
        this.handlers();
        console.log('Socket Server Connected')
    }

    send(topic, message) {
        console.log('Emiting to topic: ' + topic + ', Message: ' + JSON.stringify(message));
        if (this.io)
            this.io.sockets.emit(topic, message);
    }

    emit(topic, message) {
        console.log('Emiting to topic: ' + topic + ', Message: ' + JSON.stringify(message));
        if (this.io)
            this.io.sockets.emit(topic, message);
    }

    h() {
        this.io.on('connection',(socket) => regHandler(this, socket));
    }

    handlers() {

        this.io.on('connection', (socket) => {

            const ip = socket.handshake.address.slice(7);
            const idx = this.clients.indexOf(ip);

            if (idx === -1) {
                this.clients.push(ip); // Colocar o Objeto Tablet inteiro no Client
            }

            Tablet.findOne({ ip }).then((tablet) => {
                socket.emit('ip', ip, tablet);
            });

            console.log('Client connected: ' + ip);

            socket.on('disconnect', () => {
                const idx = this.clients.indexOf(ip);
                if (idx > -1) {
                    this.clients.splice(idx, 1);
                    return;
                }
            });

            socket.on('popid', async (data) => {
                // Carrega o PLC...
                // Envia a mensagem de 
                const plc = Routine.plc;
                await plc.sendPopid(data);
                
            });

            socket.on('clients', () => {
                console.log(this.clients);
                socket.emit('clients', this.clients);
            });

            socket.on('reload box', (data) => {
                // Recebe uma caixa vinculada a uma instancia
                // Busca a instancia e o boxNumber associado
                // Alterar o quantity = maxQuantity
                // Envia sinal para atualização de todos dispositivos com a instancia
            });

            socket.on('subscribe', (data) => {

            });

            socket.on('logs', async (data) => {
                socket.emit('logs client', await Log.find({}));
            })

            socket.on('reload screen', (client) => {
                if (!client)
                    console.log('Reloading all clients');
                this.emit('reload', client);
            });

            socket.on('reload plc', () => {

            });

        });


    }


}

function regHandler(ctx, socket) {

    const ip = socket.handshake.address.slice(7);    
    console.log(ctx.test.push(555))
    console.log(ctx.test.push(666))
    console.log('Socket connected %s', ip);
    socket.on('disconnect', () => console.log('disconnected'));

}

module.exports = new SocketServer();
