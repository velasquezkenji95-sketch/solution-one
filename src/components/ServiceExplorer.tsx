import { useId, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, type LucideIcon } from 'lucide-react';
import { AnimatedVideo } from './AnimatedVideo';
import { publicAsset, withBasePath } from '../lib/routing';

type Service = { title: string; text: string; Icon: LucideIcon };

export function ServiceExplorer({ services, label, media }: { services: Service[]; label: string; media: string[] }) {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const id = useId();
  const service = services[active];
  const Icon = service.Icon;

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16" data-service-explorer>
      <div className="grid grid-cols-2 content-start border-t border-blue-200 lg:block" role="group" aria-label={label}>
        {services.map(({ title, Icon: ItemIcon }, index) => (
          <button key={title} type="button" aria-pressed={active === index} aria-controls={`${id}-panel`}
            onClick={() => setActive(index)}
            className={`group flex min-h-24 w-full items-center gap-4 border-b px-3 py-5 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 ${active === index ? 'border-[#0b47bd] bg-[#eaf2ff] text-[#0b47bd]' : 'border-blue-200 text-[#40536c] hover:bg-blue-50'}`}>
            <span className="hidden text-xs tabular-nums lg:block">0{index + 1}</span>
            <ItemIcon className="size-5 shrink-0 lg:size-6" />
            <span className="min-w-0 flex-1 text-sm font-semibold sm:text-lg">{title}</span>
            <ArrowRight className={`hidden size-5 shrink-0 transition-transform lg:block ${active === index ? 'rotate-0' : '-rotate-45'}`} />
          </button>
        ))}
      </div>
      <div id={`${id}-panel`} role="region" aria-label={service.title} className="min-w-0">
        <div className="relative aspect-[16/9] overflow-hidden bg-[#eaf2ff]">
          <AnimatedVideo key={media[active % media.length]} src={publicAsset(media[active % media.length])}
            autoPlay={!reducedMotion} loop muted playsInline aria-hidden="true" className="h-full w-full object-cover" />
          <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-[#0b47bd] shadow-sm">
            <Icon className="size-6" /><span className="text-sm font-semibold">{label}</span>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between border-b border-blue-200 pb-4">
          <span className="text-sm font-medium tabular-nums text-[#476a9f]">0{active + 1} / 0{services.length}</span>
          <div className="flex gap-2">
            <button type="button" aria-label={`Previous ${label.toLowerCase()} service`} title="Previous service" onClick={() => setActive((active + services.length - 1) % services.length)} className="grid size-10 place-items-center rounded-full border border-blue-200 text-[#0b47bd] hover:bg-blue-100"><ArrowLeft className="size-5" /></button>
            <button type="button" aria-label={`Next ${label.toLowerCase()} service`} title="Next service" onClick={() => setActive((active + 1) % services.length)} className="grid size-10 place-items-center rounded-full bg-[#0b47bd] text-white hover:bg-blue-600"><ArrowRight className="size-5" /></button>
          </div>
        </div>
        <div aria-live="polite" aria-atomic="true" className="min-h-64 py-6 sm:min-h-56">
          <motion.div key={active} initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
            <h3 className="text-2xl font-semibold leading-tight text-[#0b47bd]">{service.title}</h3>
            <p className="mt-4 text-base leading-relaxed text-[#40536c]">{service.text}</p>
          </motion.div>
        </div>
        <a href={withBasePath('/contact/')} className="inline-flex items-center gap-3 border-b border-[#0b47bd] pb-2 font-semibold text-[#0b47bd] hover:text-blue-600">Discuss your project <ArrowUpRight className="size-5" /></a>
      </div>
    </div>
  );
}
