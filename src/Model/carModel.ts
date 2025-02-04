import mongoose, { Document, Schema } from 'mongoose';
// Define an interface for the User document
interface ICar{
  model: string;
  manufracturer: string;
  year:Date;
  price: string;
  status: string;
}
// Define the schema
const carSchema: Schema<ICar> = new Schema(
  {
    model: {
      type: String,
      required: true,
    },
    manufracturer: {
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
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);
// Create the model
const Car = mongoose.model<ICar>('Car', carSchema);
export default Car;