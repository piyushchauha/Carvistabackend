// src/routes/userRoutes.ts
import express from "express";
import {
  addInspection,
  deleteInspection,
  updateInspection,
  allInspection,
} from "../Controllers/inspectionController"; // Adjust the import path as necessary

const router = express.Router();

// Define the routes and associate them with controller functions
router.post("/addinspection", addInspection);
router.get("/allinspection", allInspection);
router.delete("/deleteinspection/:id", deleteInspection);
router.patch("/updateinspection/:id", updateInspection);




export default router;