const seed = require('./server/seed');
const socketio = require("socket.io")
const _server = require('http').createServer(require('./server/app'));

const port = process.env.PORT || 3000;
const server = _server.listen(port, () => console.log(`Listening on port ${port}`));

 process.env.SYNC = true

process.env.SYNC ? seed() : null;

const io = socketio(server);

io.on('connection', (socket) => {
  socket.on('disconnect', () => console.log("Goodbye"))
  socket.emit('connected')
  socket.on('broadcasting', (plan)=> {
    console.log(plan)
    socket.broadcast.emit('newBroadcast', plan );
  })
  socket.on('recommending', (recommendation)=> {
    console.log(recommendation)
    socket.broadcast.emit('newRecommendation', { recommendation })
  })
  socket.on('foo', bar => console.log(bar))
  console.log('connected')
})


