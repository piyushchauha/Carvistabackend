import { Request, Response } from "express";
import Inquiry from "../Model/inquiryModel";

// Schedule a test drive
export const addinquiry = async (req: Request, res: Response) => {
  try {
    const { carId, userId, date,status } = req.body;

    const addInquiry = await Inquiry.create({
      carId,
      userId,
      date,
      status
    });
    res
      .status(200)
      .json({ message: "Inquire added successfully", addInquiry});
  } catch (error) {
    res.status(500).json({ error: "Failed to inquire the car" });
  }
};

// Get all test drives
export const getinquiry = async (req: Request, res: Response) => {
  try {
    const getinquiry = await Inquiry.find().populate("carId userId");
    res.status(200).json(getinquiry);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetchInquiry details" });
  }
};

// Cancel a test drive
export const deleteinquiry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteinquiry = await Inquiry.findByIdAndDelete(id);
    if (!deleteinquiry) {
      res.status(404).json({ error: "Inquiry not found" });
    }
    res.status(200).json({ message: "Deleted Inquiry", deleteinquiry });
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel inquiry" });
  }
};
// Update test drive status
export const updateinquiry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedinquiry = await Inquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedinquiry) {
      res.status(404).json({ error: "Inquiry details not found" });
    }
    res
      .status(200)
      .json({ message: "Inquiry details updated", updatedinquiry});
  } catch (error) {
    res.status(500).json({ error: "Failed to update inquiry details" });
  }
};
