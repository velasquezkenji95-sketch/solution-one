import React, { useCallback, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Lottie, type LottieHandle } from 'lottie-react';
import { Landmark, WalletCards, Coins, Send, Globe2 } from 'lucide-react';
import networkAnimation from '../assets/payatom-network-lottie.json';

const cards = [
  { title: 'Unified Gateway', eyebrow: 'Payment Gateway', desc: 'Accept all global payment methods seamlessly.', icon: WalletCards },
  { title: 'Crypto Gateway', eyebrow: 'Crypto Ready', desc: 'USDT, BTC, ETH multi-asset engine.', icon: Coins },
  { title: 'Instant Payouts', eyebrow: 'Payouts', desc: 'Global vendor and affiliate distributions.', icon: Send },
  { title: 'Same-Day settlement', eyebrow: 'Settlement', desc: 'Get paid on the same day D0, much faster than the standard T1 in the industry.', icon: Landmark },
  { title: 'Custom API', eyebrow: 'Enterprise', desc: 'High-volume 24x7 support infrastructure.', icon: Globe2 },
];

export const UnifyCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLElement>(null);
  const animationRef = useRef<LottieHandle | null>(null);
  const networkVisible = useInView(networkRef, { amount: 0.05 });
  const reducedMotion = useReducedMotion();

  const syncPlayback = useCallback(() => {
    if (reducedMotion) {
      animationRef.current?.pause();
      animationRef.current?.seek({ percent: 100 });
    } else if (networkVisible && !document.hidden) animationRef.current?.play();
    else animationRef.current?.pause();
  }, [networkVisible, reducedMotion]);

  useEffect(() => {
    syncPlayback();
    document.addEventListener('visibilitychange', syncPlayback);
    return () => document.removeEventListener('visibilitychange', syncPlayback);
  }, [syncPlayback]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 20%', 'end 80%'],
  });

  const textScale = useTransform(scrollYProgress, [0, 0.72], [1.8, 0.25]);
  const textY = useTransform(scrollYProgress, [0, 0.72], ['-2.5rem', '0rem']);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.16, 0.28], [0, 0, 1]);
  const card1X = useTransform(scrollYProgress, [0.12, 0.72], ['-120%', '0rem']);
  const card1Y = useTransform(scrollYProgress, [0.12, 0.72], ['-50%', '0rem']);
  const card2X = useTransform(scrollYProgress, [0.12, 0.72], ['-130%', '0rem']);
  const card2Y = useTransform(scrollYProgress, [0.12, 0.72], ['-5%', '0rem']);
  const card3X = useTransform(scrollYProgress, [0.12, 0.72], ['-70%', '0rem']);
  const card3Y = useTransform(scrollYProgress, [0.12, 0.72], ['60%', '0rem']);
  const card4X = useTransform(scrollYProgress, [0.12, 0.72], ['50%', '0rem']);
  const card4Y = useTransform(scrollYProgress, [0.12, 0.72], ['-70%', '0rem']);
  const card5X = useTransform(scrollYProgress, [0.12, 0.72], ['110%', '0rem']);
  const card5Y = useTransform(scrollYProgress, [0.12, 0.72], ['28%', '0rem']);
  const positions = [
    [card1X, card1Y],
    [card2X, card2Y],
    [card3X, card3Y],
    [card4X, card4Y],
    [card5X, card5Y],
  ];

  return (
    <div id="unify" className="relative w-full bg-[#faf7f2] text-[#2563eb]">
      <section ref={networkRef} className="relative w-full min-h-screen overflow-hidden px-5 pt-20 pb-14">
        <h2 className="relative z-10 text-[clamp(2.2rem,4.4vw,4.4rem)] font-semibold tracking-tight leading-[1.02] max-w-6xl mx-auto text-center">
          SOLUTION ONE is the global payments network uniting merchants with seamless transaction access worldwide.
        </h2>

        <div className="relative mx-auto -mt-7 h-[min(70svh,700px)] min-h-[520px] max-w-[1220px] overflow-visible md:-mt-10">
          <Lottie
            src={networkAnimation}
            autoplay={false}
            speed={1.2}
            lottieRef={animationRef}
            subscriptions={{ ready: syncPlayback }}
            loop={false}
            className="absolute left-1/2 top-1/2 h-[920px] w-[1200px] max-w-none -translate-x-1/2 -translate-y-[45%] md:-translate-y-[46%] [filter:hue-rotate(-42deg)_saturate(1.18)]"
            rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
          />
        </div>
      </section>

      <section ref={containerRef} className="relative w-full h-[230vh]">
        <div className="sticky h-svh top-0 w-full flex items-end justify-center overflow-hidden bg-[#faf7f2]">
          <motion.div
            style={{ scale: textScale, y: textY }}
            className="flex items-center justify-center h-full px-4"
          >
            <h2 className="text-[#0f46d9] text-center tracking-tight font-bold leading-[1] text-[clamp(1.8rem,7vw,7rem)] whitespace-pre-line">
              Powering Global {'\n'} Enterprises
            </h2>
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center w-full h-full z-10 pointer-events-none">
            {cards.map((card, index) => {
              const Icon = card.icon;
              const [x, y] = positions[index];
              return (
                <motion.div
                  key={card.title}
                  style={{ x, y, opacity: cardOpacity, zIndex: index + 1 }}
                  className="absolute pointer-events-auto w-[40vw] min-w-[220px] md:w-[25vw] lg:w-[12.5vw] min-h-[300px] rounded-[2rem] bg-white p-3 shadow-2xl border border-blue-100 overflow-hidden"
                >
                  <div className="min-h-[276px] rounded-[1.5rem] bg-gradient-to-b from-[#0f46d9] to-[#38bdf8] p-4 text-white flex flex-col justify-between gap-3">
                    <span className="text-xs font-bold uppercase opacity-80">{card.eyebrow}</span>
                    <Icon className="w-8 h-8" />
                    <div>
                      <h3 className="text-lg md:text-xl font-bold leading-tight">{card.title}</h3>
                      <p className="mt-2 text-[11px] md:text-xs leading-tight text-blue-50">{card.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
