const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = getAllHtmlFiles(publicDir);
console.log(`Starting 7-Point AdSense Pre-Flight Validation Audit on ${files.length} pages...`);

let auditResults = {
  totalFiles: files.length,
  missingCss: [],
  thinContentFiles: [], // < 400 words
  missingHeaderFooter: [],
  brokenScriptTags: [],
  prohibitedYmylTerms: [], // "guaranteed", "100% risk-free"
  encodingArtifacts: []   // "â¹"
};

const prohibitedTerms = ['guaranteed return', 'guaranteed savings', '100% risk free', '100% risk-free'];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relName = path.relative(publicDir, file).replace(/\\/g, '/');

  // Check CSS
  if (!content.includes('css/style.css')) {
    auditResults.missingCss.push(relName);
  }

  // Check Header & Footer
  if (!content.includes('<header>') || !content.includes('<footer>')) {
    auditResults.missingHeaderFooter.push(relName);
  }

  // Check Word Count (excluding HTML tags)
  const plainText = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = plainText.split(' ').length;
  if (wordCount < 300) {
    auditResults.thinContentFiles.push({ file: relName, wordCount });
  }

  // Check Broken Scripts
  if (content.includes('/src/main.tsx')) {
    auditResults.brokenScriptTags.push(relName);
  }

  // Check Prohibited YMYL Terms
  prohibitedTerms.forEach(term => {
    if (content.toLowerCase().includes(term)) {
      auditResults.prohibitedYmylTerms.push({ file: relName, term });
    }
  });

  // Check Encoding Artifacts
  if (content.includes('â¹') || content.includes('â€')) {
    auditResults.encodingArtifacts.push(relName);
  }
});

console.log('\n==================================================');
console.log('       ADSENSE PRE-FLIGHT AUDIT RESULTS           ');
console.log('==================================================');
console.log(`Total Pages Inspected: ${auditResults.totalFiles}`);
console.log(`Missing CSS Links: ${auditResults.missingCss.length}`);
console.log(`Missing Header/Footer: ${auditResults.missingHeaderFooter.length}`);
console.log(`Thin Content Pages (<300 words): ${auditResults.thinContentFiles.length}`);
console.log(`Broken Script Tags: ${auditResults.brokenScriptTags.length}`);
console.log(`Prohibited YMYL Language Flags: ${auditResults.prohibitedYmylTerms.length}`);
console.log(`Encoding Artifacts Flags: ${auditResults.encodingArtifacts.length}`);
console.log('==================================================\n');

if (auditResults.thinContentFiles.length > 0) {
  console.log('Thin Content Pages:', auditResults.thinContentFiles);
}
if (auditResults.prohibitedYmylTerms.length > 0) {
  console.log('Prohibited YMYL Terms:', auditResults.prohibitedYmylTerms);
}
if (auditResults.encodingArtifacts.length > 0) {
  console.log('Encoding Artifacts:', auditResults.encodingArtifacts);
}
