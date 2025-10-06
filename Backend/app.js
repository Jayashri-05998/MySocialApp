const express = require('express');
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
 
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const { errorHandler } = require('./middlewares/errorHandler');
 
const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: process.env.FRONTEND_URL, credentials: true } });
 
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
 
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use(errorHandler);
 
require('./controllers/chatController')(io);
 
module.exports = { app, server };