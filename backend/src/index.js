import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import connectDB from './lib/db.js';
import messageRoutes from "./routes/message.route.js"
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

const connectToDB = async () => {
    await connectDB();
    app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
    });
}
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use('/api/auth' , authRoutes);
app.use('/api/messages' , messageRoutes);


connectToDB();