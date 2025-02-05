import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import Car from '../Model/carModel';
import Inquiry from '../Model/inquiryModel';
// import User from 'Model/userModel';
// import User from './Model/userModel'/;

dotenv.config();
const app = express();

// Create inspection
export const addInquiry= async (req: Request, res: Response) => {
  try {
    const {userId,carId,date,status} = req.body;
    const inquiry = new Inquiry({
      userId,
      carId,
      date,
     
      status
    });

    const savedInquiry = await inquiry.save();
    res.status(201).json(savedInquiry);
  } catch (error) {
    if(error instanceof Error)
    res.status(400).json({ error: error.message });
  }
};

// Get All Users (R)
export const allInquiry = async (req: Request, res: Response) => {
  try {
    const inquiry = await Inquiry.find().populate('userId carId');
    res.status(200).json(inquiry);
  } catch (error) {
    if(error instanceof Error)
    res.status(400).json({ error: error.message });
  }
};

//Update Inspection Details
export const updateInquiry = async (req: Request, res: Response) => {
  const { id } = req.params;
    try {
      const updateInquiry = await Inquiry.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json(updateInquiry);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  };


// // // Delete Inspection
export const deleteInquiry = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
      const deleteInquiry = await Inquiry.findByIdAndDelete(id);
      if (!deleteInquiry) {
        res.status(404).json({ error: 'Inquiry not found' });
      }
      res.status(200).json({message: "Inquiry Deleted Successfully",deleteInquiry});
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  };

