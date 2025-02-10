//Mongoose
import mongoose, { Schema, Document } from "mongoose";

export interface IInspection extends Document {
    carId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    date: Date;
    location: string;
}

const inspectionSchema = new Schema<IInspection>({
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
    location:
    {
    type: String,
    required: true
    },
});

const Inspection = mongoose.model<IInspection>("Inspection", inspectionSchema);

export default Inspection;









