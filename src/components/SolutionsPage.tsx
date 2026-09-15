import React, { useRef, useState } from 'react';
import { motion, type MotionValue, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Navbar } from './Navbar';
import { AnimatedVideo } from './AnimatedVideo';
import { Footer } from './Footer';
import { publicAsset } from '../lib/routing';
import atomAsset from '../assets/payatom-ref/Atom.d12a4e49.webp';
import artboardAsset from '../assets/payatom-ref/Artboard.2edc3722.png';

const services = [
  ['Payments', publicAsset('/SolutionIcons/payments.svg')],
  ['Payouts', publicAsset('/SolutionIcons/payouts.svg')],
  ['Settlements', publicAsset('/SolutionIcons/settlements.svg')],
  ['Reconciliation', publicAsset('/SolutionIcons/reconciliation.svg')],
  ['Integration', publicAsset('/SolutionIcons/integration.svg')],
  ['Compliance', publicAsset('/SolutionIcons/compliance.svg')],
  ['Security', publicAsset('/SolutionIcons/security.svg')],
  ['Reporting', publicAsset('/SolutionIcons/reporting.svg')],
  ['Automation', publicAsset('/SolutionIcons/automation.svg')],
  ['Support', publicAsset('/SolutionIcons/support.svg')],
] as const;

const whyLines = [
  'Accept and process payments globally in 40+ countries seamlessly',
  'Effortlessly scale to millions of transactions every single day',
  'Instant settlements and unified dashboard for complete control',
  '24/7 enterprise support and integration assistance',
  'Advanced infrastructure that keeps operations truly transparent',
] as const;

const whyBallStops = [
  { fromX: '92vw', toX: '70vw', fromY: -40, toY: 0, size: '112px' },
  { fromX: '-14vw', toX: '16vw', fromY: 45, toY: 0, size: '118px' },
  { fromX: '20vw', toX: '42vw', fromY: 95, toY: 0, size: '116px' },
  { fromX: '22vw', toX: '45vw', fromY: 85, toY: 0, size: '116px' },
  { fromX: '24vw', toX: '49vw', fromY: 70, toY: 0, size: '116px' },
] as const;

const tailoredCards = [
  {
    title: 'SAFE & SECURE',
    text: "Ensure your customers' payments are safe and secure with our top-level security measures.",
    video: publicAsset('/Growth/green.mp4'),
    color: '#0476d9',
    align: 'ml-auto',
  },
  {
    title: 'FLEXIBLE & CUSTOMIZABLE',
    text: 'Customize your payment solution to fit your business needs with our flexible and customizable payment solution.',
    video: publicAsset('/Growth/purple.mp4'),
    color: '#1657d9',
    align: 'mr-auto',
  },
  {
    title: 'FAST & EASY',
    text: 'Simplify your payments with our fast and easy payment processing solution.',
    video: publicAsset('/Growth/pink.mp4'),
    color: '#0b47bd',
    align: 'ml-auto',
  },
  {
    title: 'EFFORTLESS PAYMENTS',
    text: 'Accept payments from anywhere, anytime with our effortless payments solution.',
    video: publicAsset('/Growth/blue.mp4'),
    color: '#002eff',
    align: 'mr-auto',
  },
] as const;

const SolutionsHero: React.FC = () => (
  <section className="relative mb-16 flex h-[100svh] w-full flex-col items-start justify-end overflow-hidden bg-black px-5 pb-16 text-white md:px-10">
    <Navbar />
    <AnimatedVideo
      src={publicAsset('/solution-assets/SolutionsHero.mp4')}
      poster={publicAsset('/solution-assets/solution-poster.png')}
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#05112a]/15 to-[#2b6fff]/55" />
    <motion.h1
      initial={{ opacity: 0, y: 34 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 text-5xl font-semibold leading-none md:text-7xl"
    >
      Solutions
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mt-8 max-w-4xl text-xl font-semibold leading-tight md:text-2xl"
    >
      Discover powerful features designed to simplify payments, boost efficiency, and support your business growth.
    </motion.p>
  </section>
);

const PaymentSolutionsBlock: React.FC = () => {
  const [active, setActive] = useState<'degree' | 'secured'>('degree');

  return (
    <section className="bg-[#faf7f2] px-5 pb-24 text-[#0b47bd]">
      <div className="mx-auto flex max-w-[820px] flex-col items-center gap-5">
        <h2 className="text-center text-4xl font-semibold leading-none md:text-6xl">Payment solutions</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {([
            ['degree', '360 Degree'],
            ['secured', 'Secured'],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              className={`inline-flex items-center gap-3 rounded-full border border-[#0b47bd] px-5 py-1.5 text-xl font-medium transition ${
                active === key ? 'bg-[#0b47bd] text-white' : 'bg-transparent text-[#0b47bd]'
              }`}
            >
              <span className={`size-1.5 rounded-full ${active === key ? 'bg-white' : 'bg-[#0b47bd]'}`} />
              {label}
            </button>
          ))}
        </div>

        {active === 'degree' ? <DegreeCards /> : <SecuredCards />}
      </div>
    </section>
  );
};

const DegreeCards: React.FC = () => (
  <motion.div
    key="degree"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="grid w-full grid-cols-1 gap-4 md:grid-cols-2"
  >
    <article className="relative min-h-[440px] overflow-hidden rounded-lg bg-gradient-to-b from-[#0b47bd] to-[#62c9ff] p-5 text-white md:row-span-6">
      <h3 className="text-2xl font-medium">Online Payments</h3>
      <p className="mt-3 max-w-sm text-base font-bold leading-snug">
        Effortlessly and securely handle and enhance a diverse array of comprehensive payment solutions.
      </p>
      <div className="absolute bottom-8 left-10 size-32 rounded-full bg-[radial-gradient(circle_at_30%_22%,#e7f7ff,#75d8ff_32%,#2b6fff_72%)] shadow-2xl" />
      <div className="absolute bottom-10 left-28 size-28 rounded-full bg-[radial-gradient(circle_at_30%_22%,#dff4ff,#5ccfff_34%,#1f66e5_74%)] opacity-70 blur-[1px]" />
      <div className="absolute bottom-12 left-44 size-24 rounded-full bg-[radial-gradient(circle_at_30%_22%,#d7f1ff,#42b9ff_34%,#164fc2_74%)] opacity-50 blur-[2px]" />
      <div className="absolute bottom-14 left-56 size-20 rounded-full bg-[radial-gradient(circle_at_30%_22%,#d2efff,#38a7ff_34%,#0b47bd_74%)] opacity-35 blur-[3px]" />
    </article>

    <article className="min-h-[170px] rounded-lg bg-gradient-to-br from-[#0b47bd] to-[#6bcfff] p-5 text-white md:row-span-2">
      <h3 className="text-2xl font-medium">Smart Routing</h3>
      <p className="mt-3 max-w-sm text-base font-bold leading-snug">
        Select from a variety of routing choices that allow you to dynamically switch transactions, ensuring a high rate of success.
      </p>
    </article>

    <article className="relative min-h-[235px] overflow-hidden rounded-lg bg-gradient-to-br from-[#08245f] to-[#6bcfff] p-5 text-white md:row-span-4">
      <h3 className="text-2xl font-medium">Unified Commerce</h3>
      <p className="mt-3 max-w-sm text-base font-bold leading-snug">
        Enhance precision by minimizing errors through a unified commerce infrastructure that guarantees accuracy and transparency.
      </p>
      <div className="absolute -bottom-16 right-8 size-48 rounded-full bg-[radial-gradient(circle_at_28%_20%,#ffffff,#8de4ff_28%,#2b6fff_64%,#08245f)] opacity-90" />
    </article>
  </motion.div>
);

const SecuredCards: React.FC = () => (
  <motion.div
    key="secured"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="grid w-full grid-cols-1 gap-4 md:grid-cols-2"
  >
    <article className="relative min-h-[640px] overflow-hidden rounded-lg bg-gradient-to-b from-[#06142e] to-[#2b6fff] p-5 text-white md:row-span-6">
      <h3 className="text-2xl font-medium">Extensive Reporting</h3>
      <p className="mt-3 max-w-sm text-base font-bold leading-snug">
        Efficiently oversee your daily operations with one-click, same-day payment gateway settlements deposited directly into your bank account.
      </p>
      <img src={atomAsset} alt="" className="absolute -bottom-8 left-1/2 w-[118%] -translate-x-1/2 [filter:hue-rotate(310deg)_saturate(1.45)]" />
    </article>

    <article className="min-h-[170px] rounded-lg bg-gradient-to-br from-[#06142e] to-[#6bcfff] p-5 text-white md:row-span-2">
      <h3 className="text-2xl font-medium">Risk Mitigation</h3>
      <p className="mt-3 max-w-sm text-base font-bold leading-snug">
        Efficiently oversee your daily operations with one-click, same-day payment gateway settlements deposited directly into your bank account.
      </p>
    </article>

    <article className="relative min-h-[540px] overflow-hidden rounded-lg bg-gradient-to-b from-[#06142e] to-[#2b6fff] p-5 text-white md:row-span-6">
      <h3 className="text-2xl font-medium">Cutting-Edge Tech</h3>
      <p className="mt-3 max-w-sm text-base font-bold leading-snug">
        Efficiently oversee your daily operations with one-click, same-day payment gateway settlements deposited directly into your bank account.
      </p>
      <img src={artboardAsset} alt="" className="absolute -bottom-16 left-1/2 w-[115%] -translate-x-1/2 [filter:hue-rotate(310deg)_saturate(1.45)]" />
    </article>

    <article className="min-h-[170px] rounded-lg bg-gradient-to-br from-[#06142e] to-[#2b6fff] p-5 text-white md:row-span-2">
      <h3 className="text-2xl font-medium">Rapid Settlement</h3>
      <p className="mt-3 max-w-sm text-base font-bold leading-snug">
        Efficiently oversee your daily operations with one-click, same-day payment gateway settlements deposited directly into your bank account.
      </p>
    </article>
  </motion.div>
);

const BusinessSection: React.FC = () => (
  <section className="bg-[#faf7f2] px-5 py-20 text-[#0b47bd] md:px-10 md:py-36">
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-16">
      <div className="w-full max-w-3xl">
        <h2 className="text-5xl font-medium leading-none md:text-7xl">Serving Global Digital Businesses</h2>
        <p className="mt-10 max-w-2xl text-2xl font-semibold leading-tight text-[#6f8fd9]">
          We provide a comprehensive suite of payment solutions that are designed to meet the unique needs of digital businesses.
        </p>
        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-8 gap-y-8">
          {services.map(([title, icon]) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-3 text-lg font-semibold"
            >
              <span className="grid size-[60px] place-items-center rounded-2xl bg-white shadow-[0_8px_18px_rgba(6,20,46,0.12)]">
                <img src={icon} alt="" className="size-9 [filter:hue-rotate(165deg)_saturate(1.7)]" />
              </span>
              {title}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const WhySolutions: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <section ref={ref} className="relative h-[260svh] bg-[#06142e]">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_18%,rgba(43,111,255,0.32),transparent_32%),linear-gradient(180deg,#06142e_0%,#082257_45%,#123c9e_100%)] text-white">
        <h2 className="mx-auto mb-16 max-w-4xl text-center text-5xl font-light leading-none md:text-6xl lg:text-7xl">
          Why Enterprises Choose SOLUTION ONE Solutions?
        </h2>
        <div className="relative w-full shadow-[0_-30px_100px_rgba(0,0,0,0.14)]">
          {whyLines.map((line, index) => (
            <WhyLine key={line} progress={scrollYProgress} index={index} text={line} />
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyLine: React.FC<{ progress: MotionValue<number>; index: number; text: string }> = ({ progress, index, text }) => {
  const start = index * 0.115;
  const end = start + 0.28;
  const stop = whyBallStops[index];
  const reveal = useTransform(progress, [start, end], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);
  const bandX = useTransform(progress, [start, end], [index % 2 ? '-28%' : '28%', '0%']);
  const ballX = useTransform(progress, [start, end], [stop.fromX, stop.toX]);
  const ballY = useTransform(progress, [start, end], [stop.fromY, stop.toY]);
  const ballScale = useTransform(progress, [start, end], [0.82, 1]);
  const ballOpacity = useTransform(
    progress,
    [Math.max(0, start - 0.04), start + 0.04, end - 0.04, end + 0.04],
    [0, 1, 1, 0],
  );

  return (
    <div className="relative h-[104px] border-t border-white/5 last:border-b">
      <motion.div
        style={{ clipPath: reveal, x: bandX }}
        className="absolute inset-0 bg-gradient-to-r from-[#06142e]/20 via-[#6bcfff]/30 to-[#2b6fff]/25"
      />
      <div
        className={`absolute inset-0 ${
          index % 2
            ? 'bg-gradient-to-r from-[#06142e]/10 via-[#2b6fff]/18 to-[#06142e]/5'
            : 'bg-gradient-to-r from-[#06142e]/5 via-[#0b47bd]/14 to-[#6bcfff]/10'
        }`}
      />
      <div className="relative z-10 mx-auto flex h-full max-w-[760px] items-center gap-6 px-5 text-lg font-medium md:text-xl">
        <span className="size-2 rounded-full bg-white" />
        <span>{index + 1}</span>
        <p className="max-w-xl leading-tight">{text}</p>
      </div>
      <motion.div
        style={{ x: ballX, y: ballY, scale: ballScale, opacity: ballOpacity, width: stop.size, height: stop.size }}
        className="pointer-events-none absolute top-1/2 z-20 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_25%,#d9ecff_0%,#9dbfff_30%,#6c84ff_66%,#4968d8_100%)] shadow-[0_20px_55px_rgba(4,18,52,0.34)]"
      />
    </div>
  );
};

const TailoredSolutions: React.FC = () => (
  <section className="relative z-10 bg-[#faf7f2]">
    <div className="sticky top-0 -z-10 mx-auto flex h-svh w-full max-w-screen-2xl flex-col items-center justify-center gap-10 px-5 text-center">
      <h2 className="text-5xl font-light leading-none text-[#0b47bd] md:text-7xl">Tailored Solutions</h2>
      <a href="/#contact" className="rounded-full bg-[#2b6fff] px-7 py-3 font-semibold text-white">
        Get a Demo
      </a>
    </div>
    <div className="-mt-[42vh] mx-auto flex w-full max-w-[1360px] flex-col gap-24 px-5 pb-[55vh] md:gap-10">
      {tailoredCards.map((card, index) => (
        <motion.article
          key={card.title}
          initial={{ opacity: 0, y: 80, rotate: index % 2 ? -2 : 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`w-full max-w-[350px] overflow-hidden rounded-[1.6rem] p-3 pb-8 text-white shadow-[0_18px_45px_rgba(6,20,46,0.22)] ${card.align}`}
          style={{ backgroundColor: card.color, marginTop: index === 0 ? 64 : 0 }}
        >
          <AnimatedVideo src={card.video} autoPlay loop muted playsInline className="h-[250px] w-full rounded-[1.1rem] object-cover" />
          <h3 className="mt-6 px-2 text-3xl font-bold leading-none">{card.title}</h3>
          <p className="mt-6 px-2 text-base font-semibold leading-relaxed">{card.text}</p>
        </motion.article>
      ))}
    </div>
  </section>
);

const FinalCta: React.FC = () => (
  <section className="bg-[#06142e] px-5 py-24 text-center text-white md:px-10">
    <h2 className="mx-auto max-w-5xl text-5xl font-semibold leading-none md:text-7xl">Solutions Built for Global Scale</h2>
    <p className="mx-auto mt-7 max-w-2xl text-lg font-medium text-[#b8d8ff]">
      Accept, process, settle, and protect payments through one Solution One platform.
    </p>
    <a
      href="/#contact"
      className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#2b6fff] px-7 py-3 font-semibold text-white"
    >
      Request a demo
      <ArrowUpRight className="size-5" />
    </a>
  </section>
);

export const SolutionsPage: React.FC = () => (
  <div className="min-h-screen bg-[#faf7f2] text-[#0b47bd] selection:bg-[#2b6fff] selection:text-white">
    <main>
      <SolutionsHero />
      <PaymentSolutionsBlock />
      <BusinessSection />
      <WhySolutions />
      <TailoredSolutions />
      <FinalCta />
    </main>
    <Footer />
  </div>
);
