const socket = io(window.location.origin);


const count = document.getElementById('count')
socket.on('setCounter', (counter) => count.innerHTML = counter)

count.addEventListener("click", ()=>{
  
  count.innerHTML = count.innerHTML * 1 + 1
  socket.emit("add", count.innerHTML * 1)
  
})

socket.on('connect', () => {
  console.log('I have made a persistent two-way connection to the server!');
});
socket.on('disconnect', ()=> console.log("we have disconnected"))