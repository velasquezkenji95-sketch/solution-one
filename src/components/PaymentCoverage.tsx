import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { AnimatedVideo } from './AnimatedVideo';
import { publicAsset, withBasePath } from '../lib/routing';

const markets = [
  ['USD', 'United States', 'CASHAPP / Apple Pay / Google Pay'],
  ['JPY', 'Japan', 'BANK'],
  ['PGK', 'Papua New Guinea', 'BSP / KinaBank'],
  ['THB', 'Thailand', 'BANK / PromptPayQR'],
  ['KRW', 'South Korea', 'Virtual Account / BANK'],
  ['ARS', 'Argentina', 'QR / BANK EMV'],
  ['EGP', 'Egypt', 'BANK'],
  ['VND', 'Vietnam', 'QR / BANK'],
  ['PHP', 'Philippines', 'GCASH H5 Intent'],
  ['HKD', 'Hong Kong', 'Bank'],
  ['TWD', 'Taiwan', 'ATM / Credit Card / BANK'],
  ['IDR', 'Indonesia', 'VA Bank / QRIS'],
  ['NGN', 'Nigeria', 'BANK / E-wallet / BANK USSD / Plampay'],
  ['ZAR', 'South Africa', 'BANK'],
  ['COP', 'Colombia', 'BANK'],
  ['AED', 'United Arab Emirates', 'BANK'],
  ['JOD', 'Jordan', 'BANK'],
  ['MXN', 'Mexico', 'BANK / OXXO / CASH'],
  ['NPR', 'Nepal', 'BANK / E-wallet'],
  ['INR', 'India', 'UPI QR / UPI INTENT'],
  ['CRYPTO', 'Cryptocurrency', 'USDT / USDC / BTC / ETH / BNB'],
] as const;

const videos = ['green', 'purple', 'pink', 'blue'];

export function PaymentCoverage() {
  const reducedMotion = useReducedMotion();
  return (
    <section aria-labelledby="payment-coverage-heading" className="relative bg-[#faf7f2] px-5 py-20 text-[#0b47bd] md:px-10">
      <div className="relative mx-auto max-w-[1360px]">
        <div className="mb-12 text-center lg:sticky lg:top-0 lg:mx-auto lg:mb-0 lg:flex lg:h-svh lg:w-[32%] lg:flex-col lg:items-center lg:justify-center">
          <h2 id="payment-coverage-heading" className="text-4xl font-light leading-tight xl:text-5xl">Global Coverage</h2>
          <p className="mt-5 text-lg font-medium">One Partner. Multiple Markets.</p>
          <a href={withBasePath('/contact/')} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2b6fff] px-6 py-3 font-semibold text-white">
            Get a Demo <ArrowUpRight className="size-4" />
          </a>
        </div>
        <div className="relative flex flex-col gap-8 lg:-mt-[70svh] lg:gap-0 lg:pb-[25svh]" data-payment-coverage>
          {markets.map(([currency, country, methods], index) => (
            <motion.article
              key={currency}
              initial={reducedMotion ? false : { opacity: 0, y: 70, rotate: index % 2 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={`w-full overflow-hidden rounded-lg bg-[#0f46d9] p-3 text-white shadow-[0_18px_45px_rgba(6,20,46,0.18)] sm:mx-auto sm:max-w-[420px] lg:mx-0 lg:mb-16 lg:w-[30%] lg:max-w-[350px] ${index % 2 ? 'lg:self-start' : 'lg:self-end'}`}
            >
              <div className="relative aspect-[1.5] overflow-hidden rounded-md bg-[#06142e]">
                <AnimatedVideo src={publicAsset(`/Growth/${videos[index % videos.length]}.mp4`)} autoPlay={!reducedMotion} loop muted playsInline aria-hidden="true" className="h-full w-full object-cover" />
                <span className="absolute bottom-3 left-3 rounded bg-[#06142e]/90 px-3 py-1 text-2xl font-bold">{currency}</span>
              </div>
              <div className="px-2 pb-5 pt-5">
                <h3 className="text-2xl font-semibold leading-tight">{country}</h3>
                <p className="mt-3 min-h-12 text-base leading-relaxed">{methods}</p>
                <p className="mt-5 flex items-center gap-2 text-sm font-semibold"><span className="size-2 shrink-0 rounded-full bg-[#8effd3]" aria-hidden="true" />Available 24/7</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
