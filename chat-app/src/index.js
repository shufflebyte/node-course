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


let count = 0; 

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.emit('countUpdated', count);

    socket.on('increment', () => {
        count++;
        //only sends to the requesting client..
        //socket.emit('countUpdated', count);

        // broadcasting to all clients
        io.emit('countUpdated', count);
    });
});



server.listen(port, () => {
    console.log("App started on port " + port);
});
