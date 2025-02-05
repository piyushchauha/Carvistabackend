// src/routes/userRoutes.ts
import express from "express";
import { addInquiry, deleteInquiry, updateInquiry,allInquiry } from "src/Controllers/inquiryController";

const router = express.Router();

// Define the routes and associate them with controller functions
router.post("/addinquiry", addInquiry);
router.get("/allinquiry", allInquiry);
router.delete("/deleteiniquiry/:id", deleteInquiry);
router.patch("/updateinquiry/:id", updateInquiry);




export default router;