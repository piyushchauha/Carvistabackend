//Mongoose
import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  contact:string;
  password: string;
  resetPasswordOTP?: string;
  resetPasswordExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
        type: String,
        required: true,
        unique: true,
      },
    password: {
      type: String,
      required: true,
    },
    resetPasswordOTP: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true } 
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;