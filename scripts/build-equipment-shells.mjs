import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const equipmentDirectory = path.join(projectRoot, 'Equipment');
const portalSource = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');

const footerStart = portalSource.indexOf('  <footer>');
const footerEnd = portalSource.indexOf('  </footer>', footerStart) + '  </footer>'.length;
if (footerStart < 0 || footerEnd <= footerStart) throw new Error('Unable to extract shared footer from index.html');

const sharedFooter = portalSource
  .slice(footerStart, footerEnd)
  .replace('  <footer>', '  <footer class="catalog-detail-site-footer">')
  .replaceAll('href="./', 'href="../');

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
  <link rel="stylesheet" href="../site-pages.min.css?v=1.7">
  <link rel="stylesheet" href="../equipment-detail.min.css?v=1.8">
  <link rel="stylesheet" href="../catalog-detail-chrome.min.css?v=1.1">
  <script defer src="../asset/icon-system.min.js?v=1.0"></script>
  <script defer src="../script.min.js?v=7.1"></script>
  <script defer src="../equipment-data.min.js?v=2.2"></script>
  <script defer src="../catalog-detail-runtime.min.js?v=1.2"></script>
  <script defer src="../equipment-detail.min.js?v=1.8"></script>
</head>
<body data-page="equipment-detail">
  <a class="skip-link" href="#equipment-detail-root">پرش به محتوای اصلی</a>
  <main class="container site-container equipment-detail-page" id="main-content" data-equipment-slug="${slug}">
    <header class="site-header catalog-detail-site-header">
      <div class="header-top">
        <a class="brand brand-link" href="../index.html" aria-label="بازگشت به صفحهٔ خانه" title="بازگشت به صفحهٔ خانه">
          <span class="material-symbols-outlined brand-icon">science</span>
          <div class="brand-text">
            <h1>آزمایشگاه پسماند</h1>
            <p>سامانه جامع مقررات، ایمنی و کاربری تجهیزات</p>
          </div>
        </a>
        <div class="controls">
          <div class="status-widget">
            <span class="status-dot" id="status-dot"></span>
            <span id="status-text" role="status" aria-live="polite">درحال بررسی وضعیت آزمایشگاه...</span>
          </div>
          <a class="catalog-detail-header-back equipment-detail-back" href="../gallery.html" aria-label="بازگشت به کاتالوگ تجهیزات">
            <span class="material-symbols-outlined" aria-hidden="true">arrow_back</span>
            <span>بازگشت به کاتالوگ</span>
          </a>
          <button class="theme-btn" id="theme-btn" type="button" aria-label="تغییر پوسته"></button>
        </div>
      </div>
    </header>
    <div class="equipment-detail-shell">
      <div id="equipment-detail-root"></div>
    </div>
${sharedFooter}
  </main>
</body>
</html>
`;
  fs.writeFileSync(target, html, 'utf8');
});

console.log(`Built ${files.length} equipment detail shells.`);
