import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import connectDB from './lib/db.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

const connectToDB = async () => {
    await connectDB();
    app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
    });
}
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth' , authRoutes);


connectToDB();