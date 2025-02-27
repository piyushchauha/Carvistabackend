// import { Request, Response } from 'express';
// import User from '../Model/userModel';
// import crypto from 'crypto';
// import nodemailer from 'nodemailer';
// import bcrypt from 'bcrypt';


// const BASE_URL = 'http://localhost:5000'; // Update with frontend URL

// // Send Reset Link
// export const forgotPassword = async (req: Request, res: Response):Promise<void>=>{
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//        res.status(404).json({ error: 'User not found' });
//        return;
//     }

//     // Generate Reset Token
//     const resetToken = crypto.randomBytes(32).toString('hex');
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1-hour expiry

//     await user.save();

//     // Send Email
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: { user: 'rajvirsinhdabhi1@gmail.com', pass: 'erox bwnn iwxo hnip' }, // Use environment variables in production
//     });

//     const mailOptions = {
//       from: 'your_email@gmail.com',
//       to: user.email,
//       subject: 'Password Reset Request',
//       text: `You requested a password reset. Click the link below:
//       ${BASE_URL}/reset-password/${resetToken}`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ message: 'Password reset email sent' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// // Reset Password
// export const resetPassword = async (req: Request, res: Response) :Promise<void>=> {
//   try {
//     const { token, newPassword } = req.body;
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: new Date() },
//     });

//     if (!user) {
//        res.status(400).json({ error: 'Invalid or expired token' });
//        return;
//     }

//     // Hash New Password
//     user.password = newPassword;5
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;

//     await user.save();
//     res.status(200).json({ message: 'Password reset successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

import { Request, Response } from 'express';
import User from '../Model/userModel';
import nodemailer from 'nodemailer';
// import bcrypt from 'bcrypt';

const BASE_URL = 'http://localhost:5000'; // Update with frontend URL

// Generate a 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send Reset OTP
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Generate OTP
    const otp = generateOTP();
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10-minute expiry

    await user.save();

    // Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: 'rajvirsinhdabhi1@gmail.com', pass: 'erox bwnn iwxo hnip' }, // Use environment variables in production
    });

    const mailOptions = {
      from: 'your_email@gmail.com',
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your password reset OTP is: ${otp}. It is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset OTP sent to email' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
//verify otp
export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({
      email,
      resetPasswordOTP: otp,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      res.status(400).json({ error: "Invalid or expired OTP" });
      return;
    }

    res.status(200).json({ message: "OTP Verified Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Reset Password using OTP
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({
      email,
      resetPasswordOTP: otp,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      res.status(400).json({ error: 'Invalid or expired OTP' });
      return;
    }

    // Hash New Password
    // const salt = await bcrypt.genSalt(10);
    user.password =  newPassword;

    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;
  
    await user.save();
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};