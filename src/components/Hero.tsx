import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { publicAsset } from '../lib/routing';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return isMobile;
};

export const Hero: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full flex items-end overflow-hidden bg-gradient-to-b from-[#0f46d9] via-[#061a5d] to-black">
      <div className="absolute -top-20 left-0 z-0 h-full w-full overflow-hidden md:top-0 md:-translate-y-[5%] [filter:hue-rotate(-42deg)_saturate(1.18)_brightness(1.04)]">
        {isMobile ? (
          <img src={publicAsset('/Hero/Hero.png')} alt="" className="h-full w-full object-cover" width={2930} height={1472} />
        ) : (
          <Spline scene={publicAsset('/Spline/Hero.splinecode')} className="h-full w-full object-cover" renderOnDemand />
        )}
      </div>
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,transparent_28%,rgba(0,0,0,0.7)_100%)]" />

      <motion.div
        initial={{ y: 22 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
        className="absolute left-0 bottom-0 z-10 w-fit h-fit flex flex-col justify-end md:gap-10 gap-5 px-5 md:px-10 pb-15 text-white md:pointer-events-none"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.85)]">
          One Platform. <br /> Infinite Payment Possibilities
        </h1>
        <p className="text-base md:text-xl lg:text-2xl max-w-4xl leading-tight font-medium drop-shadow-[0_6px_22px_rgba(0,0,0,0.9)]">
          SOLUTION ONE is a global fintech company empowering businesses to accept and process payments seamlessly across 40+ countries with secure, scalable, and compliant technology.
        </p>
      </motion.div>
    </section>
  );
};
