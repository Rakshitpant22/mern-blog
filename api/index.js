import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(
    ()=>{
        console.log("Mongo DB  is connected")
    }
).catch((error)=>{
    console.log(error)
})
const app=express();

app.use(express.json()); // allows your application to parse incoming requests with JSON payloads

app.listen(3000,()=>{
    console.log('server is listnening on port 3000');
});

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);

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