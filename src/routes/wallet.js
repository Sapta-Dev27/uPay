import express from 'express';

import authMiddleware from '../middleware/auth.js';
import infoMiddleware from '../middleware/info.js';
import {
  createWallet,
  transferCoins,
  fetchAllWallets
} from '../controllers/wallet.js';

const router = express.Router();

router.post('/create', authMiddleware, infoMiddleware, createWallet);
router.patch('/transfer-coins', authMiddleware, infoMiddleware, transferCoins);
router.get('/fetch-all-wallets', authMiddleware, infoMiddleware, fetchAllWallets);

export default router;