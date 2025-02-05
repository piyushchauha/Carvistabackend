import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import Car from '../Model/carModel';
import Inspection from '../Model/InspectionModel';
// import User from 'Model/userModel';
// import User from './Model/userModel'/;

dotenv.config();
const app = express();

// Create inspection
export const addInspection= async (req: Request, res: Response) => {
  try {
    const {userId,carId,date,time,location,status} = req.body;
    const car = new Car({
      userId,
      carId,
      date,
      time,
      location,
      status
    });

    const savedInspection = await car.save();
    res.status(201).json(savedInspection);
  } catch (error) {
    if(error instanceof Error)
    res.status(400).json({ error: error.message });
  }
};

// Get All Users (R)
export const allInspection = async (req: Request, res: Response) => {
  try {
    const cars = await Inspection.find().populate('userId carId');
    res.status(200).json(cars);
  } catch (error) {
    if(error instanceof Error)
    res.status(400).json({ error: error.message });
  }
};

//Update Inspection Details
export const updateInspection = async (req: Request, res: Response) => {
  const { id } = req.params;
    try {
      const updateInspection = await Car.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json(updateInspection);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  };


// // // Delete Inspection
export const deleteInspection = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
      const deleteInspection = await Inspection.findByIdAndDelete(id);
      if (!deleteInspection) {
        res.status(404).json({ error: 'Inspection not found' });
      }
      res.status(200).json({message: "Inspection Deleted Successfully",deleteInspection});
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  };

