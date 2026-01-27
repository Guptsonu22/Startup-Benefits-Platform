'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            StartBen
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link href="/deals" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/5">
                                    Deals
                                </Link>
                                {user && (
                                    <Link href="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/5">
                                        Dashboard
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6 space-x-4">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">{user.name}</span>
                                    <button onClick={logout} className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link href="/login" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Log In</Link>
                                    <Link href="/register" className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-all hover:scale-105">
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
