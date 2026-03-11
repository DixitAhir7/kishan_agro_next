import express from 'express';
import { verifyPin, updatePin } from '../controllers/adminController.js';

const router = express.Router();

router.post('/verify', verifyPin);
router.put('/update', updatePin);

export default router;
