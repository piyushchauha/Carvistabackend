//Mongoose
import mongoose, { Document, Schema } from 'mongoose';

interface ICar{
  model: string;
  manufacturer: string;
  year:Date;
  price: string;
  status: string;
}

const carSchema: Schema<ICar> = new Schema(
  {
    model: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    year: {
        type: Date,
        required: true,
      },
    price: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model<ICar>('Car', carSchema);

export default Car;