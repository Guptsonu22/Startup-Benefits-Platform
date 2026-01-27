import { Request, Response } from 'express';
import Deal from '../models/Deal';

export const getDeals = async (req: Request, res: Response) => {
    try {
        const deals = await Deal.find({});
        const safeDeals = deals.map(deal => {
            const dealObj = deal.toObject();
            return {
                ...dealObj,
                promoCode: deal.isLocked ? undefined : deal.promoCode
            };
        });

        res.json(safeDeals);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getDealById = async (req: Request, res: Response) => {
    try {
        const deal = await Deal.findById(req.params.id);
        if (deal) {
            const dealObj = deal.toObject();
            res.json({
                ...dealObj,
                promoCode: deal.isLocked ? undefined : deal.promoCode
            });
        } else {
            res.status(404).json({ message: 'Deal not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createDeal = async (req: Request, res: Response) => {
    try {
        const deal = await Deal.create(req.body);
        res.status(201).json(deal);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
