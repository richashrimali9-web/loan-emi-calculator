const fs = require('fs');

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
    content = content.slice(1);
  }
  
  // Only process if it has the new header and DOES NOT link to style.css
  if (content.includes('id="navMenu"') && !content.includes('style.css')) {
      // Check if we already injected it
      if (!content.includes('/* Fix for new header layout */')) {
          content = content.replace('</style>', missingCSS + '\n    </style>');
          
          if (hasBom) {
            const bom = Buffer.from([0xEF, 0xBB, 0xBF]);
            const contentBuf = Buffer.from(content, 'utf8');
            fs.writeFileSync(file, Buffer.concat([bom, contentBuf]));
          } else {
            fs.writeFileSync(file, content, 'utf8');
          }
          console.log('Injected CSS into', file);
      }
  }
});
