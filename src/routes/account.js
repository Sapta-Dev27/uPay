import express from 'express';

import authMiddleware from '../middleware/auth.js'
import infoMiddleware from '../middleware/info.js'
import { createUserAccount, createServiceProviderAccount, fetchAllAccounts  , fetchAllServiceProviderAccounts   } from '../controllers/account.js'


const router = express.Router();

router.post('/create-user-account', authMiddleware, infoMiddleware, createUserAccount);
router.post('/create-service-provider-account', authMiddleware, infoMiddleware, createServiceProviderAccount);
router.get('/fetch-all-accounts', authMiddleware , infoMiddleware, fetchAllAccounts);
router.get('/fetch-all-service-provider-accounts', authMiddleware , infoMiddleware, fetchAllServiceProviderAccounts);


export default router;