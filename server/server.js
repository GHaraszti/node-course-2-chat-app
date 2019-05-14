const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

//Event listeners
io.on('connection', (socket) => {
    console.log('New user connected');

    //Send welcome to client
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
   
//    //Send notification to other users
//    socket.broadcast.emit('newMessage', {
//         from: "Admin",
//         text: "New user joined",
//         createdAt: new Date().getTime()
//     });


   socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage('Admin', 'New user joined'));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});