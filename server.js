import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';

const app = express();

// cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
// public
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import path from 'path';


if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
const port = process.env.PORT || 5100;

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';
app.use(express.json()); // built-in middleware to accept json in requests
app.use(cookieParser());

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './public')));

// routes
app.get('/', (req, res) => {
    
    res.send('hello world');
})
app.get('/api/v1/test', (req, res) => {
    res.json({msg: "test route"});
})
app.use('/api/v1/jobs',  authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'./public', 'index.html'));
})
app.use('*', (req, res) => {
    res.status(404).json({msg: 'not found'});
})
app.use(errorHandlerMiddleware);

import mongoose from 'mongoose';


try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
} catch(error) {
    console.log(error);
    process.exit(1);
}
