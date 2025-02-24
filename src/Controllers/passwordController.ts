import { Request, Response } from 'express';
import User from '../Model/userModel';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';


const BASE_URL = 'http://localhost:5000'; // Update with frontend URL

// Send Reset Link
export const forgotPassword = async (req: Request, res: Response):Promise<void>=>{
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
       res.status(404).json({ error: 'User not found' });
       return;
    }

    // Generate Reset Token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1-hour expiry

    await user.save();

    // Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: 'rajvirsinhdabhi1@gmail.com', pass: 'erox bwnn iwxo hnip' }, // Use environment variables in production
    });

    const mailOptions = {
      from: 'your_email@gmail.com',
      to: user.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click the link below:
      ${BASE_URL}/reset-password/${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Reset Password
export const resetPassword = async (req: Request, res: Response) :Promise<void>=> {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
       res.status(400).json({ error: 'Invalid or expired token' });
       return;
    }

    // Hash New Password
    user.password = newPassword;5
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
