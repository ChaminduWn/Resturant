import express from 'express';
import { processPayment } from '../controllers/payment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.post('/processPayment', verifyToken, processPayment);

export default router;