const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const serveStatic = require('serve-static');
let n = 0;

module.exports = (port = 3000) => {
  const app = express();
  const server = http.Server(app);

  server.listen(port);

  app.use(serveStatic(path.resolve(__dirname, '..', 'public')));

  const io = socketio(server);

  io.on('connection', (socket) => {
    io.emit('update', n);
    socket.on('increment', () => {
      n += 1;
      io.emit('update', n);
    });
  });

  // return { app, server };
};
