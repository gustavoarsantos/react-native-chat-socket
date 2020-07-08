const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').createServer(app);
const io = require('socket.io')(server);

let messagesTeste = [];
let messagesGames = [];

io.of('/teste').on('connection', (socket) => {
  console.log('usuario conectado teste!');

  io.of('/teste').emit('messages', messagesTeste);

  socket.on('forceDisconnect', function(){
    socket.disconnect();
    console.log('usuario desconectado teste!');
  });

  socket.on('send_messages', (msg) => {
    messagesTeste.push(msg);

    io.of('/teste').emit('messages', messagesTeste);
  });
});

io.of('/games').on('connection', (socket) => {
  console.log('usuario conectado games!');

  io.of('/games').emit('messages', messagesGames);

  socket.on('forceDisconnect', function(){
    socket.disconnect();
    console.log('usuario desconectado games!');
  });

  socket.on('send_messages', (msg) => {
    messagesGames.push(msg);

    io.of('/games').emit('messages', messagesGames);
  });
});


server.listen(3000, () => console.log('server rodando ' + 3000));
