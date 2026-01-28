
import mongoose from 'mongoose';
import User from './models/User';
import dotenv from 'dotenv';
dotenv.config();

const checkUser = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/startup-benefits');
        console.log('Connected to DB');

        const email = 'sonugupta411093@gmail.com';
        const user = await User.findOne({ email });

        if (user) {
            console.log('User found:', user.email);
            console.log('Is Verified:', user.isVerified);
            console.log('Password hash length:', user.password?.length);
        } else {
            console.log('User NOT found:', email);
        }
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkUser();
