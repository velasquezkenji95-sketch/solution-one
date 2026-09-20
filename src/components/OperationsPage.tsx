import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, UserSearch, Headset, ClipboardList, GraduationCap, CalendarCheck, MonitorCheck, Users } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AnimatedVideo } from './AnimatedVideo';
import { publicAsset, withBasePath } from '../lib/routing';

const services = [
  { title: 'Talent Recruitment', Icon: UserSearch, text: 'We connect businesses with qualified candidates through strategic sourcing, screening, and online recruitment systems. Whether you need entry-level staff or specialized professionals, we help simplify the hiring process and reduce recruitment time.' },
  { title: 'Remote HRBP Support', Icon: Headset, text: 'Managing remote teams requires communication, structure, and consistency. SOLUTION ONE provides online coordination and HR support services that tailored for 1v1 project, help businesses maintain productivity and employee engagement across different locations.' },
  { title: 'HR Management Solutions', Icon: ClipboardList, text: 'From onboarding to performance tracking, we provide comprehensive HR support tailored to your operational needs. Our goal is to help businesses improve internal efficiency and absorb all your operational risk while maintaining a positive employee experience.' },
  { title: 'Training & Development', Icon: GraduationCap, text: 'We assist companies in building stronger teams through professional training programs, communication development, and operational guidance to improve workforce performance and adaptability.' },
  { title: 'Administrative Assistance', Icon: CalendarCheck, text: 'SOLUTION ONE provides administrative and personnel support services that assist businesses in managing documentation, KPIs, scheduling, coordination, internal communication, and daily operational tasks with greater efficiency.' },
  { title: 'Remote Job Monitoring', Icon: MonitorCheck, text: 'We implement remote monitoring program to ensure your team remains productive and aligned with business goals, regardless of their location. With SOLUTION ONE\'s remote job monitoring solutions, effectiveness of your team will be guaranteed at max.' },
];

const roles = ['HR Specialist', 'Live Chat Specialist', 'Voice Call Specialist', 'In house Trainer', 'Management Role/Pre-TL', 'Translator', 'Risk Control Specialist', 'Finance Specialist', 'Live Model/Live Cam', 'Marketing Crew', 'AI - Video Editor', 'Visual/UI/UX/Web Designer', 'Sales Crew', 'Quality Assurance Specialist'];

export function OperationsPage() {
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
        <section className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-[#1c0d40] px-5 pb-28 text-white md:px-10">
          <AnimatedVideo src={publicAsset('/Hero/Hero.mp4')} autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,20,46,0.26),rgba(6,20,46,0.2)_50%,rgba(8,50,132,0.54))]" />
          <motion.div {...reveal} className="relative z-10 pointer-events-none">
            <h1 className="operations-hero-title font-semibold leading-none">Operations</h1>
            <p className="mt-7 max-w-4xl text-xl font-semibold leading-tight md:text-2xl">Online HR Solutions That Scale With Your Business</p>
          </motion.div>
        </section>
        <section className="px-5 py-20 md:px-10 md:py-28">
          <motion.div {...reveal} className="mx-auto max-w-6xl">
            <h2 className="max-w-4xl text-3xl font-medium leading-tight text-[#0b47bd] md:text-5xl">Online HR Solutions That Scale With Your Business</h2>
            <p className="mt-8 max-w-4xl text-lg leading-relaxed">At Solution One, we specialize in modern online human resource solutions designed for fast-growing businesses and digital teams. From talent acquisition to workforce management, we help companies build efficient, reliable, and people-focused operations across multiple industries.</p>
            <p className="mt-5 max-w-4xl text-lg leading-relaxed text-[#40536c]">We understand that great teams are the foundation of every successful business. That's why Solution One combines professional HR expertise with flexible online systems to deliver smooth, scalable, and cost-effective personnel solutions.</p>
          </motion.div>
        </section>

        <section className="bg-[#eaf2ff] px-5 py-12 text-center md:px-10 md:py-16">
          <motion.div {...reveal} className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-semibold leading-tight text-[#0b47bd] md:text-3xl">Hassle Free From Geography &amp; Legal Limitations!</h2>
            <p className="mt-5 text-lg font-semibold">All you need is just to pay subscription fees!</p>
          </motion.div>
        </section>

        <section className="px-5 py-16 md:px-10 md:py-24">
          <motion.div {...reveal} className="mx-auto grid max-w-6xl gap-8 border-b border-blue-200 pb-16 md:grid-cols-[1fr_1.3fr] md:gap-16">
            <div>
              <img src={publicAsset('/SolutionIcons/support.svg')} alt="" className="mb-6 size-16" />
              <h2 className="text-3xl font-semibold leading-tight text-[#0b47bd] md:text-4xl">HRBP 1-on-1 Project Matching</h2>
            </div>
            <div className="space-y-5 text-lg leading-relaxed">
              <p>Our dedicated HRBP specialists provide personalized talent matching and workforce support based on your business goals, project requirements, and operational structure.</p>
              <p>From recruitment and onboarding to communication management and long-term workforce coordination, we help businesses efficiently solve employee-related challenges with professional, scalable HR solutions.</p>
            </div>
          </motion.div>
          <div className="mx-auto max-w-6xl pt-16">
            <motion.div {...reveal} className="max-w-4xl">
              <h2 className="text-3xl font-semibold leading-tight text-[#0b47bd] md:text-4xl">Turning Workforce Challenges into Measurable Results</h2>
              <p className="mt-6 text-lg leading-relaxed">We help businesses improve team performance, operational efficiency, and workforce management through practical HR strategies and real execution support.</p>
            </motion.div>
            <ol aria-label="Operations services" className="mt-12 divide-y divide-blue-200 border-y border-blue-200">
              {services.map(({ title, text, Icon }, index) => (
                <motion.li {...reveal} key={title} className="operations-service grid gap-5 py-8 md:grid-cols-[1fr_1.3fr] md:gap-16 md:py-10">
                  <h3 className="flex items-start gap-4 text-xl font-semibold text-[#0b47bd] md:text-2xl"><span aria-hidden="true" className="pt-1 text-sm font-medium text-[#476a9f]">0{index + 1}</span><Icon className="mt-1 size-6 shrink-0" /><span>{title}</span></h3>
                  <p className="text-base leading-relaxed md:text-lg">{text}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#eaf2ff] px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <motion.div {...reveal} className="flex items-center gap-4 text-[#0b47bd]">
              <Users className="size-9 shrink-0" />
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">Talent from 15+ country</h2>
            </motion.div>
            <ul aria-label="Talent roles" className="mt-10 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
              {roles.map((role, index) => <motion.li {...reveal} transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : (index % 3) * 0.1 }} key={role} className="flex items-start gap-3 border-b border-blue-200 py-5 text-base font-medium md:text-lg"><span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-[#0b47bd]" /><span className="min-w-0 break-words">{role}</span></motion.li>)}
            </ul>
          </div>
        </section>

        <section className="px-5 pb-28 pt-16 text-center md:px-10 md:pt-24">
          <motion.div {...reveal} className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold leading-tight text-[#0b47bd] md:text-4xl">Are you in search of additional talent options?</h2>
            <a href={withBasePath('/contact/')} className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-[#0b47bd] px-7 py-4 font-semibold text-white transition-colors hover:bg-[#2563eb]">Contact us <ArrowUpRight className="size-5" /></a>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
