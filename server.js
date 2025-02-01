require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const stockUpdates = require('./sockets/stockUpdates');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  }
});

// Connect to MongoDB
connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL,  // Allow frontend on port 3000
  methods: ["GET", "POST"],
  credentials: true,  // Allow cookies to be sent
}));

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api', productRoutes);

// WebSocket setup
stockUpdates(io);

server.listen(process.env.PORT || 8080, () => console.log(`Server running on port ${process.env.PORT || 8080}`));
