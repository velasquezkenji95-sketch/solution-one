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
import { ProductsPage } from './components/ProductsPage';
import { SolutionsPage } from './components/SolutionsPage';
import { AboutPage } from './components/AboutPage';
import { pagePathname } from './lib/routing';

export function App() {
  const pathname = pagePathname();

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

export default App;
