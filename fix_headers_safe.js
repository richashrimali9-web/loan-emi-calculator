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

const removeCss1 = `      header { 
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-bottom: 1px solid #e0e0e0; 
        padding: 1rem 0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }`;
      
const removeCss2 = `      header { 
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-bottom: 1px solid #e0e0e0; 
        padding: 1rem 0; 
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }`;

const cssToRemoveRegex = /[\s]*header\s*\{\s*background:\s*linear-gradient\([^)]+\);\s*color:\s*white;\s*border-bottom:[^;]+;\s*padding:[^;]+;\s*box-shadow:[^;]+;\s*\}/g;

function walk(dir) { 
  let results = []; 
  const list = fs.readdirSync(dir); 
  list.forEach(file => { 
    file = dir + '/' + file; 
    const stat = fs.statSync(file); 
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file)); 
    } else if (file.endsWith('.html')) { 
      results.push(file); 
    } 
  }); 
  return results; 
}

const allFiles = walk('public');

allFiles.forEach(file => {
  const buf = fs.readFileSync(file);
  let content = buf.toString('utf8');
  const hasBom = buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF;
  
  if (hasBom) {
    content = content.slice(1); // remove BOM for easy regex
  }
  
  let changed = false;

  // 1. Remove the old purple gradient CSS block
  if (cssToRemoveRegex.test(content)) {
    content = content.replace(cssToRemoveRegex, '');
    changed = true;
  }

  // 2. Fix post-1.html
  if (file.includes('post-1.html') && content.includes('<header style="background:linear-gradient')) {
    content = content.replace(/<header style="background:linear-gradient[\s\S]*?<\/header>/, newHeader);
    changed = true;
  }

  // 3. Fix garbled emojis in contact/index.html (and others just in case)
  if (content.includes('ðŸ“§') || content.includes('ðŸ’¬') || content.includes('ðŸ ¢')) {
    content = content.replace(/ðŸ“§ Email/g, 'Email');
    content = content.replace(/ðŸ’¬ Response Time/g, 'Response Time');
    content = content.replace(/ðŸ ¢ Website/g, 'Website');
    
    // Also try removing just the garbled part if they are alone
    content = content.replace(/ðŸ“§/g, '');
    content = content.replace(/ðŸ’¬/g, '');
    content = content.replace(/ðŸ ¢/g, '');
    changed = true;
  }
  
  // Wait! Check for double nav!
  // If the file has <header style="..."> AND <header> (the new one)
  // Let's remove the old <header style="...">
  if (content.includes('<header style="background:linear-gradient')) {
      content = content.replace(/<header style="background:linear-gradient[\s\S]*?<\/header>/, '');
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
    console.log('Fixed', file);
  }
});
