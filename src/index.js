import express from 'express';
import 'dotenv/config'
import connectToDb from './config/db.js';
import infoMiddleware from './middlewares/infoMiddleware.js';
import authRoutes from './routes/auth.js';

const PORT = process.env.PORT;
const app = express();
connectToDb();


app.use(express.json());
app.use(infoMiddleware);


app.get('/api/v1/health' , (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Server is running'
  })
})
app.use('/api/v1/auth' , authRoutes);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})