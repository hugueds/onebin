const s7 = require('node-snap7');

const s = new s7.S7Server();

s.on('event', (event) => {
    console.log(s.EventText(event))
});

const db = new Buffer(100).fill('255')

s.RegisterArea(s.srvAreaDB, 164, db)

s.StartTo('127.0.0.1');

setTimeout(function() {
    s.Stop();
    s.UnregisterArea(s.srvAreaDB, 164);
}, 60000);