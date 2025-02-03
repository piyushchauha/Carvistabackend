import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './Routes/userRoutes';
import User from 'Model/userModel';
dotenv.config();
const app: Application = express();
const PORT: string | number = process.env.PORT || 8000;
const URI: string = process.env.URI || ''; 

// const user=require("../Model/userModel"); 
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.URI || '').then(() => {
    console.log('Connected Successfully');
    app.listen(process.env.PORT || 8000, () => {
      console.log('Running Successfully at', process.env.PORT);
    });
  });

app.use("/user",userRoute)