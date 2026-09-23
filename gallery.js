(() => {
  const catalog = Array.isArray(window.LAB_EQUIPMENT_CATALOG) ? window.LAB_EQUIPMENT_CATALOG : [];
  const categoryLabels = {
    all: 'همهٔ تجهیزات',
    glassware: 'شیشه‌آلات',
    plasticware: 'پلاستیک‌آلات',
    porcelain: 'چینی و سرامیک',
    crucibles: 'بوته‌ها',
    metal: 'ظروف فلزی',
    solutions: 'محلول و خشک‌کننده',
    accessories: 'لوازم جانبی'
  };

  const toPersianDigits = value => String(value).replace(/[0-9]/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit]);
  const normalise = value => String(value || '').toLocaleLowerCase('fa-IR').replace(/[\u200c\s]+/g, ' ').trim();
  const escapeHtml = value => String(value || '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[character]));

  function getSearchText(family) {
    return normalise([
      family.titleFa,
      family.titleEn,
      family.category,
      family.categoryLabel,
      ...(family.aliases || []),
      family.summary,
      family.introduction,
      family.primaryUse,
      ...(family.sources || []).flatMap(source => [source.label, source.url]),
      ...(family.variants || []).flatMap(variant => [variant.titleFa, variant.titleEn, variant.label, variant.detail])
    ].join(' '));
  }

  function variantLabel(family) {
    const count = Array.isArray(family.variants) ? family.variants.length : 0;
    return count > 1 ? `${toPersianDigits(count)} گزینه` : 'یک گزینه';
  }

  function renderEquipmentCard(family, index) {
    const firstVariant = family.variants?.[0];
    if (!firstVariant) return '';

    const image = family.cardImage || firstVariant.image;
    const loading = index < 4 ? 'eager' : 'lazy';
    const fetchPriority = index < 2 ? ' fetchpriority="high"' : '';
    const categoryLabel = family.categoryLabel || categoryLabels[family.category] || 'تجهیزات آزمایشگاه';
    const title = escapeHtml(family.titleFa);
    const titleEn = escapeHtml(family.titleEn);

    return `
      <article class="equipment-catalog-card" data-equipment-category="${escapeHtml(family.category)}" data-equipment-search="${escapeHtml(getSearchText(family))}">
        <a class="equipment-card-link" href="./Equipment/${encodeURIComponent(family.slug)}.html" aria-label="مشاهدهٔ صفحهٔ معرفی ${title}">
          <div class="equipment-card-image-wrap">
            <img class="equipment-card-image" src="./asset/equipment/${encodeURIComponent(image)}" alt="${title}" loading="${loading}" decoding="async" width="320" height="220"${fetchPriority}>
          </div>
          <div class="equipment-card-body">
            <div class="equipment-card-meta">
              <span class="equipment-card-category-line">${escapeHtml(categoryLabel)}</span>
              <span class="equipment-card-variant-count">${variantLabel(family)}</span>
            </div>
            <h3 class="equipment-card-title">${title}</h3>
            <p class="equipment-card-en" dir="ltr">${titleEn}</p>
            <p class="equipment-card-summary">${escapeHtml(family.summary || family.introduction || 'معرفی کاربرد و نکات انتخاب در صفحهٔ خانواده.')}</p>
            <div class="equipment-card-footer">
              <span>${family.variants.length > 1 ? 'مقایسهٔ گزینه‌ها' : 'معرفی و کاربرد'}</span>
              <span class="equipment-card-cta"><span>مشاهدهٔ معرفی</span><span class="material-symbols-outlined" aria-hidden="true">arrow_back</span></span>
            </div>
          </div>
        </a>
      </article>
    `;
  }

  function readUrlState() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    return {
      query: params.get('q') || '',
      category: category && Object.prototype.hasOwnProperty.call(categoryLabels, category) ? category : 'all'
    };
  }

  function writeUrlState(query, category, replace = true) {
    try {
      const url = new URL(window.location.href);
      const cleanQuery = query.trim();
      if (cleanQuery) url.searchParams.set('q', cleanQuery);
      else url.searchParams.delete('q');
      if (category !== 'all') url.searchParams.set('category', category);
      else url.searchParams.delete('category');
      const nextUrl = `${url.pathname}${url.search}${url.hash}`;
      if (replace) window.history.replaceState({ q: cleanQuery, category }, '', nextUrl);
      else window.history.pushState({ q: cleanQuery, category }, '', nextUrl);
    } catch (error) {
      // URL state is an enhancement for local/offline copies of the catalogue.
    }
  }

  function initGallery() {
    const grid = document.getElementById('gallery-equipment-grid');
    const search = document.getElementById('gallery-equipment-search');
    const clearSearch = document.getElementById('gallery-equipment-search-clear');
    const count = document.getElementById('gallery-equipment-count');
    const empty = document.getElementById('gallery-equipment-empty');
    const reset = document.getElementById('gallery-equipment-reset');
    const dialog = document.getElementById('catalog-category-dialog');
    const allCategoriesButton = document.getElementById('catalog-all-categories');
    const closeDialogButtons = Array.from(document.querySelectorAll('[data-catalog-dialog-close]'));
    const filterButtons = Array.from(document.querySelectorAll('[data-equipment-filter]'));
    const categoryCounts = Array.from(document.querySelectorAll('[data-category-count], [data-dialog-category-count]'));
    if (!grid || !search || !count || !empty) return;

    let state = readUrlState();

    const openDialog = () => {
      if (!dialog) return;
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      allCategoriesButton?.setAttribute('aria-expanded', 'true');
      dialog.querySelector('[data-equipment-filter].is-active')?.focus();
    };
    const closeDialog = () => {
      if (!dialog) return;
      if (typeof dialog.close === 'function' && dialog.open) dialog.close();
      else dialog.removeAttribute('open');
      allCategoriesButton?.setAttribute('aria-expanded', 'false');
    };

    function updateCategoryCounts() {
      const counts = { all: catalog.length };
      catalog.forEach(family => {
        counts[family.category] = (counts[family.category] || 0) + 1;
      });
      categoryCounts.forEach(element => {
        const key = element.dataset.categoryCount || element.dataset.dialogCategoryCount;
        element.textContent = counts[key] ? toPersianDigits(counts[key]) : '۰';
      });
    }

    function updateFilterState() {
      filterButtons.forEach(button => {
        const selected = button.dataset.equipmentFilter === state.category;
        button.classList.toggle('active', selected);
        button.classList.toggle('is-active', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
    }

    function render() {
      const query = normalise(state.query);
      const filtered = catalog.filter(family => {
        const matchesCategory = state.category === 'all' || family.category === state.category;
        return matchesCategory && (!query || getSearchText(family).includes(query));
      });

      grid.innerHTML = filtered.map(renderEquipmentCard).join('');
      empty.hidden = filtered.length !== 0;
      clearSearch.hidden = !state.query;
      updateFilterState();
      if (!state.query && state.category === 'all') {
        count.textContent = `${toPersianDigits(filtered.length)} خانوادهٔ تجهیز برای آشنایی`;
      } else {
        const categoryText = state.category === 'all' ? '' : ` در «${categoryLabels[state.category]}»`;
        const queryText = state.query ? ` برای «${state.query}»` : '';
        count.textContent = `${toPersianDigits(filtered.length)} نتیجه${categoryText}${queryText}`;
      }
    }

    function selectCategory(category, usePushState = true) {
      if (!Object.prototype.hasOwnProperty.call(categoryLabels, category)) return;
      state.category = category;
      writeUrlState(state.query, state.category, !usePushState);
      render();
      if (dialog?.open) closeDialog();
    }

    search.value = state.query;
    search.addEventListener('input', () => {
      state.query = search.value;
      writeUrlState(state.query, state.category, true);
      render();
    });
    clearSearch?.addEventListener('click', () => {
      state.query = '';
      search.value = '';
      writeUrlState(state.query, state.category, true);
      render();
      search.focus();
    });
    reset?.addEventListener('click', () => {
      state = { query: '', category: 'all' };
      search.value = '';
      writeUrlState('', 'all', true);
      render();
      search.focus();
    });
    filterButtons.forEach(button => button.addEventListener('click', () => selectCategory(button.dataset.equipmentFilter || 'all')));
    allCategoriesButton?.addEventListener('click', openDialog);
    closeDialogButtons.forEach(button => button.addEventListener('click', closeDialog));
    dialog?.addEventListener('click', event => {
      if (event.target === dialog) closeDialog();
    });
    dialog?.addEventListener('close', () => allCategoriesButton?.setAttribute('aria-expanded', 'false'));
    window.addEventListener('popstate', () => {
      state = readUrlState();
      search.value = state.query;
      render();
    });

    updateCategoryCounts();
    render();

    const suggestionLink = document.querySelector('.catalog-suggestion-link');
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
  }

  document.addEventListener('DOMContentLoaded', initGallery);
})();
