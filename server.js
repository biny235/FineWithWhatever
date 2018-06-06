const seed = require('./server/seed');
const socketio = require("socket.io")
const _server = require('http').createServer(require('./server/app'));

const port = process.env.PORT || 3000;
const server = _server.listen( port, ()=> console.log(`Listening on port ${port}`));

process.env.SYNC ? seed() : null;

const io = socketio(server);

let counter = 0

io.on('connection', (socket)=>{

  socket.on('disconnect', () => console.log("Goodbye"))
  socket.on('add', count => {
    counter = count
    socket.broadcast.emit('setCounter', counter)
  })
  socket.emit('setCounter', counter)

})


