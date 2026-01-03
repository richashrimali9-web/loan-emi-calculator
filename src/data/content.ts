// TypeScript interfaces for content data structures
export interface FAQItem {
  question: string;
  answer: string;
}

export interface LoanEducation {
  title: string;
  description: string;
  formula: string;
  variables: {
    symbol: string;
    name: string;
    description: string;
    example: string;
  }[];
  examples: {
    title: string;
    scenario: string;
    calculation: string;
    result: string;
  }[];
}

export interface Tip {
  title: string;
  description: string;
  icon: string;
  impact: string;
}

export interface LoanType {
  name: string;
  description: string;
  interestRange: string;
  tenure: string;
  features: string[];
  taxBenefits: string;
  idealFor: string;
}

export interface BankOffer {
  name: string;
  interestRate: string;
  processingFee: string;
  features: string[];
  specialOffer?: string;
  rating: number;
}

// FAQ Data - 20 comprehensive items
export const FAQ_DATA: FAQItem[] = [
  {
    question: "What is EMI and how does it work?",
    answer: "EMI stands for Equated Monthly Installment. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMI consists of both principal and interest components. In the initial months, the interest component is higher, and gradually the principal component increases. This systematic repayment method helps borrowers plan their finances better as they know exactly how much they need to pay each month throughout the loan tenure."
  },
  {
    question: "How is EMI calculated mathematically?",
    answer: "EMI is calculated using the formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is the principal loan amount, R is the monthly interest rate (annual rate divided by 12 months and 100), and N is the loan tenure in months. For example, for a loan of ₹10,00,000 at 9% annual interest for 20 years (240 months), R = 9/12/100 = 0.0075, and the EMI would be approximately ₹8,997. This formula ensures that by the end of the tenure, both principal and interest are fully repaid."
  },
  {
    question: "Can I prepay my loan to reduce EMI or tenure?",
    answer: "Yes, most banks in India allow loan prepayment, though policies vary. You can either reduce your EMI amount while keeping the tenure same, or reduce the tenure while keeping EMI constant. Prepayment helps save significant interest over the loan period. However, some banks charge a prepayment penalty of 2-4% on floating rate loans (though RBI has banned this for floating rate home loans). It's advisable to check your loan agreement for prepayment clauses and penalties before making partial or full prepayment."
  },
  {
    question: "What is the ideal loan tenure for different loan types?",
    answer: "The ideal tenure depends on your loan type and financial situation. For home loans, 15-20 years is common, balancing affordable EMIs with reasonable total interest. For car loans, 3-5 years is optimal as vehicle depreciation is rapid. Personal loans typically range from 1-5 years. Longer tenure means lower EMI but higher total interest payment. Shorter tenure means higher EMI but lower overall cost. Consider your age, income stability, and other financial goals. A good rule of thumb is that your EMI should not exceed 40-50% of your monthly income."
  },
  {
    question: "How does my credit score affect my EMI and loan eligibility?",
    answer: "Your CIBIL score (credit score in India) significantly impacts your loan terms. A score above 750 is considered excellent and can help you negotiate lower interest rates (potentially 0.5-2% lower), resulting in substantially reduced EMIs. For example, on a ₹25 lakh home loan for 20 years, a 1% lower interest rate can save you over ₹3 lakhs in total interest. A poor credit score (below 650) may lead to loan rejection or higher interest rates. Banks view high credit scores as indicators of financial discipline and lower default risk."
  },
  {
    question: "What documents are required for a loan application in India?",
    answer: "Standard documents include: (1) Identity proof - Aadhaar card, PAN card, passport, or voter ID, (2) Address proof - utility bills, rental agreement, or Aadhaar, (3) Income proof - last 3-6 months salary slips, bank statements, and Form 16 for salaried individuals; ITR for last 2-3 years for self-employed, (4) Employment proof - offer letter and current employment certificate, (5) Property documents for secured loans, (6) Photographs. Additional documents may include business continuity proof for self-employed, existing loan statements, and GST returns for business owners."
  },
  {
    question: "Fixed vs Floating interest rate - which is better for me?",
    answer: "Fixed interest rates remain constant throughout the loan tenure, providing payment certainty and protection against rate hikes. Floating rates change with market conditions and are typically 1-2.5% lower than fixed rates initially. In a falling interest rate scenario, floating rates are beneficial. For rising rates, fixed loans offer stability. Most Indian banks offer floating rates for home loans. A hybrid option allows you to switch between fixed and floating during the tenure. Consider your risk appetite, market trends, and loan duration. For long-term loans (15+ years), floating rates often prove more economical."
  },
  {
    question: "What is the difference between reducing balance and flat rate method?",
    answer: "Under the flat rate method, interest is calculated on the entire principal amount throughout the loan tenure, making it significantly more expensive. In the reducing balance method (used by most Indian banks), interest is calculated on the outstanding principal, which decreases with each EMI payment. For example, on a ₹5 lakh loan at 10% for 5 years, flat rate EMI would be ₹10,833 while reducing balance EMI would be ₹10,624. More importantly, total interest paid under flat rate (₹1.5 lakhs) is almost double that of reducing balance (₹87,123). Always insist on reducing balance method."
  },
  {
    question: "How much loan can I afford based on my salary?",
    answer: "Financial experts recommend that your EMI should not exceed 40-50% of your monthly take-home salary to maintain financial stability. For example, if your monthly salary is ₹60,000, your maximum EMI should be ₹24,000-₹30,000. Banks typically use FOIR (Fixed Obligation to Income Ratio) of 50-60% for loan eligibility. Calculate your loan amount by considering: current income, existing EMIs, future income growth, dependents, other financial goals, and emergency fund requirements. Use the 50-30-20 budgeting rule: 50% for needs (including EMI), 30% for wants, and 20% for savings."
  },
  {
    question: "What are the tax benefits on home loans in India?",
    answer: "Home loans offer significant tax benefits in India: (1) Section 80C: Deduction up to ₹1.5 lakh on principal repayment, (2) Section 24(b): Deduction up to ₹2 lakh on interest paid for self-occupied property, (3) Section 80EEA: Additional ₹1.5 lakh deduction on interest for first-time buyers (property value up to ₹45 lakhs), (4) For let-out property, entire interest is deductible. These benefits can save you ₹60,000-₹1,00,000 annually in taxes depending on your tax bracket. However, if you sell the property within 5 years, principal tax benefits are reversed."
  },
  {
    question: "Can I transfer my loan to another bank for better rates?",
    answer: "Yes, loan balance transfer (or refinancing) is possible and can save significant money if interest rates have dropped or your credit score has improved. Banks often offer lower rates (0.5-1.5% less) to attract customers. However, consider: (1) Processing fee for new loan (0.5-1% of loan amount), (2) Prepayment charges on existing loan (if applicable), (3) Legal and technical charges, (4) Time and documentation effort. Transfer makes sense if the interest rate differential is at least 1% and you have substantial tenure remaining. Calculate the break-even point to ensure savings outweigh transfer costs."
  },
  {
    question: "What happens if I miss an EMI payment?",
    answer: "Missing an EMI payment has serious consequences: (1) Late payment charges: typically ₹500-₹1,000 or 2-3% of EMI amount, (2) Credit score impact: your CIBIL score drops, affecting future loan eligibility, (3) Penal interest: additional 1-2% on outstanding amount, (4) Legal action: after 3-6 missed EMIs, banks may initiate recovery proceedings, (5) Asset seizure: for secured loans, banks can auction your property/vehicle. If facing financial difficulty, immediately contact your bank to restructure the loan, request a moratorium period, or negotiate revised payment terms. Proactive communication can prevent severe consequences."
  },
  {
    question: "How to calculate total interest payable on a loan?",
    answer: "Total interest = (EMI × Number of months) - Principal amount. For example, on a ₹20 lakh loan at 9% for 15 years with EMI of ₹20,276, total interest = (₹20,276 × 180) - ₹20,00,000 = ₹16,49,680. This means you pay ₹16.5 lakhs as interest on top of your ₹20 lakh principal. The interest amount increases dramatically with tenure. The same loan for 20 years results in total interest of ₹23.94 lakhs, while for 10 years it's only ₹9.16 lakhs. Use an EMI calculator to compare different scenarios and choose optimal tenure."
  },
  {
    question: "What is the penalty for loan prepayment in India?",
    answer: "Prepayment penalties vary by loan type and bank: (1) Home loans (floating rate): RBI has banned prepayment penalties, you can prepay any amount anytime without charges, (2) Home loans (fixed rate): typically 2-4% penalty on prepaid amount, (3) Personal loans: 2-5% penalty is common, (4) Car loans: usually 4-6% penalty. Some banks offer zero prepayment after certain period (e.g., after 6-12 months). Always check your loan sanction letter for specific prepayment clauses. Even with penalties, prepayment often saves money in the long run by reducing interest burden."
  },
  {
    question: "Should I opt for loan insurance or credit protection?",
    answer: "Loan insurance (credit life insurance) pays off your loan if you die or become disabled. While it provides security, consider: (1) Cost: adds 0.5-1% to your loan cost annually, (2) Better alternative: a separate term insurance policy often provides more coverage at lower cost, (3) Coverage: loan insurance only covers the outstanding loan amount, term insurance can cover multiple needs, (4) Flexibility: term insurance is portable and not tied to the loan. However, loan insurance approval is easier and doesn't require medical tests. If you don't have adequate life insurance, loan insurance can be beneficial, especially for large home loans."
  },
  {
    question: "How do I improve my chances of loan approval?",
    answer: "To increase approval chances: (1) Maintain CIBIL score above 750 by paying bills on time and keeping credit utilization below 30%, (2) Show stable employment history (2+ years in current job), (3) Maintain healthy bank account balance and regular credits, (4) Reduce existing debt obligations, (5) Increase down payment to lower loan-to-value ratio, (6) Apply with a co-applicant who has good credit, (7) Choose appropriate loan amount based on income (avoid over-borrowing), (8) Maintain all documents ready and accurate, (9) Avoid multiple loan applications simultaneously. Building a relationship with your bank through savings account and credit cards also helps."
  },
  {
    question: "What is the difference between pre-approved and regular loan processing?",
    answer: "Pre-approved loans are offered to existing customers with good credit history and relationship with the bank. Benefits include: (1) Faster processing: approval in 24-48 hours vs 7-14 days for regular loans, (2) Minimal documentation: bank already has your KYC and financial details, (3) Higher approval chances: 90%+ approval rate, (4) Sometimes lower interest rates as customer retention offers. However, pre-approved doesn't mean disbursement is guaranteed - final approval still requires income verification and property valuation for secured loans. Don't assume pre-approved terms are the best - compare with other banks before accepting."
  },
  {
    question: "How does loan tenure affect my total interest payment?",
    answer: "Tenure dramatically impacts total interest paid. On a ₹30 lakh home loan at 8.5% interest: (1) 10-year tenure: EMI ₹37,217, total interest ₹14.66 lakhs, (2) 20-year tenure: EMI ₹25,910, total interest ₹32.18 lakhs, (3) 30-year tenure: EMI ₹23,074, total interest ₹53.07 lakhs. While longer tenure offers lower EMI and better cash flow, you pay 2-3 times more in interest. Optimal approach: choose moderate tenure (15-20 years) with affordable EMI, then prepay aggressively when you have surplus funds. Even prepaying ₹50,000 annually can reduce a 20-year loan to 14-15 years."
  },
  {
    question: "What is EMI moratorium and when can I avail it?",
    answer: "EMI moratorium is a temporary pause on EMI payments offered by banks during financial hardship. Available during: (1) Natural disasters or pandemics (like COVID-19), (2) Job loss or medical emergencies (at bank's discretion), (3) Initial construction period for under-construction properties. During moratorium, interest continues to accrue on outstanding principal, increasing your total loan cost. After moratorium, you can either pay higher EMI or extend tenure. Some banks offer interest-only payments during moratorium. While it provides temporary relief, use it only when absolutely necessary as it increases your overall interest burden by 5-15%."
  },
  {
    question: "How do I compare loan offers from different banks effectively?",
    answer: "When comparing loans, consider: (1) Interest rate: Compare APR (Annual Percentage Rate) which includes all costs, not just base rate, (2) Processing fee: ranges from 0.5-2% of loan amount, some banks offer zero processing fee periodically, (3) Prepayment charges: crucial if you plan to prepay, (4) Hidden charges: documentation, legal, valuation, insurance costs, (5) Loan tenure flexibility, (6) Customer service and branch network, (7) Digital services and app quality, (8) Prepayment and top-up facility ease. Create a comparison spreadsheet with total cost of loan (including all fees) rather than just EMI. Sometimes a slightly higher interest rate with zero processing fee works out cheaper overall."
  }
];

// Loan Education Content
export const LOAN_EDUCATION_DATA: LoanEducation = {
  title: "Understanding EMI Calculation: A Complete Guide",
  description: "EMI (Equated Monthly Installment) is the fixed amount you pay every month towards your loan repayment. Understanding how EMI is calculated helps you make informed borrowing decisions and plan your finances better. The EMI consists of two components: principal repayment and interest payment. In the initial years of your loan, a larger portion goes towards interest, while in later years, more goes towards principal repayment. This is because interest is calculated on the reducing outstanding principal balance. By understanding the mathematics behind EMI calculation, you can evaluate different loan scenarios, compare offers from various banks, and choose the optimal loan amount and tenure that fits your budget. You can also determine how factors like down payment, prepayment, and interest rate changes affect your monthly outgo. This knowledge empowers you to negotiate better terms with lenders and potentially save lakhs of rupees over your loan tenure. Whether you're planning to buy a home, car, or need personal financing, mastering EMI calculation is crucial for financial planning and wealth building.",
  formula: "EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]",
  variables: [
    {
      symbol: "P",
      name: "Principal Amount",
      description: "The total loan amount borrowed from the bank. This is the original sum you need to repay, excluding interest.",
      example: "If you're buying a ₹50 lakh property with ₹10 lakh down payment, your principal P = ₹40 lakhs"
    },
    {
      symbol: "R",
      name: "Monthly Interest Rate",
      description: "The annual interest rate divided by 12 months and 100. This converts the yearly rate to a monthly decimal.",
      example: "For 9% annual interest, R = 9/12/100 = 0.0075 or 0.75% per month"
    },
    {
      symbol: "N",
      name: "Loan Tenure in Months",
      description: "The total duration of the loan repayment period expressed in months. Longer tenure means lower EMI but higher total interest.",
      example: "For a 20-year home loan, N = 20 × 12 = 240 months"
    }
  ],
  examples: [
    {
      title: "Home Loan Calculation",
      scenario: "₹25,00,000 loan at 8.5% interest for 20 years",
      calculation: "P = 25,00,000, R = 8.5/12/100 = 0.007083, N = 240 months. EMI = [2500000 × 0.007083 × (1.007083)^240] / [(1.007083)^240 - 1]",
      result: "Monthly EMI = ₹21,567. Total amount payable = ₹51,76,080. Total interest = ₹26,76,080"
    },
    {
      title: "Car Loan Calculation",
      scenario: "₹8,00,000 loan at 9.5% interest for 5 years",
      calculation: "P = 8,00,000, R = 9.5/12/100 = 0.007917, N = 60 months. EMI = [800000 × 0.007917 × (1.007917)^60] / [(1.007917)^60 - 1]",
      result: "Monthly EMI = ₹16,827. Total amount payable = ₹10,09,620. Total interest = ₹2,09,620"
    },
    {
      title: "Personal Loan Calculation",
      scenario: "₹5,00,000 loan at 12% interest for 3 years",
      calculation: "P = 5,00,000, R = 12/12/100 = 0.01, N = 36 months. EMI = [500000 × 0.01 × (1.01)^36] / [(1.01)^36 - 1]",
      result: "Monthly EMI = ₹16,607. Total amount payable = ₹5,97,852. Total interest = ₹97,852"
    }
  ]
};

// Tips Data
export const TIPS_DATA: Tip[] = [
  {
    title: "Make a Larger Down Payment",
    description: "Pay 20-30% down payment to reduce loan amount, lower EMI, get better interest rates, and build instant equity. Higher down payment shows financial stability to lenders and can help you negotiate 0.25-0.5% lower interest rate.",
    icon: "💰",
    impact: "Can save ₹5-10 lakhs on a ₹50 lakh loan over 20 years"
  },
  {
    title: "Choose Optimal Loan Tenure",
    description: "Balance between affordable EMI and total interest. Shorter tenure (10-15 years) saves significant interest but has higher EMI. Longer tenure (20-30 years) offers lower EMI but costs more overall. Calculate your comfort zone.",
    icon: "⏰",
    impact: "Choosing 15 years vs 25 years can save ₹20+ lakhs in interest"
  },
  {
    title: "Improve Your Credit Score",
    description: "Maintain CIBIL score above 750 by paying bills on time, keeping credit utilization below 30%, and clearing existing debts. Every 50-point increase can get you 0.25-0.5% better interest rate, saving lakhs over loan tenure.",
    icon: "📊",
    impact: "750+ credit score can get you 0.5-2% lower interest rate"
  },
  {
    title: "Compare Multiple Lenders",
    description: "Don't settle for the first offer. Compare interest rates, processing fees, and prepayment terms from at least 4-5 banks. Online aggregators make comparison easy. Even 0.5% difference in interest rate translates to significant savings.",
    icon: "🔍",
    impact: "Can save ₹50,000-2,00,000 by choosing the right lender"
  },
  {
    title: "Plan for Prepayments",
    description: "Use bonuses, increments, or windfalls to make annual prepayments. Even ₹50,000-1,00,000 yearly prepayment can reduce 20-year loan to 14-15 years and save lakhs in interest. Check prepayment terms before choosing lender.",
    icon: "🎯",
    impact: "₹1 lakh annual prepayment can reduce tenure by 5-7 years"
  },
  {
    title: "Negotiate Interest Rates",
    description: "If you have good credit, stable income, or existing relationship with the bank, negotiate for lower rates. Be willing to walk away. Banks often match or beat competitor rates for qualified borrowers. Even 0.25% reduction matters.",
    icon: "💬",
    impact: "Negotiating 0.5% lower rate saves ₹3-5 lakhs on ₹25 lakh loan"
  },
  {
    title: "Consider Hybrid Loans",
    description: "Some banks offer part floating, part fixed rate loans. This balances rate stability with potential savings. Ideal during volatile rate environments. Also consider step-up loans where EMI increases annually, starting with lower initial payments.",
    icon: "🔄",
    impact: "Provides flexibility and can save 10-15% on initial EMIs"
  },
  {
    title: "Time Your Loan Application",
    description: "Apply during festive seasons (Diwali, New Year) when banks offer reduced processing fees or lower interest rates. Also consider economic cycles - applying when repo rates are low can lock in better long-term rates.",
    icon: "📅",
    impact: "Festive offers can waive ₹10,000-50,000 in processing fees"
  }
];

// Loan Types Data
export const LOAN_TYPES_DATA: LoanType[] = [
  {
    name: "Home Loans",
    description: "Long-term loans for purchasing, constructing, or renovating residential property. Secured against the property being financed. Most popular loan type in India with favorable terms and significant tax benefits.",
    interestRange: "8.5% - 10.5% p.a.",
    tenure: "5 to 30 years",
    features: [
      "Loan up to 90% of property value (80-85% typical)",
      "Tax benefits up to ₹3.5 lakhs annually under Section 80C and 24(b)",
      "Additional ₹1.5 lakh deduction for first-time buyers",
      "No prepayment charges on floating rate loans",
      "Balance transfer facility available",
      "Top-up loans for existing customers"
    ],
    taxBenefits: "Deduction up to ₹1.5 lakh on principal (80C) + ₹2 lakh on interest (24b) + ₹1.5 lakh for first-time buyers (80EEA)",
    idealFor: "Salaried professionals, self-employed individuals, NRIs looking to purchase residential property in India"
  },
  {
    name: "Personal Loans",
    description: "Unsecured loans for any personal need - medical emergency, wedding, vacation, debt consolidation, or home renovation. No collateral required, making approval faster but interest rates higher than secured loans.",
    interestRange: "10.5% - 24% p.a.",
    tenure: "1 to 5 years",
    features: [
      "No collateral or security required",
      "Quick approval and disbursal (24-48 hours for existing customers)",
      "Flexible end-use - no restrictions on spending",
      "Loan amounts from ₹50,000 to ₹40 lakhs based on income",
      "Minimal documentation for pre-approved customers",
      "Option to convert credit card dues to EMI"
    ],
    taxBenefits: "No direct tax benefits, unless used for business purposes or home renovation (with proof)",
    idealFor: "Urgent financial needs, medical emergencies, wedding expenses, debt consolidation, or any personal requirement"
  },
  {
    name: "Car Loans",
    description: "Secured loans specifically for purchasing new or used vehicles. The vehicle itself serves as collateral. Banks typically finance 80-90% of the car's on-road price. Interest rates vary based on car make, model, and your credit profile.",
    interestRange: "8.5% - 12% p.a.",
    tenure: "1 to 7 years",
    features: [
      "Finance up to 90% of on-road price (10-20% down payment)",
      "New cars get better rates than used cars",
      "Pre-approved offers for existing customers",
      "Insurance bundling options available",
      "Flexible repayment - step-up or balloon EMI options",
      "Extended warranty can be included in loan"
    ],
    taxBenefits: "Tax benefits available only if vehicle is used for business purposes (self-employed can claim depreciation and interest)",
    idealFor: "Salaried and self-employed individuals looking to purchase new or used cars (up to 5 years old)"
  },
  {
    name: "Education Loans",
    description: "Specialized loans for higher education in India or abroad. Cover tuition fees, accommodation, books, and other educational expenses. Many banks offer moratorium period (no EMI during study period). Government schemes provide interest subsidies for economically weaker sections.",
    interestRange: "9% - 15% p.a.",
    tenure: "5 to 15 years",
    features: [
      "Covers tuition fees, hostel, books, equipment, and travel",
      "Up to ₹10 lakhs without collateral, higher with security",
      "Moratorium period - repayment starts after course completion",
      "Interest subsidy for loans under ₹4.5 lakhs (EWS category)",
      "Tax benefits on interest payment under Section 80E",
      "Co-applicant (parent/guardian) usually required"
    ],
    taxBenefits: "Deduction on interest paid under Section 80E for 8 years (no upper limit on deduction amount)",
    idealFor: "Students pursuing higher education in India or abroad, including professional courses, undergraduate, and postgraduate programs"
  },
  {
    name: "Business Loans",
    description: "Working capital or term loans for business expansion, equipment purchase, inventory, or operational expenses. Available for proprietorships, partnerships, and companies. Interest rates and terms vary based on business vintage, turnover, and creditworthiness.",
    interestRange: "11% - 20% p.a.",
    tenure: "1 to 10 years",
    features: [
      "Loans from ₹1 lakh to ₹50 crores based on turnover",
      "Collateral-free loans up to ₹50 lakhs for MSMEs",
      "Overdraft and credit line facilities available",
      "Government schemes - MUDRA, CGTMSE, Startup India",
      "Business credit cards and invoice discounting",
      "Flexible repayment aligned with business cash flows"
    ],
    taxBenefits: "Interest paid is fully tax-deductible as business expense, reducing taxable income",
    idealFor: "Small businesses, MSMEs, startups, and established companies needing working capital or expansion funds"
  },
  {
    name: "Loan Against Property",
    description: "Secured loans against residential, commercial, or industrial property you already own. Property serves as collateral but remains in your possession. Higher loan amounts and lower interest rates than unsecured loans. Flexible end-use for business or personal needs.",
    interestRange: "9% - 14% p.a.",
    tenure: "5 to 20 years",
    features: [
      "Loan up to 60-70% of property market value",
      "Both residential and commercial properties accepted",
      "Flexible end-use - business expansion, education, wedding, etc.",
      "Lower interest rates than personal loans",
      "Higher loan amounts - up to ₹10 crores",
      "Balance transfer and top-up facilities available"
    ],
    taxBenefits: "Interest deductible if loan used for business purposes or purchasing another property",
    idealFor: "Property owners needing large funds for business expansion, child's education, wedding, or other major expenses"
  }
];

// Bank Offers Data
export const BANK_OFFERS_DATA: BankOffer[] = [
  {
    name: "HDFC Bank",
    interestRate: "8.75% - 9.50% p.a.",
    processingFee: "0.50% of loan amount",
    features: [
      "Pre-approved loans for existing customers",
      "Instant e-approval in 10 seconds",
      "Doorstep service for documentation",
      "Flexible repayment options",
      "Top-up loan facility available",
      "Women borrowers get 0.05% rate benefit"
    ],
    specialOffer: "Zero processing fee on loans above ₹30 lakhs during festive season",
    rating: 4.5
  },
  {
    name: "ICICI Bank",
    interestRate: "8.70% - 9.45% p.a.",
    processingFee: "0.50% (Max ₹10,000)",
    features: [
      "QuickEMI for instant personal loans",
      "Balance transfer with top-up facility",
      "No hidden charges or prepayment penalty",
      "Loan against salary for professionals",
      "Digital loan application and tracking",
      "Overdraft facility against property"
    ],
    specialOffer: "Special rates for government employees and doctors",
    rating: 4.3
  },
  {
    name: "State Bank of India (SBI)",
    interestRate: "8.50% - 9.65% p.a.",
    processingFee: "0.35% (Max ₹10,000)",
    features: [
      "Lowest processing fee among major banks",
      "Special schemes for women and senior citizens",
      "Longest repayment tenure - up to 30 years",
      "NRI home loan facility",
      "SBI MaxGain - save on interest with surplus funds",
      "Wide branch network for service"
    ],
    specialOffer: "Concession of 5 bps for women borrowers on home loans",
    rating: 4.2
  },
  {
    name: "Axis Bank",
    interestRate: "8.75% - 9.70% p.a.",
    processingFee: "1.00% of loan amount",
    features: [
      "Asha Home Loan for affordable housing",
      "Online account for easy loan management",
      "Interest rate customized to credit score",
      "Fast-track approval for existing customers",
      "Flexible EMI payment dates",
      "Insurance services bundled with loan"
    ],
    specialOffer: "Pre-approved personal loans up to ₹40 lakhs for salary account customers",
    rating: 4.1
  },
  {
    name: "Kotak Mahindra Bank",
    interestRate: "8.70% - 9.50% p.a.",
    processingFee: "0.50% + GST",
    features: [
      "Express home loan - approval in 7 days",
      "Part prepayment allowed 4 times a year",
      "Step-up EMI option for young professionals",
      "Loan against property with flexible use",
      "Property assistance and legal services",
      "Relationship benefits for existing customers"
    ],
    specialOffer: "Zero processing fee for defense personnel and medical professionals",
    rating: 4.4
  },
  {
    name: "Bank of Baroda",
    interestRate: "8.40% - 9.80% p.a.",
    processingFee: "0.25% (Min ₹1,500)",
    features: [
      "Baroda Home Loan with attractive rates",
      "Special schemes for government employees",
      "In-principle approval within 3 days",
      "Technical and legal assistance provided",
      "Tie-ups with major builders for offers",
      "Concessional rates for affordable housing"
    ],
    specialOffer: "Lower rates for eco-friendly green homes with solar panels/rainwater harvesting",
    rating: 4.0
  }
];
