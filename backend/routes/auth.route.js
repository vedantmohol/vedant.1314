import express from 'express';
import { sendOTP, signIn, signOut, signUp, verifyOTP } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup',signUp);
router.post('/signin',signIn);
router.post('/signout',signOut);
router.post('/send-otp',sendOTP);
router.post('/verify-otp',verifyOTP);

export default router;