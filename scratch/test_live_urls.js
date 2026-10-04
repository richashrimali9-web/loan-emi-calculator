const https = require('https');

const testUrls = [
  'https://mytotalemi.co.in/',
  'https://mytotalemi.co.in/calculators/home-loan.html',
  'https://mytotalemi.co.in/calculators/personal-loan.html',
  'https://mytotalemi.co.in/calculators/car-loan.html',
  'https://mytotalemi.co.in/calculators/business-loan.html',
  'https://mytotalemi.co.in/calculators/education-loan.html',
  'https://mytotalemi.co.in/about/',
  'https://mytotalemi.co.in/contact/',
  'https://mytotalemi.co.in/privacy-policy/',
  'https://mytotalemi.co.in/terms-of-service/',
  'https://mytotalemi.co.in/ads.txt',
  'https://mytotalemi.co.in/sitemap.xml',
  'https://mytotalemi.co.in/robots.txt'
];

console.log(`🌐 Testing live production URLs on https://mytotalemi.co.in/...\n`);

let completed = 0;

testUrls.forEach(url => {
  https.get(url, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      completed++;
      const statusCode = res.statusCode;
      const hasAdSense = body.includes('pub-8063078781485185');
      const icon = statusCode === 200 && (hasAdSense || url.endsWith('.xml') || url.endsWith('.txt')) ? '✅' : '❌';
      
      console.log(`${icon} [HTTP ${statusCode}] ${url} (AdSense Code: ${hasAdSense ? 'PRESENT' : 'N/A'})`);

      if (completed === testUrls.length) {
        console.log(`\n🎉 All live production checks completed!`);
      }
    });
  }).on('error', (err) => {
    completed++;
    console.log(`❌ ERROR fetching ${url}: ${err.message}`);
  });
});
