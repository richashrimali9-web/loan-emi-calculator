const fs = require('fs');
const path = require('path');

const mapping = {
  'post-1.html': 'how-emi-works-india-guide.html',
  'post-2.html': 'home-loan-vs-personal-loan-comparison.html',
  'post-3.html': 'cibil-score-impact-on-loan-emi.html',
  'post-4.html': 'home-loan-prepayment-strategies-india.html',
  'post-5.html': 'fixed-vs-floating-interest-rates-guide.html',
  'post-6.html': 'personal-loan-prepayment-pros-cons.html',
  'post-7.html': 'car-loan-emi-calculation-tips.html',
  'post-8.html': 'education-loan-repayment-and-grace-period.html',
  'post-9.html': 'common-loan-repayment-mistakes-to-avoid.html',
  'post-10.html': 'home-loan-tax-benefits-section-80c-24b.html'
};

function walk(d) {
  let r = [];
  fs.readdirSync(d).forEach(f => {
    let p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'build') {
        r = r.concat(walk(p));
      }
    } else if (f.endsWith('.html') || f === 'sitemap.xml') {
      r.push(p);
    }
  });
  return r;
}

// 1. Rename files in blog and public/blog directories
['blog', 'public/blog'].forEach(dir => {
  Object.keys(mapping).forEach(oldName => {
    const oldPath = path.join(dir, oldName);
    const newPath = path.join(dir, mapping[oldName]);
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed: ${oldPath} -> ${newPath}`);
    }
  });
});

// 2. Update links in all files
const allFiles = walk('.');
allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  Object.keys(mapping).forEach(oldName => {
    const regex = new RegExp(oldName, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, mapping[oldName]);
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated links in: ${file}`);
  }
});

console.log('Successfully renamed blog posts and updated all internal links.');
