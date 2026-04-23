const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  try {
    fs.readdirSync(dir).forEach(f => {
      let p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) {
        if (f !== 'node_modules' && f !== '.git' && f !== 'build') {
          results = results.concat(walk(p));
        }
      } else if (p.endsWith('.html')) {
        results.push(p);
      }
    });
  } catch (e) {}
  return results;
}

walk('.').forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let o = c;
  
  // Fix broken titles
  c = c.replace(/<title>([^<]+?)\s*(?:&rdquo;|””|”|"|,1|—)\s*([^<]+)<\/title>/gi, '<title>$1 - $2</title>');
  // Double check generic fix
  c = c.replace(/Privacy Policy ”” mytotalemi/, 'Privacy Policy - mytotalemi');
  
  // Clean up any weird ,1 artifacts in title or favicon
  c = c.replace(/,1/g, '₹');
  
  if (o !== c) {
    fs.writeFileSync(f, c);
    console.log('Fixed title/encoding in', f);
  }
});
