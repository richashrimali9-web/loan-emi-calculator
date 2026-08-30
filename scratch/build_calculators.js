const fs = require('fs');
const path = require('path');

const publicCalcDir = path.join(__dirname, '..', 'public', 'calculators');
const publicRootDir = path.join(__dirname, '..', 'public');
const rootDir = path.join(__dirname, '..');

const ADSENSE_TAG = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8063078781485185" crossorigin="anonymous"></script>`;
const GA4_TAG = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-5M7LHTQF5Y"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-5M7LHTQF5Y');
</script>`;

const NAV_HTML = `
  <header>
    <nav>
      <a href="/" class="brand">mytotalemi</a>
      
      <button class="hamburger" id="hamburgerBtn" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <ul id="navMenu">
        <li><a href="/">Calculator</a></li>
        <li><a href="/blog/">Blog</a></li>
        <li><a href="/guides/">Guides</a></li>
        <li><a href="/about/">About</a></li>
        <li><a href="/contact/" class="nav-btn-apply">Contact</a></li>
      </ul>
      
      <div class="mobile-menu" id="mobileMenu">
        <a href="/">Calculator</a>
        <a href="/blog/">Blog</a>
        <a href="/guides/">Guides</a>
        <a href="/about/">About</a>
        <a href="/contact/">Contact</a>
      </div>
    </nav>
  </header>
`;

const FOOTER_HTML = `
  <footer>
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>mytotalemi</h4>
          <p>Free, independent loan EMI calculator & financial decision platform for Indian borrowers.</p>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Calculator</a></li>
            <li><a href="/calculators/home-loan.html">Home Loan EMI</a></li>
            <li><a href="/calculators/personal-loan.html">Personal Loan EMI</a></li>
            <li><a href="/calculators/car-loan.html">Car Loan EMI</a></li>
            <li><a href="/calculators/business-loan.html">Business Loan EMI</a></li>
            <li><a href="/calculators/education-loan.html">Education Loan EMI</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Resources & Legal</h4>
          <ul>
            <li><a href="/blog/">Financial Blog</a></li>
            <li><a href="/guides/">Borrower Guides</a></li>
            <li><a href="/about/">About Us</a></li>
            <li><a href="/privacy-policy/">Privacy Policy</a></li>
            <li><a href="/terms-of-service/">Terms of Service</a></li>
            <li><a href="/contact/">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-divider">
        <p>&copy; 2026 mytotalemi. All rights reserved. Educational financial calculations only.</p>
      </div>
    </div>
  </footer>
`;

const SCRIPT_COMMON = `
  <script>
    const btn = document.getElementById('hamburgerBtn');
    const menu = document.getElementById('mobileMenu');
    if (btn && menu) {
      btn.addEventListener('click', () => menu.classList.toggle('active'));
    }

    function calculateEMI() {
      const amount = parseFloat(document.getElementById('loanAmount').value) || 0;
      const rate = (parseFloat(document.getElementById('interestRate').value) || 0) / 12 / 100;
      const tenure = (parseInt(document.getElementById('tenure').value) || 0) * 12;

      document.getElementById('loanAmountLabel').innerText = amount.toLocaleString('en-IN');
      document.getElementById('interestRateLabel').innerText = document.getElementById('interestRate').value;
      document.getElementById('tenureLabel').innerText = document.getElementById('tenure').value;

      if (amount <= 0 || rate <= 0 || tenure <= 0) return;

      const emi = (amount * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
      const totalPayment = emi * tenure;
      const totalInterest = totalPayment - amount;

      document.getElementById('emiValue').innerText = Math.round(emi).toLocaleString('en-IN');
      document.getElementById('totalInterestValue').innerText = Math.round(totalInterest).toLocaleString('en-IN');
      document.getElementById('totalPaymentValue').innerText = Math.round(totalPayment).toLocaleString('en-IN');

      const pPercent = Math.round((amount / totalPayment) * 100);
      const iPercent = 100 - pPercent;

      document.getElementById('principalBar').style.flex = pPercent;
      document.getElementById('interestBar').style.flex = iPercent;
      document.getElementById('principalPercent').innerText = pPercent + '% Principal';
      document.getElementById('interestPercent').innerText = iPercent + '% Interest';

      let tbody = '';
      let balance = amount;
      for (let yr = 1; yr <= Math.min(10, Math.ceil(tenure / 12)); yr++) {
        let yrInterest = 0;
        let yrPrincipal = 0;
        for (let m = 1; m <= 12; m++) {
          if (balance <= 0) break;
          let mInterest = balance * rate;
          let mPrincipal = emi - mInterest;
          yrInterest += mInterest;
          yrPrincipal += mPrincipal;
          balance -= mPrincipal;
        }
        tbody += '<tr>' +
          '<td>Year ' + yr + '</td>' +
          '<td>₹' + Math.round(yrPrincipal).toLocaleString('en-IN') + '</td>' +
          '<td>₹' + Math.round(yrInterest).toLocaleString('en-IN') + '</td>' +
          '<td>₹' + Math.max(0, Math.round(balance)).toLocaleString('en-IN') + '</td>' +
          '</tr>';
      }
      document.getElementById('amortizationTable').innerHTML = tbody;
    }

    ['loanAmountSlider', 'interestRateSlider', 'tenureSlider'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', (e) => {
          const targetId = id.replace('Slider', '');
          document.getElementById(targetId).value = e.target.value;
          calculateEMI();
        });
      }
    });

    ['loanAmount', 'interestRate', 'tenure'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', (e) => {
          const sliderId = id + 'Slider';
          document.getElementById(sliderId).value = e.target.value;
          calculateEMI();
        });
      }
    });

    document.getElementById('calculateBtn')?.addEventListener('click', calculateEMI);
    calculateEMI();
  </script>
`;

function createPage({ filename, title, canonical, description, keywords, loanName, defaultAmount, defaultRate, defaultTenure, minAmount, maxAmount, stepAmount, maxTenure, richContent, faqJson }) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="keywords" content="${keywords}">
  <link rel="canonical" href="${canonical}">
  <meta name="theme-color" content="#4f46e5">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23ffffff'/><text x='50' y='70' font-size='60' font-weight='bold' text-anchor='middle' fill='%234f46e5'>₹</text></svg>">
  <link rel="stylesheet" href="/css/style.css">
  ${GA4_TAG}
  ${ADSENSE_TAG}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "${title}",
        "url": "${canonical}",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "description": "${description}"
      },
      ${faqJson}
    ]
  }
  </script>
</head>
<body>
  ${NAV_HTML}

  <main>
    <section class="saas-hero">
      <div class="hero-content">
        <div class="hero-pill-badge">
          <span>✨ 2026 Next-Gen Financial Engine</span>
          <span>•</span>
          <span>100% Free & Independent</span>
        </div>
        <h1 style="font-size: 2.75rem; letter-spacing: -0.5px;">${loanName} EMI Calculator</h1>
        <p class="hero-subtitle" style="font-size: 1.15rem; max-width: 700px; margin: 0 auto 1.5rem;">Calculate exact monthly EMI, total interest payable, and repayment amortization schedule for your ${loanName.toLowerCase()} in India.</p>
        
        <div class="trust-signals">
          <div class="trust-signal">Instant Amortization</div>
          <div class="trust-signal">RBI Compliant 2026</div>
          <div class="trust-signal">No Login Required</div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="container" style="margin: 0 auto 3rem;">
      <div class="saas-mode-switcher">
        <a href="/calculators/home-loan.html" class="saas-tab-btn ${loanName === 'Home Loan' ? 'active' : ''}">🏠 Home Loan</a>
        <a href="/calculators/personal-loan.html" class="saas-tab-btn ${loanName === 'Personal Loan' ? 'active' : ''}">👤 Personal Loan</a>
        <a href="/calculators/car-loan.html" class="saas-tab-btn ${loanName === 'Car Loan' ? 'active' : ''}">🚗 Car Loan</a>
        <a href="/calculators/business-loan.html" class="saas-tab-btn ${loanName === 'Business Loan' ? 'active' : ''}">💼 Business Loan</a>
        <a href="/calculators/education-loan.html" class="saas-tab-btn ${loanName === 'Education Loan' ? 'active' : ''}">🎓 Education Loan</a>
      </div>

      <div class="saas-dashboard-grid">
        <div class="saas-calc-card">
          <h2 style="text-align: left; margin-top: 0; border: none; padding-bottom: 0; font-size: 1.4rem;">${loanName} EMI Parameters</h2>
          <p style="color: var(--text-muted); margin-bottom: 1.75rem; font-size: 0.9rem;">Adjust loan amount, interest rate, and tenure sliders below.</p>
          
          <div class="input-field">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <label for="loanAmount" style="margin: 0;">Loan Amount</label>
              <span style="font-weight: 700; color: var(--primary); font-size: 1.05rem;">₹<span id="loanAmountLabel">${Number(defaultAmount).toLocaleString('en-IN')}</span></span>
            </div>
            <input type="range" id="loanAmountSlider" min="${minAmount}" max="${maxAmount}" step="${stepAmount}" value="${defaultAmount}">
            <input type="number" id="loanAmount" min="${minAmount}" max="${maxAmount}" step="${stepAmount}" value="${defaultAmount}">
          </div>

          <div class="input-field">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <label for="interestRate" style="margin: 0;">Annual Interest Rate (%)</label>
              <span style="font-weight: 700; color: var(--primary); font-size: 1.05rem;"><span id="interestRateLabel">${defaultRate}</span>%</span>
            </div>
            <input type="range" id="interestRateSlider" min="4" max="28" step="0.1" value="${defaultRate}">
            <input type="number" id="interestRate" min="4" max="28" step="0.1" value="${defaultRate}">
          </div>

          <div class="input-field">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <label for="tenure" style="margin: 0;">Loan Tenure (Years)</label>
              <span style="font-weight: 700; color: var(--primary); font-size: 1.05rem;"><span id="tenureLabel">${defaultTenure}</span> Yrs</span>
            </div>
            <input type="range" id="tenureSlider" min="1" max="${maxTenure}" step="1" value="${defaultTenure}">
            <input type="number" id="tenure" min="1" max="${maxTenure}" step="1" value="${defaultTenure}">
          </div>

          <button class="btn-primary btn-block" id="calculateBtn" style="font-size: 1rem; padding: 0.85rem; border-radius: var(--radius-sm); margin-top: 0.75rem;">Recalculate Repayment</button>
        </div>

        <div id="results" style="display: flex; flex-direction: column; justify-content: space-between; gap: 1rem;">
          <div class="saas-stat-card hero-stat" style="padding: 1.75rem;">
            <div class="stat-label" style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px;">Calculated Monthly EMI</div>
            <div class="stat-value" style="font-size: 2.5rem; margin: 0.5rem 0 0; font-weight: 800;">₹<span id="emiValue">0</span></div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="saas-stat-card" style="padding: 1.25rem;">
              <div class="stat-value error" style="font-size: 1.3rem;">₹<span id="totalInterestValue">0</span></div>
              <div class="stat-label" style="font-size: 0.8rem;">Total Interest Outgo</div>
            </div>
            <div class="saas-stat-card" style="padding: 1.25rem;">
              <div class="stat-value text" style="font-size: 1.3rem;">₹<span id="totalPaymentValue">0</span></div>
              <div class="stat-label" style="font-size: 0.8rem;">Total Amount Payable</div>
            </div>
          </div>

          <div class="card" style="padding: 1.25rem; border: 1px solid var(--border); margin: 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <span style="font-weight: 600; font-size: 0.9rem;">Principal vs Interest Split</span>
              <span style="font-size: 0.8rem; color: var(--text-muted);">Real-time</span>
            </div>
            <div style="display: flex; height: 28px; border-radius: 6px; overflow: hidden; box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);">
              <div id="principalBar" style="background: var(--primary); flex: 60; position: relative; transition: flex 0.3s ease;">
                <span style="position: absolute; left: 10px; top: 5px; color: white; font-size: 12px; font-weight: 700;" id="principalPercent">60% Principal</span>
              </div>
              <div id="interestBar" style="background: var(--error); flex: 40; position: relative; transition: flex 0.3s ease;">
                <span style="position: absolute; right: 10px; top: 5px; color: white; font-size: 12px; font-weight: 700;" id="interestPercent">40% Interest</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="table-wrapper" style="margin-top: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
          <h3 style="margin: 0;">Annual Amortization Schedule (First 10 Years)</h3>
          <div class="saas-toolbar" style="margin: 0;">
            <button class="btn-outline-sm" onclick="window.print()">🖨️ Print Schedule</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Principal Paid</th>
              <th>Interest Paid</th>
              <th>Remaining Balance</th>
            </tr>
          </thead>
          <tbody id="amortizationTable">
            <tr>
              <td colspan="4" style="text-align: center; padding: 2rem;">Loading schedule...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Comprehensive Guide & Deep Content Section -->
    <section class="container" style="margin: 4rem auto;">
      ${richContent}
    </section>
  </main>

  ${FOOTER_HTML}
  ${SCRIPT_COMMON}
</body>
</html>`;

  // Write to public/calculators/filename
  fs.writeFileSync(path.join(publicCalcDir, filename), html, 'utf-8');
  // Write to public/filename
  fs.writeFileSync(path.join(publicRootDir, filename), html, 'utf-8');
  // Write to root/filename
  fs.writeFileSync(path.join(rootDir, filename), html, 'utf-8');

  console.log(`✅ Built pristine ${filename} in public/calculators/, public/, and root/`);
}

// Generate the 5 Calculators with deep content
// 1. Home Loan
createPage({
  filename: 'home-loan.html',
  title: 'Home Loan EMI Calculator 2026 — Compare Rates & Prepayment | mytotalemi',
  canonical: 'https://mytotalemi.co.in/calculators/home-loan.html',
  description: 'Calculate monthly home loan EMI, total interest, tax benefits under Sec 80C & 24b, and prepayment amortization. Free 2026 SBI, HDFC, ICICI rate comparison.',
  keywords: 'Home loan EMI calculator, housing loan EMI, home loan tax benefits, SBI home loan interest rates 2026, home loan prepayment calculator',
  loanName: 'Home Loan',
  defaultAmount: 5000000,
  defaultRate: 8.5,
  defaultTenure: 20,
  minAmount: 100000,
  maxAmount: 50000000,
  stepAmount: 100000,
  maxTenure: 30,
  faqJson: `{
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is Home Loan EMI calculated in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Home loan EMI is calculated using the formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is loan principal, r is monthly interest rate (annual rate divided by 1200), and n is tenure in months."
        }
      },
      {
        "@type": "Question",
        "name": "Are prepayment penalties allowed on floating rate home loans in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Per RBI directives, individual floating-rate home loans carry ZERO prepayment or foreclosure charges across all commercial banks and housing finance companies in India."
        }
      },
      {
        "@type": "Question",
        "name": "What tax benefits can I claim on my Home Loan in 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Under the Old Tax Regime, Indian borrowers can claim up to ₹1.5 Lakh principal deduction under Section 80C and up to ₹2 Lakh interest deduction under Section 24(b) for self-occupied properties."
        }
      }
    ]
  }`,
  richContent: `
    <div class="card" style="padding: 2.5rem; line-height: 1.7;">
      <h2>Comprehensive Guide to Home Loans in India (2026 Edition)</h2>
      <p>A home loan is a long-term financial commitment spanning 15 to 30 years. Understanding how your monthly EMI is divided between principal repayment and interest outgo empowers you to save lakhs of rupees over your loan tenure.</p>
      
      <h3>1. Mathematical Formula for Home Loan EMI</h3>
      <p>Banks and housing finance companies calculate monthly EMIs using the standard Reducing Balance Interest formula:</p>
      <div style="background: var(--bg); padding: 1.25rem; border-left: 4px solid var(--primary); font-family: monospace; margin: 1rem 0; font-size: 1.05rem;">
        EMI = P × r × (1 + r)<sup>n</sup> / [(1 + r)<sup>n</sup> - 1]
      </div>
      <ul>
        <li><strong>P (Principal):</strong> Total loan amount borrowed (e.g., ₹50,00,000)</li>
        <li><strong>r (Monthly Interest Rate):</strong> Annual Interest Rate / (12 × 100) (e.g., 8.5% / 12 = 0.007083)</li>
        <li><strong>n (Tenure in Months):</strong> Loan tenure in years × 12 (e.g., 20 years = 240 months)</li>
      </ul>

      <h3>2. Benchmark Lenders Home Loan Interest Rates (2026 Rates)</h3>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Lender Name</th>
              <th>Interest Rate Range (p.a.)</th>
              <th>Processing Fee</th>
              <th>Max Loan Tenure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>State Bank of India (SBI)</strong></td>
              <td>8.40% – 9.65%</td>
              <td>0.35% + GST (Min ₹2,000)</td>
              <td>30 Years</td>
            </tr>
            <tr>
              <td><strong>HDFC Bank</strong></td>
              <td>8.45% – 9.70%</td>
              <td>0.50% or ₹3,000 + GST</td>
              <td>30 Years</td>
            </tr>
            <tr>
              <td><strong>ICICI Bank</strong></td>
              <td>8.50% – 9.75%</td>
              <td>0.50% + GST</td>
              <td>30 Years</td>
            </tr>
            <tr>
              <td><strong>Axis Bank</strong></td>
              <td>8.55% – 9.80%</td>
              <td>Up to 1% of loan amount</td>
              <td>30 Years</td>
            </tr>
            <tr>
              <td><strong>Bank of Baroda</strong></td>
              <td>8.40% – 9.60%</td>
              <td>NIL under promotional schemes</td>
              <td>30 Years</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>3. Tax Benefits under Income Tax Act 1961</h3>
      <p>Home loan borrowers in India enjoy significant tax deductions under the Old Tax Regime:</p>
      <ul>
        <li><strong>Section 80C:</strong> Tax deduction on principal repayment up to ₹1,50,000 per financial year. Stamp duty and registration charges are also eligible within this cap.</li>
        <li><strong>Section 24(b):</strong> Tax deduction on interest paid up to ₹2,00,000 per year for self-occupied residential property. For let-out properties, the entire interest can be set off against rental income subject to loss set-off limits.</li>
        <li><strong>Section 80EEA:</strong> Additional ₹1,50,000 deduction on interest for first-time homebuyers purchasing affordable housing (stamp duty value up to ₹45 Lakh).</li>
      </ul>

      <h3>4. RBI Guidelines on Home Loan Prepayment & LTV Ratios</h3>
      <ul>
        <li><strong>Zero Prepayment Penalty:</strong> As per RBI directives, commercial banks cannot charge any prepayment penalty or foreclosure fees on floating-rate individual home loans.</li>
        <li><strong>Loan-to-Value (LTV) Ratios:</strong>
          <ul>
            <li>Loans up to ₹30 Lakh: Max LTV ratio up to 90%</li>
            <li>Loans between ₹30 Lakh and ₹75 Lakh: Max LTV ratio up to 80%</li>
            <li>Loans above ₹75 Lakh: Max LTV ratio up to 75%</li>
          </ul>
        </li>
      </ul>

      <h3>5. Smart Prepayment Strategies to Save Interest</h3>
      <p>Paying just 1 extra EMI every year or increasing your monthly EMI by 5% each year alongside annual salary increments can reduce your 20-year home loan tenure down to 12 years, saving over 40% of total interest payable!</p>
    </div>
  `
});

// 2. Personal Loan
createPage({
  filename: 'personal-loan.html',
  title: 'Personal Loan EMI Calculator 2026 — Interest Rates & Repayment | mytotalemi',
  canonical: 'https://mytotalemi.co.in/calculators/personal-loan.html',
  description: 'Calculate personal loan EMI online. Compare reducing balance interest rates across top banks (SBI, HDFC, ICICI), check CIBIL requirements & foreclosure charges.',
  keywords: 'Personal loan EMI calculator, instant personal loan EMI, personal loan interest rates 2026, personal loan CIBIL score requirement',
  loanName: 'Personal Loan',
  defaultAmount: 500000,
  defaultRate: 11.5,
  defaultTenure: 5,
  minAmount: 25000,
  maxAmount: 4000000,
  stepAmount: 25000,
  maxTenure: 7,
  faqJson: `{
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What CIBIL score is required for a personal loan in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A CIBIL score of 750 or above is recommended to get fast personal loan approvals at lowest interest rates from top Indian banks."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Flat Rate and Reducing Balance Rate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In flat rate loans, interest is calculated on full principal throughout the tenure. In reducing balance rate, interest is calculated only on outstanding principal balance. A 12% reducing rate is significantly cheaper than an 8% flat rate."
        }
      }
    ]
  }`,
  richContent: `
    <div class="card" style="padding: 2.5rem; line-height: 1.7;">
      <h2>Complete Guide to Personal Loans in India (2026)</h2>
      <p>A personal loan is an unsecured credit facility requiring no collateral or security. It provides quick access to funds for medical emergencies, home renovation, weddings, or debt consolidation.</p>

      <h3>1. Personal Loan Eligibility Criteria & Factors</h3>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Salaried Applicant Requirement</th>
              <th>Self-Employed Requirement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Minimum Income</strong></td>
              <td>₹15,000 – ₹25,000 per month</td>
              <td>Annual Net Profit > ₹3.0 Lakh</td>
            </tr>
            <tr>
              <td><strong>CIBIL Credit Score</strong></td>
              <td>750+ (700 minimum)</td>
              <td>750+ (700 minimum)</td>
            </tr>
            <tr>
              <td><strong>Age Limit</strong></td>
              <td>21 to 60 Years</td>
              <td>25 to 65 Years</td>
            </tr>
            <tr>
              <td><strong>Work Experience</strong></td>
              <td>Min 1 year total, 6 months in current company</td>
              <td>Min 3 years continuous business existence</td>
            </tr>
            <tr>
              <td><strong>Max FOIR (Obligation Ratio)</strong></td>
              <td>50% – 60% of net monthly income</td>
              <td>50% – 60% of monthly cash flow</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>2. Reducing Balance vs. Flat Interest Rate Warning</h3>
      <p>Be cautious when lenders advertise flat interest rates. For example, a 7.5% flat interest rate over 5 years effectively equates to a 13.5% reducing balance interest rate! Always use reducing rate EMI calculation to understand your actual annual cost of borrowing.</p>

      <h3>3. Top Indian Bank Personal Loan Interest Rates (2026)</h3>
      <ul>
        <li><strong>HDFC Bank:</strong> 10.50% – 21.00% p.a. (Processing Fee: Up to ₹4,999)</li>
        <li><strong>ICICI Bank:</strong> 10.85% – 16.25% p.a. (Processing Fee: Up to 2.25%)</li>
        <li><strong>State Bank of India (SBI):</strong> 10.55% – 15.35% p.a. (Processing Fee: 0.50% – 1.50%)</li>
        <li><strong>Axis Bank:</strong> 10.75% – 22.00% p.a. (Processing Fee: 1% – 2%)</li>
        <li><strong>Bajaj Finserv:</strong> 11.00% – 28.00% p.a. (Flexi loan facility options)</li>
      </ul>

      <h3>4. Associated Charges & Hidden Fees to Check</h3>
      <ul>
        <li><strong>Processing Fee:</strong> 1% to 3% of loan principal amount deducted upfront.</li>
        <li><strong>Foreclosure / Pre-closure Fee:</strong> Personal loans are unsecured, so banks can charge 2% to 5% penalty on outstanding principal if closed before tenure, though some banks waive penalty after 12 EMIs.</li>
        <li><strong>Bounce Charges:</strong> ₹400 to ₹750 per failed ECS / NACH debit attempt.</li>
      </ul>
    </div>
  `
});

// 3. Car Loan
createPage({
  filename: 'car-loan.html',
  title: 'Car Loan EMI Calculator 2026 — New & Used Auto Loan | mytotalemi',
  canonical: 'https://mytotalemi.co.in/calculators/car-loan.html',
  description: 'Calculate monthly car loan EMI, down payment split, and 7-year payment schedule. Compare auto loan interest rates from SBI, HDFC, ICICI Bank.',
  keywords: 'Car loan EMI calculator, auto loan EMI, new car loan rates 2026, used car loan EMI calculator, SBI car loan interest rate',
  loanName: 'Car Loan',
  defaultAmount: 1000000,
  defaultRate: 8.9,
  defaultTenure: 7,
  minAmount: 100000,
  maxAmount: 10000000,
  stepAmount: 50000,
  maxTenure: 8,
  faqJson: `{
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the maximum tenure for a car loan in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most Indian commercial banks offer car loan tenures up to 7 years (84 months) for new cars, and up to 5 years for used/pre-owned cars."
        }
      },
      {
        "@type": "Question",
        "name": "Is 100% on-road funding available for car loans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Select lenders offer 90% to 100% on-road funding for premium salaried applicants with CIBIL score > 780, covering ex-showroom price, RTO registration, and insurance."
        }
      }
    ]
  }`,
  richContent: `
    <div class="card" style="padding: 2.5rem; line-height: 1.7;">
      <h2>Car Loan EMI & Vehicle Financing Guide (2026)</h2>
      <p>Buying a car is one of the second largest purchases for Indian households after real estate. Car loans help finance 80% to 100% of ex-showroom or on-road costs with manageable monthly installments.</p>

      <h3>1. New Car vs. Used Car Loan Comparison</h3>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>New Car Loan</th>
              <th>Used / Pre-Owned Car Loan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Interest Rate Range</strong></td>
              <td>8.75% – 9.80% p.a.</td>
              <td>12.50% – 16.50% p.a.</td>
            </tr>
            <tr>
              <td><strong>Max Financing (LTV)</strong></td>
              <td>85% to 100% of On-Road Price</td>
              <td>70% to 80% of Valuation Amount</td>
            </tr>
            <tr>
              <td><strong>Max Loan Tenure</strong></td>
              <td>7 to 8 Years</td>
              <td>3 to 5 Years</td>
            </tr>
            <tr>
              <td><strong>Processing Fees</strong></td>
              <td>₹1,000 – ₹3,000 flat / promotional waived</td>
              <td>1% to 2% of loan amount</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>2. Understanding Down Payment & On-Road Costs</h3>
      <p>The on-road price of a vehicle consists of the Ex-showroom price + RTO Registration Charges + Road Tax + Motor Insurance (1 Yr Own Damage + 3 Yr Third Party) + Fastag / TCS. Higher down payments lower your overall borrowing costs and prevent negative equity as vehicle depreciation accelerates in early years.</p>

      <h3>3. Top Indian Lenders Car Loan Rates (2026)</h3>
      <ul>
        <li><strong>State Bank of India (SBI Yono Car Loan):</strong> 8.75% – 9.60% (Zero foreclosure charges)</li>
        <li><strong>HDFC Bank Custom-Fit Car Loan:</strong> 8.85% – 9.75% (100% on-road funding options)</li>
        <li><strong>ICICI Bank Auto Loan:</strong> 8.80% – 9.70% (Instant approval for pre-approved customers)</li>
        <li><strong>Axis Bank Car Loan:</strong> 8.90% – 9.85% (Up to 8 years tenure)</li>
      </ul>
    </div>
  `
});

// 4. Business Loan
createPage({
  filename: 'business-loan.html',
  title: 'Business Loan EMI Calculator 2026 — MSME & MUDRA Loans | mytotalemi',
  canonical: 'https://mytotalemi.co.in/calculators/business-loan.html',
  description: 'Calculate business loan EMI online. Check collateral-free MSME loan eligibility, PM MUDRA Yojana interest rates, CGTMSE coverage & bank comparisons.',
  keywords: 'Business loan EMI calculator, MSME loan EMI, MUDRA loan calculator, collateral free business loan India, SME working capital loan',
  loanName: 'Business Loan',
  defaultAmount: 2000000,
  defaultRate: 13.5,
  defaultTenure: 5,
  minAmount: 50000,
  maxAmount: 20000000,
  stepAmount: 50000,
  maxTenure: 10,
  faqJson: `{
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the maximum limit for collateral-free business loans in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Under the CGTMSE (Credit Guarantee Fund Trust for Micro and Small Enterprises) scheme, eligible MSMEs can get collateral-free business loans up to ₹5 Crore from public and private sector commercial banks."
        }
      },
      {
        "@type": "Question",
        "name": "What are the three categories under PM MUDRA Loan scheme?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PM MUDRA Yojana offers 3 tiers: Shishu (loans up to ₹50,000), Kishore (loans from ₹50,000 to ₹5 Lakh), and Tarun (loans from ₹5 Lakh to ₹10 Lakh)."
        }
      }
    ]
  }`,
  richContent: `
    <div class="card" style="padding: 2.5rem; line-height: 1.7;">
      <h2>MSME & Business Loan Financing Guide (2026 Edition)</h2>
      <p>Business loans empower micro, small, and medium enterprises (MSMEs) to finance working capital, purchase machinery, expand operations, or boost cash flow.</p>

      <h3>1. Types of Business Loans Available in India</h3>
      <ul>
        <li><strong>Working Capital Loan:</strong> Short-term financing to handle day-to-day operational expenses, inventory purchase, and payroll.</li>
        <li><strong>Term Loan:</strong> Medium to long-term loan for capital expansion, factory setup, or purchasing machinery.</li>
        <li><strong>PM MUDRA Yojana:</strong> Government-backed loan up to ₹10 Lakh for non-farm micro enterprises with zero collateral requirement.</li>
        <li><strong>CGTMSE Guaranteed Loan:</strong> Collateral-free credit coverage up to ₹5 Crore for MSMEs backed by Government of India.</li>
      </ul>

      <h3>2. Government Schemes & Subsidies</h3>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Scheme Name</th>
              <th>Max Loan Amount</th>
              <th>Collateral Required</th>
              <th>Key Highlight</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>PM MUDRA Yojana</strong></td>
              <td>Up to ₹10 Lakh</td>
              <td>NO Collateral</td>
              <td>Shishu, Kishore & Tarun tiers for small vendors</td>
            </tr>
            <tr>
              <td><strong>CGTMSE Scheme</strong></td>
              <td>Up to ₹5 Crore</td>
              <td>NO Collateral</td>
              <td>75% to 85% credit guarantee by Government</td>
            </tr>
            <tr>
              <td><strong>Stand-Up India</strong></td>
              <td>₹10 Lakh to ₹1 Crore</td>
              <td>CGTMSE / Collateral</td>
              <td>For SC/ST and Women entrepreneurs</td>
            </tr>
            <tr>
              <td><strong>PMEGP Scheme</strong></td>
              <td>Up to ₹50 Lakh</td>
              <td>NO Collateral</td>
              <td>15% to 35% capital subsidy for new projects</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>3. Eligibility & Required Documents</h3>
      <ul>
        <li><strong>Business Existence:</strong> Minimum 2 to 3 years of continuous operation with positive net worth.</li>
        <li><strong>Annual Turnover:</strong> Minimum ₹15 Lakh to ₹25 Lakh audited turnover supported by GST returns.</li>
        <li><strong>Key Documents:</strong> ITR of last 2 years with Computation of Income, Audited Profit & Loss statement, Balance Sheet, GST Returns (GSTR-3B & GSTR-1), 12-month Bank Statement, PAN & Aadhar of Promoters.</li>
      </ul>
    </div>
  `
});

// 5. Education Loan
createPage({
  filename: 'education-loan.html',
  title: 'Education Loan EMI Calculator 2026 — Sec 80E Tax Benefit | mytotalemi',
  canonical: 'https://mytotalemi.co.in/calculators/education-loan.html',
  description: 'Calculate education loan EMI for study in India & abroad. Understand moratorium period, simple vs compound interest, and 100% tax deduction under Sec 80E.',
  keywords: 'Education loan EMI calculator, study abroad loan EMI, Section 80E tax deduction, SBI student loan rate 2026, moratorium period EMI calculator',
  loanName: 'Education Loan',
  defaultAmount: 1500000,
  defaultRate: 9.2,
  defaultTenure: 12,
  minAmount: 50000,
  maxAmount: 15000000,
  stepAmount: 50000,
  maxTenure: 15,
  faqJson: `{
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the Moratorium Period work for Education Loans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The moratorium period is a repayment holiday during the course duration plus 6 months to 1 year after course completion. EMI payments start only after the moratorium ends."
        }
      },
      {
        "@type": "Question",
        "name": "Is there any upper cap on tax deduction under Section 80E?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "NO! Section 80E of the Income Tax Act allows 100% deduction on total interest paid on education loans with NO upper monetary ceiling limit for up to 8 consecutive financial years."
        }
      }
    ]
  }`,
  richContent: `
    <div class="card" style="padding: 2.5rem; line-height: 1.7;">
      <h2>Complete Guide to Education Loans in India (2026)</h2>
      <p>Higher education in top Indian institutions (IITs, IIMs, AIIMS) or universities abroad (USA, UK, Canada, Australia) requires structured financial planning. Education loans bridge the funding gap with low interest rates and extended repayment timelines.</p>

      <h3>1. Moratorium Period & Interest Calculation</h3>
      <p>Unlike regular loans where EMI starts immediately upon disbursement, education loans offer a <strong>Moratorium Period (Repayment Holiday)</strong>: Course Duration + 6 Months (or 1 Year after securing employment, whichever is earlier).</p>
      <ul>
        <li><strong>Simple Interest During Moratorium:</strong> Banks charge simple interest on disbursed tuition fees during the study period. If parents service simple interest monthly during the moratorium, banks often provide a 1.00% interest rate concession!</li>
        <li><strong>Capitalization of Interest:</strong> If simple interest is unpaid during moratorium, it gets added to the principal balance at the end of moratorium, increasing your starting loan principal when EMI begins.</li>
      </ul>

      <h3>2. Section 80E Tax Deduction (Unlimited Interest Relief)</h3>
      <p>Section 80E provides one of the most generous tax deductions under the Income Tax Act:</p>
      <ul>
        <li><strong>No Upper Cap:</strong> Unlike Section 80C (₹1.5L cap) or Section 24b (₹2L cap), Section 80E allows <strong>100% deduction on the entire interest paid</strong> in a financial year!</li>
        <li><strong>Eligibility:</strong> Available for individual borrowers paying loan interest for higher education of self, spouse, or children.</li>
        <li><strong>Tenure:</strong> Deduction can be claimed for up to 8 consecutive assessment years starting from the year repayment begins.</li>
      </ul>

      <h3>3. Collateral & Subsidy Rules (Central Government CSIS Scheme)</h3>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Loan Amount Cap</th>
              <th>Collateral Requirement</th>
              <th>Co-applicant / Guarantor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Up to ₹4.0 Lakh</strong></td>
              <td>NO Collateral</td>
              <td>Parents as Joint Borrowers</td>
            </tr>
            <tr>
              <td><strong>₹4.0 Lakh to ₹7.5 Lakh</strong></td>
              <td>NO Collateral</td>
              <td>Parents + Third Party Guarantee</td>
            </tr>
            <tr>
              <td><strong>Above ₹7.5 Lakh</strong></td>
              <td>Tangible Collateral (Property / FD)</td>
              <td>Parents as Joint Borrowers</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Under the Central Sector Interest Subsidy (CSIS) scheme, students from economically weaker sections (EWS with family income up to ₹4.5 Lakh p.a.) get 100% interest subsidy during the moratorium period for professional courses in India.</p>
    </div>
  `
});

console.log('🎉 ALL 5 Calculator Pages Built Successfully!');
