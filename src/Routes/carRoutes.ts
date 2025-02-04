// src/routes/userRoutes.ts
import express from "express";
import {
  addCar,
  allCars,
  deletecar,
  updateCar
} from "../Controllers/carController"; // Adjust the import path as necessary

const router = express.Router();

// Define the routes and associate them with controller functions
router.post("/addcar", addCar);
router.get("/allcars", allCars);
router.delete("/deletecar/:id", deletecar);
router.patch("/updatecar/:id", updateCar);




export default router;