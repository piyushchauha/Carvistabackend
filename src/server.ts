import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './Routes/userRoutes';
import carRoute from './Routes/carRoutes';
import testdriveRoute from './Routes/testdriveRoutes';
import inspectionRoute from './Routes/inspectionRoutes';
import User from 'Model/userModel';
dotenv.config();
const app: Application = express();
const PORT: string | number = process.env.PORT || 9000;
const URI: string = process.env.URI || '6000'; 

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
app.use("/car",carRoute)
app.use("/testdrive",testdriveRoute)
app.use("/inspection",inspectionRoute)