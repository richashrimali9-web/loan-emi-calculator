const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'build') {
        results = results.concat(walk(filePath));
      }
    } else if (filePath.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

const allHtmlFiles = walk('.');
console.log('Found', allHtmlFiles.length, 'HTML files to audit.');

let filesChanged = 0;

allHtmlFiles.forEach(file => {
  const buf = fs.readFileSync(file);
  let content = buf.toString('utf8');
  const hasBom = buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF;
  
  if (hasBom) {
    content = content.slice(1);
  }
  
  let originalContent = content;

  // 1. Fix Mojibake/Encoding
  // Email
  content = content.replace(/ðŸ“§ Email/g, 'Email');
  content = content.replace(/dY\?§ Email/g, 'Email');
  content = content.replace(/ðŸ“§/g, '');
  
  // Response Time
  content = content.replace(/ðŸ’¬ Response Time/g, 'Response Time');
  content = content.replace(/dY\?¬ Response Time/g, 'Response Time');
  content = content.replace(/ðŸ’¬/g, '');
  
  // Website
  content = content.replace(/ðŸ ¢ Website/g, 'Website');
  content = content.replace(/dY\? Website/g, 'Website');
  content = content.replace(/dY\?¢ Website/g, 'Website');
  content = content.replace(/ðŸ ¢/g, '');
  
  // Thank you
  content = content.replace(/âœ“ Thank you!/g, 'Thank you!');
  content = content.replace(/v Thank you!/g, 'Thank you!');
  content = content.replace(/âœ“/g, '');
  
  // Em dashes
  content = content.replace(/â€”/g, '-');
  content = content.replace(/\?"/g, '-');
  content = content.replace(/\?”/g, '-');
  content = content.replace(/&rdquo;â€ /g, '-');
  
  // Fix garbled title specifically
  if (content.includes('<title>Contact Us - Loan EMI Calculator</title>') === false) {
     content = content.replace(/<title>Contact Us.*?Loan EMI Calculator<\/title>/i, '<title>Contact Us - Loan EMI Calculator</title>');
  }
  
  // 2. Remove all old inline headers or gradient styles
  content = content.replace(/<header style="background:linear-gradient[\s\S]*?<\/header>/g, '');
  
  const oldCssRegex = /[\s]*header\s*\{\s*background:\s*linear-gradient\([^)]+\);\s*color:\s*white;\s*border-bottom:[^;]+;\s*padding:[^;]+;\s*box-shadow:[^;]+;\s*\}/g;
  content = content.replace(oldCssRegex, '');
  
  // 3. Ensure the CSS for the nav is present
  const missingCSS = `
      /* Fix for new header layout */
      nav ul {
        display: flex;
        list-style: none;
        gap: 1.5rem;
        margin: 0;
        padding: 0;
      }
      .brand {
        font-weight: bold;
        font-size: 1.2rem;
        text-decoration: none;
        color: #667eea;
      }
      .nav-btn-apply {
        background-color: #667eea;
        color: white !important;
        padding: 0.4rem 1rem;
        border-radius: 20px;
        text-decoration: none;
      }
      .hamburger {
        display: none;
        flex-direction: column;
        justify-content: space-around;
        width: 2rem;
        height: 1.5rem;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
      }
      .hamburger span {
        width: 2rem;
        height: 0.2rem;
        background: #333;
        border-radius: 10px;
      }
      .mobile-menu {
        display: none;
        position: absolute;
        top: 60px;
        left: 0;
        width: 100%;
        background: white;
        flex-direction: column;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 100;
      }
      .mobile-menu.visible {
        display: flex;
      }
      .mobile-menu a {
        padding: 1rem 2rem;
        text-decoration: none;
        color: #333;
        border-bottom: 1px solid #eee;
      }
      @media (max-width: 768px) {
        nav ul { display: none; }
        .hamburger { display: flex; }
      }
`;

  // Only inject CSS if it's a standalone file (no style.css link) that has the mobile menu
  if (content.includes('class="mobile-menu"') && !content.includes('style.css')) {
    if (!content.includes('/* Fix for new header layout */')) {
        content = content.replace('</style>', missingCSS + '\n    </style>');
    }
  }

  // 4. If any file has duplicate <header> blocks, clean them up
  // We expect exactly ONE <header>...</header> before <main>
  // Let's not blindly regex all headers, but let's check for multiple `<nav>` inside the body just to be safe.
  // The user prompt says: "Remove duplicate nav markup".
  // Let's explicitly remove ANY `nav ul { display: none; }` inside the body if it's duplicated textually.
  // Actually, we don't have duplicated markup, the scraper was just reading mobileMenu and navMenu as two lists.
  // But wait! Is there any file with TWO <header> tags?
  const headerMatches = content.match(/<header>/g);
  if (headerMatches && headerMatches.length > 1 && file !== 'blog\\post-2.html' && file !== 'public\\blog\\post-2.html') {
    // Only post-2.html is allowed to have <header class="article-header"> inside the article.
    // If there's multiple <header> tags, let's keep only the first one if it's identical?
    // Actually, I verified there are no files with duplicate headers.
  }

  // 5. Fix blog/post-2.html duplicate appended content
  if (file.includes('post-2.html')) {
    // Look for duplicate closing tags `</html>` and anything after it.
    const closingHtmlIndex = content.indexOf('</html>');
    if (closingHtmlIndex !== -1 && closingHtmlIndex + 7 < content.length) {
       // There is extra content after </html>
       const extraContent = content.substring(closingHtmlIndex + 7).trim();
       if (extraContent.length > 0) {
           content = content.substring(0, closingHtmlIndex + 7);
           console.log(`Removed corrupted trailing content from ${file}`);
       }
    }
    
    // Also check if there's duplicate "Key Differences" or "Frequently Asked Questions"
    const keyDiffCount = (content.match(/<h2>Key Differences: Home Loan vs Personal Loan<\/h2>/g) || []).length;
    if (keyDiffCount > 1) {
       // We have a massive internal duplication!
       console.log('WARNING: Internal duplication detected in ' + file);
    }
  }

  if (content !== originalContent) {
    if (hasBom) {
      const bom = Buffer.from([0xEF, 0xBB, 0xBF]);
      const contentBuf = Buffer.from(content, 'utf8');
      fs.writeFileSync(file, Buffer.concat([bom, contentBuf]));
    } else {
      fs.writeFileSync(file, content, 'utf8');
    }
    console.log('Fixed', file);
    filesChanged++;
  }
});

console.log(`Finished. Fixed ${filesChanged} files.`);
