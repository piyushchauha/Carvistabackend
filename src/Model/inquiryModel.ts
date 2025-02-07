import mongoose, { Schema, Document } from "mongoose";
// Define an interface for the Inspection document
export interface IInquiry extends Document {
    carId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    date: Date;
    status:'pending' | 'approved' | 'completed' | 'cancelled'; 
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
    required: true
    },
});
// Export the model
const Inquiry = mongoose.model<IInquiry>("Inquiry", InquirySchema);
export default Inquiry;









