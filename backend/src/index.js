import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import connectDB from './lib/db.js';
import messageRoutes from "./routes/message.route.js"
import cors from 'cors';
import {app , server} from "./lib/socket.js"
import path from 'path';

const urlToReload = `https://chatbox-satyam-e4th.onrender.com`;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(urlToReload)
    .then((response) => {
      console.log("website reloded");
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
    });
}

setInterval(reloadWebsite, interval);

const __dirname = path.resolve();
dotenv.config();
const PORT = process.env.PORT || 5000;

const connectToDB = async () => {
    await connectDB();
    server.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
    });
}


app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://chatbox-satyam-e4th.onrender.com"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use('/api/auth' , authRoutes);
app.use('/api/messages' , messageRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/dist')));  

    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
    });
}


connectToDB();