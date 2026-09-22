(() => {
  const catalogItems = [
    { image: 'volumetric-flask-25ml.webp', titleFa: 'بالن حجمی ۲۵ میلی‌لیتر', titleEn: 'Volumetric Flask', category: 'glassware', categoryLabel: 'شیشه‌آلات', summary: 'برای تهیه محلول با حجم نهایی مشخص.', details: 'نمونهٔ مرجع: شیشهٔ بوروسیلیکات 3.3، Class A و منطبق با EN ISO 1042.', source: 'https://www.interlab.co.nz/product/volumetric-flasks-clear-glass/' },
    { image: 'volumetric-flask-50ml.webp', titleFa: 'بالن حجمی ۵۰ میلی‌لیتر', titleEn: 'Volumetric Flask', category: 'glassware', categoryLabel: 'شیشه‌آلات', summary: 'برای تهیه محلول با حجم نهایی مشخص.', details: 'نمونهٔ مرجع: شیشهٔ بوروسیلیکات 3.3، Class A و منطبق با EN ISO 1042.', source: 'https://www.interlab.co.nz/product/volumetric-flasks-clear-glass/' },
    { image: 'volumetric-flask-100ml.webp', titleFa: 'بالن حجمی ۱۰۰ میلی‌لیتر', titleEn: 'Volumetric Flask', category: 'glassware', categoryLabel: 'شیشه‌آلات', summary: 'برای تهیه محلول با حجم نهایی مشخص.', details: 'نمونهٔ مرجع: شیشهٔ بوروسیلیکات 3.3، Class A و منطبق با EN ISO 1042.', source: 'https://www.interlab.co.nz/product/volumetric-flasks-clear-glass/' },
    { image: 'volumetric-flask-250ml.webp', titleFa: 'بالن حجمی ۲۵۰ میلی‌لیتر', titleEn: 'Volumetric Flask', category: 'glassware', categoryLabel: 'شیشه‌آلات', summary: 'برای تهیه محلول با حجم نهایی مشخص.', details: 'نمونهٔ مرجع: شیشهٔ بوروسیلیکات 3.3، Class A و منطبق با EN ISO 1042.', source: 'https://www.interlab.co.nz/product/volumetric-flasks-clear-glass/' },
    { image: 'volumetric-flask-500ml.webp', titleFa: 'بالن حجمی ۵۰۰ میلی‌لیتر', titleEn: 'Volumetric Flask', category: 'glassware', categoryLabel: 'شیشه‌آلات', summary: 'برای تهیه محلول با حجم نهایی مشخص.', details: 'نمونهٔ مرجع: شیشهٔ بوروسیلیکات 3.3، Class A و منطبق با EN ISO 1042.', source: 'https://www.interlab.co.nz/product/volumetric-flasks-clear-glass/' },
    { image: 'volumetric-flask-1000ml.webp', titleFa: 'بالن حجمی ۱۰۰۰ میلی‌لیتر', titleEn: 'Volumetric Flask', category: 'glassware', categoryLabel: 'شیشه‌آلات', summary: 'برای تهیه محلول با حجم نهایی مشخص.', details: 'نمونهٔ مرجع: شیشهٔ بوروسیلیکات 3.3، Class A و منطبق با EN ISO 1042.', source: 'https://www.interlab.co.nz/product/volumetric-flasks-clear-glass/' },
    { image: 'reagent-bottles.webp', titleFa: 'بطری‌های نگهداری معرف', titleEn: 'Reagent Bottles', category: 'glassware', categoryLabel: 'شیشه‌آلات', summary: 'برای نگهداری، شناسایی و دسترسی ایمن به محلول‌ها.', details: 'نام ماده، غلظت، تاریخ آماده‌سازی و هشدارهای لازم باید روی برچسب ثبت شود.' },
    { image: 'petri-dishes.webp', titleFa: 'پتری‌دیش شیشه‌ای', titleEn: 'Petri Dishes', category: 'glassware', categoryLabel: 'شیشه‌آلات', summary: 'ظرف کم‌عمق برای مشاهده، نگهداری یا آماده‌سازی نمونه.', details: 'پیش از استفاده، تمیزی و سلامت سطح شیشه بررسی شود.' },
    { image: 'porcelain-crucible.webp', titleFa: 'بوتهٔ چینی متوسط', titleEn: 'Porcelain Crucible', category: 'porcelain', categoryLabel: 'چینی', summary: 'برای گرمادهی و عملیات حرارتی نمونه‌های جامد.', details: 'پس از گرمادهی، بوته را با ابزار مناسب جابه‌جا و تا رسیدن به دمای ایمن خنک کنید.' },
    { image: 'glass-funnel-long-stem.webp', titleFa: 'قیف شیشه‌ای ساقه‌بلند', titleEn: 'Long Stem Glass Funnel', category: 'glassware', categoryLabel: 'شیشه‌آلات', summary: 'برای انتقال کنترل‌شدهٔ مایعات یا فیلتراسیون ساده.', details: 'پیش از کار، سازگاری شیشه و کاغذ یا محیط فیلتراسیون بررسی شود.' },
    { image: 'serological-pipettes.webp', titleFa: 'پیپت سرولوژیک شیشه‌ای', titleEn: 'Glass Serological Pipette', category: 'glassware', categoryLabel: 'شیشه‌آلات', summary: 'برای انتقال و اندازه‌گیری حجم مایعات.', details: 'برای پیپت‌کردن از پوآر یا پیپت‌فیلر استفاده کنید و هرگز با دهان مکش نکنید.' },
    { image: 'watch-glass.webp', titleFa: 'شیشهٔ ساعت', titleEn: 'Watch Glass', category: 'glassware', categoryLabel: 'شیشه‌آلات', summary: 'برای پوشاندن ظرف، تبخیر محدود یا نگهداری کوتاه‌مدت نمونه.', details: 'سطح شیشه را پیش از استفاده از آلودگی و ترک بررسی کنید.' },
    { image: 'glass-burette.webp', titleFa: 'بورت شیشه‌ای مدرج', titleEn: 'Straight Bore Glass Burette', category: 'glassware', categoryLabel: 'شیشه‌آلات', summary: 'برای افزودن کنترل‌شدهٔ حجم مایع در اندازه‌گیری‌های حجمی.', details: 'پیش از استفاده، نشتی شیر و خوانش منیسک بررسی شود.' },
    { image: 'separating-funnel.webp', titleFa: 'قیف جداکنندهٔ گلابی‌شکل', titleEn: 'Pear-Shaped Separating Funnel', category: 'glassware', categoryLabel: 'شیشه‌آلات', summary: 'برای جداسازی فازهای مایع غیرقابل اختلاط.', details: 'پیش از بازکردن شیر یا درپوش، فشار داخل قیف را طبق روش ایمن آزاد کنید.' },
    { image: 'buchner-funnel.webp', titleFa: 'قیف بوخنر چینی', titleEn: 'Porcelain Buchner Funnel', category: 'porcelain', categoryLabel: 'چینی', summary: 'برای فیلتراسیون خلأ همراه با کاغذ صافی.', details: 'اتصال، کاغذ صافی و سلامت شیشه یا بالن خلأ را قبل از کار بررسی کنید.' },
    { image: 'porcelain-mortar-pestle.webp', titleFa: 'هاون و دستهٔ هاون چینی', titleEn: 'Glazed Porcelain Mortar and Pestle', category: 'porcelain', categoryLabel: 'چینی', summary: 'برای خردکردن یا همگن‌سازی نمونه‌های جامد.', details: 'از ضربهٔ شدید و ترکیب موادی که واکنش آن‌ها مشخص نیست خودداری کنید.' },
    { image: 'screw-cap-test-tube.webp', titleFa: 'لولهٔ آزمایش درپیچ‌دار', titleEn: 'Glass Test Tube with Screw Cap', category: 'glassware', categoryLabel: 'شیشه‌آلات', summary: 'برای نگهداری یا آماده‌سازی حجم‌های کم نمونه.', details: 'درپوش را بیش از حد سفت نکنید و پیش از گرمادهی، بسته‌بودن کامل را بررسی کنید.' },
    { image: 'crucible-tongs.webp', titleFa: 'انبر بوته از فولاد زنگ‌نزن', titleEn: 'Stainless Steel Crucible Tongs', category: 'metal', categoryLabel: 'فلزی', summary: 'برای گرفتن بوته‌ها و ظروف داغ در فاصلهٔ ایمن.', details: 'پیش از جابه‌جایی، ظرفیت و پایداری گرفتن انبر را بررسی کنید.' },
    { image: 'crystallizing-dish.webp', titleFa: 'ظرف تبلور', titleEn: 'Crystallizing Dish', category: 'glassware', categoryLabel: 'شیشه‌آلات', summary: 'برای تبخیر کنترل‌شده و تشکیل بلور از محلول.', details: 'ظرف را روی سطح پایدار قرار دهید و از پرکردن بیش از ظرفیت خودداری کنید.' },
    { image: 'vacuum-desiccator.webp', titleFa: 'دسیکاتور خلأ شیشه‌ای', titleEn: 'Glass Vacuum Desiccator', category: 'glassware', categoryLabel: 'شیشه‌آلات', summary: 'برای خشک‌کردن یا نگهداری نمونه در محیط کم‌رطوبت.', details: 'پیش از ایجاد خلأ، سلامت بدنه، درپوش و گریس آب‌بندی بررسی شود.' },
    { image: 'coiled-distillate.webp', titleFa: 'اتصال مارپیچی تقطیر', titleEn: 'Coiled Distillate Joint', category: 'glassware', categoryLabel: 'شیشه‌آلات', summary: 'جزئی از مجموعه‌های شیشه‌ای تقطیر و انتقال بخار یا مایع.', details: 'اتصالات شیشه‌ای را بدون فشار جانبی و با تجهیزات محافظ جابه‌جا کنید.' },
    { image: 'pipette-stand.webp', titleFa: 'پایهٔ چرخشی پیپت', titleEn: 'Rotary Vertical Pipette Stand', category: 'accessories', categoryLabel: 'لوازم جانبی', summary: 'برای نگهداری منظم پیپت‌ها در وضعیت عمودی.', details: 'پایه را روی سطح صاف قرار دهید و ظرفیت آن را بیشتر از حد مجاز پر نکنید.' },
    { image: 'allihn-condenser.webp', titleFa: 'کندانسور آلیهن', titleEn: 'Allihn Condenser', category: 'glassware', categoryLabel: 'شیشه‌آلات', summary: 'برای چگالش بخار در مجموعه‌های استخراج یا رفلاکس.', details: 'جهت ورود و خروج آب خنک‌کننده و سلامت شیلنگ‌ها بررسی شود.' },
    { image: 'buffer-ph4.webp', titleFa: 'محلول بافر pH ۴', titleEn: 'pH 4 Buffer Solution', category: 'solutions', categoryLabel: 'محلول و خشک‌کننده', summary: 'برای کنترل یا بررسی عملکرد اندازه‌گیری در محدودهٔ اسیدی.', details: 'تاریخ انقضا، دمای مرجع و شرایط نگهداری روی برچسب بررسی شود.' },
    { image: 'buffer-ph7.webp', titleFa: 'محلول بافر pH ۷', titleEn: 'pH 7 Buffer Solution', category: 'solutions', categoryLabel: 'محلول و خشک‌کننده', summary: 'برای کنترل یا بررسی عملکرد اندازه‌گیری نزدیک به خنثی.', details: 'تاریخ انقضا، دمای مرجع و شرایط نگهداری روی برچسب بررسی شود.' },
    { image: 'buffer-ph10.webp', titleFa: 'محلول بافر pH ۱۰', titleEn: 'pH 10 Buffer Solution', category: 'solutions', categoryLabel: 'محلول و خشک‌کننده', summary: 'برای کنترل یا بررسی عملکرد اندازه‌گیری در محدودهٔ بازی.', details: 'تاریخ انقضا، دمای مرجع و شرایط نگهداری روی برچسب بررسی شود.' },
    { image: 'silica-gel-blue-wet.webp', titleFa: 'سیلیکاژل آبی مرطوب', titleEn: 'Blue Silica Gel, Wet', category: 'solutions', categoryLabel: 'محلول و خشک‌کننده', summary: 'نمونه‌ای از جاذب رطوبت در وضعیت مرطوب.', details: 'رنگ و وضعیت رطوبت را طبق روش داخلی آزمایشگاه بررسی کنید.' },
    { image: 'silica-gel-blue-dry.webp', titleFa: 'سیلیکاژل آبی خشک', titleEn: 'Blue Silica Gel, Dry', category: 'solutions', categoryLabel: 'محلول و خشک‌کننده', summary: 'نمونه‌ای از جاذب رطوبت در وضعیت خشک.', details: 'در ظرف دربسته و دور از رطوبت نگهداری شود.' },
    { image: 'silica-gel-yellow-wet.webp', titleFa: 'سیلیکاژل زرد مرطوب', titleEn: 'Yellow Silica Gel, Wet', category: 'solutions', categoryLabel: 'محلول و خشک‌کننده', summary: 'نمونه‌ای از جاذب رطوبت در وضعیت مرطوب.', details: 'رنگ و وضعیت رطوبت را طبق روش داخلی آزمایشگاه بررسی کنید.' },
    { image: 'silica-gel-yellow-dry.webp', titleFa: 'سیلیکاژل زرد خشک', titleEn: 'Yellow Silica Gel, Dry', category: 'solutions', categoryLabel: 'محلول و خشک‌کننده', summary: 'نمونه‌ای از جاذب رطوبت در وضعیت خشک.', details: 'در ظرف دربسته و دور از رطوبت نگهداری شود.' }
  ];

  const toPersianDigits = value => String(value).replace(/[0-9]/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit]);
  const normalise = value => String(value || '').toLocaleLowerCase('fa-IR').replace(/[\u200c\s]+/g, ' ').trim();

  function renderEquipmentCard(item) {
    const sourceLink = item.source
      ? `<a class="equipment-card-source" href="${item.source}" target="_blank" rel="noopener noreferrer">مشاهدهٔ مرجع اطلاعاتی</a>`
      : '';

    return `
      <article class="equipment-catalog-card" data-equipment-category="${item.category}" data-equipment-search="${normalise(`${item.titleFa} ${item.titleEn} ${item.categoryLabel} ${item.summary} ${item.details}`)}">
        <div class="equipment-card-image-wrap">
          <img class="equipment-card-image" src="./asset/equipment/${item.image}" alt="${item.titleFa}" loading="lazy" decoding="async" width="640" height="480">
          <span class="equipment-card-category">${item.categoryLabel}</span>
        </div>
        <div class="equipment-card-body">
          <div class="equipment-card-title-row">
            <h4>${item.titleFa}</h4>
            <span class="material-symbols-outlined" aria-hidden="true">inventory_2</span>
          </div>
          <p class="equipment-card-en">${item.titleEn}</p>
          <p class="equipment-card-summary">${item.summary}</p>
          <details class="equipment-card-details">
            <summary>جزئیات بیشتر</summary>
            <p>${item.details}</p>
            ${sourceLink}
          </details>
        </div>
      </article>
    `;
  }

  function initGallery() {
    const grid = document.getElementById('gallery-equipment-grid');
    const search = document.getElementById('gallery-equipment-search');
    const count = document.getElementById('gallery-equipment-count');
    const empty = document.getElementById('gallery-equipment-empty');
    const filterButtons = Array.from(document.querySelectorAll('[data-equipment-filter]'));
    const mainSearch = document.getElementById('search-input');
    if (!grid || !search || !count || !empty) return;

    let activeFilter = 'all';

    function render() {
      const query = normalise(search.value);
      const filtered = catalogItems.filter(item => {
        const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
        const matchesQuery = !query || normalise(`${item.titleFa} ${item.titleEn} ${item.categoryLabel} ${item.summary} ${item.details}`).includes(query);
        return matchesFilter && matchesQuery;
      });

      grid.innerHTML = filtered.map(renderEquipmentCard).join('');
      empty.hidden = filtered.length !== 0;
      count.textContent = `نمایش ${toPersianDigits(filtered.length)} مورد از ${toPersianDigits(catalogItems.length)} مورد`;
    }

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        activeFilter = button.dataset.equipmentFilter || 'all';
        filterButtons.forEach(filterButton => filterButton.classList.toggle('active', filterButton === button));
        render();
      });
    });

    search.addEventListener('input', render);

    if (mainSearch) {
      mainSearch.addEventListener('input', () => {
        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab && activeTab.dataset.tab === 'tab-gallery' && document.activeElement !== search) {
          search.value = mainSearch.value;
          render();
        }
      });
    }

    render();
  }

  document.addEventListener('DOMContentLoaded', initGallery);
})();
