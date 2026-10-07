const fs = require('node:fs');
const path = require('node:path');
const { hostname, publicPages } = require('./site-pages');

const siteRoot = path.resolve(__dirname, '..');

function toW3CDate(filePath) {
  const stats = fs.statSync(filePath);
  return stats.mtime.toISOString().slice(0, 10);
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const urlEntries = publicPages.map(({ file, url }) => {
  const filePath = path.join(siteRoot, file);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing public page: ${file}`);
  }

  return [
    '  <url>',
    `    <loc>${escapeXml(`${hostname}${url}`)}</loc>`,
    `    <lastmod>${toW3CDate(filePath)}</lastmod>`,
    '  </url>'
  ].join('\n');
});

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  urlEntries.join('\n'),
  '</urlset>',
  ''
].join('\n');

fs.writeFileSync(path.join(siteRoot, 'sitemap.xml'), sitemap, 'utf8');