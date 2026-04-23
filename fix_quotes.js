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
  
  c = c.replace(/&rdquo;/g, '"');
  c = c.replace(/””/g, '"');
  c = c.replace(/”/g, '"');
  c = c.replace(/“/g, '"');
  c = c.replace(/,1/g, '₹');
  
  
  // Specific fix for titles
  c = c.replace(/<title>([^<]+?)\s*"\s*([^<]+)<\/title>/gi, '<title>$1 - $2</title>');
  c = c.replace(/<title>([^<]+?)\s*""\s*([^<]+)<\/title>/gi, '<title>$1 - $2</title>');
  
  if (o !== c) {
    fs.writeFileSync(f, c);
    console.log('Fixed quotes in', f);
  }
});
