import { useState } from 'react';
import { ModernGradientDesign } from './components/ModernGradientDesign';
import { EnhancedHeader } from './components/layout/EnhancedHeader';
import { LoanEducationSection } from './components/content/LoanEducationSection';
import { TipsSection } from './components/content/TipsSection';
import { LoanTypesSection } from './components/content/LoanTypesSection';
import { FAQSection } from './components/content/FAQSection';
import { LoanOffersGrid } from './components/affiliate/LoanOffersGrid';
import { LeadCaptureForm } from './components/affiliate/LeadCaptureForm';
import { EnhancedFooter } from './components/layout/EnhancedFooter';
import { Button } from './components/ui/button';

export default function App() {
  const [selectedDesign, setSelectedDesign] = useState<'modern' | 'minimal' | 'chart' | 'glass'>('modern');

  // const designs = [
  //   { id: 'modern' as const, name: 'Modern Gradient', icon: '🎨' },
  //   { id: 'minimal' as const, name: 'Minimal Clean', icon: '✨' },
  //   { id: 'chart' as const, name: 'With Charts', icon: '📊' },
  //   { id: 'glass' as const, name: 'Glassmorphism', icon: '💎' },
  // ];

  const handleNavigation = (section: string) => {
    console.log('Navigation clicked:', section);

    const map: Record<string, string> = {
      blog: 'education',
      about: 'tips',
      contact: 'faq',
      apply: 'lead-capture',
    };

    const calculatorIds = ['home-loan', 'personal-loan', 'car-loan', 'business-loan'];

    // If it's a calculator-specific id, try to scroll to that anchor (or to calculators container)
    if (calculatorIds.includes(section)) {
      const el = document.getElementById(section) || document.getElementById('calculators');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const targetId = map[section] || section;

    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.warn('No element found for navigation target:', targetId);
    }
  };

  const handleLoanApply = (bankName: string) => {
    console.log('Apply for loan clicked:', bankName);
    // In production, redirect to affiliate link or open application modal
    // Example: window.open('https://affiliate-link.com/bank-name', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header with Navigation */}
      <EnhancedHeader onNavigate={handleNavigation} />

      {/* Main Calculator Section */}
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Design Selector */}
        <div className="mb-8 text-center">
          <h1 className="text-gray-800 mb-2">Loan EMI Calculator - Design Options</h1>
          <p className="text-gray-600 mb-6">Choose your preferred design style</p>
          
          {/* <div className="flex flex-wrap justify-center gap-3">
            {designs.map((design) => (
              <Button
                key={design.id}
                onClick={() => setSelectedDesign(design.id)}
                variant={selectedDesign === design.id ? 'default' : 'outline'}
                className="gap-2"
              >
                <span>{design.icon}</span>
                {design.name}
              </Button>
            ))}
          </div> */}
        </div>

        {/* Calculator Design Display */}
        {/* Anchors for individual calculators so header links can scroll to them */}
        <div id="home-loan" />
        <div id="personal-loan" />
        <div id="car-loan" />
        <div id="business-loan" />
        <div id="calculators" className="transition-all duration-300">
          {selectedDesign === 'modern' && <ModernGradientDesign />}
          {/* {selectedDesign === 'minimal' && <MinimalCleanDesign />} */}
          {/* {selectedDesign === 'chart' && <ChartVisualizationDesign />} */}
          {/* {selectedDesign === 'glass' && <GlassmorphismDesign />} */}
        </div>
      </div>

      {/* Educational Content Sections */}
      <LoanEducationSection />
      
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

      {/* Enhanced Footer */}
      <EnhancedFooter onNavigate={handleNavigation} />
    </div>
  );
}
