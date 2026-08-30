const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

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

console.log(`Found ${htmlFiles.length} HTML files in public/\n`);

const issues = [];
const adsenseId = 'ca-pub-8063078781485185';

htmlFiles.forEach((file) => {
  const relativePath = path.relative(publicDir, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf-8');
  
  const fileIssues = [];

  // Check AdSense tag
  if (!content.includes(adsenseId)) {
    fileIssues.push('Missing AdSense Script (ca-pub-8063078781485185)');
  }

  // Check Title tag
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    fileIssues.push('Missing or empty <title> tag');
  }

  // Check Meta Description
  const metaDescMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  if (!metaDescMatch || !metaDescMatch[1].trim()) {
    fileIssues.push('Missing or empty meta description');
  }

  // Check Canonical URL
  if (!content.includes('<link rel="canonical"') && !content.includes("<link rel='canonical'")) {
    fileIssues.push('Missing canonical tag');
  }

  // Check Placeholders
  const placeholders = ['ca-pub-XXXXXXXXXXXX', 'UA-XXXXXXXXX-X', 'yourdomain.com', 'example.com', 'Lorem ipsum', 'TODO', 'FIXME'];
  placeholders.forEach(p => {
    if (content.toLowerCase().includes(p.toLowerCase())) {
      fileIssues.push(`Contains placeholder text: "${p}"`);
    }
  });

  // Calculate approximate word count in body
  const bodyMatch = content.match(/<body[\s\S]*?>([\s\S]*?)<\/body>/i);
  const textContent = (bodyMatch ? bodyMatch[1] : content)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  const wordCount = textContent.split(' ').filter(Boolean).length;
  if (wordCount < 300) {
    fileIssues.push(`Low word count: ${wordCount} words (AdSense thin content risk)`);
  }

  if (fileIssues.length > 0) {
    issues.push({ file: relativePath, wordCount, issues: fileIssues });
  }
});

console.log('=== AUDIT RESULTS ===');
issues.forEach(item => {
  console.log(`\n📄 File: ${item.file} (Words: ${item.wordCount})`);
  item.issues.forEach(iss => console.log(`   ❌ ${iss}`));
});

console.log(`\nTotal files with issues: ${issues.length} out of ${htmlFiles.length}`);
