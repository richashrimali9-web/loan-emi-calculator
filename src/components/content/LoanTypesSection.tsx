import React from 'react';
import { Home, CreditCard, Car, GraduationCap, Briefcase, Building } from 'lucide-react';
import { LOAN_TYPES_DATA } from '../../data/content';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

const loanIcons: { [key: string]: React.ComponentType<any> } = {
  'Home Loans': Home,
  'Personal Loans': CreditCard,
  'Car Loans': Car,
  'Education Loans': GraduationCap,
  'Business Loans': Briefcase,
  'Loan Against Property': Building,
};

export const LoanTypesSection: React.FC = () => {
  return (
    <section id="loan-types" className="w-full py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Types of Loans in India
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive guide to different loan types, their features, interest rates, and ideal use cases for Indian borrowers
          </p>
        </div>

        {/* Loan Types Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {LOAN_TYPES_DATA.map((loan, index) => {
            const IconComponent = loanIcons[loan.name] || Briefcase;
            
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 border-2 border-indigo-100 dark:border-indigo-800 hover:border-indigo-300 dark:hover:border-indigo-600"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {loan.name}
                      </h3>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-300 dark:border-green-700">
                    {loan.interestRange}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed text-sm">
                  {loan.description}
                </p>

                {/* Tenure */}
                <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                    Typical Tenure
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {loan.tenure}
                  </p>
                </div>

                {/* Key Features */}
                <div className="mb-4">
                  <p className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                    Key Features:
                  </p>
                  <ul className="space-y-2">
                    {loan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0">✓</span>
                        <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tax Benefits */}
                {loan.taxBenefits && (
                  <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-xs uppercase tracking-wide text-green-700 dark:text-green-400 mb-1 font-semibold">
                      💰 Tax Benefits
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-300">
                      {loan.taxBenefits}
                    </p>
                  </div>
                )}

                {/* Ideal For */}
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                  <p className="text-xs uppercase tracking-wide text-indigo-700 dark:text-indigo-400 mb-1 font-semibold">
                    👥 Ideal For
                  </p>
                  <p className="text-sm text-indigo-800 dark:text-indigo-300">
                    {loan.idealFor}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Comparison Tips */}
        <Card className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-2 border-indigo-200 dark:border-indigo-800">
          <h3 className="text-2xl font-bold mb-6 text-indigo-900 dark:text-indigo-300">
            How to Choose the Right Loan Type
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-indigo-800 dark:text-indigo-300 mb-2 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Purpose Matters
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Match the loan type to your specific need. Home loans for property, car loans for vehicles, and personal loans for flexible use. Secured loans offer better rates than unsecured ones.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-indigo-800 dark:text-indigo-300 mb-2 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Compare Total Cost
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Don't just look at EMI or interest rate. Calculate total repayment amount including processing fees, insurance, and other charges. Sometimes a slightly higher rate with no fees is cheaper.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-indigo-800 dark:text-indigo-300 mb-2 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Consider Tax Benefits
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Home loans and education loans offer significant tax savings. Factor these benefits when calculating effective interest rate. A 9% home loan may cost effectively 7% after tax benefits.
              </p>
            </div>
          </div>
        </Card>

        {/* Indian Market Specifics */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="p-6 border-2 border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-lg mb-3 text-blue-900 dark:text-blue-300">
              🇮🇳 India-Specific Considerations
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• <strong>CIBIL Score:</strong> Maintain 750+ for best rates</li>
              <li>• <strong>RBI Guidelines:</strong> No prepayment penalty on floating rate home loans</li>
              <li>• <strong>PMAY Scheme:</strong> Interest subsidy for affordable housing</li>
              <li>• <strong>MUDRA Loans:</strong> Collateral-free business loans up to ₹10 lakhs</li>
              <li>• <strong>Section 80C & 24(b):</strong> Tax deductions on home loans</li>
            </ul>
          </Card>

          <Card className="p-6 border-2 border-purple-200 dark:border-purple-800">
            <h4 className="font-bold text-lg mb-3 text-purple-900 dark:text-purple-300">
              ⚠️ Common Mistakes to Avoid
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• <strong>Over-borrowing:</strong> Keep EMI under 40% of income</li>
              <li>• <strong>Ignoring hidden charges:</strong> Read all terms carefully</li>
              <li>• <strong>Choosing only by EMI:</strong> Consider total interest payable</li>
              <li>• <strong>Not comparing offers:</strong> Check at least 3-4 banks</li>
              <li>• <strong>Missing documents:</strong> Keep all papers ready for quick approval</li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
};
