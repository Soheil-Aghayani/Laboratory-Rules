(() => {
  const catalog = window.LAB_EQUIPMENT_CATALOG || [];

  const toPersianDigits = value => String(value).replace(/[0-9]/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit]);
  const normalise = value => String(value || '').toLocaleLowerCase('fa-IR').replace(/[\u200c\s]+/g, ' ').trim();

  function getSearchText(family) {
    return normalise([
      family.titleFa,
      family.titleEn,
      family.categoryLabel,
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
              <span class="equipment-card-cta">مشاهدهٔ معرفی</span>
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
    if (!grid || !search || !count || !empty) return;

    let activeFilter = 'all';

    function render() {
      const query = normalise(search.value);
      const filtered = catalog.filter(family => {
        const matchesFilter = activeFilter === 'all' || family.category === activeFilter;
        const matchesQuery = !query || getSearchText(family).includes(query);
        return matchesFilter && matchesQuery;
      });

      grid.innerHTML = filtered.map(renderEquipmentCard).join('');
      empty.hidden = filtered.length !== 0;
      count.textContent = `نمایش ${toPersianDigits(filtered.length)} خانواده از ${toPersianDigits(catalog.length)} خانواده`;
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
