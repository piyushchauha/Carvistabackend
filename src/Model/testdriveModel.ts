import mongoose, { Document, Schema } from 'mongoose';
import { model, Types } from 'mongoose';
// Define an interface for the User document
interface ITestdrive{
    carId: Types.ObjectId;  // Reference to Car
    userId: Types.ObjectId; // Reference to User
    date: Date;             // Test drive scheduled date
    status: 'pending' | 'approved' | 'completed' | 'cancelled'; 
}
// Define the schema
const testDriveSchema: Schema<ITestdrive> = new Schema(
  {
    carId: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      date: {
          type: Date,
          required: true,
        },
      status: {
        type: String,
        enum: ['pending', 'approved', 'completed', 'cancelled'],
        required: true,
        default: 'pending'
      },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);
// Create the model
const Testdrive = mongoose.model<ITestdrive>('Testdrive', testDriveSchema);
export default Testdrive;