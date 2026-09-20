import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Application } from '@splinetool/runtime';
import { publicAsset, withBasePath } from '../lib/routing';
import { ArrowUpRight, Globe2, Cpu, Users } from 'lucide-react';

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

type HeroProps = {
  title?: React.ReactNode;
  description?: string;
  showServices?: boolean;
};

export const Hero: React.FC<HeroProps> = ({
  title = <>One Platform. <br /> Infinite Payment Possibilities</>,
  description = 'SOLUTION ONE is a global fintech company empowering businesses to accept and process payments seamlessly across 40+ countries with secure, scalable, and compliant technology.',
  showServices = true,
}) => {
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

      {showServices && <motion.nav
        aria-label="Our services"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : 0.18, ease: 'easeOut' }}
        className="hero-services"
      >
        {[
          { title: 'Global Payment', detail: 'Move money across markets.', path: '/products/', Icon: Globe2 },
          { title: 'Technology', detail: 'Build. Connect. Scale.', path: '/technology/', Icon: Cpu },
          { title: 'Operations Solutions', detail: 'People behind your growth.', path: '/operations/', Icon: Users },
        ].map(({ title, detail, path, Icon }, index) => (
          <a key={path} href={withBasePath(path)} className="hero-service-link">
            <span className="hero-service-meta"><span>0{index + 1}</span><Icon aria-hidden="true" size={20} /></span>
            <span className="hero-service-title">{title}<ArrowUpRight aria-hidden="true" className="hero-service-arrow" /></span>
            <span className="hero-service-detail">{detail}</span>
          </a>
        ))}
      </motion.nav>}

      <motion.div
        initial={{ y: 22 }}
        animate={{ y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.45, ease: 'easeOut' }}
        className="absolute left-0 bottom-0 z-10 w-fit h-fit flex flex-col justify-end md:gap-6 gap-4 px-5 md:px-10 pb-28 text-white md:pointer-events-none"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.85)]">
          {title}
        </h1>
        <p className="text-base md:text-xl lg:text-2xl max-w-4xl leading-tight font-medium drop-shadow-[0_6px_22px_rgba(0,0,0,0.9)]">
          {description}
        </p>
      </motion.div>
    </section>
  );
};
