import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQ_DATA } from '../../data/content';
import { Card } from '../ui/card';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-16 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about loans, EMI calculations, and smart borrowing decisions
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg border-2 border-purple-100 dark:border-purple-800"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0 mt-1">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 pt-2">
                  <div className="pl-4 border-l-4 border-purple-300 dark:border-purple-700">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Still have questions? Our loan experts are here to help you.
          </p>
          <button 
            onClick={() => {
              window.location.href = 'mailto:richa.shrimali9@gmail.com';
            }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};
