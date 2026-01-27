import mongoose, { Document, Schema } from 'mongoose';

export interface IClaim extends Document {
    user: mongoose.Types.ObjectId;
    deal: mongoose.Types.ObjectId;
    status: 'pending' | 'approved' | 'rejected';
}

const ClaimSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deal: { type: Schema.Types.ObjectId, ref: 'Deal', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

ClaimSchema.index({ user: 1, deal: 1 }, { unique: true });

export default mongoose.model<IClaim>('Claim', ClaimSchema);
