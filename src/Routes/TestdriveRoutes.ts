//Express
import express from 'express';

//TestdriveController
import { allTestdrive, cancelTestdrive, getTestdrive, scheduleTestdrive, updateTestdrivestatus } from '../Controllers/testdriveController';

const router = express.Router();

router.post('/scheduleTestDrive', scheduleTestdrive);
router.get('/allTestDrive', allTestdrive);
router.delete('/cancelTestDrive/:id', cancelTestdrive);
router.patch('/updateTestDriveStatus/:id',updateTestdrivestatus);
router.get('/getTestdrive/:id',getTestdrive);


export default router;