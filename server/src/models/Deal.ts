import mongoose, { Document, Schema } from 'mongoose';

export interface IDeal extends Document {
    title: string;
    description: string;
    partnerName: string;
    category: string;
    imageUrl: string;
    isLocked: boolean;
    promoCode?: string;
    link: string;
}

const DealSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    partnerName: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    isLocked: { type: Boolean, default: false },
    promoCode: { type: String },
    link: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IDeal>('Deal', DealSchema);
