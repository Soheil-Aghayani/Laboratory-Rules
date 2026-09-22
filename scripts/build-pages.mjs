import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const indexPath = path.join(projectRoot, 'index.html');
const contentDirectory = path.join(projectRoot, 'pages', 'content');
const source = fs.readFileSync(indexPath, 'utf8');

const pageDefinitions = {
  home: {
    filename: 'index.html',
    title: 'آزمایشگاه پسماند | خانه',
    description: 'صفحهٔ اصلی آزمایشگاه پسماند؛ دسترسی سریع به ایمنی، تجهیزات، عناصر و گالری آزمایشگاه.',
    canonical: '',
    assets: ['welcome-carousel.min.js'],
  },
  rules: {
    filename: 'rules.html',
    title: 'قوانین عمومی و ایمنی | آزمایشگاه پسماند',
    description: 'قوانین عمومی، پوشش حفاظتی، کار با مواد و مدیریت پسماند در آزمایشگاه پسماند.',
    canonical: 'rules.html',
    assets: [],
  },
  quiz: {
    filename: 'quiz.html',
    title: 'آزمون و تعهدنامه ورود | آزمایشگاه پسماند',
    description: 'تعهدنامه و آزمون سنجش ایمنی ورود به آزمایشگاه پسماند.',
    canonical: 'quiz.html',
    assets: [],
  },
  equipment: {
    filename: 'equipment.html',
    title: 'راهنمای کاربری تجهیزات | آزمایشگاه پسماند',
    description: 'راهنمای عملیاتی، نگهداری و خطاهای رایج تجهیزات آزمایشگاه پسماند.',
    canonical: 'equipment.html',
    assets: [],
  },
  gallery: {
    filename: 'gallery.html',
    title: 'گالری آزمایشگاه و کاتالوگ تجهیزات | آزمایشگاه پسماند',
    description: 'معرفی خانواده‌های تجهیزات و ظروف آزمایشگاهی با گزینه‌ها و مشخصات قابل بررسی.',
    canonical: 'gallery.html',
    assets: ['equipment-data.min.js', 'gallery.min.js'],
  },
  elements: {
    filename: 'elements.html',
    title: 'عناصر و مواد | آزمایشگاه پسماند',
    description: 'جدول تناوبی رنگ‌بندی‌شده، شناخت عناصر، ملاحظات ایمنی و جستجوی مواد آزمایشگاهی.',
    canonical: 'elements.html',
    assets: ['elements-data.min.js', 'elements.min.js'],
  },
};

const getBetween = (text, startMarker, endMarker) => {
  const start = text.indexOf(startMarker);
  const end = text.indexOf(endMarker, start + startMarker.length);
  if (start < 0 || end < 0) throw new Error(`Unable to extract between ${startMarker} and ${endMarker}`);
  return text.slice(start, end);
};

const stripTabWrapper = markup => {
  const wrapperStart = markup.indexOf('<div class="tab-content');
  const contentStart = markup.indexOf('>', wrapperStart) + 1;
  const contentEnd = markup.lastIndexOf('</div>');
  if (wrapperStart < 0 || contentStart <= 0 || contentEnd <= contentStart) {
    throw new Error('Unable to strip tab wrapper');
  }
  return markup.slice(contentStart, contentEnd).trim();
};

const writeIfMissing = (filename, content) => {
  const target = path.join(contentDirectory, filename);
  if (!fs.existsSync(target)) fs.writeFileSync(target, `${content.trim()}\n`, 'utf8');
  return fs.readFileSync(target, 'utf8').trim();
};

fs.mkdirSync(contentDirectory, { recursive: true });

const readOrExtract = (filename, extractor) => {
  const target = path.join(contentDirectory, filename);
  if (fs.existsSync(target)) return fs.readFileSync(target, 'utf8').trim();
  const content = extractor();
  fs.writeFileSync(target, `${content.trim()}\n`, 'utf8');
  return content.trim();
};

const elementsTab = readOrExtract('elements.html', () => stripTabWrapper(getBetween(source, '<!-- TAB 0: Elements and materials -->', '<!-- TAB 1: General Rules -->')));
const equipmentTab = readOrExtract('equipment.html', () => stripTabWrapper(getBetween(source, '<!-- TAB 2: Equipment Guides -->', '<!-- TAB 3: Laboratory Gallery -->')));
const galleryTab = readOrExtract('gallery.html', () => stripTabWrapper(getBetween(source, '<!-- TAB 3: Laboratory Gallery -->', '<!-- TAB 4: Safety Checklist & Quiz -->')));
const quizTab = readOrExtract('quiz.html', () => stripTabWrapper(getBetween(source, '<!-- TAB 4: Safety Checklist & Quiz -->', '<!-- Page Footer -->')));
const rulesContent = readOrExtract('rules.html', () => {
  const rulesTab = stripTabWrapper(getBetween(source, '<!-- TAB 1: General Rules -->', '<!-- TAB 2: Equipment Guides -->'));
  const rulesStart = rulesTab.indexOf('<div class="rules-carousel"');
  const msdsStart = rulesTab.indexOf('<div id="msds-widget-card"');
  if (rulesStart < 0 || msdsStart < 0) throw new Error('Unable to split rules content');
  return rulesTab.slice(rulesStart, msdsStart).trim();
});
const safetyWidgets = readOrExtract('safety-widgets.html', () => {
  const rulesTab = stripTabWrapper(getBetween(source, '<!-- TAB 1: General Rules -->', '<!-- TAB 2: Equipment Guides -->'));
  const msdsStart = rulesTab.indexOf('<div id="msds-widget-card"');
  const widgetsEnd = rulesTab.lastIndexOf('</div>');
  if (msdsStart < 0 || widgetsEnd < 0) throw new Error('Unable to split safety widgets');
  return rulesTab.slice(msdsStart, widgetsEnd).trim();
});

const headerTopStart = source.indexOf('<div class="header-top">');
const welcomeStart = source.indexOf('<section class="welcome-panel"', headerTopStart);
const headerEnd = source.indexOf('    </header>', welcomeStart);
if (headerTopStart < 0 || welcomeStart < 0 || headerEnd < 0) throw new Error('Unable to extract shared header');
const headerTop = source.slice(headerTopStart, welcomeStart).trim();
const welcomePanel = source.slice(welcomeStart, headerEnd).trim();

const penaltyStart = source.indexOf('    <!-- Penalty warning -->');
const navigationStart = penaltyStart >= 0 ? source.indexOf('    <!-- Navigation Tabs -->', penaltyStart) : -1;
const penaltyBanner = penaltyStart >= 0 && navigationStart >= 0
  ? source.slice(penaltyStart, navigationStart).trim()
  : '<div class="penalty-banner"><span class="material-symbols-outlined penalty-icon">gpp_maybe</span><div class="penalty-text">مهم: در صورتی که دانشجویی از قوانین و موارد زیر تخطی کند، به‌مدت ۱۰ روز اجازه فعالیت در آزمایشگاه را نخواهد داشت.</div></div>';

const footerStart = source.indexOf('  <footer>');
const footerEnd = source.indexOf('  </footer>', footerStart) + '  </footer>'.length;
const footer = source.slice(footerStart, footerEnd)
  .replaceAll('href="index.html#tab-general" data-tab-link="tab-general"', 'href="./rules.html"')
  .replaceAll('href="index.html#tab-elements" data-tab-link="tab-elements"', 'href="./elements.html"')
  .replaceAll('href="index.html#tab-equipment" data-tab-link="tab-equipment"', 'href="./equipment.html"')
  .replaceAll('href="index.html#tab-gallery" data-tab-link="tab-gallery"', 'href="./gallery.html"')
  .replaceAll('href="index.html#msds-widget-card" data-tab-link="tab-general"', 'href="./elements.html#msds-widget-card"')
  .replaceAll('href="index.html#compatibility-widget-card" data-tab-link="tab-equipment"', 'href="./elements.html#compatibility-widget-card"')
  .replaceAll('href="index.html#tab-quiz" data-tab-link="tab-quiz"', 'href="./quiz.html"');

const sharedStart = source.indexOf('  <!-- Chemical Suggestion Modal -->');
const runtimeStart = source.indexOf('  <script>', sharedStart);
const bodyEnd = source.lastIndexOf('</body>');
const existingDockStart = source.indexOf('  <nav class="mobile-bottom-dock"', sharedStart);
const sharedEnd = runtimeStart >= 0 ? runtimeStart : existingDockStart >= 0 ? existingDockStart : bodyEnd;
const sharedMarkup = source.slice(sharedStart, sharedEnd).trim();
const runtimeMatch = runtimeStart >= 0
  ? source.slice(runtimeStart, bodyEnd).match(/<script>\r?\n([\s\S]*?)\r?\n  <\/script>/)
  : null;
const runtimePath = path.join(projectRoot, 'site-runtime.js');
if (!fs.existsSync(runtimePath) && runtimeMatch) fs.writeFileSync(runtimePath, `${runtimeMatch[1].trim()}\n`, 'utf8');

const fragments = {
  elements: elementsTab,
  rules: rulesContent,
  safetyWidgets,
  equipment: equipmentTab,
  gallery: galleryTab,
  quiz: quizTab,
};

const pageGroup = page => {
  if (page === 'rules' || page === 'quiz') return 'safety';
  if (page === 'equipment' || page === 'elements') return 'catalog';
  return page;
};

const pageLink = (href, label, iconName, current, extraClass = '') => {
  const currentAttr = current ? ' aria-current="page"' : '';
  return `<a class="site-nav-link${current ? ' is-active' : ''}${extraClass ? ` ${extraClass}` : ''}" href="./${href}"${currentAttr}><span class="material-symbols-outlined" aria-hidden="true">${iconName}</span><span>${label}</span></a>`;
};

const renderPrimaryNav = currentPage => {
  const currentGroup = pageGroup(currentPage);
  return `
    <nav class="site-primary-nav" aria-label="ناوبری اصلی">
      ${pageLink('index.html', 'خانه', 'home', currentGroup === 'home', 'site-nav-home')}
      <div class="site-nav-group${currentGroup === 'safety' ? ' is-active' : ''}">
        <span class="site-nav-group-label"><span class="material-symbols-outlined" aria-hidden="true">health_and_safety</span>ایمنی</span>
        <div class="site-nav-subnav">
          ${pageLink('rules.html', 'قوانین عمومی و ایمنی', 'book-bookmark', currentPage === 'rules')}
          ${pageLink('quiz.html', 'آزمون و تعهدنامه ورود', 'clipboard-check', currentPage === 'quiz')}
        </div>
      </div>
      <div class="site-nav-group${currentGroup === 'catalog' ? ' is-active' : ''}">
        <span class="site-nav-group-label"><span class="material-symbols-outlined" aria-hidden="true">inventory_2</span>کاتالوگ</span>
        <div class="site-nav-subnav">
          ${pageLink('equipment.html', 'راهنمای کاربری تجهیزات', 'test-tube', currentPage === 'equipment')}
          ${pageLink('elements.html', 'عناصر و مواد', 'science', currentPage === 'elements')}
        </div>
      </div>
      ${pageLink('gallery.html', 'گالری آزمایشگاه', 'gallery', currentGroup === 'gallery', 'site-nav-gallery')}
    </nav>`;
};

const renderContext = currentPage => {
  const contexts = {
    rules: ['ایمنی', 'قوانین عمومی و ایمنی', [['rules.html', 'قوانین عمومی و ایمنی'], ['quiz.html', 'آزمون و تعهدنامه ورود']]],
    quiz: ['ایمنی', 'آزمون و تعهدنامه ورود', [['rules.html', 'قوانین عمومی و ایمنی'], ['quiz.html', 'آزمون و تعهدنامه ورود']]],
    equipment: ['کاتالوگ', 'راهنمای کاربری تجهیزات', [['equipment.html', 'راهنمای کاربری تجهیزات'], ['elements.html', 'عناصر و مواد']]],
    elements: ['کاتالوگ', 'عناصر و مواد', [['equipment.html', 'راهنمای کاربری تجهیزات'], ['elements.html', 'عناصر و مواد']]],
    gallery: ['گالری', 'کاتالوگ خانواده‌های تجهیزات', []],
  };
  const context = contexts[currentPage];
  if (!context) return '';
  const [group, title, links] = context;
  const linksMarkup = links.map(([href, label]) => pageLink(href, label, href === 'rules.html' ? 'book-bookmark' : href === 'quiz.html' ? 'clipboard-check' : href === 'equipment.html' ? 'test-tube' : 'science', href === `${currentPage}.html`)).join('');
  return `
    <div class="page-context">
      <div class="page-context-heading"><span class="page-kicker">${group}</span><h2>${title}</h2></div>
      ${linksMarkup ? `<nav class="page-context-links" aria-label="زیرصفحه‌های ${group}">${linksMarkup}</nav>` : ''}
    </div>`;
};

const renderMobileDock = currentPage => {
  const currentGroup = pageGroup(currentPage);
  return `
    <nav class="mobile-bottom-dock" aria-label="دسترسی سریع موبایل">
      ${pageLink('index.html', 'خانه', 'home', currentGroup === 'home', 'mobile-dock-item')}
      ${pageLink('rules.html', 'ایمنی', 'health_and_safety', currentGroup === 'safety', 'mobile-dock-item')}
      ${pageLink('equipment.html', 'کاتالوگ', 'inventory_2', currentGroup === 'catalog', 'mobile-dock-item')}
      ${pageLink('gallery.html', 'گالری', 'gallery', currentGroup === 'gallery', 'mobile-dock-item')}
    </nav>`;
};

const renderHomeShortcuts = () => `
    <section class="home-shortcuts" aria-labelledby="home-shortcuts-title">
      <div class="section-heading-row">
        <div><span class="page-kicker">شروع سریع</span><h2 id="home-shortcuts-title">از کجا شروع کنیم؟</h2></div>
        <p>هر بخش صفحهٔ مستقل خودش را دارد تا اطلاعات موردنیاز را سریع‌تر پیدا کنید.</p>
      </div>
      <div class="home-shortcut-grid">
        <a class="home-shortcut home-shortcut-safety" href="./rules.html"><span class="material-symbols-outlined" aria-hidden="true">health_and_safety</span><span><strong>ایمنی و قوانین</strong><small>قواعد ورود، کار و دفع پسماند</small></span><span class="material-symbols-outlined" aria-hidden="true">arrow_back</span></a>
        <a class="home-shortcut" href="./equipment.html"><span class="material-symbols-outlined" aria-hidden="true">test-tube</span><span><strong>راهنمای تجهیزات</strong><small>دستورالعمل دستگاه‌های آزمایشگاه</small></span><span class="material-symbols-outlined" aria-hidden="true">arrow_back</span></a>
        <a class="home-shortcut" href="./gallery.html"><span class="material-symbols-outlined" aria-hidden="true">gallery</span><span><strong>گالری و کاتالوگ</strong><small>آشنایی با ظروف و ابزارها</small></span><span class="material-symbols-outlined" aria-hidden="true">arrow_back</span></a>
        <a class="home-shortcut" href="./elements.html"><span class="material-symbols-outlined" aria-hidden="true">science</span><span><strong>عناصر و مواد</strong><small>جدول تناوبی و جستجوی مواد</small></span><span class="material-symbols-outlined" aria-hidden="true">arrow_back</span></a>
        <a class="home-shortcut" href="./quiz.html"><span class="material-symbols-outlined" aria-hidden="true">clipboard-check</span><span><strong>آزمون ورود</strong><small>تعهدنامه و سنجش ایمنی</small></span><span class="material-symbols-outlined" aria-hidden="true">arrow_back</span></a>
      </div>
    </section>`;

const renderHead = page => {
  const canonical = `https://soheil-aghyani.github.io/Solid-Waste-Laboratory/${page.canonical}`;
  const preload = page === 'home'
    ? '<link rel="preload" href="./asset/gallery/lab-interior-800.webp" as="image" type="image/webp" imagesrcset="./asset/gallery/lab-interior-mobile.webp 640w, ./asset/gallery/lab-interior-800.webp 800w" imagesizes="(max-width: 768px) 100vw, 600px" fetchpriority="high">'
    : '';
  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#0f172a">
  <link rel="manifest" href="./manifest.webmanifest">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="author" content="سهیل آقایانی">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="fa_IR">
  <meta property="og:site_name" content="آزمایشگاه پسماند">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="https://soheil-aghyani.github.io/Solid-Waste-Laboratory/Waste%20Lab.webp">
  <meta property="og:image:alt" content="آزمایشگاه پسماند">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${page.title}">
  <meta name="twitter:description" content="${page.description}">
  <link rel="icon" type="image/webp" href="Waste%20Lab.webp">
  <link rel="preload" href="./asset/vazirmatn-arabic.woff2" as="font" type="font/woff2" crossorigin fetchpriority="high">
  <link rel="stylesheet" href="./styles.min.css?v=6.3">
  <link rel="stylesheet" href="./elements.min.css?v=1.3">
  <link rel="stylesheet" href="./site-pages.min.css?v=1.1">
  <script>
    try {
      const savedTheme = localStorage.getItem('theme');
      const preferredTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      document.documentElement.setAttribute('data-theme', preferredTheme);
    } catch (error) {}
  </script>
  ${preload}
  <script defer src="./asset/icon-system.min.js?v=1.0"></script>
  <script defer src="./script.min.js?v=7.1"></script>
  <script defer src="./site-runtime.min.js?v=1.1"></script>
  ${page.assets.map(asset => `<script defer src="./${asset}?v=2.1"></script>`).join('\n  ')}
</head>`;
};

const renderMain = (pageKey, page) => {
  let pageContent = '';
  if (pageKey === 'home') {
    pageContent = renderHomeShortcuts();
  } else if (pageKey === 'rules') {
    pageContent = `${penaltyBanner}<section class="standalone-page rules-page" aria-labelledby="rules-page-title"><div class="sr-only"><h1 id="rules-page-title">قوانین عمومی و ایمنی</h1></div>${fragments.rules}</section>`;
  } else if (pageKey === 'quiz') {
    pageContent = `<section class="standalone-page quiz-page" aria-labelledby="quiz-page-title"><div class="sr-only"><h1 id="quiz-page-title">آزمون و تعهدنامه ورود</h1></div>${fragments.quiz}</section>`;
  } else if (pageKey === 'equipment') {
    pageContent = `<section class="standalone-page equipment-page" aria-labelledby="equipment-page-title"><div class="sr-only"><h1 id="equipment-page-title">راهنمای کاربری تجهیزات</h1></div>${fragments.equipment}</section>`;
  } else if (pageKey === 'gallery') {
    pageContent = `<section class="standalone-page gallery-page" aria-labelledby="gallery-page-title"><div class="sr-only"><h1 id="gallery-page-title">گالری آزمایشگاه و کاتالوگ تجهیزات</h1></div>${fragments.gallery}</section>`;
  } else if (pageKey === 'elements') {
    pageContent = `<section class="standalone-page elements-page" aria-labelledby="elements-page-title"><div class="sr-only"><h1 id="elements-page-title">عناصر و مواد</h1></div>${fragments.elements}<section class="elements-support-tools" aria-labelledby="elements-tools-title"><div class="section-heading-row"><div><span class="page-kicker">ابزارهای ایمنی</span><h2 id="elements-tools-title">بررسی مواد و سازگاری</h2></div><p>برای مطالعهٔ برگهٔ ایمنی یا بررسی اولیهٔ ناسازگاری مواد، از ابزارهای زیر استفاده کنید.</p></div>${fragments.safetyWidgets}</section></section>`;
  }

  return `
<body data-page="${pageKey}">
  <a class="skip-link" href="#main-content">پرش به محتوای اصلی</a>
  <main class="container site-container" id="main-content">
    <header class="site-header">
      ${headerTop}
      ${pageKey === 'home' ? welcomePanel : ''}
    </header>
    ${renderPrimaryNav(pageKey)}
    ${renderContext(pageKey)}
    ${pageContent}
    ${footer}
  </main>
  ${sharedMarkup}
  ${renderMobileDock(pageKey)}
</body>
</html>`;
};

for (const [pageKey, page] of Object.entries(pageDefinitions)) {
  const html = `${renderHead(page)}${renderMain(pageKey, page)}`
    .split('\n')
    .map(line => line.replace(/[ \t]+$/, ''))
    .join('\n')
    .trimEnd() + '\n';
  fs.writeFileSync(path.join(projectRoot, page.filename), html, 'utf8');
}

console.log(`Built ${Object.keys(pageDefinitions).length} standalone pages and ${Object.keys(fragments).length} content fragments.`);
