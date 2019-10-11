// Use for socket examples

const io = require('socket.io-client');
const server = 'http://10.33.22.137:8083';

const client = io.connect(server);

client.on('connect',() => {
    console.log('Server is connected to Takt Socket server at', server);
});




module.exports = client;