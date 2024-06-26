const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('../client'));

let presenter;

io.on('connection', socket => {
  socket.on('presenter', () => {
    presenter = socket.id;
    socket.broadcast.emit('presenter');
  });
  socket.on('viewer', () => {
    socket.to(presenter).emit('viewer', socket.id);
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
    socket.to(presenter).emit('disconnectPeer', socket.id);
  });
});

server.listen(3000, () => console.log('Server is running on port 3000'));