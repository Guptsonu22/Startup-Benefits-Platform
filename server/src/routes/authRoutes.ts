import express from 'express';
import { registerUser, loginUser, getMe, verifyUser } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify', protect, verifyUser);
router.get('/me', protect, getMe);

export default router;
