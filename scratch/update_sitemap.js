const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');
const rootSitemapPath = path.join(__dirname, '..', 'sitemap.xml');

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
const urls = [];

htmlFiles.forEach(file => {
  const rel = path.relative(publicDir, file).replace(/\\/g, '/');
  let loc;
  let priority = '0.7';

  if (rel === 'index.html') {
    loc = 'https://mytotalemi.co.in/';
    priority = '1.0';
  } else if (rel.endsWith('/index.html')) {
    loc = `https://mytotalemi.co.in/${rel.replace('/index.html', '/')}`;
    priority = '0.9';
  } else if (rel.startsWith('calculators/')) {
    loc = `https://mytotalemi.co.in/${rel}`;
    priority = '0.9';
  } else if (rel.startsWith('blog/')) {
    loc = `https://mytotalemi.co.in/${rel}`;
    priority = '0.8';
  } else if (rel.startsWith('guides/')) {
    loc = `https://mytotalemi.co.in/${rel}`;
    priority = '0.8';
  } else {
    loc = `https://mytotalemi.co.in/${rel}`;
    priority = '0.7';
  }

  urls.push({ loc, priority });
});

// Deduplicate
const uniqueUrls = [];
const seen = new Set();
urls.forEach(u => {
  if (!seen.has(u.loc)) {
    seen.add(u.loc);
    uniqueUrls.push(u);
  }
});

const today = new Date().toISOString().slice(0, 10);

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

uniqueUrls.forEach(u => {
  xml += `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>\n`;
});

xml += `</urlset>\n`;

fs.writeFileSync(sitemapPath, xml, 'utf-8');
fs.writeFileSync(rootSitemapPath, xml, 'utf-8');

console.log(`✅ Updated sitemap.xml with ${uniqueUrls.length} pages!`);
