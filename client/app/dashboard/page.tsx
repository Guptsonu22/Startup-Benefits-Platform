'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
    const { user } = useAuth();
    const [claims, setClaims] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const { data } = await api.get('/claims/my-claims');
                setClaims(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchClaims();
    }, []);

    if (loading) return <div className="flex justify-center pt-20"><Loader2 className="animate-spin text-purple-500" /></div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-400 mb-8">Manage your startup profile and benefits.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="bg-[#111] p-6 rounded-2xl border border-white/10 h-fit">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold mb-4">
                        {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>
                    <p className="text-gray-400 text-sm mb-6">{user?.email}</p>

                    <div className="space-y-4">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <span className="text-xs text-gray-500 uppercase tracking-widest block mb-2">Verification Status</span>
                            {user?.isVerified ? (
                                <span className="inline-flex items-center gap-2 text-green-400 font-bold">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div> VERIFIED
                                </span>
                            ) : (
                                <div>
                                    <span className="inline-flex items-center gap-2 text-yellow-400 font-bold mb-2">
                                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div> PENDING
                                    </span>
                                    <p className="text-xs text-gray-500 mb-3">Contact support to verify your startup eligibility for locked deals.</p>
                                    <button
                                        onClick={async () => {
                                            try {
                                                await api.post('/auth/verify');
                                                window.location.reload();
                                            } catch (e) { alert('Verification failed'); }
                                        }}
                                        className="w-full text-xs bg-white/10 hover:bg-white/20 text-white py-2 rounded transition-colors"
                                    >
                                        Verify Me (Demo)
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Claims */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Zap className="text-purple-500" /> Claimed Benefits
                    </h2>
                    {claims.length === 0 ? (
                        <div className="bg-[#111] p-12 rounded-2xl border border-white/10 text-center">
                            <p className="text-gray-500 mb-4">You haven’t claimed any benefits yet.</p>
                            <Link href="/deals" className="inline-block px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors">
                                Browse Deals
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {claims.map((claim) => {
                                if (!claim.deal) return null;
                                return (
                                    <div key={claim._id} className="bg-[#111] p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row items-center gap-4 group">
                                        <div className="w-full sm:w-16 h-16 bg-white/5 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                                            <img src={claim.deal.imageUrl} alt="" className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1 text-center sm:text-left">
                                            <h3 className="font-bold text-lg">{claim.deal.title}</h3>
                                            <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-sm text-gray-400">
                                                <span>{claim.deal.partnerName}</span>
                                                <span className="hidden sm:inline text-gray-600">•</span>
                                                <span>Claimed on: {new Date(claim.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center sm:items-end gap-2">
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${claim.status === 'approved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                claim.status === 'rejected' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                                    'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                                }`}>
                                                {claim.status}
                                            </span>
                                            <Link href={`/deals/${claim.deal._id}`} className="text-sm text-purple-400 hover:text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
