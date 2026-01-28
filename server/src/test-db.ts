
import mongoose from 'mongoose';

const mongoURI = 'mongodb://127.0.0.1:27017/startup-benefits';

console.log('Attempting to connect to MongoDB at:', mongoURI);

mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log('SUCCESS: Connected to MongoDB');
        process.exit(0);
    })
    .catch((err) => {
        console.error('ERROR: Could not connect to MongoDB');
        console.error(err);
        process.exit(1);
    });
