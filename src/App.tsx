import { ModernGradientDesign } from './components/ModernGradientDesign';
import { EnhancedHeader } from './components/layout/EnhancedHeader';
import { useEffect } from 'react';
import { LoanEducationSection } from './components/content/LoanEducationSection';
import { CalculatorMethodology } from './components/content/CalculatorMethodology';
import { TipsSection } from './components/content/TipsSection';
import { LoanTypesSection } from './components/content/LoanTypesSection';
import { FAQSection } from './components/content/FAQSection';
import { LoanOffersGrid } from './components/affiliate/LoanOffersGrid';
import { LeadCaptureForm } from './components/affiliate/LeadCaptureForm';
import { EnhancedFooter } from './components/layout/EnhancedFooter';

export default function App() {
  // adjust meta tags and scroll when loaded on a loan-specific path (including /calculators/* static pages)
  useEffect(() => {
    const path = window.location.pathname.replace(/\/$/, ''); // remove trailing slash
    const mapping: Record<string, {title: string; desc: string; anchor: string}> = {
      '/home-loan': { title: 'Home Loan EMI Calculator', desc: 'Calculate EMI for home loans with down payment, tenure and rate comparisons.', anchor: 'home-loan' },
      '/personal-loan': { title: 'Personal Loan EMI Calculator', desc: 'Estimate EMI for personal loans and compare different tenures and rates.', anchor: 'personal-loan' },
      '/car-loan': { title: 'Car Loan EMI Calculator', desc: 'Compute car loan EMIs and plan vehicle financing effectively.', anchor: 'car-loan' },
      '/business-loan': { title: 'Business Loan EMI Calculator', desc: 'Plan EMIs for business loans and see how interest affects cash flow.', anchor: 'business-loan' },
      // static calculators paths
      '/calculators/home-loan.html': { title: 'Home Loan EMI Calculator', desc: 'Calculate EMI for home loans with down payment, tenure and rate comparisons.', anchor: 'home-loan' },
      '/calculators/personal-loan.html': { title: 'Personal Loan EMI Calculator', desc: 'Estimate EMI for personal loans and compare different tenures and rates.', anchor: 'personal-loan' },
      '/calculators/car-loan.html': { title: 'Car Loan EMI Calculator', desc: 'Compute car loan EMIs and plan vehicle financing effectively.', anchor: 'car-loan' },
      '/calculators/business-loan.html': { title: 'Business Loan EMI Calculator', desc: 'Plan EMIs for business loans and see how interest affects cash flow.', anchor: 'business-loan' }
    };
    const entry = mapping[path];
    if (entry) {
      document.title = entry.title + ' — Loan EMI Calculator';
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', entry.desc);
      setTimeout(() => {
        const el = document.getElementById(entry.anchor) || document.getElementById('calculators');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    }
  }, []);

  // Hide SPA header/footer when the app is embedded inside a static calculator page to avoid duplication
  const [isEmbeddedPage, setIsEmbeddedPage] = React.useState(false);
  useEffect(() => {
    const p = window.location.pathname || '';
    if (p.startsWith('/calculators/')) setIsEmbeddedPage(true);
  }, []);

  const handleNavigation = (section: string) => {
    console.log('Navigation clicked:', section);

    // External pages that should redirect
    const externalPages: Record<string, string> = {
      privacy: '/privacy-policy/',
      about: '/about/',
      contact: '/contact/',
      blog: '/blog/',
      guides: '/guides/',
    };

    // If it's an external page, redirect
    if (externalPages[section]) {
      window.location.href = externalPages[section];
      return;
    }

    const map: Record<string, string> = {
      apply: 'contact',
    };

    const calculatorIds = ['home-loan', 'personal-loan', 'car-loan', 'business-loan'];

    // Calculator-specific pages: navigate to dedicated HTML file so each loan type has its own landing page
    if (calculatorIds.includes(section)) {
      const targetPath = `/calculators/${section}.html`;
      if (window.location.pathname !== targetPath) {
        window.location.href = targetPath;
        return;
      }
      // if already on the target path, scroll to the anchor inside the SPA
      const el = document.getElementById(section) || document.getElementById('calculators');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const targetId = map[section] || section;

    // If the mapped target is an external page key, redirect to that external page
    if (externalPages[targetId]) {
      window.location.href = externalPages[targetId];
      return;
    }

    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLoanApply = (bankName: string) => {
    console.log('Apply for loan clicked:', bankName);
    // In production, redirect to affiliate link or open application modal
    // Example: window.open('https://affiliate-link.com/bank-name', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header with Navigation (hidden on static embedded calculator pages) */}
      {!isEmbeddedPage && <EnhancedHeader onNavigate={handleNavigation} />}

      {/* Main Calculator Section */}
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Calculator Design Display */}
        {/* Anchors for individual calculators so header links can scroll to them */}
        <div id="home-loan" />
        <div id="personal-loan" />
        <div id="car-loan" />
        <div id="business-loan" />
        <div id="calculators" className="transition-all duration-300">
          <ModernGradientDesign />
        </div>
      </div>

      {/* Educational Content Sections */}
      <LoanEducationSection />

      {/* Calculator Methodology & Transparency */}
      <CalculatorMethodology />
      
      {/* Tips Section */}
      <TipsSection />
      
      {/* Loan Types Comparison */}
      <LoanTypesSection />
      
      {/* Bank Offers Grid */}
      <LoanOffersGrid onApplyClick={handleLoanApply} />
      
      {/* Lead Capture Form */}
      <LeadCaptureForm />
      
      {/* FAQ Section */}
      <FAQSection />

      {/* Enhanced Footer (hidden on static embedded calculator pages) */}
      {!isEmbeddedPage && <EnhancedFooter onNavigate={handleNavigation} />}
    </div>
  );
}
