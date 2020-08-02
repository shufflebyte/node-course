const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom, getAllRooms } = require('./utils/users');

const app = express();
// manualle create http server to be able to serve it to socket.io
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const pubDirPath = path.join(__dirname, '../public');

app.use(express.static(pubDirPath));


io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({id: socket.id, ...options});

        if (error) {
            return callback(error);
        }

        socket.join(user.room);

        // this only sends to requesting connection
        socket.emit('message', generateMessage('chatbot', 'Welcome!'));    

        // broadcast to all connections except sender
        socket.broadcast.to(user.room).emit('message', generateMessage('chatbot', `${user.username} has joined!`));

        io.to(user.room).emit('roomData', {
           room: user.room,
           users: getUsersInRoom(user.room),
        });

        io.emit('allRoomsData', {
            rooms: getAllRooms()
        });

        callback();
        // two new methods available
        // io.to().emit() to everybody in a specific room
        // socket.broadcast.to().emit() to everyone but not the sender in a specific room

    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed you asshole :-p');
        }

        io.to(user.room).emit('message', generateMessage(user.username, message));
        callback();
    });

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', generateMessage('chatbot', `${user.username} has left!`));
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room),
            });

            socket.broadcast.emit('allRoomsData', {
                rooms: getAllRooms()
            });
        }
    });
});

server.listen(port, () => {
    console.log("App started on port " + port);
});
