import React, { useEffect, useRef, useState } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { AnimatedVideo } from './AnimatedVideo';
import { publicAsset } from '../lib/routing';

const reasons = [
  {
    title: 'Robust Customer Onboarding and Authentication',
    description:
      'Enjoy a simple signup process. We seamlessly handle KYC, AML, sanctions screening, and identity verification for you.',
  },
  {
    title: 'Same-Day settlement',
    description:
      'Get paid on the same day D0, much faster than the standard T1 in the industry.',
  },
  {
    title: 'Top-Tier Security Measures',
    description:
      'Access consolidated reporting with all your data - invoices, transactions, and monthly records - on one platform. Plan and optimize your operations with SOLUTION ONE.',
  },
  {
    title: 'Adaptable payment options',
    description:
      'Tailor how payments are distributed, transfer funds between users or the platform, and manage payouts with scheduling or manual options.',
  },
];

const platforms = [
  {
    front: 'Optimised Performance',
    back: 'Smart Routing & Security',
    desc:
      'Optimize every transaction with dynamic routing, real-time checks, and enterprise-grade payment safeguards.',
  },
  {
    front: 'Added Flexibility',
    back: 'Multi-Asset Platform',
    desc:
      'Manage fiat, crypto, payouts, and settlements from one adaptable operating layer.',
  },
  {
    front: 'Seamless Integration',
    back: '3-Way Integration',
    desc:
      'Connect web payments, merchant dashboards, and payout workflows without adding operational friction.',
  },
];

const comparisonRows = [
  {
    feature: 'Multi-currency Account (Crypto + Fiat)',
    ours: ['Yes - single platform for all your assets', 'tick'],
    other: ['Limited support; usually requires separate accounts', 'warning'],
  },
  {
    feature: 'Integrated Crypto Exchange',
    ours: ['Yes - natively built-in', 'tick'],
    other: ['Limited or non-existent', 'warning'],
  },
  {
    feature: 'Third Party Payments',
    ours: ['Yes - to and from businesses and individuals', 'tick'],
    other: ['Provided, but rarely supports crypto', 'warning'],
  },
  {
    feature: 'Virtual & Physical Cards',
    ours: ['Not available', 'no'],
    other: ['Yes, but rarely supports crypto payments', 'warning'],
  },
  {
    feature: 'Time-Saving Account Opening',
    ours: ['Onboard in under a minute', 'tick'],
    other: ['Often lengthy, paperwork-heavy process', 'warning'],
  },
  {
    feature: 'Global Availability',
    ours: ['Fully international - manage and use worldwide', 'tick'],
    other: ['Typically region-locked or restricted', 'warning'],
  },
];

const partners = [
  ['BCB Group', 'Europe/UK'],
  ['Banking Circle', 'Europe'],
  ['Incore', 'Switzerland'],
  ['Wise', 'UK'],
  ['Clear Junction', 'UK'],
  ['Payswix', 'Lithuania'],
  ['Bitso', 'Mexico'],
  ['Evo Payments', 'Mexico'],
  ['Facilitapay', 'Mexico'],
  ['Apaylo', 'Canada'],
  ['Zand Bank', 'UAE'],
  ['Transfero', 'Brazil'],
];

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < breakpoint);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [breakpoint]);

  return isMobile;
};

const pageGradient = {
  backgroundImage:
    'radial-gradient(circle at 50% -32vw, rgba(183,215,255,0.68), rgba(183,215,255,0) 43vw), linear-gradient(180deg, #06142e 0%, #0b56d0 56%, #faf7f2 90%)',
  backgroundPosition: '50% -37vw, 0 0',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const WhyCard: React.FC<{
  title: string;
  description: string;
  style?: React.CSSProperties;
}> = ({ title, description, style }) => (
  <motion.article
    style={style}
    className="flex h-[450px] min-w-[335px] flex-col justify-between overflow-hidden rounded-md bg-white p-6 text-[#0b3f9f] shadow-[0_24px_70px_rgba(8,42,104,0.18)] md:min-w-0"
  >
    <h3 className="text-[2.35rem] font-medium leading-none tracking-normal md:text-[2.625rem]">
      {title}
    </h3>
    <p className="text-[1.15rem] font-semibold leading-tight tracking-normal md:text-[1.35rem]">
      {description}
    </p>
  </motion.article>
);

export const WhyUs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const y0 = useTransform(scrollYProgress, [0, 1], [250, 0]);
  const y1 = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const y2 = useTransform(scrollYProgress, [0, 1], [200, 0]);
  const y3 = useTransform(scrollYProgress, [0, 1], [300, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const mobileX = useTransform(scrollYProgress, [0, 1], ['0%', '-305%']);
  const offsets = [y0, y1, y2, y3];

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative w-full bg-[#faf7f2] text-white"
      style={{ height: isMobile ? '500vh' : '130vh' }}
    >
      {isMobile ? (
        <div
          className="sticky top-0 z-10 flex min-h-svh w-full flex-col items-center justify-center gap-[3.75rem] overflow-hidden px-5 py-5"
          style={pageGradient}
        >
          <h2 className="pt-20 text-center text-5xl font-semibold leading-none tracking-normal">
            Why SOLUTION ONE?
          </h2>
          <div className="relative h-full w-full overflow-hidden">
            <motion.div style={{ x: mobileX }} className="flex h-full gap-2">
              {reasons.map((reason) => (
                <WhyCard key={reason.title} {...reason} />
              ))}
            </motion.div>
          </div>
        </div>
      ) : (
        <div
          className="relative flex min-h-svh w-full flex-col items-center px-5 pb-10"
          style={pageGradient}
        >
          <div className="sticky top-0 z-10 w-full pt-60 text-center">
            <motion.div style={{ opacity: titleOpacity }}>
              <h2 className="text-[clamp(5rem,9vw,9rem)] font-semibold leading-none tracking-normal text-[#faf7f2]">
                Why SOLUTION ONE?
              </h2>
            </motion.div>
          </div>
          <div className="relative z-20 grid w-full max-w-[1500px] grid-cols-4 gap-4">
            {reasons.map((reason, index) => (
              <motion.div key={reason.title} style={{ y: offsets[index] }}>
                <WhyCard {...reason} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

const WhyUsHero = () => (
  <section className="relative flex min-h-svh items-end overflow-hidden bg-[#1c0d40] px-5 py-16 text-white md:px-10">
    <Navbar />
    <AnimatedVideo
      className="absolute inset-0 h-full w-full object-cover"
      src={publicAsset('/Hero/Hero.mp4')}
      autoPlay
      muted
      loop
      playsInline
    />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,20,46,0.26),rgba(6,20,46,0.2)_50%,rgba(8,50,132,0.54))]" />
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative z-10 max-w-3xl pb-6"
    >
      <h1 className="text-[clamp(4rem,7vw,6.5rem)] font-normal leading-none tracking-normal">
        Why SOLUTION ONE?
      </h1>
      <p className="mt-6 max-w-[900px] text-[clamp(1.25rem,2vw,1.75rem)] font-semibold leading-tight">
        We are a global fintech company that empowers businesses to accept and process
        payments seamlessly across 40+ countries with secure, scalable, and compliant
        technology.
      </p>
    </motion.div>
  </section>
);

const FlipCards = () => (
  <section className="bg-[#faf7f2] px-5 py-24 text-[#0b56d0] md:py-32">
    <div className="mx-auto max-w-6xl">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.65 }}
        className="mx-auto max-w-4xl text-center text-[clamp(3rem,6vw,5.4rem)] font-medium leading-none tracking-normal"
      >
        Select a Platform Tailored to your Needs
      </motion.h2>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {platforms.map((card, index) => (
          <motion.article
            key={card.front}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="group h-[370px] [perspective:1200px]"
          >
            <div className="relative h-full w-full rounded-md transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="absolute inset-0 flex flex-col justify-between rounded-md bg-[linear-gradient(145deg,#071a3d,#0b56d0_58%,#62c8ff)] p-7 text-white shadow-[0_24px_65px_rgba(11,86,208,0.18)] [backface-visibility:hidden]">
                <span className="text-3xl font-medium leading-none tracking-normal">{card.front}</span>
                <div className="h-32 rounded-full bg-[radial-gradient(circle_at_28%_30%,#eaf5ff,#64d6ff_38%,#0b56d0_78%)] blur-[1px]" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-between rounded-md bg-white p-7 text-[#0b3f9f] shadow-[0_24px_65px_rgba(11,86,208,0.16)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <span className="text-3xl font-medium leading-none tracking-normal">{card.back}</span>
                <p className="text-xl font-semibold leading-tight">{card.desc}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

const IconValue: React.FC<{ kind: string; text: string }> = ({ kind, text }) => (
  <div className="flex items-start gap-3">
    <img src={publicAsset(`/WhyUs/${kind}.svg`)} alt="" className="mt-1 h-5 w-5 flex-none" />
    <span>{text}</span>
  </div>
);

const ComparisonTable = () => (
  <section className="bg-[#faf7f2] px-5 py-24 text-[#071a3d] md:py-32">
    <div className="mx-auto max-w-6xl">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="text-center text-[clamp(3rem,6vw,5.25rem)] font-medium leading-none tracking-normal text-[#0b56d0]"
      >
        One platform. Fewer compromises.
      </motion.h2>

      <div className="relative mt-14 hidden overflow-hidden rounded-md border border-[#0b56d0]/20 bg-white shadow-[0_20px_60px_rgba(11,86,208,0.1)] md:block">
        <div className="absolute left-[33.33%] top-0 h-full w-1/3 bg-[linear-gradient(180deg,rgba(11,86,208,0.16),rgba(92,207,255,0.06))]" />
        <div className="relative grid grid-cols-3 border-b border-[#0b56d0]/20 text-xl font-semibold text-[#0b56d0]">
          <div className="p-5">Feature</div>
          <div className="p-5">SOLUTION ONE</div>
          <div className="p-5">Other Financial Institutions</div>
        </div>
        {comparisonRows.map((row, index) => (
          <motion.div
            key={row.feature}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
            className="relative grid grid-cols-3 border-b border-[#0b56d0]/12 text-lg font-medium last:border-b-0"
          >
            <div className="p-5 text-[#071a3d]">{row.feature}</div>
            <div className="p-5 text-[#0b56d0]">
              <IconValue kind={row.ours[1]} text={row.ours[0]} />
            </div>
            <div className="p-5 text-[#345076]">
              <IconValue kind={row.other[1]} text={row.other[0]} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:hidden">
        {comparisonRows.map((row) => (
          <motion.article
            key={row.feature}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="rounded-md border border-[#0b56d0]/15 bg-white p-5"
          >
            <h3 className="text-xl font-semibold text-[#0b56d0]">{row.feature}</h3>
            <div className="mt-4 space-y-3 font-medium">
              <IconValue kind={row.ours[1]} text={`SOLUTION ONE: ${row.ours[0]}`} />
              <IconValue kind={row.other[1]} text={`Others: ${row.other[0]}`} />
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

const Ball = () => (
  <div className="h-full aspect-square rounded-full bg-white shadow-[inset_0_0_1.4em_7px_#ffffff5c] [background-image:radial-gradient(circle_at_22%_37%,#63cfff_12%,#2f7dff_61%,#f9f7fc)]" />
);

const PartnerRow: React.FC<{
  leftWord: string;
  rightWord: string;
  index: number;
  progress: MotionValue<number>;
}> = ({ leftWord, rightWord, index, progress }) => {
  const start = 0.05 * index;
  const end = start + 0.45;
  const leftX = useTransform(progress, [start, start + (end - start) / 2, end], [0, -75, 0]);
  const rightX = useTransform(progress, [start, start + (end - start) / 2, end], [0, 75, 0]);

  return (
    <div className="relative flex w-full gap-5 text-xl font-semibold text-white md:gap-7 md:text-[2rem]">
      <motion.span style={{ x: leftX }} className="flex-1 whitespace-nowrap text-right leading-[1.2]">
        {leftWord}
      </motion.span>
      <motion.span style={{ x: rightX }} className="flex-1 whitespace-nowrap text-left leading-[1.2]">
        {rightWord}
      </motion.span>
    </div>
  );
};

const PartnerNetwork = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 50%', 'end center'],
  });
  const { scrollYProgress: rowProgress } = useScroll({
    target: sectionRef,
    offset: ['start -50%', 'end center'],
  });
  const ballY = useTransform(scrollYProgress, [0, 1], ['-30%', '100%']);
  const ballRotate = useTransform(scrollYProgress, [0, 1], [0, 450]);
  const ballOpacity = useTransform(scrollYProgress, [0, 0.8, 0.95], [1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative h-[300vh] w-full text-[#faf7f2]">
      <div className="sticky top-0 flex min-h-svh w-full items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#06142e,#0b2f79_48%,#0b56d0)] p-5 md:p-10">
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
          <motion.div style={{ y: ballY, opacity: ballOpacity }} className="flex h-full w-full justify-center">
            <motion.div style={{ rotate: ballRotate }} className="size-[6.25rem] md:size-[7.5rem]">
              <Ball />
            </motion.div>
          </motion.div>
        </div>
        <div className="relative z-10 mx-auto flex h-full w-full max-w-xl flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center gap-5 text-center">
            <h2 className="text-4xl font-semibold leading-tight tracking-normal md:text-5xl">
              Pay internationally
              <br />
              with confidence
            </h2>
            <p className="text-base font-medium leading-tight text-white md:text-lg">
              Built on a trusted global network of payment and banking partners - ensuring
              secure, compliant, and borderless transactions.
            </p>
          </div>
          <div className="flex w-full flex-col items-center">
            {partners.map(([partner, region], index) => (
              <PartnerRow
                key={`${partner}-${region}`}
                leftWord={partner}
                rightWord={region}
                index={index}
                progress={rowProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const WhyUsPage: React.FC = () => (
  <div className="min-h-screen bg-[#faf7f2] font-sans antialiased selection:bg-[#0b56d0] selection:text-white">
    <WhyUsHero />
    <WhyUs />
    <FlipCards />
    <ComparisonTable />
    <PartnerNetwork />
    <Footer />
  </div>
);
