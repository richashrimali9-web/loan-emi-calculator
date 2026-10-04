const fs = require('fs');
const path = require('path');
const https = require('https');

const publicDir = path.join(__dirname, '..', 'public');
const adsenseId = 'ca-pub-8063078781485185';

function getAllHtmlFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllHtmlFiles(filePath, arrayOfFiles);
    } else if (file.endsWith('.html')) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

const htmlFiles = getAllHtmlFiles(publicDir);

console.log(`====================================================`);
console.log(`🔍 RUNNING DEFINITIVE PRE-SUBMISSION ADSENSE AUDIT`);
console.log(`====================================================\n`);

console.log(`📁 Auditing ${htmlFiles.length} local HTML files in public/...`);

let passCount = 0;
let failCount = 0;
const report = [];

htmlFiles.forEach((file) => {
  const relativePath = path.relative(publicDir, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf-8');
  const fileErrors = [];

  // 1. Check AdSense Script
  if (!content.includes(adsenseId)) {
    fileErrors.push(`Missing AdSense Script (${adsenseId})`);
  }

  // 2. Check Canonical Tag
  if (!content.includes('rel="canonical"') && !content.includes("rel='canonical'")) {
    fileErrors.push(`Missing <link rel="canonical"> tag`);
  }

  // 3. Check Title & Description
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    fileErrors.push(`Missing or empty <title>`);
  }

  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  if (!descMatch || !descMatch[1].trim()) {
    fileErrors.push(`Missing or empty meta description`);
  }

  // 4. Check for Placeholders
  const forbiddenPlaceholders = [
    'ca-pub-XXXXXXXXXXXX',
    'UA-XXXXXXXXX-X',
    'yourdomain.com',
    'example.com',
    'www.website.com',
    'Lorem ipsum',
    'TODO',
    'FIXME'
  ];

  forbiddenPlaceholders.forEach(p => {
    if (content.toLowerCase().includes(p.toLowerCase())) {
      fileErrors.push(`Contains forbidden placeholder: "${p}"`);
    }
  });

  // 5. Word Count Check
  const bodyMatch = content.match(/<body[\s\S]*?>([\s\S]*?)<\/body>/i);
  const textContent = (bodyMatch ? bodyMatch[1] : content)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = textContent.split(' ').filter(Boolean).length;
  if (words < 300) {
    fileErrors.push(`Thin content risk: Only ${words} words (Minimum 300+ required)`);
  }

  if (fileErrors.length === 0) {
    passCount++;
  } else {
    failCount++;
    report.push({ file: relativePath, words, errors: fileErrors });
  }
});

console.log(`\n📊 Local File Audit Results:`);
console.log(`   ✅ Passed: ${passCount} / ${htmlFiles.length} files`);
console.log(`   ❌ Failed: ${failCount} / ${htmlFiles.length} files\n`);

if (failCount > 0) {
  console.log(`❌ DISCREPANCIES DETECTED:`);
  report.forEach(r => {
    console.log(`\nFile: public/${r.file} (Words: ${r.words})`);
    r.errors.forEach(e => console.log(`   - ${e}`));
  });
} else {
  console.log(`🎉 Perfect! 100% of local HTML files are fully AdSense compliant.`);
}

// Check ads.txt
const adsTxtPath = path.join(publicDir, 'ads.txt');
if (fs.existsSync(adsTxtPath)) {
  const adsTxtContent = fs.readFileSync(adsTxtPath, 'utf-8').trim();
  console.log(`\n📄 ads.txt Status:`);
  console.log(`   Content: "${adsTxtContent}"`);
  if (adsTxtContent.includes(adsenseId)) {
    console.log(`   ✅ ads.txt contains valid publisher ID (${adsenseId})`);
  } else {
    console.log(`   ❌ ads.txt DOES NOT contain valid publisher ID!`);
  }
} else {
  console.log(`\n❌ ads.txt IS MISSING!`);
}

// Check robots.txt
const robotsTxtPath = path.join(publicDir, 'robots.txt');
if (fs.existsSync(robotsTxtPath)) {
  const robotsTxtContent = fs.readFileSync(robotsTxtPath, 'utf-8').trim();
  console.log(`\n🤖 robots.txt Status:`);
  console.log(`   Content: \n${robotsTxtContent}`);
  if (robotsTxtContent.includes('Disallow: /blog') || robotsTxtContent.includes('Disallow: /')) {
    console.log(`   ⚠️ WARNING: robots.txt may be blocking Googlebot!`);
  } else {
    console.log(`   ✅ robots.txt allows search engines & AdSense crawler.`);
  }
} else {
  console.log(`\n❌ robots.txt IS MISSING!`);
}
