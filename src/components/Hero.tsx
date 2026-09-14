import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Application } from '@splinetool/runtime';
import { publicAsset } from '../lib/routing';

const Spline = lazy(() => import('@splinetool/react-spline'));

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

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
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [scene, setScene] = useState<Application | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !scene) return;
    let inView = true;
    const syncPlayback = () => {
      const playing = inView && !document.hidden;
      if (playing) scene.play();
      else scene.stop();
      section.dataset.scenePlayback = playing ? 'playing' : 'paused';
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(section);
    document.addEventListener('visibilitychange', syncPlayback);
    syncPlayback();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, [scene]);

  const poster = <img src={publicAsset('/Hero/Hero.png')} alt="" className="h-full w-full object-cover" width={2930} height={1472} />;

  return (
    <section ref={sectionRef} className="relative h-[100svh] min-h-[640px] w-full flex items-end overflow-hidden bg-gradient-to-b from-[#0f46d9] via-[#061a5d] to-black">
      <div className="absolute -top-20 left-0 z-0 h-full w-full overflow-hidden md:top-0 md:-translate-y-[5%] [filter:hue-rotate(-42deg)_saturate(1.18)_brightness(1.04)]">
        {isMobile || reducedMotion ? (
          poster
        ) : (
          <Suspense fallback={poster}>
            <Spline scene={publicAsset('/Spline/Hero.splinecode')} onLoad={setScene} className="h-full w-full object-cover" renderOnDemand />
          </Suspense>
        )}
      </div>
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,transparent_28%,rgba(0,0,0,0.7)_100%)]" />

      <motion.div
        initial={{ y: 22 }}
        animate={{ y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.45, ease: 'easeOut' }}
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
