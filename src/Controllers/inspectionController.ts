//Express
import express, { Request, Response } from 'express';

//InspectionModel
import Inspection from '../Model/inspectionModel';

//Messages
import { Messages } from '../Constants/Messages';

const app = express();

app.use(express.json()); 


// Create inspection
export const addInspection= async (req: Request, res: Response) => {
  try {
    const {userId,carId,date,location} = req.body;
    const inspection = new Inspection({
      userId,
      carId,
      date,
      location,
    });
    const savedInspection = await inspection.save();
    res.status(201).json(savedInspection);
  } catch (error) {
    if(error instanceof Error)
    res.status(400).json({ error: error.message });
    return;
  }
};
// Get All Users 
export const allInspection = async (req: Request, res: Response) => {
  try {
    const cars = await Inspection.find().populate('userId carId');
    res.status(200).json(cars);
  } catch (error) {
    if(error instanceof Error)
    res.status(400).json({ error: error.message });
    return;
  }
};
//Update Inspection Details
export const updateInspection = async (req: Request, res: Response) => {
  const { id } = req.params;
    try {
      const updateInspection = await Inspection.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updateInspection);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
        return;
      }
    }
  };
// // // Delete Inspection
export const deleteInspection = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deleteInspection = await Inspection.findByIdAndDelete(id);
      if (!deleteInspection) {
        res.status(404).json({ error: Messages.inspectionNotFound });
        return;
      }
      res.status(200).json({message:Messages.inspectionDeleted,deleteInspection});
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
        return;
      }
    }
  };

//Get teh Inspection By Id

export const getInspection = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const getInspection = await Inspection.findById(id);
    if (!getInspection) {
      res.status(200).json(getInspection);
      return;
    } else {
      res.status(404).json(Messages.InspectionNotFound);
      return;
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
      return;
    } else {
      res.status(500).json({ error: Messages.UnknownError });
      return;
    }
  }
};









