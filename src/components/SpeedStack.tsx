import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValue, useReducedMotion, type MotionValue } from 'framer-motion';
import { Globe2, Cpu, Users, Equal, X } from 'lucide-react';

const items = [
  { label: 'Payments', detail: 'Global reach. Local connections.', color: '#0f46d9', Icon: Globe2 },
  { label: 'Technology', detail: 'Built to connect. Ready to scale.', color: '#087b70', Icon: Cpu },
  { label: 'People', detail: 'Expertise that moves you forward.', color: '#6346c7', Icon: Users },
];

function useScrollValue(progress: MotionValue<number>, start: number, end: number, from: number, to: number) {
  const value = useMotionValue(from);
  useEffect(() => {
    const update = (position: number) => {
      const fraction = Math.max(0, Math.min(1, (position - start) / (end - start)));
      value.set(from + (to - from) * fraction);
    };
    update(progress.get());
    return progress.on('change', update);
  }, [progress, start, end, from, to, value]);
  return value;
}

function Pillar({ index, progress, reduced }: { index: number; progress: MotionValue<number>; reduced: boolean }) {
  const item = items[index];
  const start = index * 0.13;
  const opacity = useScrollValue(progress, start, start + 0.15, 0.25, 1);
  const y = useScrollValue(progress, start, start + 0.15, 22, 0);
  const scaleX = useScrollValue(progress, start, start + 0.2, 0, 1);
  const Icon = item.Icon;
  return (
    <motion.div className="foundation-pillar" style={{ opacity: reduced ? 1 : opacity, y: reduced ? 0 : y, color: item.color }}>
      <div className="foundation-pillar-top"><span>0{index + 1}</span><Icon aria-hidden="true" strokeWidth={1.3} /></div>
      <h3>{item.label}</h3>
      <p>{item.detail}</p>
      <div className="foundation-rail"><motion.div style={{ scaleX: reduced ? 1 : scaleX, backgroundColor: item.color }} /></div>
    </motion.div>
  );
}

export const SpeedStack: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const opacity = useScrollValue(scrollYProgress, 0.45, 0.65, 0.15, 1);
  const y = useScrollValue(scrollYProgress, 0.45, 0.65, 26, 0);
  return (
    <section ref={sectionRef} className={`foundation-section ${reduced ? 'foundation-reduced' : ''}`} aria-label="Payments times Technology times People equals Infrastructure for Global Business">
      <div className="foundation-sticky">
        <div className="foundation-inner">
          <div className="foundation-eyebrow"><span className="foundation-mark" />ONE CONNECTED FOUNDATION</div>
          <div className="foundation-equation">
            {items.map((item, index) => (
              <React.Fragment key={item.label}>
                {index > 0 && <X className="foundation-multiply" strokeWidth={1} aria-hidden="true" />}
                <Pillar index={index} progress={scrollYProgress} reduced={reduced} />
              </React.Fragment>
            ))}
          </div>
          <motion.div className="foundation-result" style={{ opacity: reduced ? 1 : opacity, y: reduced ? 0 : y }}>
            <div className="foundation-connector" aria-hidden="true"><span /><Equal strokeWidth={1.5} /><span /></div>
            <h2>Infrastructure for<br /><span>Global Business</span><span className="foundation-period">.</span></h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
