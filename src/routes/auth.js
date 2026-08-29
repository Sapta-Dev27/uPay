import express from 'express';
import registerController from '../controllers/register.js';
import loginController from '../controllers/login.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController); 

export default router;
