import express from 'express';
import authMiddleware from '../middleware/auth.js'; 
import infoMiddleware from '../middleware/info.js';
import { displayProfile } from '../controllers/profile.js';


const router = express.Router();


router.get('/fetch', infoMiddleware,  authMiddleware, displayProfile);

export default router;