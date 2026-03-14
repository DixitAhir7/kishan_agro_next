import express from 'express';
import { verifyPin } from '../controllers/adminController.js';

const router = express.Router();

router.post('/verify', verifyPin);

export default router;