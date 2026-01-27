import { Response } from 'express';
import Claim from '../models/Claim';
import Deal from '../models/Deal';
import { AuthRequest } from '../middleware/authMiddleware';

export const createClaim = async (req: AuthRequest, res: Response) => {
    try {
        const { dealId } = req.body;
        const deal = await Deal.findById(dealId);

        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }

        if (deal.isLocked && !req.user.isVerified) {
            return res.status(403).json({ message: 'User not verified for this deal' });
        }

        const claimExists = await Claim.findOne({ user: req.user._id, deal: dealId });
        if (claimExists) {
            return res.status(400).json({ message: 'Deal already claimed' });
        }

        const claim = await Claim.create({
            user: req.user._id,
            deal: dealId,
            status: 'approved'
        });

        // Return the promo code in the response since they just claimed it
        res.status(201).json({
            ...claim.toObject(),
            promoCode: deal.promoCode
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getMyClaims = async (req: AuthRequest, res: Response) => {
    try {
        const claims = await Claim.find({ user: req.user._id }).populate('deal');
        res.json(claims);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
