(() => {
  const catalog = Array.isArray(window.LAB_ELEMENT_CATALOG) ? window.LAB_ELEMENT_CATALOG : [];
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const englishDigits = '0123456789';

  const toPersianDigits = value => String(value ?? '').replace(/[0-9]/g, digit => persianDigits[digit]);
  const toEnglishDigits = value => String(value ?? '').replace(/[۰-۹]/g, digit => englishDigits[persianDigits.indexOf(digit)]);
  const normalise = value => String(value || '')
    .toLocaleLowerCase('fa-IR')
    .replace(/[\u200c\s]+/g, ' ')
    .trim();
  const escapeHTML = value => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
  const formatValue = (value, unit = '') => {
    if (value === null || value === undefined || value === '') return 'در این رکورد در دسترس نیست';
    return `${toPersianDigits(value)}${unit ? ` ${escapeHTML(unit)}` : ''}`;
  };
  const icon = (name, extraClass = '') => `<span class="material-symbols-outlined ${extraClass}" aria-hidden="true">${escapeHTML(name)}</span>`;
  const familyClassMap = {
    'Alkali metal': 'alkali-metal',
    'Alkaline earth metal': 'alkaline-earth-metal',
    'Transition metal': 'transition-metal',
    'Post-transition metal': 'post-transition-metal',
    Metalloid: 'metalloid',
    Nonmetal: 'nonmetal',
    Halogen: 'halogen',
    'Noble gas': 'noble-gas',
    Lanthanide: 'lanthanide',
    Actinide: 'actinide'
  };
  const getFamilyClass = classification => familyClassMap[classification?.familyEn] || 'element';
  const radiationIcon = `
    <svg class="radiation-symbol" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" role="img" aria-label="پرتوزا" focusable="false">
      <title>radioactive-fill</title>
      <path fill="currentColor" d="M116 128a12 12 0 1 1 12 12a12 12 0 0 1 12-12m-15.78 3.51A29 29 0 0 1 100 128a28 28 0 0 1 16.94-25.73a4 4 0 0 0 1.87-5.66L90.75 48a16 16 0 0 0-23.1-5.07a103.83 103.83 0 0 0-43.58 75.49a16.2 16.2 0 0 0 4.17 12.37A16 16 0 0 0 40 136h56.26a4 4 0 0 0 3.96-4.49m131.71-13.09a103.83 103.83 0 0 0-43.58-75.49a16 16 0 0 0-23.1 5.07l-28.06 48.61a4 4 0 0 0 1.87 5.66A28 28 0 0 1 156 128a29 29 0 0 1-.22 3.51a4 4 0 0 0 4 4.49H216a16 16 0 0 0 11.76-5.21a16.2 16.2 0 0 0 4.17-12.37m-81.13 33.06a4 4 0 0 0-5.91-1.15a28 28 0 0 1-33.78 0a4 4 0 0 0-5.91 1.15l-27.95 48.43a16 16 0 0 0 7.12 22.52a104.24 104.24 0 0 0 87.26 0a16 16 0 0 0 7.12-22.52Z"/>
    </svg>`;
  const getElementByNumber = number => catalog.find(element => element.atomicNumber === Number(number));
  const getElementSearchText = element => normalise([
    element.nameFa,
    element.nameEn,
    element.symbol,
    element.cas,
    element.formula,
    ...(element.aliases || []),
    element.classification?.familyFa,
    element.classification?.familyEn,
    element.summary
  ].join(' '));
  const matchesElementQuery = (element, value) => {
    const query = normalise(toEnglishDigits(value));
    if (!query) return true;
    const exactFields = [element.symbol, element.cas, element.formula, element.atomicNumber]
      .map(field => normalise(field));
    return exactFields.includes(query) || (query.length > 1 && getElementSearchText(element).includes(query));
  };

  let activeFamily = '';
  let activeQuery = '';
  let activeElementNumber = null;
  let detailRoot;
  let tableRoot;
  let countRoot;
  let emptyRoot;
  let searchInput;
  let elementsRoot;

  function isFilterMatch(element) {
    const classification = element.classification || {};
    if (activeFamily && getFamilyClass(classification) !== activeFamily) return false;
    return true;
  }

  function getFilteredElements() {
    return catalog.filter(element => isFilterMatch(element) && matchesElementQuery(element, activeQuery));
  }

  function cardPosition(element) {
    const number = element.atomicNumber;
    const group = element.classification?.group;
    const period = element.classification?.period || 1;
    if (group) return `grid-column:${group};grid-row:${period};`;
    if (number >= 57 && number <= 71) return `grid-column:${number - 54};grid-row:8;`;
    if (number >= 89 && number <= 103) return `grid-column:${number - 86};grid-row:9;`;
    return 'grid-column:1;grid-row:1;';
  }

  function renderElementCard(element) {
    const classification = element.classification || {};
    const radioactiveLabel = classification.radioactive === true ? '، پرتوزا' : '';
    const label = `${element.nameFa} (${element.nameEn})، عدد اتمی ${element.atomicNumber}${radioactiveLabel}`;
    const familyClass = getFamilyClass(classification);
    const radioactiveBadge = classification.radioactive === true
      ? `<span class="element-card-radioactive" title="پرتوزا" aria-hidden="true">${radiationIcon}</span>`
      : '';
    return `
      <button type="button" class="element-card" data-element-number="${element.atomicNumber}" data-element-family="${familyClass}" aria-label="مشاهدهٔ اطلاعات ${escapeHTML(label)}" style="${cardPosition(element)}">
        <span class="element-card-topline">
          <span class="element-card-number">${toPersianDigits(element.atomicNumber)}</span>
          ${radioactiveBadge}
        </span>
        <strong class="element-card-symbol" dir="ltr">${escapeHTML(element.symbol)}</strong>
      </button>
    `;
  }

  function renderCatalog() {
    const filtered = getFilteredElements();
    if (tableRoot) tableRoot.innerHTML = filtered.map(element => renderElementCard(element)).join('');
    if (countRoot) {
      const hasConstraints = Boolean(activeQuery || activeFamily);
      countRoot.textContent = hasConstraints ? `نتیجهٔ فیلتر: ${toPersianDigits(filtered.length)} مورد` : '';
    }
    if (emptyRoot) emptyRoot.hidden = filtered.length !== 0;
    document.querySelectorAll('[data-element-family-filter]').forEach(button => {
      const value = button.dataset.elementFamilyFilter || '';
      const isActive = value === 'all' ? !activeFamily : value === activeFamily;
      button.classList.toggle('active', isActive);
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  function renderProperty(label, value, unit = '') {
    const isEnglish = typeof value === 'string' && /[A-Za-z]/.test(value) && !/[\u0600-\u06FF]/.test(value);
    const valueAttributes = isEnglish ? ' dir="ltr" class="element-property-value-english"' : '';
    return `<div class="element-property"><dt>${escapeHTML(label)}</dt><dd${valueAttributes}>${value === null || value === undefined || value === '' ? '<span class="element-missing">در این رکورد در دسترس نیست</span>' : formatValue(value, unit)}</dd></div>`;
  }

  function renderHazards(element) {
    const safety = element.safety;
    if (!safety) {
      return `<div class="element-safety-empty">${icon('info')} دادهٔ ایمنی فرم مشخص در این رکورد ثبت نشده است؛ SDS همان محصول یا ایزوتوپ را بررسی کنید.</div>`;
    }
    const hazardItems = (safety.hazards || []).map(hazard => `<li>${icon(hazard.icon || 'warning')}<span>${escapeHTML(hazard.label)}</span></li>`).join('');
    const incompatible = (safety.incompatible || []).map(item => `<span class="element-chip">${escapeHTML(item)}</span>`).join('');
    return `
      <div class="element-safety-scope">${icon('info')}<span>${escapeHTML(safety.scope)}</span></div>
      <ul class="element-hazard-list">${hazardItems || '<li>برای این رکورد هشدار عمومی ثبت نشده است.</li>'}</ul>
      <div class="element-safety-subtitle">مواد و شرایط ناسازگار</div>
      <div class="element-chip-list">${incompatible || '<span class="element-missing">در این رکورد در دسترس نیست</span>'}</div>
    `;
  }

  const renderDetailAccordionSummary = (iconName, label) => `
    <summary class="element-card-heading element-detail-accordion-summary">
      ${icon(iconName)}
      <span>${label}</span>
      <span class="material-symbols-outlined element-accordion-chevron" aria-hidden="true">expand_more</span>
    </summary>`;

  function renderDetail(element) {
    const classification = element.classification || {};
    const properties = element.properties || {};
    const radioactivity = element.radioactivity || {};
    const isotopeText = element.isotopes || 'جزئیات ایزوتوپ در منبع محلی این build ثبت نشده است؛ برای نوکلید یا ایزوتوپ مشخص، مرجع همان ماده را بررسی کنید.';
    const sources = (element.sources || []).map(source => `<li><a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer" dir="ltr">${escapeHTML(source.label)}</a><span>${escapeHTML(source.scope || '')}</span></li>`).join('');
    const radioStatus = radioactivity.status === 'radioactive' || classification.radioactive
      ? `<span class="element-radioactive-status" title="پرتوزا">${radiationIcon}</span>`
      : '<span>در این رکورد وضعیت پرتوزایی ثبت نشده است</span>';
    return `
      <section class="element-detail" aria-labelledby="element-detail-title">
        <div class="element-detail-topline">
          <button type="button" class="element-back-button" data-element-back>${icon('arrow-left', 'element-icon-reversed')} بازگشت به جدول عناصر</button>
          <span class="element-record-type">آخرین بررسی: ${escapeHTML(element.verifiedAt || 'در دسترس نیست')}</span>
        </div>
        <div class="element-detail-hero">
          <div class="element-symbol-panel" aria-hidden="true">
            <span>${toPersianDigits(element.atomicNumber)}</span>
            <strong dir="ltr">${escapeHTML(element.symbol)}</strong>
            <small dir="ltr">${escapeHTML(element.formula || element.symbol)}</small>
          </div>
          <div class="element-detail-heading">
            <span class="element-section-kicker">عنصر ${toPersianDigits(element.atomicNumber)} از جدول تناوبی</span>
            <h2 id="element-detail-title">${escapeHTML(element.nameFa)}</h2>
            <p dir="ltr">${escapeHTML(element.nameEn)}</p>
            <div class="element-badge-row">
              <span class="element-badge">${icon('category')} ${escapeHTML(classification.familyFa || 'عنصر شیمیایی')}</span>
              <span class="element-badge">${icon('language')} حالت استاندارد: ${escapeHTML(classification.standardState || 'نامشخص')}</span>
            </div>
          </div>
          <div class="element-identifiers">
            <div><span>CAS</span><strong dir="ltr">${escapeHTML(element.cas || 'در دسترس نیست')}</strong></div>
            <div><span>جرم اتمی</span><strong>${formatValue(properties.atomicMass, properties.atomicMassUnit)}</strong></div>
          </div>
        </div>

        <div class="element-detail-grid">
          <article class="element-detail-card element-detail-card-wide">
            <div class="element-card-heading">${icon('info')} معرفی و شناخت</div>
            <p>${escapeHTML(element.summary || 'برای این عنصر معرفی خلاصه‌ای ثبت نشده است.')}</p>
            ${element.uses ? `<details><summary>کاربردهای ثبت‌شده در مرجع</summary><p class="element-detail-english" dir="ltr" lang="en">${escapeHTML(element.uses)}</p></details>` : ''}
            ${element.history ? `<details><summary>پیشینه و کشف</summary><p class="element-detail-english" dir="ltr" lang="en">${escapeHTML(element.history)}</p></details>` : ''}
          </article>
          <details class="element-detail-card element-detail-accordion">
            ${renderDetailAccordionSummary('tune', 'دسته‌بندی')}
            <div class="element-detail-accordion-content">
              <dl class="element-property-list">
                ${renderProperty('خانواده', classification.familyFa)}
                ${renderProperty('دوره', classification.period)}
                ${renderProperty('گروه', classification.group || classification.familyFa)}
                ${renderProperty('حالت استاندارد', classification.standardState)}
              </dl>
            </div>
          </details>
          <details class="element-detail-card element-detail-accordion">
            ${renderDetailAccordionSummary('science', 'خواص کلیدی')}
            <div class="element-detail-accordion-content">
              <dl class="element-property-list">
                ${renderProperty('پیکربندی الکترونی', properties.electronConfiguration)}
                ${renderProperty('الکترونگاتیوی', properties.electronegativity)}
                ${renderProperty('نقطهٔ ذوب', properties.meltingPoint, properties.temperatureUnit)}
                ${renderProperty('نقطهٔ جوش', properties.boilingPoint, properties.temperatureUnit)}
                ${renderProperty('چگالی', properties.density, properties.densityUnit)}
                ${renderProperty('عددهای اکسایش', properties.oxidationStates)}
              </dl>
            </div>
          </details>
          <details class="element-detail-card element-detail-card-wide element-detail-accordion">
            ${renderDetailAccordionSummary('science', 'ایزوتوپ و پرتوزایی')}
            <div class="element-detail-accordion-content">
              <p class="element-detail-english" dir="ltr" lang="en">${escapeHTML(isotopeText)}</p>
              <div class="element-safety-scope"><strong>وضعیت رکورد:</strong>${radioStatus}</div>
              ${radioactivity.note ? `<p class="element-detail-note">${escapeHTML(radioactivity.note)}</p>` : ''}
            </div>
          </details>
          <details class="element-detail-card element-detail-card-wide element-detail-accordion element-safety-card">
            ${renderDetailAccordionSummary('health_and_safety', 'ایمنی، پسماند و محدودیت داده')}
            <div class="element-detail-accordion-content">
              ${renderHazards(element)}
              ${element.waste ? `<div class="element-waste-note"><strong>گروه پسماند:</strong> ${escapeHTML(element.waste.group || 'نیازمند بررسی')}<br><span>${escapeHTML(element.waste.note)}</span></div>` : ''}
              <div class="element-caution-note">${icon('report')} نبودن NFPA یا GHS عمومی برای عنصر، به معنی بی‌خطر بودن همهٔ ترکیبات آن نیست.</div>
            </div>
          </details>
        </div>

        <details class="element-sources element-detail-accordion" aria-labelledby="element-sources-title">
          <summary class="element-detail-accordion-summary">
            ${icon('menu_book')}
            <span id="element-sources-title">منابع و وضعیت بررسی</span>
            <span class="material-symbols-outlined element-accordion-chevron" aria-hidden="true">expand_more</span>
          </summary>
          <div class="element-sources-content">
            <ul>${sources}</ul>
          </div>
        </details>
      </section>
    `;
  }

  function openElement(number, options = {}) {
    const element = getElementByNumber(number);
    if (!element || !detailRoot) return false;
    activeElementNumber = element.atomicNumber;
    detailRoot.innerHTML = renderDetail(element);
    detailRoot.hidden = false;
    detailRoot.querySelector('[data-element-back]')?.addEventListener('click', () => {
      history.pushState(null, '', 'elements.html');
      closeElement({ scroll: true });
    });
    if (!options.fromHash) history.pushState(null, '', `elements.html#element-${element.atomicNumber}`);
    if (options.scroll !== false) {
      window.requestAnimationFrame(() => detailRoot.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
    return true;
  }

  function closeElement(options = {}) {
    activeElementNumber = null;
    if (detailRoot) {
      detailRoot.hidden = true;
      detailRoot.innerHTML = '';
    }
    if (options.scroll) document.getElementById('elements-root')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function setupSearchIntegration() {
    const mainSearch = document.getElementById('search-input');
    const statusBanner = document.getElementById('search-status-banner');
    if (!mainSearch || !statusBanner) return;
    mainSearch.addEventListener('input', () => {
      const query = normalise(toEnglishDigits(mainSearch.value));
      if (!query) return;
      const matches = catalog.filter(element => matchesElementQuery(element, mainSearch.value)).slice(0, 5);
      if (!matches.length) return;
      const first = matches[0];
      statusBanner.style.display = 'flex';
      statusBanner.innerHTML = `
        <div class="banner-message">${icon('science')}<span><strong>${toPersianDigits(matches.length)}</strong> عنصر مطابق «${escapeHTML(mainSearch.value)}» پیدا شد.</span></div>
        <a class="element-search-link" href="./elements.html">مشاهدهٔ ${escapeHTML(first.nameFa)} و نتایج عناصر ←</a>
      `;
      statusBanner.querySelector('.element-search-link')?.addEventListener('click', event => {
        event.preventDefault();
        const elementSearch = document.getElementById('element-search');
        if (elementSearch) {
          elementSearch.value = mainSearch.value;
          activeQuery = mainSearch.value;
          renderCatalog();
          elementSearch.focus();
        }
      });
      activeQuery = mainSearch.value;
      if (searchInput && document.activeElement !== searchInput) searchInput.value = mainSearch.value;
      renderCatalog();
    });
  }

  function init() {
    const root = document.getElementById('elements-root');
    if (!root || !catalog.length) return;
    elementsRoot = root;
    tableRoot = document.getElementById('element-periodic-table');
    detailRoot = document.getElementById('element-detail-root');
    countRoot = document.getElementById('element-result-count');
    emptyRoot = document.getElementById('element-empty-state');
    searchInput = document.getElementById('element-search');
    document.querySelectorAll('[data-element-family-filter]').forEach(button => {
      button.addEventListener('click', () => {
        const requestedFamily = button.dataset.elementFamilyFilter || '';
        activeFamily = requestedFamily === 'all' || requestedFamily === activeFamily ? '' : requestedFamily;
        renderCatalog();
      });
    });
    searchInput?.addEventListener('input', () => {
      activeQuery = searchInput.value;
      renderCatalog();
    });
    document.addEventListener('click', event => {
      const button = event.target.closest('[data-element-number]');
      if (button && root.contains(button)) openElement(button.dataset.elementNumber);
    });
    setupSearchIntegration();
    renderCatalog();

    const initialElement = window.location.hash.match(/^#element-(\d+)$/i);
    if (initialElement) {
      window.requestAnimationFrame(() => openElement(Number(initialElement[1]), { fromHash: true, scroll: false }));
    }

    window.openElementDetail = (number, options) => openElement(number, options);
    window.closeElementDetail = closeElement;
    window.findElementRecord = getElementByNumber;
    window.dispatchEvent(new CustomEvent('elementcatalog:ready', { detail: { count: catalog.length } }));
  }

  const start = () => {
    if (window.elementCatalogInitialised) return;
    window.elementCatalogInitialised = true;
    init();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
