import express from 'express';
import { seedData } from '../seed';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await seedData();
        res.status(200).json({ message: 'Database seeded successfully!' });
    } catch (error: any) {
        res.status(500).json({ message: 'Seeding failed', error: error.message });
    }
});

export default router;
