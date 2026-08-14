const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const calcDir = path.join(publicDir, 'calculators');

const indexHtmlPath = path.join(publicDir, 'index.html');
const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Extract main calculator section from index.html
const calcSectionMatch = indexContent.match(/<!-- Calculator Section -->[\s\S]*?<\/section>/i);
const calcSection = calcSectionMatch ? calcSectionMatch[0] : '';

const bankRatesMatch = indexContent.match(/<!-- Top Indian Bank Home Loan Rates 2026 -->[\s\S]*?<\/section>/i);
const bankRatesSection = bankRatesMatch ? bankRatesMatch[0] : '';

function generateCalculatorPage(type, title, defaultAmount, defaultRate, defaultTenure, desc, faqs) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} — mytotalemi</title>
  <meta name="description" content="Calculate your ${title} monthly EMI, total interest, and annual schedule. Compare rates from top Indian banks and optimize your loan repayment.">
  <link rel="canonical" href="https://mytotalemi.co.in/calculators/${type}.html">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
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

  <main>
    <section class="saas-hero">
      <div class="hero-content">
        <div class="hero-pill-badge">
          <span>✨ 2026 Financial Engine</span>
          <span>•</span>
          <span>100% Free & Independent</span>
        </div>
        <h1 style="font-size: 2.5rem; margin-bottom: 0.75rem;">${title}</h1>
        <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 700px; margin: 0 auto 1.5rem;">${desc}</p>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="container" style="margin: 0 auto 3rem;">
      <div class="saas-dashboard-grid">
        <div class="saas-calc-card">
          <h2 style="text-align: left; margin-top: 0; border: none; padding-bottom: 0; font-size: 1.4rem;">${title}</h2>
          <p style="color: var(--text-muted); margin-bottom: 1.75rem; font-size: 0.9rem;">Adjust sliders to see instant payment updates.</p>
          
          <div class="input-field">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <label for="loanAmount" style="margin: 0;">Loan Amount</label>
              <span style="font-weight: 700; color: var(--primary); font-size: 1.05rem;">₹<span id="loanAmountLabel">${defaultAmount.toLocaleString('en-IN')}</span></span>
            </div>
            <input type="range" id="loanAmountSlider" min="50000" max="10000000" step="50000" value="${defaultAmount}">
            <input type="number" id="loanAmount" min="50000" max="10000000" step="50000" value="${defaultAmount}">
          </div>

          <div class="input-field">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <label for="interestRate" style="margin: 0;">Annual Interest Rate (%)</label>
              <span style="font-weight: 700; color: var(--primary); font-size: 1.05rem;"><span id="interestRateLabel">${defaultRate}</span>%</span>
            </div>
            <input type="range" id="interestRateSlider" min="5" max="24" step="0.1" value="${defaultRate}">
            <input type="number" id="interestRate" min="5" max="24" step="0.1" value="${defaultRate}">
          </div>

          <div class="input-field">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <label for="tenure" style="margin: 0;">Loan Tenure (Years)</label>
              <span style="font-weight: 700; color: var(--primary); font-size: 1.05rem;"><span id="tenureLabel">${defaultTenure}</span> Yrs</span>
            </div>
            <input type="range" id="tenureSlider" min="1" max="30" step="1" value="${defaultTenure}">
            <input type="number" id="tenure" min="1" max="30" step="1" value="${defaultTenure}">
          </div>

          <button class="btn-primary btn-block" id="calculateBtn" style="font-size: 1rem; padding: 0.85rem; border-radius: var(--radius-sm); margin-top: 0.75rem;">Recalculate Schedule</button>
        </div>

        <div id="results" style="display: flex; flex-direction: column; justify-content: space-between; gap: 1rem;">
          <div class="saas-stat-card hero-stat" style="padding: 1.75rem;">
            <div class="stat-label" style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px;">Calculated Monthly EMI</div>
            <div class="stat-value" style="font-size: 2.5rem; margin: 0.5rem 0 0; font-weight: 800;">₹<span id="emiValue">0</span></div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="saas-stat-card" style="padding: 1.25rem;">
              <div class="stat-value error" style="font-size: 1.3rem;">₹<span id="totalInterestValue">0</span></div>
              <div class="stat-label" style="font-size: 0.8rem;">Total Interest</div>
            </div>
            <div class="saas-stat-card" style="padding: 1.25rem;">
              <div class="stat-value text" style="font-size: 1.3rem;">₹<span id="totalPaymentValue">0</span></div>
              <div class="stat-label" style="font-size: 0.8rem;">Total Payable</div>
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
          <h3 style="margin: 0;">5-Year Amortization Schedule</h3>
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

    <!-- Deep Guide & FAQ Section -->
    <section class="container" style="margin: 4rem auto;">
      <div class="card" style="padding: 2.5rem;">
        <h2 style="margin-top: 0;">Understanding Your ${title}</h2>
        <p>${desc}</p>
        
        <h3>Frequently Asked Questions</h3>
        <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-top: 1rem;">
          ${faqs.map(faq => `
            <div style="background: var(--bg); border: 1px solid var(--border); padding: 1.25rem; border-radius: var(--radius-sm);">
              <h4 style="margin: 0 0 0.4rem; font-size: 1rem; color: var(--text);">${faq.q}</h4>
              <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted);">${faq.a}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  </main>

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
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/guides/">Guides</a></li>
            <li><a href="/about/">About</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="/privacy-policy/">Privacy Policy</a></li>
            <li><a href="/terms-of-service/">Terms of Service</a></li>
            <li><a href="/contact/">Contact</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-divider">
        <p>&copy; 2026 mytotalemi. All rights reserved. Educational financial calculations only.</p>
      </div>
    </div>
  </footer>
  <script>
    const btn = document.getElementById('hamburgerBtn');
    const menu = document.getElementById('mobileMenu');
    if (btn && menu) {
      btn.addEventListener('click', () => menu.classList.toggle('active'));
    }

    // Basic calculation script for standalone calculator pages
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
      for (let yr = 1; yr <= Math.min(5, Math.ceil(tenure / 12)); yr++) {
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
</body>
</html>`;
}

const pages = [
  {
    type: 'home-loan',
    title: 'Home Loan EMI Calculator',
    amount: 5000000,
    rate: 8.5,
    tenure: 20,
    desc: 'Calculate exact monthly EMI, total interest, and amortization breakdown for your housing loan in India. Compare floating interest rates across top lenders.',
    faqs: [
      { q: 'Is prepayment allowed on home loans in India?', a: 'Yes, per RBI guidelines, individual floating-rate home loans carry zero prepayment penalty.' },
      { q: 'What is the ideal tenure for a home loan?', a: 'A 15-to-20 year tenure balances affordable monthly EMIs with controlled total interest paid over time.' },
      { q: 'How does down payment affect total cost?', a: 'Higher down payments reduce the principal borrowed, directly lowering total interest outgo.' }
    ]
  },
  {
    type: 'car-loan',
    title: 'Car Loan EMI Calculator',
    amount: 1000000,
    rate: 9.0,
    tenure: 7,
    desc: 'Estimate monthly installments for new and used auto loans. Model down payment impact and find the best financing option for your budget.',
    faqs: [
      { q: 'What is the maximum tenure for a car loan?', a: 'Car loan tenures in India generally range from 1 to 7 years.' },
      { q: 'Are interest rates higher for used cars?', a: 'Yes, used car loans carry 2% to 4% higher interest rates compared to new car financing.' }
    ]
  },
  {
    type: 'personal-loan',
    title: 'Personal Loan EMI Calculator',
    amount: 500000,
    rate: 12.0,
    tenure: 5,
    desc: 'Compute your monthly payments for unsecured personal loans. Explore interest rates, processing fees, and repayment schedules.',
    faqs: [
      { q: 'Do personal loans require collateral?', a: 'No, personal loans are unsecured loans issued based on your credit score and monthly income.' },
      { q: 'Can I prepay a personal loan early?', a: 'Yes, though some lenders charge 2% to 5% foreclosure fees on pre-closing personal loans.' }
    ]
  },
  {
    type: 'business-loan',
    title: 'Business Loan EMI Calculator',
    amount: 1000000,
    rate: 14.0,
    tenure: 5,
    desc: 'Model monthly debt service for SME working capital, equipment, and commercial expansion loans.',
    faqs: [
      { q: 'What documents are required for business loans?', a: 'Lenders typically require 2 years of audited P&L statements, GST returns, and bank statements.' }
    ]
  }
];

pages.forEach(p => {
  const filePath = path.join(calcDir, `${p.type}.html`);
  const html = generateCalculatorPage(p.type, p.title, p.amount, p.rate, p.tenure, p.desc, p.faqs);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Upgraded calculator landing page: ${p.type}.html`);
});
