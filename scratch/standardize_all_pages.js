const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

const standardHeader = `  <header>
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
  </header>`;

const standardFooter = `  <footer>
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
  </script>`;

function getRelPath(filePath) {
  const rel = path.relative(publicDir, filePath).replace(/\\/g, '/');
  const depth = rel.split('/').length - 1;
  return depth === 0 ? './' : '../'.repeat(depth);
}

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = getAllHtmlFiles(publicDir);
console.log(`Processing ${files.length} HTML files...`);

let processed = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const relCss = getRelPath(file) + 'css/style.css';

  // Ensure <head> contains CSS link
  if (!content.includes('css/style.css')) {
    const cssTag = `<link rel="stylesheet" href="${relCss}">`;
    if (content.includes('</head>')) {
      content = content.replace('</head>', `  ${cssTag}\n</head>`);
    } else if (content.includes('<body>')) {
      content = content.replace('<body>', `<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  ${cssTag}\n</head>\n<body>`);
    }
  }

  // Replace legacy header if present, or insert standard header at <body>
  if (content.includes('<header>')) {
    content = content.replace(/<header>[\s\S]*?<\/header>/i, standardHeader);
  } else if (content.includes('<body>')) {
    content = content.replace('<body>', `<body>\n${standardHeader}`);
  }

  // Replace legacy footer if present, or insert standard footer before </body>
  if (content.includes('<footer>')) {
    content = content.replace(/<footer>[\s\S]*?<\/footer>/i, standardFooter);
  } else if (content.includes('</body>')) {
    content = content.replace('</body>', `${standardFooter}\n</body>`);
  }

  // Remove dead script
  content = content.replace(/<script[^>]*src="\/src\/main\.tsx"[^>]*><\/script>/gi, '');

  fs.writeFileSync(file, content, 'utf8');
  processed++;
});

console.log(`Successfully standardized ${processed} HTML files.`);
