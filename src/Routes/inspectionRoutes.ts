//Express
import express from "express";

//InspectionController
import {
  addInspection,
  deleteInspection,
  updateInspection,
  allInspection,
  getInspection,
} from "../Controllers/inspectionController"; 

const router = express.Router();

router.post("/addinspection", addInspection);
router.get("/allinspection", allInspection);
router.delete("/deleteinspection/:id", deleteInspection);
router.patch("/updateinspection/:id", updateInspection);
router.get("/getinspection/:id", getInspection);

export default router;














