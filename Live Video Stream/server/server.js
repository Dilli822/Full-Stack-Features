const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('../client'));

let broadcaster;

io.on('connection', socket => {
  socket.on('broadcaster', () => {
    broadcaster = socket.id;
    socket.broadcast.emit('broadcaster');
  });
  socket.on('watcher', () => {
    socket.to(broadcaster).emit('watcher', socket.id);
  });
  socket.on('offer', (id, message) => {
    socket.to(id).emit('offer', socket.id, message);
  });
  socket.on('answer', (id, message) => {
    socket.to(id).emit('answer', socket.id, message);
  });
  socket.on('candidate', (id, message) => {
    socket.to(id).emit('candidate', socket.id, message);
  });
  socket.on('disconnect', () => {
    socket.to(broadcaster).emit('disconnectPeer', socket.id);
  });
});

server.listen(3000, () => console.log('Server is running on port 3000'));