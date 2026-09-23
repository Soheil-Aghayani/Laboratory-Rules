import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const equipmentDirectory = path.join(projectRoot, 'Equipment');

const readMeta = (source, name) => source.match(new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`, 'i'))?.[1] || '';
const readTitle = source => source.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || 'تجهیزات آزمایشگاه | آزمایشگاه پسماند';
const readCanonical = source => source.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i)?.[1] || '';
const readSlug = source => source.match(/data-equipment-slug="([^"]+)"/i)?.[1] || '';

const files = fs.readdirSync(equipmentDirectory)
  .filter(file => file.endsWith('.html'))
  .sort((left, right) => left.localeCompare(right));

files.forEach(file => {
  const target = path.join(equipmentDirectory, file);
  const source = fs.readFileSync(target, 'utf8');
  const slug = readSlug(source);
  if (!slug) throw new Error(`Missing equipment slug in ${file}`);

  const canonical = readCanonical(source) || `https://soheil-aghyani.github.io/Solid-Waste-Laboratory/Equipment/${file}`;
  const description = readMeta(source, 'description') || 'معرفی آموزشی تجهیزات، کاربرد، تفاوت گزینه‌ها و نکات ایمنی در آزمایشگاه پسماند.';
  const html = `<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#0f172a">
  <title>${readTitle(source)}</title>
  <meta name="description" content="${description}">
  <meta name="author" content="سهیل آقایانی">
  <link rel="canonical" href="${canonical}">
  <link rel="manifest" href="../manifest.webmanifest">
  <link rel="icon" type="image/webp" href="../Waste%20Lab.webp">
  <script>try{const t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>
  <link rel="stylesheet" href="../styles.min.css?v=6.3">
  <link rel="stylesheet" href="../equipment-detail.min.css?v=1.7">
  <link rel="stylesheet" href="../catalog-detail-chrome.min.css?v=1.0">
  <script defer src="../asset/icon-system.min.js?v=1.0"></script>
  <script defer src="../equipment-data.min.js?v=2.2"></script>
  <script defer src="../catalog-detail-runtime.min.js?v=1.1"></script>
  <script defer src="../equipment-detail.min.js?v=1.8"></script>
</head>
<body data-page="equipment-detail">
  <main class="equipment-detail-page" data-equipment-slug="${slug}">
    <div class="equipment-detail-shell">
      <div class="equipment-detail-topbar">
        <button class="equipment-detail-theme" id="equipment-detail-theme" type="button" aria-label="تغییر پوسته"><span class="material-symbols-outlined" aria-hidden="true">dark_mode</span></button>
      </div>
      <div id="equipment-detail-root"></div>
    </div>
  </main>
</body>
</html>
`;
  fs.writeFileSync(target, html, 'utf8');
});

console.log(`Built ${files.length} equipment detail shells.`);
