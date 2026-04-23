const fs = require('fs');
const path = require('path');

const newHeader = `  <header>
    <nav>
      <a href="/" class="brand">mytotalemi</a>
      
      <button class="hamburger" id="hamburgerBtn">
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

allHtmlFiles.forEach(file => {
  const buf = fs.readFileSync(file);
  let content = buf.toString('utf8');
  const hasBom = buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF;
  
  if (hasBom) {
    content = content.slice(1);
  }
  
  let changed = false;

  // Replace any old header blocks with the new header
  if (!content.includes('id="navMenu"') && content.includes('<header>')) {
      // Find the first <header>...</header> and replace it.
      // Make sure we only replace the main header, not article headers.
      // But we know article headers are usually <header class="article-header">
      content = content.replace(/<header>\s*<nav[\s\S]*?<\/header>/, newHeader);
      changed = true;
  }
  
  // What about `<header style="...">`?
  if (content.match(/<header style="[^"]*">\s*<nav/)) {
      content = content.replace(/<header style="[^"]*">\s*<nav[\s\S]*?<\/header>/, newHeader);
      changed = true;
  }

  // Also replace any old title encodings like `"` instead of `-`
  if (content.includes('<title>Home Loan EMI Calculator " Loan EMI Calculator</title>')) {
      content = content.replace('<title>Home Loan EMI Calculator " Loan EMI Calculator</title>', '<title>Home Loan EMI Calculator - Loan EMI Calculator</title>');
      changed = true;
  }

  if (changed) {
    if (hasBom) {
      const bom = Buffer.from([0xEF, 0xBB, 0xBF]);
      const contentBuf = Buffer.from(content, 'utf8');
      fs.writeFileSync(file, Buffer.concat([bom, contentBuf]));
    } else {
      fs.writeFileSync(file, content, 'utf8');
    }
    console.log('Fixed header in', file);
  }
});
