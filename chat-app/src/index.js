const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages');

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
    socket.emit('message', generateMessage('Welcome!'));

    // broadcast to all connections except sender
    socket.broadcast.emit('message', generateMessage('A new user has joined'));

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed you asshole :-p');
        }

        // broadcast to all connections
        io.emit('message', generateMessage(message));
        callback();
    });

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
        callback();
    });

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left'));
    });
});

server.listen(port, () => {
    console.log("App started on port " + port);
});
