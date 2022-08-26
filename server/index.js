// const express = require('express');
// const app = express();
// const http = require('http');
// const {Server} = require('socket.io');

// const cors = require('cors');
// app.use(cors())
// const server = http.createServer(app);

// const io = new Server(server, {
//     cors:{
//         origin: 'https://localhost:3000',
//     },
// });

// io.on("connection", (socket) => {
//     console.log(`User Connected: ${socket.id}`);
  
//     socket.on("join_room", (data) => {
//       socket.join(data);
//     });
  
//     socket.on("send_message", (data) => {
//       socket.to(data.room).emit("receive_message", data);
//     });
//   });
  
//   server.listen(3001, () => {
//     console.log("SERVER IS RUNNING");
//   });

const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const app = express()
app.use((_req, res) => res.sendFile(INDEX, { root: __dirname }))

const server = app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}...`));

// socket server
const socket = require('socket.io');
const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

io.on('connection', (socket) => {
    socket.on('reqTurn', (data) => {
        const room = JSON.parse(data).room
        io.to(room).emit('playerTurn', data)
    })

    socket.on('create', room => {
        socket.join(room)
    })

    socket.on('join', room => {
        socket.join(room)
        io.to(room).emit('opponent_joined')
    })

    socket.on('reqRestart', (data) => {
        const room = JSON.parse(data).room
        io.to(room).emit('restart')
    })
});