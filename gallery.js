(() => {
  const catalog = window.LAB_EQUIPMENT_CATALOG || [];

  const toPersianDigits = value => String(value).replace(/[0-9]/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit]);
  const normalise = value => String(value || '').toLocaleLowerCase('fa-IR').replace(/[\u200c\s]+/g, ' ').trim();
  const variantCount = catalog.reduce((total, family) => total + family.variants.length, 0);

  function getSearchText(family) {
    return normalise([
      family.titleFa,
      family.titleEn,
      family.categoryLabel,
      ...(family.aliases || []),
      family.summary,
      family.introduction,
      family.primaryUse,
      ...family.variants.flatMap(variant => [variant.titleFa, variant.titleEn, variant.label, variant.detail])
    ].join(' '));
  }

  function renderEquipmentCard(family) {
    const firstVariant = family.variants[0];
    const variantCount = family.variants.length;
    const variantLabel = variantCount > 1
      ? `${toPersianDigits(variantCount)} گزینه`
      : 'یک گزینه';

    return `
      <article class="equipment-catalog-card" data-equipment-category="${family.category}" data-equipment-search="${getSearchText(family)}">
        <a class="equipment-card-link" href="./Equipment/${family.slug}.html" aria-label="مشاهدهٔ صفحهٔ معرفی ${family.titleFa}">
          <div class="equipment-card-image-wrap">
            <img class="equipment-card-image" src="./asset/equipment/${firstVariant.image}" alt="${family.titleFa}" loading="lazy" decoding="async" width="640" height="480">
          </div>
          <div class="equipment-card-body">
            <div class="equipment-card-meta">
              <span class="equipment-card-category-line">${family.categoryLabel}</span>
              <span class="equipment-card-variant-count">${variantLabel}</span>
            </div>
            <h4 class="equipment-card-title">${family.titleFa}</h4>
            <p class="equipment-card-en" dir="ltr">${family.titleEn}</p>
            <p class="equipment-card-summary">${family.summary}</p>
            <div class="equipment-card-footer">
              <span>${variantCount > 1 ? 'انتخاب حجم یا نوع' : 'معرفی و کاربرد'}</span>
              <span class="equipment-card-cta"><span>مشاهدهٔ معرفی</span><span class="material-symbols-outlined" aria-hidden="true">arrow-left</span></span>
            </div>
          </div>
        </a>
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
    const familyCount = document.getElementById('gallery-family-count');
    const galleryVariantCount = document.getElementById('gallery-variant-count');
    const suggestionLink = document.querySelector('.catalog-suggestion-link');
    if (!grid || !search || !count || !empty) return;

    let activeFilter = 'all';

    if (familyCount) familyCount.textContent = toPersianDigits(catalog.length);
    if (galleryVariantCount) galleryVariantCount.textContent = toPersianDigits(variantCount);

    if (suggestionLink) {
      const suggestionUrl = new URL(suggestionLink.href, window.location.href);
      suggestionUrl.searchParams.set('title', 'پیشنهاد افزودن به کاتالوگ');
      suggestionUrl.searchParams.set('body', [
        '## پیشنهاد افزودن به کاتالوگ',
        '',
        '- نوع پیشنهاد: ماده یا تجهیز',
        '- نام فارسی:',
        '- نام انگلیسی یا مدل:',
        '- منبع یا لینک پیشنهادی:',
        '',
        '### توضیحات تکمیلی',
        '',
        'لطفاً اطلاعات منبع‌دار، کاربرد و نکات ایمنی موردنظر را بنویسید. پس از بررسی منبع معتبر دربارهٔ افزودن مورد به کاتالوگ تصمیم‌گیری می‌شود.'
      ].join('\n'));
      suggestionLink.href = suggestionUrl.toString();
    }

    function render() {
      const query = normalise(search.value);
      const filtered = catalog.filter(family => {
        const matchesFilter = activeFilter === 'all' || family.category === activeFilter;
        const matchesQuery = !query || getSearchText(family).includes(query);
        return matchesFilter && matchesQuery;
      });

      grid.innerHTML = filtered.map(renderEquipmentCard).join('');
      empty.hidden = filtered.length !== 0;
      const hasConstraints = Boolean(query || activeFilter !== 'all');
      count.textContent = hasConstraints ? `نتیجهٔ فیلتر: ${toPersianDigits(filtered.length)} خانواده` : '';
      filterButtons.forEach(filterButton => {
        filterButton.classList.toggle('active', filterButton.dataset.equipmentFilter === activeFilter);
        filterButton.setAttribute('aria-pressed', String(filterButton.dataset.equipmentFilter === activeFilter));
      });
    }

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        activeFilter = button.dataset.equipmentFilter || 'all';
        render();
      });
    });

    search.addEventListener('input', render);

    if (mainSearch) {
      mainSearch.addEventListener('input', () => {
        if (document.activeElement !== search) {
          search.value = mainSearch.value;
          render();
        }
      });
    }

    render();
  }

  document.addEventListener('DOMContentLoaded', initGallery);
})();
