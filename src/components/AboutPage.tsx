import React, { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { ArrowUpRight } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PayatomWorld } from './PayatomWorld';
import { publicAsset } from '../lib/routing';

const years = [
  {
    year: '2016',
    title: '$100M in Processed Volume',
    text: 'Crossed $100 million in processed payments milestone. With 5 currency supported.',
  },
  {
    year: '2020',
    title: 'Global Payment Gateway Launch',
    text: 'Launched full-scale PAYPAY Payment Gateway platform. Added support for UPI India UPI network. Reached 500+ active merchants using SOLUTION ONE product in India.',
  },
  {
    year: '2022',
    title: '$1 Billion Processed & Crypto Integration',
    text: 'Crossed $1 billion+ USD in total processing volume. Launched VFpay, enabling crypto-to-fiat merchant payments. Onboarded international clients to fully support in SEA/pacific regions.',
  },
  {
    year: '2024',
    title: 'Global Partnerships',
    text: 'Established partnerships with leading liquidity providers and financial institutions across 40+ countries. Upgraded infrastructure for high-volume enterprise processing. Crossed $2 billion+ USD in single year processing volume.',
  },
] as const;

const countries = ['Bangladesh', 'India', 'Thailand', 'Indonesia', 'Vietnam', 'Sri Lanka', 'Nepal', 'Bhutan', 'Malaysia', 'Korea'];

const hubCards = [
  {
    title: 'Accept payments',
    text: 'Global online cards and local payments acceptance platform. Settle in local currency into your global accounts.',
    image: publicAsset('/about-assets/Globe.e6acc1e5.png'),
    large: true,
  },
  {
    title: 'Make payments',
    text: 'Multiple payment methods to 180+ countries, same-day payments in priority markets.',
    image: publicAsset('/about-assets/make-payments.df575088.png'),
  },
  {
    title: 'Global accounts',
    text: 'Build trust with local customers and business partners.',
    image: publicAsset('/about-assets/global-accounts.bb409b84.png'),
  },
  {
    title: 'Multi-currency',
    text: 'Hold, convert, send, and receive money in 30+ currencies across 180+ countries.',
    image: publicAsset('/about-assets/multicurrency.4a5a5717.png'),
  },
  {
    title: 'Borderless cards',
    text: 'Create employee and company cards for your business in minutes.',
    image: publicAsset('/about-assets/borderless-cards.99b1d684.png'),
  },
] as const;

const team = [
  ['Aryan', 'Founder/CEO'],
  ['Baroon', 'CTO'],
  ['Zoya', 'Head of Operations'],
  ['Max', 'Head of Accountants'],
  ['Rickey', 'Head of Finance'],
  ['Jason', 'Head of technical'],
] as const;

const investorRows = [
  ['01.', 'Open to Strategic Investment', 'SOLUTION ONE is seeking visionary investors to join our growth story and accelerate the expansion of global digital payments and crypto-fiat technology.'],
  ['02.', 'Massive Market Opportunity', 'The cross-border digital payment market is ripe for disruption, with digital adoption accelerating worldwide and businesses seeking modern payment infrastructure.'],
  ['03.', 'Proven Traction and Rapid Growth', 'Over $1B USD processed across international markets, demonstrating strong adoption and operational capability at scale.'],
  ['04.', 'Global Partnerships and Reach', 'Banking and liquidity partnerships across Asia Pacific, North America, South America, and Europe enable smooth global operations.'],
  ['05.', 'Innovative, Integrated Ecosystem', 'Payment technology, crypto-fiat bridges, and enterprise-grade infrastructure come together to support business growth.'],
] as const;

const AboutHero: React.FC = () => (
  <section className="relative flex h-[100svh] items-end overflow-hidden bg-[#06142e] px-5 pb-16 text-white md:px-10">
    <Navbar />
    <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#06142e]">
      <Spline
        scene={publicAsset('/about-assets/scene.splinecode')}
        className="h-full w-full object-cover [filter:hue-rotate(195deg)_saturate(1.2)]"
      />
    </div>
    <div className="relative z-10 flex max-w-5xl flex-col gap-8">
      <h1 className="text-5xl font-semibold leading-none md:text-7xl">About us</h1>
      <p className="max-w-4xl text-xl font-semibold leading-tight md:text-2xl">
        We are a global fintech company that empowers businesses to accept and process payments seamlessly across 40+ countries with secure, scalable, and compliant technology.
      </p>
    </div>
  </section>
);

const Timeline: React.FC = () => (
  <section className="bg-[#06142e] text-[#0b47bd]">
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <div className="sticky top-0 hidden h-screen items-end justify-center overflow-hidden lg:flex">
        <motion.img
          src={publicAsset('/about-assets/futuristic.29ab89b8.png')}
          alt=""
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-[70%] object-contain [filter:hue-rotate(195deg)_saturate(1.2)]"
        />
      </div>
      <div className="flex flex-col items-center gap-5 px-5 py-10 md:px-10">
        {years.map((item) => (
          <motion.article
            key={item.year}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full max-w-xl flex-col items-start gap-7 rounded-lg bg-[#faf7f2] p-5 md:gap-10 md:p-7"
          >
            <span className="text-3xl font-semibold tracking-tight">{item.year}</span>
            <div className="flex flex-col gap-5">
              <h2 className="text-2xl font-semibold lg:text-3xl">{item.title}</h2>
              <p className="text-base font-medium leading-tight text-[#06142e]/70 md:text-lg lg:text-xl">{item.text}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

const GlobalPayments: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.35, 0.9], [0.25, 0.55, 0.18]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#faf7f2] px-5 pt-20 pb-20 text-center text-[#0b47bd] md:pt-40">
      <div className="mx-auto flex max-w-7xl flex-col items-center">
        <h2 className="max-w-4xl text-5xl font-semibold leading-none tracking-tight md:text-7xl">
          Global payments built for <span className="italic">modern</span> businesses
        </h2>
        <p className="relative z-20 mx-auto mt-10 max-w-xl text-xl font-medium">
          Use SOLUTION ONE to pay vendors in 40+ countries via global payment networks without hidden fees.
        </p>
        <div className="relative z-10 w-full" aria-hidden="true">
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute left-1/2 top-1/2 size-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2b6fff] blur-[70px]"
          />
          <div className="relative z-10 mx-auto aspect-square w-full max-w-[900px] pointer-events-none md:pointer-events-auto">
            <PayatomWorld />
          </div>
        </div>
        <div className="relative z-20 -mt-[4%] w-full max-w-[960px] overflow-hidden border-t border-[#2b6fff]/35 px-4 py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="flex w-max items-center gap-8 whitespace-nowrap text-base font-semibold"
          >
            {[...countries, ...countries].map((country, index) => (
              <span key={`${country}-${index}`}>{country}</span>
            ))}
          </motion.div>
        </div>
        <p className="relative z-20 mt-10 max-w-3xl text-xl font-semibold leading-tight md:text-2xl">
          Building the world's most trusted and versatile payment network, empowering businesses to accept and manage payments seamlessly, anytime, anywhere, in any currency.
        </p>
      </div>
    </section>
  );
};

const FinanceHub: React.FC = () => (
  <section className="overflow-hidden bg-[#faf7f2] px-5 py-24 text-[#0b47bd]">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-10">
      <div className="text-center">
        <h2 className="text-5xl font-semibold leading-none md:text-7xl">Integrated finance operating hub</h2>
        <p className="mt-9 text-xl font-medium">for global digital businesses</p>
      </div>
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
        {hubCards.map((card) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className={`flex min-h-[260px] overflow-hidden rounded-xl border border-[#2b6fff]/20 ${
              'large' in card ? 'bg-[#2b6fff] text-white md:col-span-2 md:min-h-[380px]' : 'bg-white'
            }`}
          >
            <div className="flex max-w-[320px] flex-col justify-between gap-5 p-6 md:p-8">
              <div>
                <h3 className="text-2xl font-semibold md:text-3xl">{card.title}</h3>
                <p className="mt-5 text-sm font-semibold leading-relaxed md:text-base">{card.text}</p>
              </div>
              <a href="/#contact" className={`${'large' in card ? 'text-[#c9e8ff]' : 'text-[#2b6fff]'} text-lg font-semibold`}>
                Learn more
              </a>
            </div>
            <div className="ml-auto flex items-end justify-center overflow-hidden">
              <img src={card.image} alt="" className="h-full max-h-[380px] w-full object-contain [filter:hue-rotate(190deg)_saturate(1.25)]" />
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

const TeamSection: React.FC = () => (
  <section className="bg-[#faf7f2] px-5 py-24 text-[#0b47bd]">
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-3">
      <h2 className="text-5xl font-semibold leading-tight md:col-span-1">Revolutionizing global payments seamlessly.</h2>
      <div className="grid gap-x-8 gap-y-10 md:col-span-2 md:grid-cols-3">
        {team.map(([name, role], index) => (
          <motion.article
            key={name}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.18) }}
            className="text-center"
          >
            <div className="mx-auto size-64 overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_10%,#cfe8ff_0%,#2b6fff_45%,#0b47bd_100%)] shadow-[0_18px_35px_rgba(6,20,46,0.12)]" />
            <h3 className="mt-4 text-lg font-semibold">{name}</h3>
            <p className="mt-2 text-lg font-medium">{role}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

const Divider: React.FC<{ active: boolean; isLast: boolean }> = ({ active, isLast }) => {
  if (isLast) return null;

  return (
    <motion.div
      animate={{ backgroundColor: active ? '#ffffff' : 'rgba(255,255,255,0.38)' }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="my-3.5 h-px w-full"
    />
  );
};

const Investors: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const [activeRow, setActiveRow] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start center', 'end center'] });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextRow = Math.min(Math.floor(latest / (1 / investorRows.length)), investorRows.length - 1);
    setActiveRow(Math.max(0, nextRow));
  });

  return (
    <section className="flex h-full w-full flex-col gap-18 bg-[#06142e] px-5 py-22 text-white xs:px-6 md:gap-22 md:px-10 lg:px-16">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div />
        <div className="flex w-full flex-col gap-3 md:max-w-[90%]">
          <span className="w-fit rounded-full border border-white/85 px-4 py-1.5 text-sm font-semibold text-white">Partner With Us</span>
          <h2 className="text-3xl leading-[1.1] md:text-[clamp(36px,4vw,48px)]">Working for an all inclusive financial future</h2>
        </div>
      </div>
      <div ref={listRef} className="flex w-full flex-col gap-5">
        {investorRows.map(([number, title, text], index) => {
          const active = activeRow === index;

          return (
            <React.Fragment key={title}>
              <motion.article
                animate={{ opacity: active ? 1 : 0.5 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="grid w-full gap-10 p-1 will-change-transform md:grid-cols-2"
              >
                <div className="flex w-full flex-col items-start gap-8 text-[#faf7f2] md:flex-row md:gap-12">
                  <span className="text-xl md:text-2xl">{number}</span>
                  <h3 className="text-[clamp(24px,5vw,36px)] font-semibold leading-[1.1]">{title}</h3>
                </div>
                <p className="w-full text-base font-medium leading-[1.25] text-[#faf7f2] md:max-w-[90%] md:text-lg lg:text-xl">{text}</p>
              </motion.article>
              <Divider active={active} isLast={index === investorRows.length - 1} />
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

const FinalAboutCta: React.FC = () => (
  <section className="bg-[#06142e] px-5 pb-24 text-center text-white">
    <a href="/#contact" className="inline-flex items-center gap-3 rounded-full bg-[#2b6fff] px-7 py-3 font-semibold">
      Request a demo
      <ArrowUpRight className="size-5" />
    </a>
  </section>
);

export const AboutPage: React.FC = () => (
  <div className="min-h-screen bg-[#faf7f2]">
    <main>
      <AboutHero />
      <Timeline />
      <GlobalPayments />
      <FinanceHub />
      <TeamSection />
      <Investors />
      <FinalAboutCta />
    </main>
    <Footer />
  </div>
);
