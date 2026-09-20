import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { withBasePath } from '../lib/routing';

const roles = [
  { name: 'HR Specialist', category: 'People & Support' },
  { name: 'Live Chat Specialist', category: 'People & Support' },
  { name: 'Voice Call Specialist', category: 'People & Support' },
  { name: 'In house Trainer', category: 'People & Support' },
  { name: 'Management Role/Pre-TL', category: 'Business Operations' },
  { name: 'Translator', category: 'People & Support' },
  { name: 'Risk Control Specialist', category: 'Business Operations' },
  { name: 'Finance Specialist', category: 'Business Operations' },
  { name: 'Live Model/Live Cam', category: 'Creative & Growth' },
  { name: 'Marketing Crew', category: 'Creative & Growth' },
  { name: 'AI - Video Editor', category: 'Creative & Growth' },
  { name: 'Visual/UI/UX/Web Designer', category: 'Creative & Growth' },
  { name: 'Sales Crew', category: 'Creative & Growth' },
  { name: 'Quality Assurance Specialist', category: 'Business Operations' },
];
const categories = ['All talent', 'People & Support', 'Business Operations', 'Creative & Growth'];

export function TalentExplorer() {
  const [category, setCategory] = useState(categories[0]);
  const [query, setQuery] = useState('');
  const reducedMotion = useReducedMotion();
  const filtered = roles.filter(role => (category === categories[0] || role.category === category) && role.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-blue-200 pb-6">
        <div role="group" aria-label="Talent categories" className="flex flex-wrap gap-x-5 gap-y-3">
          {categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`border-b-2 py-2 text-sm font-semibold transition-colors ${category === item ? 'border-[#0b47bd] text-[#0b47bd]' : 'border-transparent text-[#40536c] hover:text-[#0b47bd]'}`}>{item}</button>)}
        </div>
        <label className="flex h-11 w-full items-center gap-3 border-b border-[#476a9f] sm:w-64">
          <Search className="size-5 shrink-0 text-[#0b47bd]" />
          <input type="search" aria-label="Search talent" placeholder="Search talent" value={query} onChange={event => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-600" />
        </label>
      </div>
      <p role="status" className="mt-5 text-sm text-[#476a9f]">{filtered.length} {filtered.length === 1 ? 'specialism' : 'specialisms'}</p>
      <ul aria-label="Talent roles" className="mt-3 grid min-h-48 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(role => <motion.li key={role.name} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="border-b border-blue-200">
          <a href={withBasePath('/contact/')} className="group flex h-full min-h-24 items-center justify-between gap-4 py-5 text-[#06142e] hover:text-[#0b47bd]">
            <span><span className="mb-2 block text-xs text-[#476a9f]">{role.category}</span><span className="font-semibold">{role.name}</span></span>
            <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 text-[#0b47bd] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </motion.li>)}
      </ul>
      {filtered.length === 0 && <div className="py-8 text-[#40536c]"><p>No talent matches your search.</p><button type="button" onClick={() => { setQuery(''); setCategory(categories[0]); }} className="mt-4 inline-flex items-center gap-2 font-semibold text-[#0b47bd]"><X className="size-4" />Clear filters</button></div>}
    </div>
  );
}
