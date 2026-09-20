import React, { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Check, ChevronDown, Cpu, CreditCard, Users } from 'lucide-react';
import atomArt from '../assets/payatom-ref/Artboard.2edc3722.png';
import logo from '../assets/Solution 1 Logo.png';
import { useAnimationPlayback } from '../lib/useAnimationPlayback';

const features = [
  {
    id: 1,
    accent: '#0f46d9',
    kicker: '01 / GLOBAL PAYMENTS',
    title: 'Global Payment Solutions',
    services: ['Global Payin', 'Global Payout', 'Local Payment Methods', 'QR / Bank Transfer / E-Wallet', 'Multi-Currency Settlement', 'Unified API Integration'],
    icon: CreditCard,
    stats: ['Global Payin', 'Global Payout'],
  },
  {
    id: 2,
    accent: '#087b70',
    kicker: '02 / TECHNOLOGY',
    title: 'Payment Technology & Infrastructure',
    services: ['Payment Platform Solutions', 'Custom Payment System Development', 'Wallet & Payment Integration', 'Telegram Bot Development', 'Server & Cloud Infrastructure', 'Custom Technology Solutions'],
    icon: Cpu,
    stats: ['Payment Platforms', 'Custom Technology'],
  },
  {
    id: 3,
    accent: '#6346c7',
    kicker: '03 / CUSTOMER OPERATIONS',
    title: 'Multilingual Customer Operations',
    services: ['Multilingual Customer Support', 'Recruitment & Staffing', 'Training', 'Remote Customer Service Teams', 'Quality Management', 'Workforce Management'],
    icon: Users,
    stats: ['Multilingual Support', 'Workforce Management'],
  },
];

export const ProductFeatures: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const artworkPlaying = useAnimationPlayback(artworkRef) && !reducedMotion;
  const scrollIndex = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const visibleFeatures = reducedMotion ? features : features.slice(0, activeIndex + 1);
  const displayIndex = Math.min(selectedIndex ?? activeIndex, visibleFeatures.length - 1);
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
      setSelectedIndex(null);
    }
  });

  return (
    <section ref={sectionRef} id="products" style={{ overflowAnchor: 'none' }} className="relative z-20 h-[200svh] w-full bg-[#faf7f2] text-[#0f46d9]">
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
              className="absolute bottom-[6%] right-[9%] w-[min(22vw,300px)] rounded-lg bg-white p-5 shadow-[0_30px_80px_rgba(15,70,217,0.16)]"
            >
              <div className="mb-5 flex items-center gap-2 rounded-full bg-slate-100 px-4 py-3 text-sm text-slate-400">
                <span className="size-2 rounded-full bg-[#0f46d9]" />
                <span>Service overview</span>
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

          <div className="home-feature-list flex max-h-full flex-col overflow-y-auto">
            {visibleFeatures.map((item, index) => {
              const isOpen = displayIndex === index;
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.id}
                  layout={reducedMotion ? false : 'position'}
                  initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                  style={{ '--feature-accent': item.accent } as React.CSSProperties}
                  className={`home-feature-row group shrink-0 ${isOpen ? 'is-open' : ''}`}
                >
                  <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`home-feature-services-${item.id}`}
                    onFocus={() => setSelectedIndex(index)}
                    onClick={() => setSelectedIndex(index)}
                    className="home-feature-trigger"
                  >
                    <span className="home-feature-icon"><Icon size={22} aria-hidden="true" /></span>
                    <div className="min-w-0 flex-1">
                      <span className="home-feature-kicker">{item.kicker}</span>
                      <span className="home-feature-title">
                        {item.title}
                      </span>
                    </div>
                    <ChevronDown className="home-feature-chevron" size={18} aria-hidden="true" />
                  </button>
                  </h3>
                        {isOpen && (
                          <motion.ul
                            id={`home-feature-services-${item.id}`}
                            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: reducedMotion ? 0 : 0.2 }}
                            className="home-feature-services"
                          >
                            {item.services.map(service => <li key={service}><Check size={14} aria-hidden="true" /><span>{service}</span></li>)}
                          </motion.ul>
                        )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
