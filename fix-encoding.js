const fs = require('fs');
const iconv = require('iconv-lite');
// First run: npm install iconv-lite

const files = [
  'index.html',
  'public/about/index.html',
  'public/blog/index.html',
  'public/guides/index.html',
  'public/contact/index.html',
  'public/privacy-policy/index.html',
  'public/terms-of-service/index.html'
];

files.forEach(file => {
  try {
    const raw = fs.readFileSync(file);
    const decoded = iconv.decode(raw, 'win1252');
    fs.writeFileSync(file, decoded, 'utf8');
    console.log('Fixed:', file);
  } catch(e) {
    console.error('Error on', file, e.message);
  }
});