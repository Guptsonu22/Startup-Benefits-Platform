'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Lock, Check, ExternalLink, Loader2 } from 'lucide-react';

export default function DealDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [deal, setDeal] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [claiming, setClaiming] = useState(false);
    const [claimSuccess, setClaimSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDeal = async () => {
            try {
                const { data } = await api.get(`/deals/${id}`);
                setDeal(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchDeal();
    }, [id]);

    const handleClaim = async () => {
        if (!user) {
            router.push('/login');
            return;
        }
        setClaiming(true);
        setError('');
        try {
            const { data } = await api.post('/claims', { dealId: deal._id });
            setClaimSuccess(true);
            if (data.promoCode) {
                setDeal((prev: any) => ({ ...prev, promoCode: data.promoCode }));
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to claim deal');
        } finally {
            setClaiming(false);
        }
    };

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-purple-500" /></div>;
    if (!deal) return <div className="flex justify-center py-20 text-red-500">Deal not found</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-[#111] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black">
                <div className="h-64 bg-gray-800 relative">
                    <img src={deal.imageUrl} alt={deal.partnerName} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                    <div className="absolute bottom-6 left-6">
                        <h1 className="text-4xl font-bold drop-shadow-lg">{deal.title}</h1>
                        <p className="text-xl text-gray-300 drop-shadow-md">{deal.partnerName}</p>
                    </div>
                </div>
                <div className="p-8">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-8">
                        <div className="space-y-6 max-w-2xl flex-1">
                            <div>
                                <h3 className="text-lg font-semibold text-purple-400 mb-2 uppercase tracking-wide">Description</h3>
                                <p className="text-gray-300 leading-relaxed text-lg">{deal.description}</p>
                            </div>

                            {deal.isLocked && (
                                <div className="bg-yellow-500/5 border border-yellow-500/20 p-4 rounded-xl flex items-start gap-3">
                                    <Lock className="text-yellow-500 mt-1 flex-shrink-0" size={20} />
                                    <div>
                                        <h4 className="font-bold text-yellow-500">Locked Deal</h4>
                                        <p className="text-sm text-gray-400">This deal requires startup verification. Please ensure your profile is verified to claim.</p>
                                    </div>
                                </div>
                            )}

                            {claimSuccess ? (
                                <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl animate-in fade-in zoom-in duration-300">
                                    <div className="flex items-center gap-2 text-green-400 font-bold text-xl mb-2">
                                        <Check /> Deal Claimed!
                                    </div>
                                    <p className="text-gray-300 mb-4">You have successfully claimed this deal.</p>
                                    {deal.promoCode && (
                                        <div className="bg-black/40 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between border border-white/10 gap-2">
                                            <span className="text-sm text-gray-400 uppercase tracking-wide">Your Promo Code</span>
                                            <span className="font-mono text-xl font-bold text-white select-all bg-white/10 px-3 py-1 rounded">{deal.promoCode}</span>
                                        </div>
                                    )}
                                    <a href={deal.link} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium">
                                        Go to Partner Site <ExternalLink size={16} />
                                    </a>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {error && <div className="text-red-500 bg-red-500/10 p-4 rounded-lg text-sm border border-red-500/20">{error}</div>}
                                    <button
                                        onClick={handleClaim}
                                        disabled={claiming || (deal.isLocked && user && !user.isVerified)}
                                        className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-xl text-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                                    >
                                        {claiming ? 'Processing...' : (deal.isLocked ? 'Verify & Claim' : 'Claim Deal')}
                                    </button>
                                    {deal.isLocked && user && !user.isVerified && (
                                        <p className="text-sm text-red-500 flex items-center gap-1"><Lock size={12} /> Your account is unverified.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
