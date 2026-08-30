const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// 1. Upgrade Privacy Policy
const privacyHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy — mytotalemi</title>
  <meta name="description" content="Privacy Policy for mytotalemi. Learn how we protect user privacy, cookies, data policies, and third-party advertising transparency.">
  <meta name="theme-color" content="#4f46e5">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23ffffff'/><text x='50' y='70' font-size='60' font-weight='bold' text-anchor='middle' fill='%234f46e5'>₹</text></svg>">
  <link rel="stylesheet" href="/css/style.css">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8063078781485185" crossorigin="anonymous"></script>
  <link rel="canonical" href="https://mytotalemi.co.in/privacy-policy/">
  <style>
    .legal-hero {
      background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%);
      color: #ffffff;
      padding: 3.5rem 1rem 3rem;
      text-align: center;
    }
    .legal-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 2.5rem;
      box-shadow: var(--shadow);
      margin-bottom: 3rem;
    }
  </style>
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

  <section class="legal-hero">
    <div style="max-width: 800px; margin: 0 auto;">
      <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">Privacy Policy</h1>
      <p style="color: #cbd5e1; font-size: 1.05rem;">Last Updated: April 2026 • Transparency & Data Protection Notice</p>
    </div>
  </section>

  <main style="max-width: 960px; margin: -2rem auto 3rem; padding: 0 1rem; position: relative; z-index: 10;">
    <div class="legal-card" style="line-height: 1.75;">
      <p>At <strong>mytotalemi</strong> (accessible from <a href="https://mytotalemi.co.in/">https://mytotalemi.co.in/</a>), visitor privacy is one of our foundational commitments. This Privacy Policy outlines the types of information recorded and processed by our platform and how it is protected.</p>
      
      <h2>1. Local Processing & Zero Personal Data Storage</h2>
      <p>All financial computations performed on our loan calculators (including principal amounts, interest rates, tenures, and amortization tables) are executed <strong>locally inside your web browser</strong> using JavaScript. We do not store, transmit, or harvest your personal financial calculation inputs on external databases.</p>

      <h2>2. Standard Server Log Files</h2>
      <p>mytotalemi follows standard website hosting procedures using log files. Information logged includes Internet Protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and click statistics. This information is purely used for security monitoring, trend analysis, site administration, and infrastructure performance optimization. Log files are not linked to personally identifiable information.</p>

      <h2>3. Cookies & Web Beacons</h2>
      <p>Like most modern platforms, mytotalemi uses cookies to store visitor preferences and optimize user experience based on browser capabilities or device settings.</p>

      <h2>4. Google DoubleClick DART Cookies & AdSense</h2>
      <p>Google is a third-party vendor on our site. It utilizes cookies (such as DART cookies) to serve relevant advertisements to visitors based on visits to www.mytotalemi.co.in and other sites on the Internet. Visitors may opt-out of personalized DART cookie advertising by visiting the Google Ad and Content Network Privacy Policy at: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">https://policies.google.com/technologies/ads</a>.</p>

      <h2>5. Third-Party Privacy Policies</h2>
      <p>mytotalemi's Privacy Policy does not apply to external advertisers or linked third-party websites. We encourage visitors to consult the respective privacy disclosures of third-party ad networks for instructions on opt-out procedures and cookie management.</p>

      <h2>6. Children's Online Privacy Protection</h2>
      <p>mytotalemi does not knowingly collect or solicit Personal Identifiable Information from children under the age of 13. If you believe a child has submitted personal details on our site, please contact us immediately at <a href="mailto:support@mytotalemi.co.in">support@mytotalemi.co.in</a> for swift removal.</p>

      <h2>7. Consent & Updates</h2>
      <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms. Questions regarding this policy can be directed via our <a href="/contact/">Contact Page</a>.</p>
    </div>
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

  <script>
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburgerBtn && mobileMenu) {
      hamburgerBtn.addEventListener('click', function() {
        hamburgerBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
      });
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
          hamburgerBtn.classList.remove('active');
          mobileMenu.classList.remove('active');
        });
      });
    }
  </script>
</body>
</html>`;

// 2. Upgrade Terms of Service
const termsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Terms of Service — mytotalemi</title>
  <meta name="description" content="Terms of Service for mytotalemi educational borrower calculators, guides, and rate comparison tools.">
  <meta name="theme-color" content="#4f46e5">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23ffffff'/><text x='50' y='70' font-size='60' font-weight='bold' text-anchor='middle' fill='%234f46e5'>₹</text></svg>">
  <link rel="stylesheet" href="/css/style.css">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8063078781485185" crossorigin="anonymous"></script>
  <link rel="canonical" href="https://mytotalemi.co.in/terms-of-service/">
  <style>
    .legal-hero {
      background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%);
      color: #ffffff;
      padding: 3.5rem 1rem 3rem;
      text-align: center;
    }
    .legal-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 2.5rem;
      box-shadow: var(--shadow);
      margin-bottom: 3rem;
    }
  </style>
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

  <section class="legal-hero">
    <div style="max-width: 800px; margin: 0 auto;">
      <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">Terms of Service</h1>
      <p style="color: #cbd5e1; font-size: 1.05rem;">Last Updated: April 2026 • Platform Terms & Non-Lender Disclaimer</p>
    </div>
  </section>

  <main style="max-width: 960px; margin: -2rem auto 3rem; padding: 0 1rem; position: relative; z-index: 10;">
    <div class="legal-card" style="line-height: 1.75;">
      <p>Welcome to <strong>mytotalemi</strong>. These Terms of Service govern your use of our website, financial calculators, articles, and educational guides. By accessing or using this site, you agree to comply with these terms.</p>
      
      <h2>1. Educational & Illustrative Purpose Only</h2>
      <p>All calculations, interest estimates, tax deduction breakdowns, and repayment schedules provided on mytotalemi are intended strictly for educational and self-planning purposes. They do not constitute formal financial, tax, or legal advice. Final interest rates, loan eligibility, and terms are determined exclusively by official lending institutions.</p>

      <h2>2. Non-Lender & Independent Entity Status</h2>
      <p>mytotalemi is an independent technology and content platform. We are not a commercial bank, non-banking financial company (NBFC), credit broker, or loan agency. We do not issue credit, approve loan applications, or disburse funds to borrowers.</p>

      <h2>3. Accuracy & Rate Disclaimers</h2>
      <p>While we make every effort to maintain accurate, up-to-date information regarding interest rates, processing fees, and RBI directives, lending conditions change frequently. We do not warrant the absolute accuracy or completeness of third-party bank data.</p>

      <h2>4. Limitation of Liability</h2>
      <p>Under no circumstances shall mytotalemi or its creators be held liable for any financial decisions, loan commitments, or losses incurred based on information presented on this site.</p>

      <h2>5. Intellectual Property Rights</h2>
      <p>All software code, custom layout designs, graphics, branding, and written guides on mytotalemi are protected by intellectual property laws and belong exclusively to mytotalemi.</p>

      <h2>6. Revisions to Terms</h2>
      <p>We reserve the right to modify these terms at any time without prior notice. Continued usage of the site signifies your agreement to any updated terms.</p>

      <h2>7. Contact Information</h2>
      <p>For inquiries concerning these terms, please contact us via our <a href="/contact/">Contact Form</a> or email <a href="mailto:support@mytotalemi.co.in">support@mytotalemi.co.in</a>.</p>
    </div>
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

  <script>
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburgerBtn && mobileMenu) {
      hamburgerBtn.addEventListener('click', function() {
        hamburgerBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
      });
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
          hamburgerBtn.classList.remove('active');
          mobileMenu.classList.remove('active');
        });
      });
    }
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'privacy-policy', 'index.html'), privacyHtml, 'utf-8');
fs.writeFileSync(path.join(publicDir, 'terms-of-service', 'index.html'), termsHtml, 'utf-8');

console.log('✅ Successfully upgraded Privacy Policy and Terms of Service with premium SaaS styling!');
