import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the Inspection document
export interface IInquiry extends Document {
    carId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    date: Date;
    status: "pending" | "completed" | "cancelled"|"Approved";
}

// Define the Mongoose Schema
const InquirySchema = new Schema<IInquiry>({

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

    status: 
    { 
    type: String, 
    enum: ["pending", "completed", "cancelled"],
    default: "pending" 
    },
    
});

// Export the model
const Inquiry = mongoose.model<IInquiry>("Inuiry", InquirySchema);
export default Inquiry;
