import React, { useState } from 'react';
import { Calculator, Menu, X, ChevronDown, Home as HomeIcon, BookOpen, Info, Phone } from 'lucide-react';
import { Button } from '../ui/button';

interface EnhancedHeaderProps {
  onNavigate?: (section: string) => void;
}

export const EnhancedHeader: React.FC<EnhancedHeaderProps> = ({ onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalculatorsDropdownOpen, setIsCalculatorsDropdownOpen] = useState(false);

  const handleNavClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    }
    setIsMobileMenuOpen(false);
    setIsCalculatorsDropdownOpen(false);
  };

  const calculatorTypes = [
    { id: 'home-loan', label: 'Home Loan EMI' },
    { id: 'personal-loan', label: 'Personal Loan EMI' },
    { id: 'car-loan', label: 'Car Loan EMI' },
    { id: 'business-loan', label: 'Business Loan EMI' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                EMI Calculator
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Smart Loan Planning
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              onClick={() => handleNavClick('home')}
              className="gap-2"
            >
              <HomeIcon className="w-4 h-4" />
              Home
            </Button>

            {/* Calculators Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsCalculatorsDropdownOpen(!isCalculatorsDropdownOpen)}
                className="gap-2"
              >
                <Calculator className="w-4 h-4" />
                Calculators
                <ChevronDown className={`w-4 h-4 transition-transform ${isCalculatorsDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>

              {isCalculatorsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                  {calculatorTypes.map((calc) => (
                    <button
                      key={calc.id}
                      onClick={() => handleNavClick(calc.id)}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {calc.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              onClick={() => handleNavClick('blog')}
              className="gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Blog
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleNavClick('about')}
              className="gap-2"
            >
              <Info className="w-4 h-4" />
              About
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleNavClick('contact')}
              className="gap-2"
            >
              <Phone className="w-4 h-4" />
              Contact
            </Button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => handleNavClick('apply')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg"
            >
              Apply for Loan
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="space-y-2">
              <Button
                variant="ghost"
                onClick={() => handleNavClick('home')}
                className="w-full justify-start gap-2"
              >
                <HomeIcon className="w-4 h-4" />
                Home
              </Button>

              {/* Mobile Calculators */}
              <div className="pl-4 space-y-1">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 px-3 py-2">
                  Calculators
                </p>
                {calculatorTypes.map((calc) => (
                  <Button
                    key={calc.id}
                    variant="ghost"
                    onClick={() => handleNavClick(calc.id)}
                    className="w-full justify-start text-sm"
                  >
                    {calc.label}
                  </Button>
                ))}
              </div>

              <Button
                variant="ghost"
                onClick={() => handleNavClick('blog')}
                className="w-full justify-start gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Blog
              </Button>

              <Button
                variant="ghost"
                onClick={() => handleNavClick('about')}
                className="w-full justify-start gap-2"
              >
                <Info className="w-4 h-4" />
                About
              </Button>

              <Button
                variant="ghost"
                onClick={() => handleNavClick('contact')}
                className="w-full justify-start gap-2"
              >
                <Phone className="w-4 h-4" />
                Contact
              </Button>

              <Button
                onClick={() => handleNavClick('apply')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
              >
                Apply for Loan
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
