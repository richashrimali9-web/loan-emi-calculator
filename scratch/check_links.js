const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const rootDir = path.join(__dirname, '..');

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
const brokenLinks = [];
const allLinks = new Set();

htmlFiles.forEach((file) => {
  const relativePath = path.relative(publicDir, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf-8');

  // Match all hrefs
  const hrefRegex = /href=["']([^"']+)["']/gi;
  let match;

  while ((match = hrefRegex.exec(content)) !== null) {
    const href = match[1];
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#') || href.startsWith('data:')) {
      continue; // Skip external links and anchors
    }

    allLinks.add(href);

    // Resolve internal link relative to public/
    let targetPath;
    if (href.startsWith('/')) {
      // absolute path from site root
      const cleanHref = href.split('?')[0].split('#')[0];
      if (cleanHref.endsWith('/')) {
        targetPath = path.join(publicDir, cleanHref, 'index.html');
      } else if (!path.extname(cleanHref)) {
        // e.g. /about -> /about/index.html or /about.html
        const asIndex = path.join(publicDir, cleanHref, 'index.html');
        const asHtml = path.join(publicDir, cleanHref + '.html');
        if (fs.existsSync(asIndex)) targetPath = asIndex;
        else targetPath = asHtml;
      } else {
        targetPath = path.join(publicDir, cleanHref);
      }
    } else {
      // relative path
      const dir = path.dirname(file);
      const cleanHref = href.split('?')[0].split('#')[0];
      targetPath = path.resolve(dir, cleanHref);
    }

    if (!fs.existsSync(targetPath)) {
      brokenLinks.push({
        sourceFile: relativePath,
        href,
        resolvedPath: targetPath
      });
    }
  }
});

console.log('=== LINK CHECK RESULTS ===');
console.log(`Checked ${htmlFiles.length} files.`);
if (brokenLinks.length === 0) {
  console.log('✅ No broken internal links found!');
} else {
  console.log(`❌ Found ${brokenLinks.length} broken links:`);
  brokenLinks.forEach(b => {
    console.log(`   File: ${b.sourceFile} -> href="${b.href}" (Missing: ${b.resolvedPath})`);
  });
}
