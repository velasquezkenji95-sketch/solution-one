import React from 'react';
import { Logo } from './Logo';
import { Send } from 'lucide-react';
import { navigateTo, navigateToHash, pagePathname } from '../lib/routing';

export const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    if (id === 'products') {
      navigateTo('/products');
      return;
    }
    if (id === 'unify') {
      navigateTo('/solutions');
      return;
    }
    if (id === 'about') {
      navigateTo('/about');
      return;
    }
    if (id === 'why-us') {
      navigateTo('/why-us');
      return;
    }
    if (id === 'contact') {
      navigateTo('/contact');
      return;
    }
    if (pagePathname() !== '/') {
      navigateToHash(id);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#04060d] text-slate-300 pt-20 pb-12 overflow-hidden border-t border-blue-900/30">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-6">
            <Logo />
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              SOLUTION ONE is the leading international payment provider powering multi-currency acceptance, instant crypto-fiat settlement, and automated payout infrastructure across Asia pacific, North America, South America, Europe.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-500/30 text-cyan-400 text-xs font-semibold">
              <span>HQ: Malaysia</span>
              <span>/</span>
              <span>40+ Global Coverage</span>
            </div>
          </div>

          {/* Quick Links Column 1: Company */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-base tracking-tight">Company</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => navigateTo('/technology')} className="hover:text-cyan-400 transition-colors cursor-pointer">TECHNOLOGY</button>
              </li>
              <li>
                <button onClick={() => navigateTo('/operations')} className="hover:text-cyan-400 transition-colors cursor-pointer">OPERATIONS</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('products')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  PAYMENT
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('unify')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  PAYMENT SOLUTIONS
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('why-us')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Why Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2: Follow Us (3 Telegram Buttons strictly) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-white font-bold text-base tracking-tight">Follow Us</h4>
            <p className="text-xs text-slate-400">Telegram account details will be connected before launch.</p>
            
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="flex items-center justify-between p-3 rounded-xl bg-[#0b1226] border border-blue-500/30 hover:border-cyan-400 text-sm text-slate-200 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Send className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">Telegram Channel</span>
                </div>
                <span className="text-xs text-cyan-400">Coming soon</span>
              </button>

              <button
                type="button"
                className="flex items-center justify-between p-3 rounded-xl bg-[#0b1226] border border-blue-500/30 hover:border-cyan-400 text-sm text-slate-200 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Send className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">Telegram Community</span>
                </div>
                <span className="text-xs text-cyan-400">Coming soon</span>
              </button>

              <button
                type="button"
                className="flex items-center justify-between p-3 rounded-xl bg-[#0b1226] border border-blue-500/30 hover:border-cyan-400 text-sm text-slate-200 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Send className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">Telegram 24/7 Support</span>
                </div>
                <span className="text-xs text-cyan-400">Coming soon</span>
              </button>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-900/50 to-transparent my-8" />

        {/* Giant Watermark Background Text */}
        <div className="w-full select-none py-10 my-4 opacity-10 text-center">
          <h1 className="text-[clamp(4.5rem,10vw,10rem)] font-black tracking-[0.12em] text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-transparent leading-[1.05] break-words">
            SOLUTION ONE
          </h1>
        </div>

        {/* Copyright Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-slate-400">
          <p>Copyright © 2026 SOLUTION ONE. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Region Coverage: Asia pacific, North America, South America, Europe</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
