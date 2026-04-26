#!/usr/bin/env node
/**
 * deploy.js — Single source of truth deployment script
 *
 * GitHub Pages serves the root of the `main` branch directly.
 * This script syncs content from public/ into the repo root,
 * then commits and pushes main so the live site is always
 * in sync with what you edit in public/.
 *
 * Usage:  node deploy.js
 *      or npm run deploy
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = __dirname;
const PUBLIC = path.join(ROOT, 'public');

// Directories inside public/ that should be synced to root
const SYNC_DIRS = ['blog', 'guides', 'about', 'contact', 'privacy-policy', 'terms-of-service', 'calculators', 'icons'];

// Individual files inside public/ that should be synced to root
const SYNC_FILES = ['css/style.css', 'sitemap.xml', 'robots.txt', 'ads.txt', 'CNAME', 'manifest.json', 'index.html'];

function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
}

function syncDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      syncDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

console.log('🔄 Syncing public/ → root (single source of truth)...\n');

// Sync directories
for (const dir of SYNC_DIRS) {
  const src = path.join(PUBLIC, dir);
  const dest = path.join(ROOT, dir);
  if (fs.existsSync(src)) {
    syncDir(src, dest);
    console.log(`  ✓ Synced  public/${dir}  →  ${dir}/`);
  }
}

// Sync individual files
for (const file of SYNC_FILES) {
  const src = path.join(PUBLIC, file);
  const dest = path.join(ROOT, file);
  if (fs.existsSync(src)) {
    copyFile(src, dest);
    console.log(`  ✓ Synced  public/${file}  →  ${file}`);
  }
}

console.log('\n✅ Sync complete.\n');

// Git commit and push
try {
  const status = execSync('git status --porcelain', { cwd: ROOT }).toString().trim();
  if (!status) {
    console.log('ℹ️  No changes to commit — site is already up to date.');
    process.exit(0);
  }

  console.log('📦 Committing changes...');
  execSync('git add -A', { cwd: ROOT, stdio: 'inherit' });

  const date = new Date().toISOString().slice(0, 10);
  execSync(`git commit -m "deploy: sync public/ to root [${date}]"`, { cwd: ROOT, stdio: 'inherit' });

  console.log('\n🚀 Pushing to main...');
  execSync('git push origin main', { cwd: ROOT, stdio: 'inherit' });

  console.log('\n🎉 Deployed! GitHub Pages will update within 1–2 minutes.');
} catch (err) {
  console.error('\n❌ Deploy failed:', err.message);
  process.exit(1);
}
