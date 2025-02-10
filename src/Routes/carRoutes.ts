//Express
import express from "express";

//Carcontroller
import {
  addCar,
  allCars,
  deleteCar,
  getCar,
  updateCar
} from "../Controllers/carController"; 


const router = express.Router();

router.post("/addcar", addCar);
router.get("/allcars", allCars);
router.delete("/deletecar/:id", deleteCar);
router.patch("/updatecar/:id", updateCar);
router.get("/getcar/:id", getCar);


export default router;