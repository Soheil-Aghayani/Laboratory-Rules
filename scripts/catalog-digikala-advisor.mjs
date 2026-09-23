import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const read = relativePath => fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');

const files = {
  gallery: read('pages/content/gallery.html'),
  galleryCss: read('catalog-redesign.css'),
  galleryJs: read('gallery.js'),
  detailCss: read('equipment-detail.css'),
  chromeCss: read('catalog-detail-chrome.css'),
  detailJs: read('equipment-detail.js'),
  detailShell: read('Equipment/beakers.html'),
};

const checks = [];
const pass = (label, evidence) => checks.push({ status: 'PASS', label, evidence });
const fail = (label, evidence) => checks.push({ status: 'FAIL', label, evidence });
const includes = (text, pattern) => pattern instanceof RegExp ? pattern.test(text) : text.includes(pattern);

const cardCount = (files.galleryJs.match(/class="equipment-catalog-card"/g) || []).length;
const commercePattern = /قیمت|تخفیف|سبد خرید|موجودی|price|discount|cart|stock/i;

if (files.gallery.match(/id="gallery-equipment-search"/g)?.length === 1) pass('یک جستجوی کاتالوگ', 'gallery-equipment-search exactly once');
else fail('یک جستجوی کاتالوگ', 'تعداد input جستجوی کاتالوگ یک نیست');

if (files.gallery.match(/data-equipment-filter=/g)?.length >= 8) pass('دسته‌بندی کامل', 'کنترل‌های فیلتر برای همهٔ دسته‌های اصلی وجود دارد');
else fail('دسته‌بندی کامل', 'فیلترهای دسته‌بندی ناقص هستند');

if (includes(files.gallery, 'catalog-category-sidebar') && includes(files.gallery, 'catalog-category-dialog')) pass('ناوبری تطبیقی دسته‌ها', 'sidebar دسکتاپ و dialog موبایل');
else fail('ناوبری تطبیقی دسته‌ها', 'یکی از مسیرهای دسته‌بندی وجود ندارد');

if (includes(files.galleryJs, 'history.pushState') && includes(files.galleryJs, 'popstate')) pass('حفظ وضعیت جستجو و فیلتر', 'URL و Back مرورگر پشتیبانی می‌شوند');
else fail('حفظ وضعیت جستجو و فیلتر', 'state در URL کامل نیست');

if (cardCount >= 1 && includes(files.galleryJs, 'equipment-card-image') && includes(files.galleryJs, 'equipment-card-summary') && includes(files.galleryJs, 'equipment-card-cta')) pass('کارت آموزشی کامل', 'تصویر، عنوان، خلاصه و CTA');
else fail('کارت آموزشی کامل', 'ساختار کارت آموزشی ناقص است');

if (!commercePattern.test(files.gallery) && !commercePattern.test(files.galleryJs)) pass('بدون قابلیت فروشگاهی', 'قیمت، موجودی و سبد خرید در UI نیست');
else fail('بدون قابلیت فروشگاهی', 'رشتهٔ تجاری در کاتالوگ پیدا شد');

if (includes(files.galleryCss, 'height: 100%') && includes(files.galleryCss, 'aspect-ratio:') && includes(files.galleryCss, 'height: 208px')) pass('ارتفاع پایدار کارت', 'card و media frame ابعاد رزروشده دارند');
else fail('ارتفاع پایدار کارت', 'برای جلوگیری از CLS ابعاد کارت یا تصویر کافی نیست');

const hoverTransform = files.galleryCss.match(/\.equipment-catalog-card:hover[\s\S]{0,320}?transform\s*:\s*([^;]+)/);
if (!hoverTransform || hoverTransform[1].trim() === 'none') pass('هاور بدون تغییر layout', 'کارت در هاور transform یا تغییر ارتفاع ندارد');
else fail('هاور بدون تغییر layout', 'هاور کارت transform دارد و ممکن است پرش بصری ایجاد کند');

if (includes(files.galleryCss, 'prefers-reduced-motion') && includes(files.detailCss, 'prefers-reduced-motion')) pass('حالت reduced-motion', 'کاتالوگ و صفحهٔ معرفی مسیر جایگزین دارند');
else fail('حالت reduced-motion', 'پشتیبانی motion کامل نیست');

if (includes(files.detailCss, 'equipment-detail-image-frame') && includes(files.detailJs, 'equipment-detail-source-accordion') && includes(files.detailShell, 'equipment-detail-back')) pass('صفحهٔ معرفی آموزشی', 'تصویر پایدار، منابع آکاردئونی و مسیر بازگشت');
else fail('صفحهٔ معرفی آموزشی', 'ساختار صفحهٔ خانواده کامل نیست');

if (includes(files.chromeCss, 'catalog-detail-dock') && includes(files.chromeCss, 'safe-area-inset-bottom')) pass('ناوبری مشترک و safe-area', 'dock و فاصلهٔ امن در صفحات معرفی');
else fail('ناوبری مشترک و safe-area', 'dock یا safe-area وجود ندارد');

const failures = checks.filter(check => check.status === 'FAIL');
const report = [
  '# گزارش مشاور کاتالوگ',
  '',
  `تاریخ بررسی: ${new Date().toISOString()}`,
  `نتیجه: ${failures.length ? 'نیازمند اصلاح' : 'هم‌راستا با قرارداد'}`,
  '',
  ...checks.map(check => `- [${check.status}] ${check.label}: ${check.evidence}`),
  '',
  '## معیار بصری دستی',
  '',
  '- دسکتاپ باید حس فهرست محصول بدهد: sidebar راست، toolbar مرتب و شبکهٔ کارت عمودی.',
  '- در هاور نباید ارتفاع ردیف، جای متن یا موقعیت کارت‌های همسایه تغییر کند.',
  '- موبایل باید بدون تکیه بر hover قابل استفاده باشد و متن فارسی بریده نشود.',
  '- صفحهٔ معرفی باید قبل از انتخاب ظرفیت، کاربرد و تفاوت گزینه‌ها را روشن کند.',
].join('\n');

const outputPath = path.join(projectRoot, 'docs', 'catalog-digikala-advisor-report.md');
fs.writeFileSync(outputPath, `${report}\n`, 'utf8');
console.log(report);
if (failures.length) process.exitCode = 1;
