import express from 'express';
import { getDeals, getDealById, createDeal } from '../controllers/dealController';

const router = express.Router();

router.get('/', getDeals);
router.get('/:id', getDealById);
router.post('/', createDeal);

export default router;
