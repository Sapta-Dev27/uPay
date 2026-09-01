import express from 'express';
import {createMPIN , fetchAllMPINs} from '../controllers/mpin.js';
import authMiddleware from '../middleware/auth.js'; 
import infoMiddleware from '../middleware/info.js';
import { changeMPIN } from '../controllers/profile.js';

const router = express.Router();

router.post('/create', authMiddleware, infoMiddleware, createMPIN);
router.get('/fetch', authMiddleware, infoMiddleware, fetchAllMPINs);
router.patch('/change', infoMiddleware, authMiddleware, changeMPIN);


export default router;