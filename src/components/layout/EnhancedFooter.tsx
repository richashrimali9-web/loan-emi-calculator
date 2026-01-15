import React from 'react';
import { Calculator, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

interface EnhancedFooterProps {
  onNavigate?: (section: string) => void;
}

export const EnhancedFooter: React.FC<EnhancedFooterProps> = ({ onNavigate }) => {
  const handleNavClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">EMI Calculator</h3>
                <p className="text-xs text-gray-400">Smart Loan Planning</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted platform for loan calculations and financial planning. Compare loans, calculate EMIs, and make informed borrowing decisions.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-blue-400 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-blue-700 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="text-sm hover:text-purple-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="text-sm hover:text-purple-400 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('blog')}
                  className="text-sm hover:text-purple-400 transition-colors"
                >
                  Blog & Resources
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('faq')}
                  className="text-sm hover:text-purple-400 transition-colors"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="text-sm hover:text-purple-400 transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Calculators */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Calculators</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavClick('home-loan')}
                  className="text-sm hover:text-purple-400 transition-colors"
                >
                  Home Loan Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('personal-loan')}
                  className="text-sm hover:text-purple-400 transition-colors"
                >
                  Personal Loan Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('car-loan')}
                  className="text-sm hover:text-purple-400 transition-colors"
                >
                  Car Loan Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('business-loan')}
                  className="text-sm hover:text-purple-400 transition-colors"
                >
                  Business Loan Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('education-loan')}
                  className="text-sm hover:text-purple-400 transition-colors"
                >
                  Education Loan Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">Email</p>
                  <a
                    href="mailto:richa.shrimali9@gmail.com"
                    className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    richa.shrimali9@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">Phone</p>
                  <a
                    href="tel:+919028727209"
                    className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    +91 9028727209
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">Address</p>
                  <p className="text-sm text-gray-400">
                    Mansarovar<br />
                    Jaipur, Rajasthan
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            {/* Copyright */}
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} EMI Calculator. All rights reserved.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center justify-center gap-6">
              <a
                href="/privacy-policy/"
                className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service/"
                className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
              >
                Terms of Service
              </a>
              <button
                onClick={() => handleNavClick('faq')}
                className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
              >
                Disclaimer
              </button>
            </div>
          </div>

          {/* Disclaimer Text */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              <strong>Disclaimer:</strong> This EMI calculator provides indicative results based on the inputs provided. 
              Actual loan terms, interest rates, and EMI amounts may vary based on lender policies, credit score, income verification, 
              and market conditions. The calculator is for informational purposes only and does not constitute financial advice. 
              We recommend consulting with qualified financial advisors and comparing offers from multiple lenders before making any loan decisions. 
              Interest rates shown are approximate and subject to change without notice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
