import React, { useEffect, useRef, useState } from 'react';
import { Lottie, type LottieHandle } from 'lottie-react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useInView, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Logo } from './Logo';
import { publicAsset } from '../lib/routing';
import atomAsset from '../assets/payatom-ref/Atom.d12a4e49.webp';
import flowAnimation from '../assets/payatom-product-lotties/anim-24660.json';
import integrationAnimation from '../assets/payatom-product-lotties/anim-34903.json';
import interfaceAnimation from '../assets/payatom-product-lotties/anim-8951.json';
import complianceAnimation from '../assets/payatom-product-lotties/anim-44204.json';
import registrationAnimation from '../assets/payatom-product-lotties/anim-28723.json';

const heroVideo = publicAsset('/product-assets/ProductsHero2.mp4');
const heroPoster = publicAsset('/product-assets/product-poster.png');

const productFeatures = [
  {
    title: 'SOLUTION ONE Payment Gateway',
    description: 'Unified payment gateway for global merchants to accept payments via UPI.',
  },
  {
    title: 'Crypto Payment Gateway',
    description: 'Accept and process cryptocurrency payments (USDT, BTC, ETH, etc.) globally.',
  },
  {
    title: 'Decentralized Wallet',
    description: 'A non-custodial, decentralized wallet that enables gas-free USDT (TRC20) transfers.',
  },
  {
    title: 'SOLUTION ONE Payouts',
    description: 'Instant payout infrastructure for businesses to distribute funds globally.',
  },
  {
    title: 'Fiat-Crypto Bridge (Upcoming)',
    description: 'A hybrid solution allowing merchants to accept fiat and instantly convert to crypto.',
  },
  {
    title: 'Enterprise Solutions',
    description: 'Custom integrations, high-volume processing, 24x7 support.',
  },
];

const infrastructureCards = [
  {
    title: 'Smart Routing',
    description:
      'Automatically route every transaction through the best available path for stronger approval rates and faster settlements.',
    image: publicAsset('/product-assets/inteligent.6949a635.png'),
  },
  {
    title: 'Merchant Control',
    description:
      'Manage settlement preferences, payment channels, currency movement, and operational visibility from one connected dashboard.',
    image: publicAsset('/product-assets/control.963236a1.png'),
  },
  {
    title: 'Easy Integration',
    description:
      'Plug SOLUTION ONE into existing systems with flexible APIs, hosted checkout, and integration support for global merchants.',
    image: publicAsset('/product-assets/plug.56fd4e02.png'),
  },
];

const flowCards = [
  {
    title: 'Improve payment flow',
    description:
      'Discover innovative solutions that transform digital experiences through cutting-edge technology and seamless user interactions.',
    animation: flowAnimation,
    tone: 'bg-[#2b6fff] text-white',
  },
  {
    title: '3-Way Integration',
    description: '3-way integration for faster, smoother, and synced payments.',
    animation: integrationAnimation,
    tone: 'bg-[#00a6ff] text-white',
  },
  {
    title: 'Effortless user interface',
    description: 'Enjoy a clean, intuitive interface for easy, hassle-free payment management.',
    animation: interfaceAnimation,
    tone: 'bg-[#5fb9ff] text-white',
  },
  {
    title: 'Let your Clients Decide',
    description: 'Let clients choose their preferred payment methods for easy, hassle-free transactions.',
    custom: 'client-choice',
    tone: 'bg-[#F6F6F6] text-black',
  },
  {
    title: 'PCI DSS Level 1 compliance',
    description:
      'Discover innovative solutions that transform digital experiences through cutting-edge technology and seamless user interactions.',
    animation: complianceAnimation,
    tone: 'bg-[#2b6fff] text-white',
  },
  {
    title: 'VISA Third Party Agent (TPA) and Mastercard Registration Program',
    description:
      'We are registered as VISA Third Party Agent (TPA) and Mastercard Registration Program (MRP), adding an extra layer of security.',
    animation: registrationAnimation,
    tone: 'bg-[#00a6ff] text-white',
  },
];

const ProductsHero: React.FC = () => (
  <section className="relative z-10 flex h-[100svh] w-full flex-col items-start justify-end gap-5 overflow-hidden bg-[#05000d] px-5 pb-15 text-white md:gap-10 md:px-10">
    <Navbar />
    <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-b from-black from-0% via-[#06142e] to-[#2b6fff]">
      <video
        src={heroVideo}
        poster={heroPoster}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-[#2b6fff]/12" />
    </div>
    <motion.h1
      initial={{ opacity: 0, y: 34 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none relative z-10 text-4xl font-semibold leading-none tracking-tight md:text-5xl lg:text-7xl"
    >
      Products
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none relative z-10 max-w-4xl text-xl font-medium leading-tight lg:text-2xl"
    >
      Discover powerful features designed to simplify payments, boost efficiency, and support your business growth.
    </motion.p>
  </section>
);

const ProductFeatureScroller: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openFeature, setOpenFeature] = useState<number | null>(null);
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const cardScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.94]);
  const cardRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  const cardY = useTransform(scrollYProgress, [0, 1], [14, -20]);
  const atomRotate = useTransform(scrollYProgress, [0, 1], [-16, 28]);
  const railX = useTransform(scrollYProgress, [0, 1], ['-18%', '18%']);
  const glowScale = useTransform(scrollYProgress, [0, 0.55, 1], [0.9, 1.08, 0.96]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setVisibleFeatures((current) => {
      let changed = false;
      let next = current;

      productFeatures.forEach((_, index) => {
        const start = 0.08 * index;
        const end = start + 0.54;
        const isVisible = next.includes(index);

        if (latest > end && !isVisible) {
          next = [...next, index];
          changed = true;
        }

        if (latest < start && isVisible) {
          next = next.filter((item) => item !== index);
          changed = true;
        }
      });

      return changed ? next : current;
    });

    setOpenFeature((current) => {
      if (current === null) return current;
      const start = 0.08 * current;
      if (latest < start) {
        return null;
      }
      return current;
    });
  });

  return (
    <section ref={sectionRef} className="relative h-[300svh] w-full bg-[#faf7f2] pb-10 pt-20">
      <div className="sticky top-0 w-full overflow-hidden pt-10 lg:h-svh lg:pt-20">
        <h2 className="mb-4 px-5 text-center text-3xl font-semibold leading-none text-[#0b47bd] md:text-4xl lg:text-left lg:text-6xl">
          Product Features
        </h2>

        <div className="grid w-full grid-cols-1 md:mt-10 lg:mt-40 lg:grid-cols-3">
          <div className="relative flex h-70 w-full justify-center overflow-hidden lg:col-span-2 lg:h-120">
            <motion.div
              style={{ rotate: cardRotate, scale: cardScale, y: cardY, willChange: 'transform' }}
              className="relative mt-2 aspect-[1.58] w-[min(74vw,600px)] overflow-hidden rounded-xl bg-gradient-to-br from-[#e9f6ff] via-[#3186ff] to-[#07145b] shadow-[0_42px_120px_rgba(43,111,255,0.2)]"
            >
              <motion.div
                aria-hidden="true"
                style={{ scale: glowScale }}
                className="absolute -right-[12%] -top-[30%] size-[62%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.72),rgba(74,184,255,0.35)_40%,transparent_70%)]"
              />
              <motion.img
                src={atomAsset}
                alt=""
                style={{ rotate: atomRotate }}
                className="absolute -right-[7%] -top-[18%] w-[58%] opacity-80"
              />
              <motion.div
                aria-hidden="true"
                style={{ x: railX }}
                className="absolute left-[16%] top-[36%] h-[15%] w-[72%] rounded-full bg-gradient-to-r from-white/70 via-[#7bdfff]/55 to-white/20 blur-[1px]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                  backgroundSize: '13px 13px',
                }}
              />
              <div className="absolute bottom-[9%] left-[7%] flex h-[20%] w-[54%] items-center rounded-xl bg-[#2b6fff] px-5 shadow-[0_14px_34px_rgba(9,34,112,0.3)]">
                <Logo className="w-full" />
              </div>
              <div className="absolute bottom-[14%] right-[8%] flex items-center gap-2 rounded-full bg-white/92 px-4 py-2 text-sm font-semibold text-[#0b348f] shadow-[0_10px_26px_rgba(9,34,112,0.18)]">
                <span className="size-2 rounded-full bg-[#28d7ff]" />
                Global ready
              </div>
            </motion.div>
          </div>

          <div className="mt-10 flex w-full flex-col gap-10 px-5 md:mt-10 lg:mt-0 lg:max-w-md">
            {productFeatures.map((feature, index) => (
              <ProductFeatureRow
                key={feature.title}
                feature={feature}
                index={index}
                scrollYProgress={scrollYProgress}
                canInteract={visibleFeatures.includes(index)}
                isOpen={openFeature === index}
                setOpenFeature={setOpenFeature}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

type ProductFeature = (typeof productFeatures)[number];

const ProductFeatureRow: React.FC<{
  feature: ProductFeature;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  canInteract: boolean;
  isOpen: boolean;
  setOpenFeature: React.Dispatch<React.SetStateAction<number | null>>;
}> = ({ feature, index, scrollYProgress, canInteract, isOpen, setOpenFeature }) => {
  const start = 0.08 * index;
  const y = useTransform(scrollYProgress, [start, start + 0.32], [0, -(50 * index)]);
  const opacity = useTransform(scrollYProgress, [start, start + 0.08, start + 0.4], [0, 1, 1]);

  return (
    <motion.div style={{ y }} className="relative bg-[#faf7f2] tracking-tight text-[#0b47bd]">
      <motion.button
        type="button"
        style={{ opacity }}
        onMouseEnter={() => canInteract && setOpenFeature(index)}
        onMouseLeave={() => canInteract && setOpenFeature(null)}
        onClick={() => canInteract && setOpenFeature(isOpen ? null : index)}
        className={`flex w-full flex-col gap-3 border-t border-[#9cc7ff] py-5 text-left transition-all duration-300 ${
          canInteract ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none cursor-default'
        }`}
      >
        <span className="flex items-start gap-5">
          <span className="mt-1 flex w-fit shrink-0 items-center justify-evenly gap-2 rounded-full border border-[#0b47bd] px-3 py-0.5">
            <span className="size-2 rounded-full bg-[#0b47bd]" />
            <span className="text-sm">{index + 1}</span>
          </span>
          <span className="min-w-0 flex-1 text-xl tracking-tight md:text-2xl">{feature.title}</span>
        </span>
        <motion.span
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="block overflow-hidden pl-[4.8rem] text-base leading-snug md:text-lg"
        >
          {feature.description}
        </motion.span>
      </motion.button>
    </motion.div>
  );
};

const FlipCard: React.FC<(typeof infrastructureCards)[number]> = ({ title, description, image }) => (
  <div className="group h-[360px] w-full cursor-pointer [perspective:1000px] md:h-[445px]">
    <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
      <div className="absolute inset-0 flex flex-col justify-start rounded-3xl bg-white p-4 text-[#0b47bd] shadow-md [backface-visibility:hidden] md:p-6">
        <div className="h-[200px] w-full overflow-hidden rounded-2xl md:h-[250px]">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
        <h3 className="mt-auto max-w-[80%] break-words text-3xl font-semibold leading-none tracking-tight lg:text-4xl xl:text-[42px]">
          {title}
        </h3>
      </div>
      <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-[#0b47bd] p-6 text-lg font-medium text-[#faf7f2] shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)] md:text-xl">
        <p>{description}</p>
      </div>
    </div>
  </div>
);

const Infrastructure: React.FC = () => (
  <section className="flex w-full items-center justify-center bg-[#faf7f2] px-5 pb-10 text-[#0b47bd] md:px-10 md:pb-30">
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-20">
      <h2 className="text-center text-4xl font-bold leading-tight md:text-5xl lg:text-7xl">
        The Infrastructure Behind Better Payments
      </h2>
      <div className="grid h-full w-full grid-cols-1 justify-center gap-10 md:grid-cols-2 lg:grid-cols-3">
        {infrastructureCards.map((card) => (
          <FlipCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  </section>
);

const PaymentFlowGrid: React.FC = () => {
  const refs = useRef<Record<string, LottieHandle | null>>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: '-100px' });

  useEffect(() => {
    Object.values(refs.current).forEach((lottie) => {
      if (!lottie) return;
      if (inView) lottie.play();
      else lottie.pause();
    });
  }, [inView]);

  return (
    <section className="bg-[#faf7f2] py-20">
      <div
        ref={sectionRef}
        className="mx-auto grid min-h-screen w-full max-w-[1320px] grid-cols-1 gap-4 overflow-hidden px-5 md:grid-cols-1 lg:grid-cols-2 lg:grid-rows-3"
      >
        {flowCards.map((card, index) => {
          const isTall = index === 0 || index === 2 || index === 5;
          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.22 }}
              transition={{ duration: 0.55, delay: Math.min(index * 0.04, 0.16), ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex min-h-[420px] flex-col justify-between gap-10 overflow-hidden rounded-2xl p-6 ${
                isTall ? 'lg:row-span-2' : ''
              } ${card.tone}`}
            >
              <div className="z-10 flex items-start justify-between gap-5">
                <h3 className="max-w-[86%] text-lg font-semibold leading-[1.1] sm:text-xl md:text-2xl lg:text-[30px]">
                  {card.title}
                </h3>
                <span className="mt-2 size-2 shrink-0 rounded-full bg-current" />
              </div>
              <div className="flex flex-1 items-center justify-center">
                {'custom' in card && card.custom === 'client-choice' ? (
                  <ClientChoiceVisual />
                ) : (
                  <div className="relative flex size-[260px] items-center justify-center md:size-[360px]">
                    <Lottie
                      src={(card as { animation?: object }).animation ?? flowAnimation}
                      loop
                      autoplay={false}
                      lottieRef={(instance) => {
                        refs.current[card.title] = instance;
                      }}
                      className="absolute inset-0 scale-125"
                    />
                  </div>
                )}
              </div>
              <p className="z-10 text-base font-medium leading-[1.2] md:text-lg lg:text-xl">{card.description}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

const ClientChoiceVisual: React.FC = () => (
  <div className="relative flex h-[260px] w-full items-center justify-center md:h-[360px]">
    <motion.div
      aria-hidden="true"
      animate={{ rotate: 360 }}
      transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      className="absolute size-52 rounded-full border-[18px] border-[#0b47bd]/20 md:size-72"
    />
    <motion.div
      aria-hidden="true"
      animate={{ rotate: -360 }}
      transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      className="absolute size-36 rounded-full border-[12px] border-[#2b6fff]/18 md:size-52"
    />
    {['Card', 'Crypto', 'Payout'].map((label, index) => (
      <motion.div
        key={label}
        animate={{ y: [0, index % 2 ? 14 : -14, 0] }}
        transition={{ duration: 3 + index * 0.35, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute flex h-16 w-36 items-center justify-between rounded-2xl bg-white px-4 text-sm font-semibold text-[#12358f] shadow-[0_20px_45px_rgba(29,67,160,0.18)]"
        style={{
          left: `${16 + index * 21}%`,
          top: `${26 + (index % 2) * 28}%`,
        }}
      >
        <span className="size-3 rounded-full bg-[#2b6fff]" />
        {label}
      </motion.div>
    ))}
    <div className="relative flex size-24 items-center justify-center rounded-full bg-[#2b6fff] shadow-[0_22px_50px_rgba(43,111,255,0.32)] md:size-32">
      <Logo className="w-[78%]" />
    </div>
  </div>
);

const ProductsCta: React.FC = () => (
  <section className="w-full bg-[#faf7f2] px-5 py-[8vw] text-black md:px-10">
    <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 lg:grid-cols-3">
      <motion.h2
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="text-center text-3xl font-medium leading-none md:text-4xl xl:text-5xl"
      >
        Seamless
      </motion.h2>
      <div className="relative flex w-full items-center justify-center">
        <div className="absolute flex h-full w-full scale-105 items-center justify-center rounded-full border-[14px] border-[#faf7f2] max-lg:size-60" />
        <video
          src={publicAsset('/product-assets/sphere.mp4')}
          autoPlay
          loop
          muted
          playsInline
          className="size-60 rounded-full object-cover lg:h-full lg:w-full"
        />
      </div>
      <motion.h2
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="text-center text-3xl font-medium leading-none md:text-4xl xl:text-5xl"
      >
        Payments
      </motion.h2>
    </div>
    <div className="mt-10 flex w-full flex-col items-center justify-center gap-10">
      <motion.p
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.55, delay: 0.12, ease: 'easeOut' }}
        className="max-w-2xl text-center text-lg font-medium leading-[1.2] sm:text-xl md:text-2xl"
      >
        Effortless payments for every business, every time.
      </motion.p>
      <motion.a
        href="/#contact"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.55, delay: 0.18, ease: 'easeOut' }}
        className="inline-flex items-center gap-3 rounded-full bg-[#2b6fff] px-5 py-3 text-base font-semibold text-white shadow-[0_18px_48px_rgba(43,111,255,0.22)]"
      >
        Get a demo
        <ArrowUpRight className="size-5" />
      </motion.a>
    </div>
  </section>
);

export const ProductsPage: React.FC = () => (
  <div className="min-h-screen bg-[#faf7f2] text-[#0b47bd] selection:bg-[#2b6fff] selection:text-white">
    <main>
      <ProductsHero />
      <ProductFeatureScroller />
      <Infrastructure />
      <PaymentFlowGrid />
      <ProductsCta />
    </main>
    <Footer />
  </div>
);
