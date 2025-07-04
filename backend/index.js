import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import pageRoutes from './routes/page.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
})

app.listen(4000,()=>{
    console.log("Server is running on port 4000")
})

app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/pages',pageRoutes);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})