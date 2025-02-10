//Express
import { Request, Response } from "express";

//testdriveModel
import Testdrive from "../Model/testdriveModel";

//Messages
import { Messages } from "../Constants/Messages";

// Schedule a test drive
export const scheduleTestdrive = async (req: Request, res: Response) => {
  try {
    const { carId, userId, date } = req.body;

    const testDrive = await Testdrive.create({
      carId,
      userId,
      date,
      status: "pending",
    });
    res
      .status(200)
      .json({ message:Messages.testdriveSchedule, testDrive });
  } catch (error) {
    res.status(500).json({ error: Messages.failTestDrive }); 
    return;
  }
};

// Get all test drives
export const allTestdrive = async (req: Request, res: Response) => {
  try {
    const testDrives = await Testdrive.find().populate("carId userId");
    res.status(200).json(testDrives);
  } catch (error) {
    res.status(500).json({ error: Messages.failFetchTestdrive });
    return;
  }
};

// Cancel a test drive
export const cancelTestdrive = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteTestdrive = await Testdrive.findByIdAndDelete(id);
    if (!deleteTestdrive) {
      res.status(404).json({ error: Messages.testdriveNotFound });
      return;
    }
    res.status(200).json({ message:Messages.testdriveCancel, deleteTestdrive });
  } catch (error) {
    res.status(500).json({ error:Messages.failtestdriveCancel});
    return;
  }
};
// Update test drive status
export const updateTestdrivestatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedTestdrive = await Testdrive.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedTestdrive) {
      res.status(404).json({ error: Messages.testdriveNotFound });
      return;
    }
    res
      .status(200)
      .json({ message: Messages.updatedTestDrive, updatedTestdrive });
  } catch (error) {
    res.status(500).json({ error:Messages.failtestdriveUpdate  });
    return;
  }
};

//Get the Inspection By Id

export const getTestdrive = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const getTestdrive = await Testdrive.findById(id);
    if (!getTestdrive) {
      res.status(200).json(getTestdrive);
      return;
    } else {
      res.status(404).json(Messages.TestdriveNotFound);
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
