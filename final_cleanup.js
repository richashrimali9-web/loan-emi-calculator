const fs = require('fs');
const path = require('path');

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

const blogDir = 'blog';
const publicBlogDir = 'public/blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html') && f !== 'index.html');

const mapping = {};

files.forEach(file => {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
  const h1Match = content.match(/<h1>(.*?)<\/h1>/);
  if (h1Match) {
    const title = h1Match[1].split(':')[0].trim(); // Take part before colon if any
    let slug = slugify(title) + '.html';
    
    // Avoid name collisions
    let counter = 1;
    const baseSlug = slugify(title);
    while (mapping[slug] || fs.existsSync(path.join(blogDir, slug)) && !files.includes(slug)) {
       slug = baseSlug + '-' + counter + '.html';
       counter++;
    }
    
    mapping[file] = slug;
  }
});

console.log('Mapping identified:', mapping);

// 1. Rename files in both blog and public/blog
[blogDir, publicBlogDir].forEach(dir => {
  if (!fs.existsSync(dir)) return;
  Object.keys(mapping).forEach(oldName => {
    const oldPath = path.join(dir, oldName);
    const newPath = path.join(dir, mapping[oldName]);
    if (fs.existsSync(oldPath) && oldName !== mapping[oldName]) {
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed in ${dir}: ${oldName} -> ${mapping[oldName]}`);
    }
  });
});

// 2. Update links in all files
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

const allFiles = walk('.');
allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  Object.keys(mapping).forEach(oldName => {
    const regex = new RegExp('/blog/' + oldName, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, '/blog/' + mapping[oldName]);
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated links in: ${file}`);
  }
});

console.log('Final Cleanup Complete.');
