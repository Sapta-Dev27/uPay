import express from 'express';

import authMiddleware from '../middleware/auth.js';
import infoMiddleware from '../middleware/info.js';

import {makeP2PTransactionByUPID, makeP2PTransactionByPhoneNumber, fetchAllTransactions} from '../controllers/Transactions/tarnsactionP2P.js'

import processTransaction from '../controllers/Transactions/tranactionsServiceProviders.js'


const router = express.Router();

router.post('/p2p-transaction-by-upid', authMiddleware, infoMiddleware, makeP2PTransactionByUPID);
router.post('/p2p-transaction-by-phone-number', authMiddleware, infoMiddleware, makeP2PTransactionByPhoneNumber);
router.get('/fetch-all-transactions', authMiddleware, infoMiddleware, fetchAllTransactions);
router.post('/service-provider-transaction', authMiddleware, infoMiddleware, processTransaction);   

export default router;