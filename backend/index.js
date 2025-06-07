import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
})

app.listen(4000,()=>{
    console.log("Server is running on port 4000")
})

app.use('/api/auth',authRoutes);