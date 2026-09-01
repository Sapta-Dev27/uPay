import express from 'express';

import authMiddleware from '../middleware/auth.js';
import infoMiddleware from '../middleware/info.js';
import {createProvider} from '../controllers/serviceProvider.js'

const router = express.Router();

router.post('/create-provider', infoMiddleware, createProvider);

export default router;