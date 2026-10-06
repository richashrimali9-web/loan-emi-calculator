const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'public', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

let updated = 0;
const authorLink = 'By <a href="/author/richa-shrimali/" style="color: #6366f1; text-decoration: underline; font-weight: 600;">Richa Shrimali (M.Sc. Physics)</a>';

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace "By mytotalemi Team"
  content = content.replace(/By mytotalemi Team/g, authorLink);
  // Replace "Written and reviewed by the MyTotalEMI editorial team"
  content = content.replace(/Written and reviewed by the MyTotalEMI editorial team/g, authorLink);

  // Fix typo in 5-common-emi-calculation-mistakes if present
  content = content.replace(/₹1,79₹3,20,000/g, '₹1,79,32,000');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updated++;
    console.log(`Updated byline in: ${file}`);
  }
});

console.log(`\nSuccessfully updated bylines in ${updated} blog articles.`);
