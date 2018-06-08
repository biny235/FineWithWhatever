const seed = require('./server/seed');
const socketio = require("socket.io")
const _server = require('http').createServer(require('./server/app'));

const port = process.env.PORT || 3000;
const server = _server.listen( port, ()=> console.log(`Listening on port ${port}`));

// process.env.SYNC = true

process.env.SYNC ? seed() : null;

