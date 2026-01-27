import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '../components/Providers';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Startup Benefits - SaaS Deals',
  description: 'Exclusive deals for startups and indie hackers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0A0A0A] text-white min-h-screen antialiased selection:bg-purple-500/30 overflow-x-hidden`}>
        <Providers>
          <Navbar />
          <main className="min-h-[calc(100vh-64px)] relative">
            {/* Background ambient glow */}
            <div className="fixed inset-0 z-[-1] pointer-events-none">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
            </div>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
