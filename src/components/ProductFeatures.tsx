import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ArrowRightLeft, Coins, CreditCard, Send, ShieldCheck } from 'lucide-react';
import atomArt from '../assets/payatom-ref/Artboard.2edc3722.png';
import logo from '../assets/Solution 1 Logo.png';
import { useAnimationPlayback } from '../lib/useAnimationPlayback';

const features = [
  {
    id: 1,
    kicker: 'SOLUTION ONE',
    title: 'Unified Payment Gateway',
    desc: 'Unified payment gateway for global merchants to accept payments any currency.',
    icon: CreditCard,
    stats: ['Any currency', 'Global merchants'],
  },
  {
    id: 2,
    kicker: 'Crypto Ready',
    title: 'Crypto Payment Gateway',
    desc: 'Accept and process cryptocurrency payments (USDT, BTC, ETH, etc.) globally.',
    icon: Coins,
    stats: ['USDT', 'BTC / ETH'],
  },
  {
    id: 3,
    kicker: 'Payout Network',
    title: 'SOLUTION ONE Payouts',
    desc: 'Instant payout infrastructure for businesses to distribute funds globally in any currencies you like.',
    icon: Send,
    stats: ['Instant rails', '40+ countries'],
  },
  {
    id: 4,
    kicker: 'Hybrid Settlement',
    title: 'Fiat-Crypto Settlement',
    desc: 'A hybrid solution allowing merchants to accept fiat and instantly convert local currencies to crypto.',
    icon: ArrowRightLeft,
    stats: ['Fiat to crypto', 'Real-time conversion'],
  },
  {
    id: 5,
    kicker: 'Enterprise',
    title: 'Enterprise Solutions',
    desc: 'Custom integrations, high-volume processing, 24x7 support.',
    icon: ShieldCheck,
    stats: ['Custom API', '24x7 support'],
  },
];

export const ProductFeatures: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const artworkPlaying = useAnimationPlayback(artworkRef);
  const scrollIndex = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const visibleFeatures = features.slice(0, activeIndex + 1);
  const displayIndex = Math.min(hoverIndex ?? activeIndex, visibleFeatures.length - 1);
  const activeFeature = features[displayIndex];
  const ActiveIcon = activeFeature.icon;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const previewY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);
  const previewRotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const glowX = useTransform(scrollYProgress, [0, 1], ['-18%', '18%']);
  const coinY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const phoneY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextIndex = Math.min(features.length - 1, Math.max(0, Math.floor(latest * features.length)));
    if (scrollIndex.current !== nextIndex) {
      scrollIndex.current = nextIndex;
      setActiveIndex(nextIndex);
    }
  });

  return (
    <section ref={sectionRef} id="products" style={{ overflowAnchor: 'none' }} className="relative z-20 h-[520svh] w-full bg-[#faf7f2] text-[#0f46d9]">
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-[#faf7f2] px-5 pt-[14svh] md:px-10">
        <h2 className="text-[clamp(2.4rem,4.5vw,5rem)] font-semibold leading-none tracking-tight">
          Product Features
        </h2>

        <div className="mt-[9svh] grid h-[58svh] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1px_0.86fr] lg:gap-16">
          <div ref={artworkRef} data-home-feature-artwork data-animation-playing={artworkPlaying} className="relative hidden h-full items-center justify-center overflow-visible lg:flex">
            <motion.div
              style={{ y: previewY, rotate: previewRotate, willChange: artworkPlaying ? 'transform' : 'auto' }}
              className="relative aspect-[1.58] w-[min(34vw,520px)] overflow-hidden rounded-lg bg-gradient-to-br from-[#77b9ff] via-[#2c74ff] to-[#0a2b9c] shadow-[0_36px_110px_rgba(15,70,217,0.24)]"
            >
              <motion.div style={{ x: glowX }} className="absolute inset-y-0 left-1/4 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)]" />
              <motion.img
                src={atomArt}
                alt=""
                animate={artworkPlaying ? { rotate: [0, 8, 0], scale: [1, 1.05, 1] } : { rotate: 0, scale: 1 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-10 -top-20 w-[58%] opacity-55 saturate-150 hue-rotate-[190deg]"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.55),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(0,13,64,0.24))]" />
              <img src={logo} alt="Solution One" className="absolute bottom-8 left-7 w-56 max-w-[48%] brightness-0 invert" />
              <div className="absolute bottom-8 right-8 flex size-16 items-center justify-center rounded-full bg-white/18 text-white">
                <ActiveIcon className="size-8" />
              </div>
            </motion.div>

            <motion.div
              style={{ y: coinY }}
              className="absolute left-[7%] top-[8%] flex size-36 items-center justify-center rounded-lg bg-[#a8ceff] shadow-[0_22px_70px_rgba(15,70,217,0.18)]"
            >
              <div className="flex size-24 items-center justify-center rounded-full bg-[radial-gradient(circle_at_28%_24%,#ffffff,#d9ebff_36%,#2d76ff_78%)] text-5xl font-bold text-[#2b74ff] shadow-inner">
                $
              </div>
            </motion.div>

            <motion.div
              key={displayIndex}
              initial={{ opacity: 0, scale: 0.94, x: 28 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="absolute bottom-[6%] right-[9%] w-[min(22vw,300px)] rounded-lg bg-white p-5 shadow-[0_30px_80px_rgba(15,70,217,0.16)]"
            >
              <div className="mb-5 flex items-center gap-2 rounded-full bg-slate-100 px-4 py-3 text-sm text-slate-400">
                <span className="size-2 rounded-full bg-[#0f46d9]" />
                <span>Route details</span>
              </div>
              {activeFeature.stats.map((stat) => (
                <div key={stat} className="flex items-center justify-between border-t border-blue-100 py-3 text-slate-800">
                  <span className="font-medium">{stat}</span>
                  <span className="size-4 rounded-full border border-[#0f46d9]" />
                </div>
              ))}
            </motion.div>

            <motion.div
              style={{ y: phoneY }}
              className="absolute right-[3%] top-[2%] flex h-48 w-36 flex-col items-center justify-center rounded-lg bg-[#d8fff0] shadow-[0_24px_75px_rgba(15,70,217,0.12)]"
            >
              <div className="h-32 w-16 rounded-[20px] border-[5px] border-[#071335] bg-[#f8fbff] p-1 shadow-xl">
                <div className="mb-2 h-9 rounded-xl bg-[#071335]" />
                <div className="space-y-1.5">
                  <div className="h-2 rounded-full bg-[#2b74ff]" />
                  <div className="h-2 rounded-full bg-[#8acbff]" />
                  <div className="h-2 rounded-full bg-[#2b74ff]/50" />
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={artworkPlaying ? { y: [-5, 5, -5] } : { y: 0 }}
              transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-[12%] bottom-[5%] rounded-lg bg-[#15243b] px-7 py-8 text-white shadow-[0_24px_80px_rgba(15,70,217,0.2)]"
            >
              <p className="text-lg font-semibold">Transfer</p>
              <p className="mt-10 text-2xl font-bold">$ 23,719.92</p>
            </motion.div>
          </div>

          <div className="hidden h-[78%] w-px bg-blue-300/70 lg:block" />

          <div className="flex max-h-full flex-col overflow-y-auto overscroll-contain lg:justify-center">
            <AnimatePresence initial={false}>
            {visibleFeatures.map((item, index) => {
              const isOpen = displayIndex === index;
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 28 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onFocus={() => setHoverIndex(index)}
                  onBlur={() => setHoverIndex(null)}
                  onClick={() => setHoverIndex(index)}
                  className="group shrink-0 border-t border-blue-300 py-2 text-left transition-colors last:border-b lg:py-4"
                >
                  <div className="flex items-start gap-3 lg:gap-5">
                    <div className={`mt-1 flex h-7 w-10 shrink-0 items-center justify-evenly rounded-full border text-sm transition-colors lg:w-14 ${isOpen ? 'border-[#0f46d9] bg-[#0f46d9] text-white' : 'border-[#0f46d9] text-[#0f46d9]'}`}>
                      <span className={`size-2 rounded-full ${isOpen ? 'bg-white' : 'bg-[#0f46d9]'}`} />
                      <span>{item.id}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-normal lg:text-xs">{item.kicker}</p>
                      <h3 className={`text-lg font-medium leading-tight tracking-normal transition-opacity lg:text-2xl ${isOpen ? 'opacity-100' : 'opacity-55 group-hover:opacity-100'}`}>
                        {item.title}
                      </h3>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.p
                            initial={{ height: 0, opacity: 0, y: -8 }}
                            animate={{ height: 'auto', opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                            className="mt-2 overflow-hidden text-sm leading-snug text-[#0b2d86] lg:mt-3 lg:text-base"
                          >
                            {item.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <Icon className={`mt-1 size-6 shrink-0 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-45'}`} />
                  </div>
                </motion.button>
              );
            })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
