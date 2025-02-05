import { Request, Response } from "express";
import Testdrive from "../Model/testdriveModel";

// Schedule a test drive
export const scheduleTestDrive = async (req: Request, res: Response) => {
  try {
    const { carId, userId, date } = req.body;

    const testDrive = await Testdrive.create({
      carId,
      userId,
      date,
      status: "pending",
    });
    res
      .status(201)
      .json({ message: "Test drive scheduled successfully", testDrive });
  } catch (error) {
    res.status(500).json({ error: "Failed to schedule test drive" });
  }
};

// Get all test drives
export const getTestDrives = async (req: Request, res: Response) => {
  try {
    const testDrives = await Testdrive.find().populate("carId userId");
    res.status(200).json(testDrives);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch test drives" });
  }
};

// Cancel a test drive
export const cancelTestDrive = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTestDrive = await Testdrive.findByIdAndDelete(id);
    if (!deletedTestDrive) {
      res.status(404).json({ error: "Test drive not found" });
    }
    res.status(200).json({ message: "Test drive cancelled", deletedTestDrive });
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel test drive" });
  }
};
// Update test drive status
export const updateTestDriveStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedTestDrive = await Testdrive.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedTestDrive) {
      res.status(404).json({ error: "Test drive not found" });
    }
    res
      .status(200)
      .json({ message: "Test drive status updated", updatedTestDrive });
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
};
