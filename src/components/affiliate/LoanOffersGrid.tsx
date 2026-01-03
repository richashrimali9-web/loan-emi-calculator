import React from 'react';
import { Star, TrendingUp, CheckCircle, ExternalLink } from 'lucide-react';
import { BANK_OFFERS_DATA } from '../../data/content';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface LoanOffersGridProps {
  onApplyClick?: (bankName: string) => void;
}

export const LoanOffersGrid: React.FC<LoanOffersGridProps> = ({ onApplyClick }) => {
  const handleApply = (bankName: string) => {
    if (onApplyClick) {
      onApplyClick(bankName);
    } else {
      console.log(`Apply clicked for: ${bankName}`);
      // In production, this would redirect to affiliate link or open application modal
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : index < rating
                ? 'fill-yellow-200 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900/20 dark:to-teal-900/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Best Loan Offers in India
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Compare top banks and choose the best loan offer with competitive interest rates and flexible terms
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {BANK_OFFERS_DATA.map((offer, index) => (
            <Card
              key={index}
              className="relative p-6 hover:shadow-2xl transition-all duration-300 border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 overflow-hidden group"
            >
              {/* Special Offer Badge */}
              {offer.specialOffer && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  SPECIAL OFFER
                </div>
              )}

              {/* Bank Logo Placeholder */}
              <div className="w-full h-20 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  {offer.name}
                </h3>
              </div>

              {/* Rating */}
              <div className="mb-4">
                {renderStars(offer.rating)}
              </div>

              {/* Interest Rate */}
              <div className="mb-4 p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg text-white">
                <p className="text-xs uppercase tracking-wide mb-1 opacity-90">
                  Interest Rate
                </p>
                <p className="text-2xl font-bold">
                  {offer.interestRate}
                </p>
              </div>

              {/* Processing Fee */}
              <div className="mb-4 flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Processing Fee
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {offer.processingFee}
                </span>
              </div>

              {/* Features */}
              <div className="mb-6">
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                  Key Features:
                </p>
                <ul className="space-y-2">
                  {offer.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Special Offer Details */}
              {offer.specialOffer && (
                <div className="mb-4 p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-800">
                  <p className="text-xs font-semibold text-pink-700 dark:text-pink-300 flex items-center gap-1">
                    <span>🎉</span>
                    {offer.specialOffer}
                  </p>
                </div>
              )}

              {/* Apply Button */}
              <Button
                onClick={() => handleApply(offer.name)}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Apply Now
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border-2 border-green-200 dark:border-green-800">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                50,000+
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Happy Customers
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                ₹500 Cr+
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Loans Facilitated
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                4.8/5
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Average Rating
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                100%
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Free Service
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            * Interest rates and offers are indicative and subject to change. Final rates depend on credit score, income, loan amount, and bank policies. 
            Please check with respective banks for current offers and terms.
          </p>
        </div>
      </div>
    </section>
  );
};
