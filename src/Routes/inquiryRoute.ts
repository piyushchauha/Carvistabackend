import express,{Router} from 'express';
import { addinquiry, deleteinquiry, getinquiry, updateinquiry } from '../Controllers/inquiryController';

const router = Router();

router.post('/addinquiry', addinquiry);
router.get('/getinquiry', getinquiry);
router.delete('/deleteinquiry/:id', deleteinquiry);
router.patch('/updateinquiry/:id',updateinquiry);


export default router;