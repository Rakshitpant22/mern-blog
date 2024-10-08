import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGO,{useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000})
.then(
 
    ()=>{
        console.log("Mongo DB  is connected")
    }
).catch((error)=>{
    console.log(error)
})
const __dirname = path.resolve();

const app=express();

app.use(express.json()); // allows your application to parse incoming requests with JSON payloads
app.use(cookieParser());

app.listen(3000,()=>{
    console.log('server is listnening on port 3000');
});

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);
app.use('/api/comment',commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});



//! thi is a middleware  
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });