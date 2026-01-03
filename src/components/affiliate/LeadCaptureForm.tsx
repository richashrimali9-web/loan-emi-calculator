import React, { useState } from 'react';
import { Send, Shield, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface FormData {
  name: string;
  phone: string;
  email: string;
  loanAmount: string;
  city: string;
  employmentType: string;
}

interface FormErrors {
  [key: string]: string;
}

export const LeadCaptureForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    loanAmount: '',
    city: '',
    employmentType: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Enter valid 10-digit Indian mobile number';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter valid email address';
    }

    // Loan amount validation
    if (!formData.loanAmount.trim()) {
      newErrors.loanAmount = 'Loan amount is required';
    } else if (isNaN(Number(formData.loanAmount)) || Number(formData.loanAmount) <= 0) {
      newErrors.loanAmount = 'Enter valid loan amount';
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    // Employment type validation
    if (!formData.employmentType) {
      newErrors.employmentType = 'Employment type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          loanAmount: '',
          city: '',
          employmentType: '',
        });
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <section className="w-full py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-green-900/20">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center border-2 border-green-300 dark:border-green-700">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-4">
              Thank You!
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
              Your loan inquiry has been submitted successfully.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Our loan experts will contact you within 24 hours with the best offers.
            </p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-capture" className="w-full py-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl mb-4">
            <Send className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Get Personalized Loan Offers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Fill in your details and receive customized loan offers from top banks within 24 hours
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <Card className="lg:col-span-2 p-8 border-2 border-blue-200 dark:border-blue-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-sm font-semibold">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone & Email */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-sm font-semibold">
                    Mobile Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                    maxLength={10}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-semibold">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Loan Amount & City */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="loanAmount" className="text-sm font-semibold">
                    Loan Amount (₹) *
                  </Label>
                  <Input
                    id="loanAmount"
                    name="loanAmount"
                    type="number"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    placeholder="e.g., 2500000"
                    className={`mt-1 ${errors.loanAmount ? 'border-red-500' : ''}`}
                  />
                  {errors.loanAmount && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.loanAmount}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="city" className="text-sm font-semibold">
                    City *
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Your city"
                    className={`mt-1 ${errors.city ? 'border-red-500' : ''}`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.city}
                    </p>
                  )}
                </div>
              </div>

              {/* Employment Type */}
              <div>
                <Label htmlFor="employmentType" className="text-sm font-semibold">
                  Employment Type *
                </Label>
                <select
                  id="employmentType"
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className={`mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 ${
                    errors.employmentType ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  }`}
                >
                  <option value="">Select employment type</option>
                  <option value="salaried">Salaried</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="business">Business Owner</option>
                  <option value="professional">Professional</option>
                </select>
                {errors.employmentType && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.employmentType}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Get Best Offers
                    <Send className="w-5 h-5" />
                  </span>
                )}
              </Button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                By submitting, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </Card>

          {/* Trust Indicators */}
          <div className="space-y-6">
            <Card className="p-6 border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
              <Shield className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                100% Free Service
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No hidden charges. We help you find the best loan offers at absolutely no cost.
              </p>
            </Card>

            <Card className="p-6 border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
              <Users className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                50,000+ Satisfied Users
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Join thousands who have found their perfect loan through our platform.
              </p>
            </Card>

            <Card className="p-6 border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
              <CheckCircle className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                Quick Response
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get personalized loan offers from multiple banks within 24 hours.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
