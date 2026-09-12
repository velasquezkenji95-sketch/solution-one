import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const Headline = () => (
  <h2 className="stat-volume-title">
    <span>$2 Billion+ Processed</span>
    <span>Globally &amp; Securely</span>
  </h2>
);

const TrustedContent = ({ variant = 'light' }: { variant?: 'light' | 'blue' }) => (
  <div className={`stat-volume-content stat-volume-content-${variant}`}>
    <Headline />
    <p className="stat-volume-copy">It only takes few seconds to get started.</p>
  </div>
);

export const StatBanner: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sidePoint = useTransform(scrollYProgress, [0, 0.5], ['200%', '0%']);
  const centerPoint = useTransform(scrollYProgress, [0, 0.5], ['70%', '1%']);
  const springOptions = { stiffness: 120, damping: 20 };
  const sideSpring = useSpring(sidePoint, springOptions);
  const centerSpring = useSpring(centerPoint, springOptions);
  const clipPath = useTransform([sideSpring, centerSpring], ([side, center]) => (
    `polygon(0% -1%, 100% -1%, 100% ${side}, 50% ${center}, 50% ${center}, 0% ${side})`
  ));

  return (
    <section ref={sectionRef} className="stat-volume-section" aria-label="$2 Billion processed">
      <TrustedContent />
      <motion.div style={{ clipPath }} className="stat-volume-mask" aria-hidden="true">
        <TrustedContent variant="blue" />
      </motion.div>
    </section>
  );
};
