import React, { useEffect, useRef, useState } from 'react';
import { Lottie, type LottieHandle } from 'lottie-react';
import { ArrowUpRight, Globe2 } from 'lucide-react';
import { motion, type MotionValue, useInView, useMotionValue, useReducedMotion, useScroll } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Logo } from './Logo';
import { publicAsset } from '../lib/routing';
import { ProductCard3D } from './ProductCard3D';
import { AnimatedVideo } from './AnimatedVideo';
import { PaymentCoverage } from './PaymentCoverage';
import flowAnimation from '../assets/payatom-product-lotties/anim-24660.json';
import integrationAnimation from '../assets/payatom-product-lotties/anim-34903.json';

const heroVideo = publicAsset('/product-assets/ProductsHero2.mp4');
const heroPoster = publicAsset('/product-assets/product-poster.png');

const productFeatures = [
  {
    title: 'Unified Payment Gateway',
    description: 'Unified payment gateway for global merchants to accept payments any currency',
  },
  {
    title: 'Crypto Payment Gateway',
    description: 'Accept and process cryptocurrency payments (USDT, BTC, ETH, etc.) globally.',
  },
  {
    title: 'SOLUTION ONE Payouts',
    description: 'Instant payout infrastructure for businesses to distribute funds globally in any currencies you like.',
  },
  {
    title: 'Fiat–Crypto Settlement',
    description: 'A hybrid solution allowing merchants to accept fiat and instantly convert local currencies to crypto.',
  },
  {
    title: 'Enterprise Solutions',
    description: 'Custom integrations, high-volume processing, 24x7 support',
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
    title: 'Let your Clients Decide',
    description: 'Let clients choose their preferred payment methods for easy, hassle-free transactions.',
    custom: 'client-choice',
    tone: 'bg-[#F6F6F6] text-black',
  },
];

const ProductsHero: React.FC = () => (
  <section className="payment-hero relative z-10 flex h-[100svh] w-full flex-col items-start justify-end gap-5 overflow-hidden bg-[#05000d] px-5 pb-28 text-white md:gap-6 md:px-10">
    <Navbar />
    <div className="absolute inset-0 z-0 h-full w-full bg-black">
      <AnimatedVideo
        src={heroVideo}
        poster={heroPoster}
        autoPlay
        loop
        muted
        playsInline
        className="payment-hero-video"
      />
      <div className="payment-hero-shade absolute inset-0" />
    </div>
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="payment-hero-slogan pointer-events-none absolute inset-x-5 z-10 text-center text-white"
    >
      <p className="payment-hero-eyebrow"><span /><Globe2 size={18} aria-hidden="true" />GLOBAL COVERAGE<span /></p>
      <p className="payment-hero-message">One Partner. <span>Multiple Markets.</span></p>
    </motion.div>
    <motion.h1
      initial={{ opacity: 0, y: 34 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none relative z-10 text-4xl font-semibold leading-none tracking-tight md:text-5xl lg:text-7xl"
    >
      PAYMENT
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
  const reducedMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  return (
    <section ref={sectionRef} data-product-features className={`relative bg-[#faf7f2] text-[#0b47bd] ${reducedMotion ? 'py-20' : 'h-[300svh]'}`}>
      <div className={`w-full px-5 pb-20 pt-8 lg:pt-16 ${reducedMotion ? '' : 'sticky top-0 min-h-svh'}`}>
        <h2 className="text-center text-3xl font-semibold leading-none md:text-4xl lg:text-left lg:text-6xl">Product Features</h2>
        <div className="mt-6 grid grid-cols-1 lg:mt-20 lg:grid-cols-3">
          <div className="h-[24svh] min-h-[150px] lg:col-span-2 lg:h-[53svh]">
            <ProductCard3D progress={scrollYProgress} reducedMotion={reducedMotion} />
          </div>
          <div className="mx-auto w-full max-w-xl lg:max-w-md">
            {productFeatures.map((feature, index) => (
              <ProductFeatureRow key={feature.title} feature={feature} index={index} progress={scrollYProgress} reducedMotion={reducedMotion} />
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
  progress: MotionValue<number>;
  reducedMotion: boolean;
}> = ({ feature, index, progress, reducedMotion }) => {
  const [open, setOpen] = useState(false);
  const start = index * 0.08;
  const opacity = useMotionValue(0);
  const y = useMotionValue(index * 38);
  useEffect(() => {
    const update = (value: number) => {
      opacity.set(Math.max(0, Math.min(1, (value - start) / 0.08)));
      y.set(index * 38 * (1 - Math.max(0, Math.min(1, (value - start) / 0.32))));
    };
    update(progress.get());
    return progress.on('change', update);
  }, [progress, start, index, opacity, y]);
  return (
    <motion.article
      style={reducedMotion ? {} : { opacity, y, zIndex: index }}
      className="relative border-t border-[#9cc7ff] bg-[#faf7f2]"
      onPointerEnter={event => { if (event.pointerType === 'mouse') setOpen(true); }}
      onPointerLeave={event => { if (event.pointerType === 'mouse') setOpen(false); }}
    >
      <button type="button" aria-expanded={open || reducedMotion} aria-controls={`product-description-${index}`}
        onClick={() => setOpen(value => window.matchMedia('(hover: hover)').matches ? true : !value)}
        onFocus={event => { if (event.currentTarget.matches(':focus-visible')) setOpen(true); }}
        className="flex w-full cursor-pointer items-start gap-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-blue-600">
        <span className="mt-1 shrink-0 rounded-full border border-[#0b47bd] px-3 text-xs leading-5">{index + 1}</span>
        <span className="text-base leading-tight md:text-xl lg:text-2xl">{feature.title}</span>
      </button>
      <motion.div id={`product-description-${index}`} initial={false}
        animate={{ height: open || reducedMotion ? 'auto' : 0, opacity: open || reducedMotion ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.3 }} className="overflow-hidden">
        <p className="pb-4 text-sm leading-snug md:text-base">{feature.description}</p>
      </motion.div>
    </motion.article>
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
        className="mx-auto grid min-h-screen w-full max-w-[1320px] grid-cols-1 gap-4 overflow-hidden px-5 md:grid-cols-1 lg:grid-cols-2"
      >
        {flowCards.map((card, index) => {
          const isTall = index === 0;
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
        <AnimatedVideo
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
      <PaymentCoverage />
      <ProductFeatureScroller />
      <Infrastructure />
      <PaymentFlowGrid />
      <ProductsCta />
    </main>
    <Footer />
  </div>
);
