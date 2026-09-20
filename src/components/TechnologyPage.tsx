import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Blocks, Bot, CreditCard, LayoutDashboard, Network, Store } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { publicAsset, withBasePath } from '../lib/routing';

const services = [
  { title: 'Platform Development', text: 'Scalable and user-friendly platforms designed around your business model, workflows, and customer experience.', Icon: Blocks },
  { title: 'Payment Integration', text: 'Seamless integration with third-party payment gateways and financial service providers, with dashboards designed for efficient transaction management.', Icon: CreditCard },
  { title: 'Client & Business Dashboards', text: 'Centralized dashboards that turn complex data and operations into clear, actionable insights.', Icon: LayoutDashboard },
  { title: 'Automation & Bots', text: 'Automated tools and intelligent workflows that reduce repetitive processes and improve operational efficiency.', Icon: Bot },
];

const flow = [
  { label: 'Merchant', Icon: Store },
  { label: 'Platform', Icon: Blocks },
  { label: 'Solutions', Icon: Network },
];

export function TechnologyPage() {
  const reducedMotion = useReducedMotion();
  const reveal = {
    initial: reducedMotion ? false as const : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reducedMotion ? 0 : 0.45 },
  };
  return (
    <div className="bg-[#faf7f2] text-[#06142e] selection:bg-blue-200">
      <Navbar />
      <main>
        <Hero title="Technology" description="Built for Scale. Designed for Integration." showServices={false} />
        <section className="technology-intro px-5 py-20 text-[#0b47bd] md:px-10 md:py-28">
          <div className="mx-auto max-w-6xl">
            <motion.div {...reveal}>
              <h2 className="max-w-4xl text-3xl font-medium leading-tight md:text-5xl">Built for Scale.<br />Designed for Integration.</h2>
              <p className="mt-8 max-w-3xl text-lg leading-relaxed">We engineer technology platforms that make complex ecosystems simpler to build, connect, and scale.</p>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#40536c]">Designed with integration at the core, our platforms seamlessly connect systems, services, and partners&mdash;helping businesses launch faster, operate smarter, and grow with confidence.</p>
            </motion.div>
            <ol aria-label="Merchant to platform to solutions" className="mt-12 grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
              {flow.map(({ label, Icon }, index) => (
                <Fragment key={label}>
                  {index > 0 && <motion.li aria-hidden="true" initial={false} whileInView={reducedMotion ? {} : { opacity: [0.35, 1, 0.35] }} transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }} className="flex justify-center"><ArrowRight className="size-7 rotate-90 text-[#0b47bd] sm:rotate-0" /></motion.li>}
                  <motion.li {...reveal} transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : index * 0.18 }} className="flex min-h-24 items-center justify-center gap-3 border-y border-blue-200 px-4 py-5 text-xl font-semibold md:text-2xl">
                    <Icon className="size-7 shrink-0 text-[#0b47bd]" />{label}
                  </motion.li>
                </Fragment>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-6xl">
            <motion.div {...reveal} className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-semibold leading-tight text-[#0b47bd] md:text-4xl">Solution One - Built for Scale. Designed for Integration.</h2>
              <p className="mt-8 text-lg leading-relaxed"><strong>Solution One</strong> provides end-to-end technology solutions for building user-friendly digital platforms, including P2P interfaces, third-party payment gateway dashboards, client portals, automated bots, and more. We turn complex technology requirements into scalable, intuitive, and integration-ready solutions.</p>
            </motion.div>
            <ol className="mt-16 divide-y divide-blue-200 border-y border-blue-200">
              {services.map(({ title, text, Icon }, index) => (
                <motion.li {...reveal} key={title} className="technology-service grid gap-5 py-8 md:grid-cols-[1fr_1fr] md:gap-12 md:py-10">
                  <h3 className="flex items-start gap-4 text-xl font-semibold text-[#0b47bd] md:text-2xl">
                    <span aria-hidden="true" className="pt-1 text-sm font-medium text-[#476a9f]">0{index + 1}</span><Icon className="mt-1 size-6 shrink-0" /><span>{title}</span>
                  </h3>
                  <p className="text-base leading-relaxed md:text-lg">{text}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#eaf2ff] px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-20">
            <motion.div {...reveal}>
              <h2 className="text-2xl font-semibold text-[#0b47bd] md:text-3xl">API &amp; System Integration</h2>
              <p className="mt-5 text-lg leading-relaxed">Connect your platform with existing systems, third-party services, APIs, and business applications through flexible integration architecture.</p>
            </motion.div>
            <motion.div {...reveal}>
              <h2 className="text-2xl font-semibold text-[#0b47bd] md:text-3xl">Custom Technology Solutions</h2>
              <p className="mt-5 text-lg leading-relaxed">When off-the-shelf software isn't enough, we build technology around your specific requirements.</p>
            </motion.div>
          </div>
        </section>

        <section aria-label="Technology integration" className="px-5 pb-28 pt-12 md:px-10">
          <motion.img {...reveal} src={publicAsset('/product-assets/plug.56fd4e02.png')} alt="Three-dimensional integration connector illustration" loading="lazy" className="mx-auto aspect-[2/1] w-full max-w-5xl object-contain" />
          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-stretch justify-center gap-4 sm:flex-row">
            <a href={withBasePath('/contact/')} className="inline-flex items-center justify-center gap-3 rounded-full bg-[#0b47bd] px-7 py-4 font-semibold text-white transition-colors hover:bg-[#2563eb]">Contact us for demo <ArrowUpRight className="size-5" /></a>
            <a href={withBasePath('/contact/')} className="inline-flex items-center justify-center gap-3 rounded-full border border-[#0b47bd] px-7 py-4 font-semibold text-[#0b47bd] transition-colors hover:bg-blue-100">Tell us what you need <ArrowRight className="size-5" /></a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
