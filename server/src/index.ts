import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
// Routes
import authRoutes from './routes/authRoutes';
import dealRoutes from './routes/dealRoutes';
import claimRoutes from './routes/claimRoutes';
import seedRoutes from './routes/seedRoutes';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Startup Benefits Platform API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/seed', seedRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
