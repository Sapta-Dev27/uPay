import express from 'express';

import authMiddleware from '../middleware/auth.js';
import infoMiddleware from '../middleware/info.js';
import { createUPID, fetchAllUPIDs } from '../controllers/UPID.js';
import { generateUPIService } from '../controllers/serviceProvider.js'


const router = express.Router();

router.post('/create', authMiddleware, infoMiddleware, createUPID);
router.get('/fetch-all-upids', authMiddleware, infoMiddleware, fetchAllUPIDs);
router.post('/generate-upi-service', authMiddleware, infoMiddleware, generateUPIService);


export default router;