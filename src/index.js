const express = require('express');
require('dotenv').config();
const functions = require('firebase-functions');
const cors = require('cors');
const routes = require('./routes/index');
const helmet = require('helmet');
const db = require('./database');
const port = 3001;
const http = require('http');
const socketIo = require('socket.io');
// const imageUpload = require('./middleware/imageUpload');
const {pusher} = require('./pusher');

// setInterval(() => {
//   pusher.trigger('chatbot', 'user', {
//     message: "Hello from Pusher!!!!!"
//   })
// }, 1000)

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());


app.use('/', routes);
// app.use('/', dialogflowRoutes);

// app.use('/api', imageUpload);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "PUT", "POST", "DELETE"]
  }
});

io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
    });

    socket.on('userMessage', (data) => {
        // data contains message and user info
        // Broadcast or send to admin
        io.emit('messageToAdmin', data);
    });

    socket.on('adminMessage', (data) => {
        // data contains message and target user info
        // Send message to specific user
        const { userId } = data;
        io.to(userId).emit('messageFromAdmin', data);
    });
});


app.listen(port, () => {
  console.log(`Express server listening on ${port}`)
})

exports.api = functions.https.onRequest(app)
