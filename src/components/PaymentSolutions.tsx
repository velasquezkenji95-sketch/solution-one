import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, Cpu, Globe2, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import atomArt from '../assets/payatom-ref/Atom.d12a4e49.webp';
import ballArt from '../assets/payatom-ref/Ball.9ae2d805.webp';

const solutionCards = [
  {
    title: 'Online Payments',
    desc: 'Effortlessly and securely handle and enhance a diverse array of comprehensive payment solutions.',
    icon: Globe2,
    tall: true,
  },
  {
    title: 'Smart Routing',
    desc: 'Select from a variety of routing choices that allow you to dynamically switch transactions, ensuring a high rate of success.',
    icon: Cpu,
    tall: false,
  },
  {
    title: 'Unified Commerce',
    desc: 'Enhance precision by minimizing errors through a unified commerce infrastructure that guarantees accuracy and transparency.',
    icon: Layers,
    tall: false,
  },
  {
    title: 'Web Payments',
    desc: 'Improved browser compatibility for seamless end-to-end digitization of payments across a range of online options.',
    icon: ShieldCheck,
    tall: false,
  },
];

type SecuredCardConfig = {
  title: string;
  desc: string;
  image?: string;
  className: string;
  imageClassName?: string;
  imageStyle?: React.CSSProperties;
};

const securedCards: SecuredCardConfig[] = [
  {
    title: 'Extensive Reporting',
    desc: 'Efficiently oversee your daily operations with one-click, same-day payment gateway settlements deposited directly into your bank account.',
    image: atomArt,
    className: 'min-h-[520px] md:min-h-[653px]',
    imageClassName: 'absolute -bottom-2 left-1/2 w-[112%] max-w-none -translate-x-1/2',
    imageStyle: { filter: 'hue-rotate(-76deg) saturate(1.35) brightness(1.08)' },
  },
  {
    title: 'Risk Mitigation',
    desc: 'Efficiently oversee your daily operations with one-click, same-day payment gateway settlements deposited directly into your bank account.',
    className: 'min-h-[170px]',
  },
  {
    title: 'Cutting-Edge Tech',
    desc: 'Efficiently oversee your daily operations with one-click, same-day payment gateway settlements deposited directly into your bank account.',
    image: ballArt,
    className: 'min-h-[520px] md:min-h-[653px]',
    imageClassName: 'absolute -bottom-16 left-1/2 w-[116%] max-w-none -translate-x-1/2',
    imageStyle: { filter: 'hue-rotate(-76deg) saturate(1.35) brightness(1.08)' },
  },
  {
    title: 'Rapid Settlement',
    desc: 'Efficiently oversee your daily operations with one-click, same-day payment gateway settlements deposited directly into your bank account.',
    className: 'min-h-[170px]',
  },
];

const journeyCards = [
  {
    year: '2015',
    title: 'Foundation in Malaysia',
    desc: 'Established SOLUTION ONE in Malaysia to pioneer next-gen payment infrastructure for digital enterprises.',
    icon: Building2,
  },
  {
    year: '2020',
    title: 'Global Payment Gateway Launch',
    desc: 'Launched full-scale PAYPAY Payment Gateway platform. Added support for UPI India UPI network. Reached 500+ active merchants using SOLUTION ONE product in India.',
    icon: Layers,
  },
  {
    year: '2022',
    title: '$1 Billion Processed & Crypto Integration',
    desc: 'Crossed $1 billion+ USD in total processing volume. Launched VFpay, enabling crypto-to-fiat merchant payments. Onboarded international clients to fully support in SEA/pacific regions.',
    icon: Cpu,
  },
  {
    year: '2024',
    title: 'Global Partnerships',
    desc: 'Established partnerships with leading liquidity providers and financial institutions across 40+ countries. Upgraded infrastructure for high-volume enterprise processing. Crossed $2 billion+ USD in single year processing volume.',
    icon: Sparkles,
  },
];

const SecuredCard: React.FC<{ card: SecuredCardConfig; index: number }> = ({ card, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 26 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -18 }}
    transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    className={`relative overflow-hidden rounded-lg bg-[linear-gradient(180deg,#06184b_0%,#123daa_48%,#347fff_100%)] p-5 text-white shadow-[0_22px_50px_rgba(6,24,75,0.16)] ${card.className}`}
  >
    <div className="relative z-10 max-w-[330px]">
      <h2 className="text-[clamp(1.35rem,2vw,1.65rem)] font-medium leading-none tracking-normal">
        {card.title}
      </h2>
      <p className="mt-4 text-[clamp(1rem,1.55vw,1.15rem)] font-semibold leading-tight text-white">
        {card.desc}
      </p>
    </div>
    {card.image && (
      <motion.img
        src={card.image}
        alt=""
                          aria-hidden="true"
                          className={card.imageClassName}
                          style={card.imageStyle}
                          animate={{ y: [0, -10, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    )}
  </motion.div>
);

export const PaymentSolutions: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'360' | 'Secured'>('360');

  return (
    <section id="about" className="relative w-full overflow-hidden bg-[#faf7f2] text-[#0b2d86]">
      <div className="relative z-10 h-full w-full max-md:-mt-[18%]">
        <div className="mx-auto flex w-full max-w-[860px] flex-col items-center gap-5 px-5 pb-20 max-md:min-h-screen">
          <h1 className="text-3xl font-semibold tracking-normal md:text-4xl lg:text-6xl">
            Payment solutions
          </h1>

          <div className="flex gap-2">
            {(['360', 'Secured'] as const).map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`group flex cursor-pointer items-center gap-2 rounded-full border px-5 py-1 transition-colors ${
                  activeCategory === category
                    ? 'border-[#082f91] bg-[#082f91] text-white'
                    : 'border-[#082f91] text-[#082f91]'
                }`}
              >
                <span
                  className={`size-2 rounded-full transition-all ${
                    activeCategory === category ? 'bg-white' : 'bg-transparent ring-1 ring-[#082f91] group-hover:bg-[#082f91]'
                  }`}
                />
                <span className="text-base font-medium tracking-normal lg:text-2xl">
                  {category === '360' ? '360 Degree' : 'Secured'}
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35 }}
              className="flex w-full flex-col items-center justify-center gap-5"
            >
              {activeCategory === '360' ? (
                <div className="grid h-fit w-full grid-cols-1 gap-4 md:grid-cols-2">
                  {solutionCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                      <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: index * 0.08 }}
                        viewport={{ once: true, amount: 0.35 }}
                        className={`relative flex min-h-[210px] flex-col justify-between gap-2 overflow-hidden rounded-lg text-white ${
                          card.tall ? 'md:row-span-2 md:min-h-[440px]' : ''
                        }`}
                        style={{ backgroundImage: 'linear-gradient(180deg, #063cbb, #62c8ff)' }}
                      >
                        <div className="z-10 flex flex-col gap-2 p-5">
                          <Icon className="mb-2 h-8 w-8" />
                          <h2 className="text-2xl font-medium">{card.title}</h2>
                          <p className="text-lg font-medium leading-tight">{card.desc}</p>
                        </div>
                        {card.tall && (
                          <div className="relative mt-10 h-32 w-full">
                            {[0, 1, 2, 3].map((ball) => (
                              <motion.div
                                key={ball}
                                animate={{ x: ['50%', '35%', '50%'], y: ['-20%', '-30%', '-20%'] }}
                                transition={{ duration: 3.2 + ball * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute h-32 w-32 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffffff,#60d5ff_35%,#063cbb_75%)]"
                                style={{ left: `${ball * 12}%`, zIndex: 4 - ball, filter: `blur(${ball * 3}px)` }}
                              />
                            ))}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-4">
                    {[securedCards[0], securedCards[3]].map((card, index) => (
                      <SecuredCard key={card.title} card={card} index={index} />
                    ))}
                  </div>
                  <div className="flex flex-col gap-4">
                    {[securedCards[1], securedCards[2]].map((card, index) => (
                      <SecuredCard key={card.title} card={card} index={index + 1} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative bg-[#071036] px-5 py-24 text-white md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.18),transparent_42%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-normal sm:text-5xl md:text-6xl">
              Global Payment Built for Modern Business
            </h2>
            <p className="mt-4 text-base leading-relaxed text-blue-100 sm:text-lg md:text-xl">
              Use SOLUTION to pay in & out with vendors in 40+ countries without hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {journeyCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-b from-[#0f4fdb] to-[#5ccfff] p-5"
                >
                  <div className="absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-white/15 blur-md" />
                  <div className="relative">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="text-4xl font-black">{card.year}</span>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-medium leading-tight">{card.title}</h3>
                    <p className="mt-3 text-base font-medium leading-tight text-blue-50">{card.desc}</p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-2 text-sm font-medium">
                    <Sparkles className="h-4 w-4" />
                    <span>SOLUTION ONE Milestone</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
