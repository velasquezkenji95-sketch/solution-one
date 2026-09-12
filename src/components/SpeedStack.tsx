import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plus, RefreshCw, Send } from 'lucide-react';

const items = [
  { label: 'Speed', color: '#6b42c8', Icon: Send, finalY: '-20svh', revealRange: [0, 0.08] },
  { label: 'Reliable', color: '#2CC96B', Icon: Plus, finalY: '0svh', revealRange: [0.18, 0.28] },
  { label: 'Transparent', color: '#36A9E1', Icon: RefreshCw, finalY: '20svh', revealRange: [0.36, 0.46] },
];

type StackItemProps = {
  item: (typeof items)[number];
  index: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
};

const StackItem: React.FC<StackItemProps> = ({ item, index, progress }) => {
  const fromY = index === 0 ? '4svh' : '34svh';
  const opacity = useTransform(progress, [item.revealRange[0], item.revealRange[1], 1], [0, 1, 1]);
  const y = useTransform(progress, [item.revealRange[0], item.revealRange[1], 1], [fromY, item.finalY, item.finalY]);
  const scale = useTransform(progress, [item.revealRange[0], item.revealRange[1], 1], [0.94, 1, 1]);
  const iconRotate = useTransform(progress, [0, 1], [-6, 6]);
  const Icon = item.Icon;

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-3 sm:gap-5"
    >
      <motion.div
        style={{ rotate: iconRotate, backgroundColor: item.color, boxShadow: `0 26px 55px ${item.color}33` }}
        className="flex size-16 items-center justify-center rounded-[28%] text-white shadow-xl sm:size-24 md:size-28"
      >
        <Icon className="size-8 sm:size-12 md:size-14" />
      </motion.div>
      <h2
        className="whitespace-nowrap text-[clamp(3.4rem,8.6vw,8rem)] font-extrabold leading-none tracking-normal"
        style={{ color: item.color }}
      >
        {item.label}
      </h2>
    </motion.div>
  );
};

export const SpeedStack: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={sectionRef} className="relative z-0 h-[260svh] w-full bg-[#faf7f2] text-slate-900">
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-[#faf7f2]">
        {items.map((item, index) => (
          <StackItem key={item.label} item={item} index={index} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
};
