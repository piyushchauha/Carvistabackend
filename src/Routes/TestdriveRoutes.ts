import express,{Router} from 'express';
import { cancelTestDrive, getTestDrives, scheduleTestDrive, updateTestDriveStatus } from '../Controllers/testdriveController';

const router = Router();

router.post('/scheduleTestDrive', scheduleTestDrive);
router.get('/getTestDrive', getTestDrives);
router.delete('/cancelTestDrive/:id', cancelTestDrive);
router.patch('/updateTestDriveStatus/:id',updateTestDriveStatus);


export default router;