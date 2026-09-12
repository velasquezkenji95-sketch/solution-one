import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is SOLUTION ONE and what does it do?',
      answer: 'SOLUTION ONE is a global fintech company empowering businesses to accept, process, and settle multi-currency and crypto payments seamlessly across 40+ countries with secure, scalable, and compliant technology.',
    },
    {
      question: 'How is SOLUTION ONE different from other payment gateways?',
      answer: 'SOLUTION ONE offers same-day D0 settlements, native crypto-to-fiat bridge execution, multi-subsidiary processing (WINGSPAY, VFPAY, etc.), and zero hidden cross-border fees.',
    },
    {
      question: "Who can use SOLUTION ONE's services?",
      answer: 'Global e-commerce platforms, crypto exchanges, forex brokers, gaming platforms, and enterprise merchants requiring high-volume payout and global payment gateway capabilities.',
    },
    {
      question: 'What currencies and payment methods are supported?',
      answer: 'SOLUTION ONE support all major currency across the world, QR, Bank transfers, e-wallets, and major cryptocurrencies like USDT, USDC, BTC, ETH.',
    },
    {
      question: 'Does SOLUTION ONE offer payouts as well?',
      answer: 'Yes! SOLUTION ONE Payouts enables instant automated global distributions in 40+ currencies to vendors, contractors, and affiliates globally.',
    },
    {
      question: 'How do merchants integrate with SOLUTION ONE?',
      answer: 'Merchants can integrate effortlessly via RESTful APIs, SDKs, plug-and-play e-commerce plugins, or tailored enterprise custom builds supported by our 24/7 technical team.',
    },
    {
      question: 'How does SOLUTION ONE handle crypto-fiat conversions?',
      answer: 'Our proprietary hybrid bridge enables automatic real-time conversion between local fiat currencies and crypto assets (USDT, BTC, ETH) with zero slippage.',
    },
    {
      question: "What are SOLUTION ONE's child or partner companies?",
      answer: 'SOLUTION ONE operates multiple fintech subsidiaries - including WINGSPAY, WINGSAPP, PAYPAY, COWPAY, VFPAY across multiple currencies and crypto payment gateway division.',
    },
  ];

  return (
    <section id="faq" className="relative w-full bg-[#070913] py-24 border-t border-blue-900/30">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-4">
            <span className="px-4 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 text-cyan-400 text-xs sm:text-sm font-semibold">
              Got Questions?
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Find instant answers to common questions about SOLUTION ONE payment gateway, crypto conversions, and global payouts.
            </p>
          </div>

          {/* Right Column: Accordions */}
          <div className="lg:col-span-8 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-[#0b1226] border border-blue-900/30 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-blue-900/20 transition-colors"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {faq.question}
                    </h3>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                      isOpen ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-2 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-blue-900/30">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
