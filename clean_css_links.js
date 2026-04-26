const fs = require('fs'), path = require('path');
function walk(d) {
  let r = [];
  for (const f of fs.readdirSync(d, {withFileTypes:true})) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) r = r.concat(walk(p));
    else if (f.name.endsWith('.html')) r.push(p);
  }
  return r;
}
let count = 0;
walk('public').forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  const o = c;
  c = c.replace(/\/css\/style\.css\?v=[^"']+/g, '/css/style.css');
  if (o !== c) { fs.writeFileSync(f, c); count++; console.log('Cleaned:', f); }
});
// Also clean root-level html files
walk('.').filter(f => !f.includes('public') && !f.includes('node_modules') && !f.includes('build')).forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  const o = c;
  c = c.replace(/\/css\/style\.css\?v=[^"']+/g, '/css/style.css');
  if (o !== c) { fs.writeFileSync(f, c); count++; console.log('Cleaned:', f); }
});
console.log('Done. Files updated:', count);
