import React from 'react';
import { BookOpen, Calculator, TrendingUp } from 'lucide-react';
import { LOAN_EDUCATION_DATA } from '../../data/content';
import { Card } from '../ui/card';

export const LoanEducationSection: React.FC = () => {
  return (
    <section id="education" className="w-full py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {LOAN_EDUCATION_DATA.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {LOAN_EDUCATION_DATA.description}
          </p>
        </div>

        {/* EMI Formula Card */}
        <Card className="mb-12 p-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-2 border-indigo-200 dark:border-indigo-800">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              The EMI Formula
            </h3>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 border-2 border-indigo-300 dark:border-indigo-700">
            <p className="text-3xl font-mono text-center text-indigo-700 dark:text-indigo-300 font-bold">
              {LOAN_EDUCATION_DATA.formula}
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Where P = Principal, R = Monthly Interest Rate, N = Loan Tenure in Months
          </p>
        </Card>

        {/* Variables Explanation */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            Understanding the Variables
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {LOAN_EDUCATION_DATA.variables.map((variable, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-2 border-purple-100 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-600">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                    {variable.symbol}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    {variable.name}
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {variable.description}
                </p>
                <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 border-l-4 border-purple-500">
                  <p className="text-sm font-semibold text-purple-900 dark:text-purple-300">
                    Example:
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    {variable.example}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Calculation Examples */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Real-World Calculation Examples
          </h3>
          <div className="grid lg:grid-cols-3 gap-6">
            {LOAN_EDUCATION_DATA.examples.map((example, index) => (
              <Card key={index} className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-blue-200 dark:border-blue-800">
                <h4 className="text-xl font-bold mb-4 text-blue-900 dark:text-blue-300">
                  {example.title}
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                      Scenario
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {example.scenario}
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                      Calculation
                    </p>
                    <p className="text-xs font-mono text-gray-700 dark:text-gray-300 break-words">
                      {example.calculation}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-4 text-white">
                    <p className="text-xs uppercase tracking-wide mb-2 opacity-90">
                      Result
                    </p>
                    <p className="text-sm font-bold">
                      {example.result}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Takeaways */}
        <Card className="mt-12 p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-200 dark:border-green-800">
          <h3 className="text-2xl font-bold mb-4 text-green-900 dark:text-green-300">
            Key Takeaways
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Lower interest rate</strong> significantly reduces your EMI and total interest paid over the loan tenure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Shorter tenure</strong> means higher EMI but saves lakhs in interest. Choose based on your monthly budget.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Larger down payment</strong> reduces principal amount, lowering both EMI and total cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Prepayment</strong> is your best friend - even small annual prepayments can reduce tenure by years.
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </section>
  );
};
