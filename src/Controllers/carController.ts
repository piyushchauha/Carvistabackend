//Express
import express, { Request, Response } from 'express';

//CarModel
import Car from '../Model/carModel';

//Messages
import { Messages } from '../Constants/Messages';

const app = express();

app.use(express.json()); 

// Create User 
export const addCar = async (req: Request, res: Response) => {
  try {
    const {model,manufacturer,year,price,status } = req.body;
    const car = new Car({
      model,
      manufacturer,
      year,
      price,
      status 
    });

    const savedCar = await car.save();
    res.status(200).json(savedCar);
  } catch (error) {
    if(error instanceof Error)
    res.status(400).json({ error: error.message });
    return;
  }
};

// Get All Users 
export const allCars = async (req: Request, res: Response) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    if(error instanceof Error)
    res.status(400).json({ error: error.message });
    return;
  }
};


// Update User
export const updateCar = async (req: Request, res: Response) => {
  const { id } = req.params;
    try {
      const updateCar = await Car.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json(updateCar);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
        return;
      }
    }
  };


//  Delete User 
export const deleteCar = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
      const deleteCar = await Car.findByIdAndDelete(id);
      if (!deleteCar) {
        res.status(404).json({ error:Messages.carNotFound });
        return;
      }
      res.status(200).json({message: Messages.carDeleted,deleteCar});
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
        return;
      }
    }
  };


  //Get the car by id

  export const getCar = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const getCar = await Car.findById(id);
      if (getCar) {
        res.status(200).json(getCar);
        return;
      } else {
        res.status(404).json(Messages.CarNotFound);
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

