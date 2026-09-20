import { lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { UnifyCards } from './components/UnifyCards';
import { SpeedStack } from './components/SpeedStack';
import { ProductFeatures } from './components/ProductFeatures';
import { PaymentSolutions } from './components/PaymentSolutions';
import { WhyUs, WhyUsPage } from './components/WhyUs';
import { StatBanner } from './components/StatBanner';
import { ContactPage, ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { pagePathname } from './lib/routing';

const ProductsPage = lazy(() => import('./components/ProductsPage').then(module => ({ default: module.ProductsPage })));
const SolutionsPage = lazy(() => import('./components/SolutionsPage').then(module => ({ default: module.SolutionsPage })));
const AboutPage = lazy(() => import('./components/AboutPage').then(module => ({ default: module.AboutPage })));
const TechnologyPage = lazy(() => import('./components/TechnologyPage').then(module => ({ default: module.TechnologyPage })));
const OperationsPage = lazy(() => import('./components/OperationsPage').then(module => ({ default: module.OperationsPage })));

function Pages() {
  const pathname = pagePathname();

  if (pathname === '/operations') {
    return <OperationsPage />;
  }

  if (pathname === '/technology') {
    return <TechnologyPage />;
  }

  if (pathname === '/products') {
    return <ProductsPage />;
  }

  if (pathname === '/solutions') {
    return <SolutionsPage />;
  }

  if (pathname === '/about') {
    return <AboutPage />;
  }

  if (pathname === '/whyus' || pathname === '/why-us') {
    return <WhyUsPage />;
  }

  if (pathname === '/contact') {
    return <ContactPage />;
  }

  return (
    <div className="min-h-screen bg-[#070913] text-white selection:bg-blue-600 selection:text-white font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <UnifyCards />
        <SpeedStack />
        <ProductFeatures />
        <PaymentSolutions />
        <WhyUs />
        <ContactSection />
        <StatBanner />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}

export function App() {
  return <Suspense fallback={<div className="grid min-h-screen place-items-center bg-[#06142e] text-white" role="status">Loading...</div>}><Pages /></Suspense>;
}

export default App;
