import express from 'express';
import 'dotenv/config'
import connectToDb from './config/db.js';
import infoMiddleware from './middleware/info.js';
import authRoutes from './routes/auth.js';
import accountRoutes from './routes/account.js';
import upidRoutes from './routes/UPID.js';
import transactionRoutes from './routes/transactions.js';
import serviceProviderRoutes from './routes/serviceProvider.js';
import mpinRoutes from './routes/mpin.js';
import profileRoutes from './routes/profile.js';
import walletRoutes from './routes/wallet.js';

const PORT = process.env.PORT;
const app = express();
connectToDb();


app.use(express.json());
app.use(infoMiddleware);


app.get('/api/v1/health', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Server is running'
  })
})
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/upids', upidRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/service-providers', serviceProviderRoutes);
app.use('/api/v1/mpin', mpinRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/wallet', walletRoutes);


app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})