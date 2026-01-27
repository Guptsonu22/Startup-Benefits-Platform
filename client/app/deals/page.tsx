'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Search } from 'lucide-react';

interface Deal {
    _id: string;
    title: string;
    description: string;
    partnerName: string;
    category: string;
    imageUrl: string;
    isLocked: boolean;
}

export default function DealsPage() {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const { data } = await api.get('/deals');
                setDeals(data);
                setFilteredDeals(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDeals();
    }, []);

    useEffect(() => {
        let result = deals;
        if (search) {
            result = result.filter(deal =>
                deal.title.toLowerCase().includes(search.toLowerCase()) ||
                deal.partnerName.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (filter !== 'All') {
            result = result.filter(deal => deal.category === filter);
        }
        setFilteredDeals(result);
    }, [search, filter, deals]);

    const categories = ['All', ...Array.from(new Set(deals.map(d => d.category)))];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-8">Available Deals</h1>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search deals..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-600"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === cat ? 'bg-white text-black' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="text-center py-20 text-gray-500">Loading deals...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDeals.length > 0 ? filteredDeals.map((deal, i) => (
                        <motion.div
                            key={deal._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            className="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/50 transition-all flex flex-col h-full shadow-lg hover:shadow-purple-500/10"
                        >
                            <div className="h-40 w-full relative flex items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-black">
                                <div className={`relative w-32 h-32 transition-all duration-500 ${deal.isLocked ? 'grayscale opacity-50' : 'group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]'}`}>
                                    <img src={deal.imageUrl} alt={deal.partnerName} className="w-full h-full object-contain" />
                                </div>
                                {deal.isLocked && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                                        <div className="bg-black/80 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border border-white/10 shadow-xl">
                                            <Lock size={12} className="text-yellow-500" /> Verification Required
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-6 flex flex-col flex-1 border-t border-white/5">
                                <div className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">{deal.partnerName}</div>
                                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">{deal.title}</h3>
                                <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-1 leading-relaxed">{deal.description}</p>
                                <Link
                                    href={`/deals/${deal._id}`}
                                    className="group/btn inline-flex items-center justify-center w-full text-center bg-white/5 hover:bg-white text-white hover:text-black font-medium py-3 rounded-lg transition-all border border-white/10"
                                >
                                    View Details
                                    <svg className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                    )) : (
                        <div className="col-span-full text-center py-20 text-gray-500">No deals found matching your criteria.</div>
                    )}
                </div>
            )}
        </div>
    );
}
