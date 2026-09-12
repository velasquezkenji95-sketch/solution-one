import React from 'react';
import { Home, Layers, Zap, Info, HelpCircle, PhoneCall } from 'lucide-react';
import { Logo } from './Logo';
import { navigateTo, navigateToHash, pagePathname, withBasePath } from '../lib/routing';

const dockItems = [
  { label: 'Products', id: 'products', path: '/products', icon: Layers },
  { label: 'Solutions', id: 'unify', path: '/solutions', icon: Zap },
  { label: 'About Us', id: 'about', path: '/about', icon: Info },
  { label: 'Why Us', id: 'why-us', path: '/WhyUs', icon: HelpCircle },
  { label: 'Contact Us', id: 'contact', path: '/contact', icon: PhoneCall },
];

export const Navbar: React.FC = () => {
  const pathname = pagePathname();
  const isContactPage = pathname === '/contact';

  const scrollToSection = (id: string) => {
    if (id === 'products') {
      navigateTo('/products');
      return;
    }
    if (id === 'unify') {
      navigateTo('/solutions');
      return;
    }
    if (id === 'about') {
      navigateTo('/about');
      return;
    }
    if (id === 'why-us') {
      navigateTo('/WhyUs');
      return;
    }
    if (id === 'contact') {
      navigateTo('/contact');
      return;
    }
    if (pagePathname() !== '/') {
      navigateToHash(id);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-fit z-30">
        <nav className="z-30 h-fit w-full px-5 md:px-10 md:py-8 py-5">
          <div className="flex items-center justify-between">
            <a
              href={withBasePath('/')}
              aria-label="SOLUTION ONE home"
              className={`cursor-pointer ${isContactPage ? 'rounded-full bg-[#0b56d0] px-5 py-3 md:px-7' : ''}`}
            >
              <Logo className="w-40 md:w-fit" darkBackground={!isContactPage} />
            </a>

            <button
              onClick={() => scrollToSection('contact')}
              className="group bg-[#2b6dff] text-white px-3 md:px-5 py-3 rounded-full cursor-pointer md:w-fit hover:bg-[#5ccfff] transition-colors"
            >
              <span className="relative overflow-hidden text-sm md:text-base h-[1.25em] block font-medium">
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">Request a demo</span>
                <span className="absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">Request a demo</span>
              </span>
            </button>
          </div>
        </nav>
      </div>

      <nav className="fixed left-1/2 bottom-6 z-50 -translate-x-1/2 rounded-full bg-[#2563eb]/95 text-white shadow-[0_16px_45px_rgba(37,99,235,0.35)] backdrop-blur-xl max-w-[calc(100vw-24px)] overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-1 p-1.5 whitespace-nowrap">
          <button
            type="button"
            aria-label="Home"
            aria-current={pathname === '/' ? 'page' : undefined}
            onClick={() => {
              if (pagePathname() !== '/') {
                navigateTo('/');
                return;
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`size-11 rounded-full flex items-center justify-center transition-colors shrink-0 ${
              pathname === '/' ? 'bg-white/22 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]' : 'hover:bg-white/14'
            }`}
          >
            <Home className="w-5 h-5" />
          </button>

          {dockItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.path ||
              (item.path === '/WhyUs' && ['/whyus', '/why-us'].includes(pathname.toLowerCase()));
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  isActive
                    ? 'bg-white/18 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]'
                    : 'hover:bg-white/14'
                }`}
              >
                <Icon className="w-4 h-4 md:hidden" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
