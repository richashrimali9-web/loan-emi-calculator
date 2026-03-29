import React from 'react';
import { CheckCircle, AlertCircle, TrendingUp, Lock } from 'lucide-react';
import { Card } from '../ui/card';

export const CalculatorMethodology: React.FC = () => {
  return (
    <section className="w-full py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            How Our Calculator Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transparency & Trust: Understand the methodology behind every calculation
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Formula & Method */}
          <Card className="p-8 bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-900">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Calculation Method
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 border-l-4 border-green-600">
                <p className="font-mono text-sm font-bold text-green-900 dark:text-green-300 mb-2">
                  EMI = P × r × (1+r)^n ÷ [(1+r)^n - 1]
                </p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-3">
                  <li><strong>P</strong> = Principal (loan amount in ₹)</li>
                  <li><strong>r</strong> = Monthly interest rate (annual ÷ 12)</li>
                  <li><strong>n</strong> = Total months (tenure × 12)</li>
                </ul>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm">
                ✓ We use the <strong>declining balance method</strong> — the standard used by all Indian banks and RBI
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                ✓ Interest is calculated on the <strong>outstanding principal only</strong>, not the full amount
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                ✓ EMI remains constant throughout the tenure (for fixed-rate loans)
              </p>
            </div>
          </Card>

          {/* Data Sources */}
          <Card className="p-8 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-900">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Data & Verification
              </h3>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Interest Rates</p>
                  <p className="text-gray-600 dark:text-gray-400">Updated daily from HDFC, ICICI, SBI, Axis Bank</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">RBI Compliance</p>
                  <p className="text-gray-600 dark:text-gray-400">All calculations verified against RBI guidelines</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Tax Benefits</p>
                  <p className="text-gray-600 dark:text-gray-400">Cross-checked with Income Tax Act 1961</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Last Verified</p>
                  <p className="text-gray-600 dark:text-gray-400">February 24, 2026 | Updated daily</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* What We Assume */}
        <Card className="p-8 bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-900 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-orange-600" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              What We Assume (Limitations)
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-3">✓ Our Assumptions:</p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Constant interest rate (no floating adjustments)</li>
                <li>• No prepayments or part-payments</li>
                <li>• EMI starts immediately after disbursal</li>
                <li>• Standard declining balance method</li>
                <li>• 12 EMIs paid every calendar year</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-3">✗ We Don't Include:</p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Processing fees (typically 0.5–2%)</li>
                <li>• Insurance premiums or charges</li>
                <li>• Valuation, legal, or documentation costs</li>
                <li>• GST on insurance/charges (varies)</li>
                <li>• Late payment penalties or bounce charges</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Why Results May Vary */}
        <Card className="p-8 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-900">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Why Your Bank's EMI Might Differ
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-4">
              <p className="font-semibold text-purple-900 dark:text-purple-300 mb-2">Rounding Methods</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Banks may round EMI to nearest ₹100. Our calculator shows exact values.
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-4">
              <p className="font-semibold text-purple-900 dark:text-purple-300 mb-2">Floating Rates</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                If your loan has floating rate, EMI changes when rates reset (usually quarterly).
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-4">
              <p className="font-semibold text-purple-900 dark:text-purple-300 mb-2">Hidden Charges</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Insurance, processing fee, or charges may be bundled into your actual EMI.
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border-l-4 border-yellow-500">
            <strong>Bottom Line:</strong> Our calculator results may vary by ₹100–₹1,000 from your bank's EMI. Always request an official amortization schedule from your lender for final verification.
          </p>
        </Card>
      </div>
    </section>
  );
};
