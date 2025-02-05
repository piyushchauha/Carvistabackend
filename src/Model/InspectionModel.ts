import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the Inspection document
export interface IInspection extends Document {
    carId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    date: Date;
    time: string;
    location: string;
    status: "pending" | "completed" | "cancelled";
}

// Define the Mongoose Schema
const InspectionSchema = new Schema<IInspection>({

    carId:
    {
        type: Schema.Types.ObjectId,
        ref: "Car",
        required: true

    },
    userId:
    {
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },

    date: 
    { 
         type: Date, 
         required: true 
    },

    time: 
    { 
    type: String, required: true 
    },

    location: 
    { 
    type: String, 
    required: true 
    },

    status: 
    { 
    type: String, 
    enum: ["pending", "completed", "cancelled"],
    default: "pending" 
    },
    
});

// Export the model
const Inspection = mongoose.model<IInspection>("Inspection", InspectionSchema);
export default Inspection;
