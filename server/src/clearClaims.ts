import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db';
import Claim from './models/Claim';

dotenv.config();

const clearClaims = async () => {
    try {
        await connectDB();
        console.log('Clearing all claims...');
        await Claim.deleteMany();
        console.log('All claims cleared.');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

clearClaims();
