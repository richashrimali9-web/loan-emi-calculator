import React from 'react';
import { Lightbulb, TrendingUp } from 'lucide-react';
import { TIPS_DATA } from '../../data/content';
import { Card } from '../ui/card';

export const TipsSection: React.FC = () => {
  return (
    <section id="tips" className="w-full py-16 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-yellow-900/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl mb-4">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Expert Tips to Save on Your Loan
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Smart strategies to reduce your EMI, save lakhs in interest, and achieve financial freedom faster
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {TIPS_DATA.map((tip, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 border-2 border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600 hover:-translate-y-2 bg-white dark:bg-gray-800"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-4xl mb-4 shadow-lg">
                {tip.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {tip.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed text-sm">
                {tip.description}
              </p>

              {/* Impact */}
              <div className="mt-4 pt-4 border-t-2 border-orange-100 dark:border-orange-900">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                      Potential Impact
                    </p>
                    <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                      {tip.impact}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Pro Tips */}
        <Card className="p-8 bg-gradient-to-r from-orange-600 to-amber-600 text-white">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Lightbulb className="w-7 h-7" />
            Pro Tips from Financial Experts
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold mb-2 text-lg">📊 Monitor Market Trends</h4>
              <p className="text-white/90 text-sm leading-relaxed">
                Keep an eye on RBI repo rate changes. When rates drop, consider refinancing your existing loan to benefit from lower interest rates. Even a 0.5% reduction can save significant amounts.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-lg">💳 Leverage Balance Transfer</h4>
              <p className="text-white/90 text-sm leading-relaxed">
                If your credit score has improved or interest rates have fallen, transfer your loan to another bank offering better rates. Just ensure the savings outweigh transfer costs.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-lg">📅 Align EMI with Salary Date</h4>
              <p className="text-white/90 text-sm leading-relaxed">
                Schedule your EMI deduction 2-3 days after salary credit to avoid insufficient balance charges. Most banks allow you to choose your EMI date during loan application.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-lg">🎯 Round Up Your EMI</h4>
              <p className="text-white/90 text-sm leading-relaxed">
                If your EMI is ₹18,750, round it up to ₹20,000. This small increase acts as partial prepayment and can reduce your tenure by 2-3 years, saving substantial interest.
              </p>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
            Ready to calculate your optimized EMI with these strategies?
          </p>
          <button 
            onClick={() => {
              const el = document.getElementById('calculators');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-lg rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Calculate Your EMI Now
          </button>
        </div>
      </div>
    </section>
  );
};
