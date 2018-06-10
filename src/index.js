import io from 'socket.io-client';
const socket = io(window.location.origin);

const id = Math.random() * 10

socket.on('connect', () => {
  socket.emit('userId', id)
});

