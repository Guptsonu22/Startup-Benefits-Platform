import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db';
import Deal from './models/Deal';

dotenv.config();

const deals = [
    {
        title: 'AWS Activate',
        description: '$5,000 in AWS Cloud Credits for 2 years. Reliable, scalable, and inexpensive cloud computing services.',
        partnerName: 'AWS',
        category: 'Cloud',
        imageUrl: '/logos/aws.svg',
        isLocked: true,
        promoCode: 'AWS-STARTUP-2025',
        link: 'https://aws.amazon.com/activate/'
    },
    {
        title: 'Notion Plus',
        description: '6 months free of Notion Plus for Verified Startups. Connect your wiki, docs, and projects.',
        partnerName: 'Notion',
        category: 'Productivity',
        imageUrl: '/logos/notion.svg',
        isLocked: false,
        promoCode: 'NOTION-LOVE',
        link: 'https://notion.so/startups'
    },
    {
        title: 'HubSpot for Startups',
        description: '30% off HubSpot Growth Platform. Marketing, sales, and service software that helps your business grow without compromise.',
        partnerName: 'HubSpot',
        category: 'Marketing',
        imageUrl: '/logos/hubspot.svg',
        isLocked: true,
        promoCode: 'HUB-GROWTH',
        link: 'https://hubspot.com/startups'
    },
    {
        title: 'Stripe Atlas',
        description: '50% off Stripe Atlas formation. The easiest way to start an internet business.',
        partnerName: 'Stripe',
        category: 'Finance',
        imageUrl: '/logos/stripe.svg',
        isLocked: true,
        promoCode: 'STRIPE-START',
        link: 'https://stripe.com/atlas'
    },
    {
        title: 'Vercel Pro',
        description: '3 months free of Vercel Pro. Develop. Preview. Ship.',
        partnerName: 'Vercel',
        category: 'DevTools',
        imageUrl: '/logos/vercel.svg',
        isLocked: false,
        promoCode: 'VERCEL-deploy',
        link: 'https://vercel.com/startups'
    }
];

export const seedData = async () => {
    try {
        // connectDB reads process.env, loaded in index.ts
        if (mongoose.connection.readyState === 0) {
            await connectDB();
        }

        console.log('Deleting exisiting deals...');
        await Deal.deleteMany();

        console.log('Inserting new deals...');
        await Deal.insertMany(deals);

        console.log('Data Imported Success!');
    } catch (error) {
        console.error(`Error with data import: ${error}`);
        throw error;
    }
};
