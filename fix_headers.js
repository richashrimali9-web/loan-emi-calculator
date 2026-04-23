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

function fixFiles() {
  const guideFiles = fs.readdirSync('public/guides').filter(f => f.endsWith('.html')).map(f => `public/guides/${f}`);
  const utilityFiles = ['public/contact/index.html', 'public/privacy-policy/index.html', 'public/terms-of-service/index.html'];
  const blogFiles = fs.readdirSync('public/blog').filter(f => f.endsWith('.html')).map(f => `public/blog/${f}`);
  
  const allFiles = [...guideFiles, ...utilityFiles, ...blogFiles];
  
  for (const file of allFiles) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix post-1.html specifically with inline header
    if (file === 'public/blog/post-1.html' || file.includes('post-1.html')) {
        // remove old inline header block completely if it exists
        content = content.replace(/<header style="background:linear-gradient[\s\S]*?<\/header>/, newHeader);
    }
    
    // The user says there's a double header in guide pages. Let's make absolutely sure we don't have multiple headers!
    // But we know there is only 1 <header> in guides. The issue might be the inline styling!
    
    // 1. Remove the old CSS block that makes headers purple
    const cssToRemove = `      header { 
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-bottom: 1px solid #e0e0e0; 
        padding: 1rem 0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }`;
      
    const cssToRemove2 = `      header { 
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-bottom: 1px solid #e0e0e0; 
        padding: 1rem 0; 
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }`;
      
    content = content.replace(cssToRemove, '');
    content = content.replace(cssToRemove2, '');
    
    // 2. Fix garbled emojis
    content = content.replace(/ðŸ“§ Email/g, 'Email');
    content = content.replace(/ðŸ’¬ Response Time/g, 'Response Time');
    content = content.replace(/ðŸ ¢ Website/g, 'Website');
    
    // In case the user locally DOES have two headers due to some sync issue, let's aggressively remove duplicate <header> tags.
    const headerCount = (content.match(/<header>/g) || []).length;
    if (headerCount > 1) {
        // Find the first header and keep it, or find the new header and remove the other one.
        // It's safer to just replace all <header>...</header> with ONE newHeader, EXCEPT if it's post-2.html which has <header class="article-header">
        if (file !== 'public/blog/post-2.html' && file !== 'public/blog/post-1.html') {
             // If there are multiple headers, let's strip them all out and insert just one right after <body>
             content = content.replace(/<header>[\s\S]*?<\/header>/g, '');
             content = content.replace('<body>', '<body>\n' + newHeader);
        }
    }
    
    // Handle any header with inline style in ANY file
    content = content.replace(/<header style="background:linear-gradient[\s\S]*?<\/header>/g, '');
    
    fs.writeFileSync(file, content);
  }
  console.log("Done fixing files!");
}

fixFiles();
