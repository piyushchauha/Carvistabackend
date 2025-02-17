//Express
import express, { Application } from 'express';

//Cors
import cors from 'cors';

//Dotenv
import dotenv from 'dotenv';

//Mongoose
import mongoose from 'mongoose';

//UserRoutes
import userRoute from './Routes/userRoutes';

//carRoutes
import carRoute from './Routes/carRoutes';

//TestdriveRoutes
import testdriveRoute from './Routes/testdriveRoutes';

//InspectionRoutes
import inspectionRoute from './Routes/inspectionRoutes';

//InquiryRoutes
import inquiryRoute from './Routes/inquiryRoute'


//UploadImage
import imageuploadRoute from './Routes/uploadimageRoutes'

dotenv.config();

const app: Application = express();
const PORT: string | number = process.env.PORT || 9000;
const URI: string = process.env.URI || '6000'; 

app.use(cors());

app.use(express.json());
mongoose.connect(process.env.URI || '').then(() => {
    console.log('Connected Successfully');
    app.listen(process.env.PORT || 8000, () => {
      console.log('Running Successfully at', process.env.PORT);
    });
  });


app.use("/user",userRoute);
app.use("/car",carRoute);
app.use("/testdrive",testdriveRoute);
app.use("/inspection",inspectionRoute);
app.use("/inquiry",inquiryRoute);
app.use("/upload",imageuploadRoute)