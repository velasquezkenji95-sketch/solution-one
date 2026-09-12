import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { FAQSection } from './FAQSection';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

const fields = [
  { label: 'First Name', type: 'input' },
  { label: 'Last Name', type: 'input' },
  { label: 'Email', type: 'input' },
  { label: 'Phone Number', type: 'input' },
  { label: 'Business Name', type: 'input' },
  { label: 'Expected Monthly Transaction', type: 'input' },
  {
    label: 'Industry Type',
    type: 'select',
    placeholder: 'Select industry type',
    options: ['E-commerce', 'Fintech', 'Crypto', 'Gaming', 'Enterprise'],
  },
  { label: 'Country of Operation', type: 'input' },
  {
    label: 'Integration Type',
    type: 'select',
    placeholder: 'Select integration type',
    options: ['Hosted Checkout', 'API Integration', 'Payment Links', 'Enterprise Setup'],
  },
  {
    label: 'Preferred Payment Methods',
    type: 'select',
    placeholder: 'Select payment methods',
    options: ['Cards', 'Bank Transfer', 'UPI', 'Crypto', 'Multiple methods'],
  },
];

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="demo-section">
      <div className="demo-inner">
        <div className="demo-header">
          <h2 className="demo-title">
            Schedule a Demo
            <br />
            with SOLUTION ONE
          </h2>
          <p className="demo-subtitle">
            The global payments network uniting merchants with seamless transaction access worldwide.
          </p>
        </div>

        <form className="demo-form">
          {fields.map((field) => (
            <label key={field.label} className="demo-field">
              <span className="demo-label">
                {field.label} <span className="text-[#ff2a2a]">*</span>
              </span>
              {field.type === 'select' ? (
                <select className="demo-control" defaultValue="">
                  <option value="" disabled>
                    {field.placeholder}
                  </option>
                  {field.options?.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input className="demo-control" type="text" />
              )}
            </label>
          ))}

          <label className="demo-field demo-field-wide">
            <span className="demo-label">
              How did you hear about us?
            </span>
            <textarea className="demo-control demo-textarea" />
          </label>

          <div className="demo-actions">
            <button type="button" className="demo-submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const contactSocials = [
  { label: 'Telegram Channel', icon: Send },
  { label: 'Telegram Community', icon: Send },
  { label: 'Telegram Support', icon: Send },
];

const ContactForm = () => (
  <form className="space-y-6 text-black">
    {Array.from({ length: 5 }).map((_, row) => (
      <div key={row} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {fields.slice(row * 2, row * 2 + 2).map((field) => (
          <label key={field.label} className="grid gap-2 text-lg font-medium">
            <span>
              {field.label} <span className="text-red-500">*</span>
            </span>
            {field.type === 'select' ? (
              <select
                className="h-fit w-full appearance-none rounded-xl border border-gray-100 bg-white px-3 py-2 text-black outline-none transition-shadow focus:ring-2 focus:ring-[#0b56d0]"
                defaultValue=""
              >
                <option value="" disabled>
                  {field.placeholder}
                </option>
                {field.options?.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                className="w-full rounded-xl border border-gray-100 bg-white px-3 py-2 text-black outline-none transition-shadow focus:ring-2 focus:ring-[#0b56d0]"
                type={field.label === 'Email' ? 'email' : field.label === 'Phone Number' ? 'tel' : 'text'}
              />
            )}
          </label>
        ))}
      </div>
    ))}

    <label className="grid gap-2 text-lg font-medium">
      <span>How did you hear about us?</span>
      <textarea
        className="w-full rounded-xl border border-gray-100 bg-white px-3 py-2 text-black outline-none transition-shadow focus:ring-2 focus:ring-[#0b56d0]"
        rows={2}
      />
    </label>

    <div className="flex justify-start">
      <button
        type="button"
        className="rounded-lg bg-[#0b56d0] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2b7fff]"
      >
        Submit
      </button>
    </div>
  </form>
);

export const ContactPage: React.FC = () => (
  <div className="min-h-screen bg-[#faf7f2] font-sans text-[#141414] antialiased selection:bg-[#0b56d0] selection:text-white">
    <div className="relative min-h-screen pb-[120px]">
      <Navbar />

      <div className="flex flex-col gap-[80px] px-5 pt-36 md:px-10 xl:flex-row">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="w-full xl:w-1/2"
        >
          <div className="flex flex-col items-start text-left">
            <h1 className="pb-4 text-[36px] font-semibold leading-none tracking-normal text-[#0b56d0] md:text-[60px] lg:text-[80px] xl:text-[60px]">
              Get in Touch.
            </h1>
            <p className="max-w-xl leading-none text-[#757575]">
              We know every project is unique, and you might have some questions before
              getting started.
            </p>
          </div>

          <div className="mt-6">
            <h2 className="pt-8 text-[28px] leading-[44px] tracking-normal text-[#141414] lg:text-[32px] xl:text-[44px]">
              <a href="mailto:info@solutionone.com" className="group relative inline-flex h-fit overflow-hidden">
                <span className="leading-[1.3] opacity-100 transition-[translate,opacity] duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">
                  info@solutionone.com
                </span>
                <span className="absolute top-full leading-[1.3] opacity-0 transition-[translate,opacity] duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-100">
                  info@solutionone.com
                </span>
              </a>
            </h2>
            <hr className="my-6 h-px max-w-[400px] border-0 bg-[#c4c4c4]" />
            <div className="leading-[23.4px] tracking-normal">
              <p className="text-base font-medium text-[#141414]">Address:</p>
              <p className="mt-0.5 text-lg font-medium text-[#757575]">
                Kuala Lumpur, Malaysia
              </p>
            </div>
            <hr className="my-6 h-px max-w-[400px] border-0 bg-[#c4c4c4]" />
            <div className="flex max-w-[420px] flex-wrap items-center gap-4 pb-6 text-lg font-medium text-[#0b56d0]">
              {contactSocials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href="#"
                    className="inline-flex items-center gap-2 transition-opacity duration-300 hover:opacity-75"
                  >
                    <span className="flex size-8 items-center justify-center rounded-full bg-[#0b56d0] text-white">
                      <Icon className="size-4" />
                    </span>
                    {social.label}
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: 'easeOut' }}
          className="w-full xl:w-1/2"
        >
          <div className="w-full md:p-6">
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </div>
    <FAQSection />
    <Footer />
  </div>
);
