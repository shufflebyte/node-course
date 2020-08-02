const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
// manualle create http server to be able to serve it to socket.io
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const pubDirPath = path.join(__dirname, '../public');

app.use(express.static(pubDirPath));


io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    // this only sends to requesting connection
    socket.emit('message', 'Welcome!');

    // broadcast to all connections except sender
    socket.broadcast.emit('message', 'A new user has joined');

    socket.on('sendMessage', (message, callback) => {
        // broadcast to all connections
        io.emit('message', message);
        callback('Delivered!');
    });

    socket.on('sendLocation', (coords) => {
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`);
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left');
    });
});

server.listen(port, () => {
    console.log("App started on port " + port);
});
