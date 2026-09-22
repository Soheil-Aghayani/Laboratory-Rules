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

  let activeFilter = 'all';
  let activeGroup = '';
  let activePeriod = '';
  let activeFamily = '';
  let activeQuery = '';
  let activeElementNumber = null;
  let detailRoot;
  let tableRoot;
  let listRoot;
  let countRoot;
  let emptyRoot;
  let searchInput;
  let groupFilter;
  let periodFilter;
  let familyFilter;
  let relatedTrack;
  let elementsRoot;
  let viewButtons = [];
  let hasManualView = false;

  function isFilterMatch(element) {
    const classification = element.classification || {};
    if (activeFilter === 'radioactive' && !classification.radioactive) return false;
    if (activeFilter === 'gas' && classification.standardState !== 'Gas') return false;
    if (activeFilter === 'metal' && (!/metal/i.test(classification.familyEn || '') || /metalloid/i.test(classification.familyEn || ''))) return false;
    if (activeFilter === 'nonmetal' && !/nonmetal/i.test(classification.familyEn || '')) return false;
    if (activeFilter === 'metalloid' && !/metalloid/i.test(classification.familyEn || '')) return false;
    if (activeGroup && String(classification.group || '') !== activeGroup) return false;
    if (activePeriod && String(classification.period || '') !== activePeriod) return false;
    if (activeFamily && normalise(classification.familyEn || classification.familyFa) !== activeFamily) return false;
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

  function renderElementCard(element, compact = false) {
    const classification = element.classification || {};
    const className = compact ? 'element-card element-card-compact' : 'element-card';
    const label = `${element.nameFa} (${element.nameEn})، عدد اتمی ${element.atomicNumber}`;
    const familyClass = getFamilyClass(classification);
    const radioactiveBadge = classification.radioactive === true
      ? `<span class="element-card-badge">${icon('warning')}پرتوزا</span>`
      : '';
    return `
      <button type="button" class="${className}" data-element-number="${element.atomicNumber}" data-element-family="${familyClass}" aria-label="مشاهدهٔ اطلاعات ${escapeHTML(label)}" style="${compact ? '' : cardPosition(element)}">
        <span class="element-card-number">${toPersianDigits(element.atomicNumber)}</span>
        <strong class="element-card-symbol" dir="ltr">${escapeHTML(element.symbol)}</strong>
        <span class="element-card-name">${escapeHTML(element.nameFa)}</span>
        <span class="element-card-family">${escapeHTML(classification.familyFa || 'عنصر')}</span>
        ${radioactiveBadge}
      </button>
    `;
  }

  function renderCatalog() {
    const filtered = getFilteredElements();
    if (tableRoot) tableRoot.innerHTML = filtered.map(element => renderElementCard(element)).join('');
    if (listRoot) listRoot.innerHTML = filtered.map(element => renderElementCard(element, true)).join('');
    if (countRoot) {
      const hasConstraints = Boolean(activeQuery || activeGroup || activePeriod || activeFamily || activeFilter !== 'all');
      countRoot.textContent = hasConstraints ? `نتیجهٔ فیلتر: ${toPersianDigits(filtered.length)} مورد` : '';
    }
    if (emptyRoot) emptyRoot.hidden = filtered.length !== 0;
    document.querySelectorAll('[data-element-filter]').forEach(button => {
      const isActive = button.dataset.elementFilter === activeFilter;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  function renderProperty(label, value, unit = '') {
    return `<div class="element-property"><dt>${escapeHTML(label)}</dt><dd>${value === null || value === undefined || value === '' ? '<span class="element-missing">در این رکورد در دسترس نیست</span>' : formatValue(value, unit)}</dd></div>`;
  }

  function setupFilterOptions() {
    const addOptions = (select, options) => {
      if (!select) return;
      select.innerHTML = '<option value="">همه</option>';
      options.forEach(option => {
        const optionNode = document.createElement('option');
        optionNode.value = option.value;
        optionNode.textContent = option.label;
        select.appendChild(optionNode);
      });
    };
    const groups = [...new Set(catalog.map(element => element.classification?.group).filter(Boolean))]
      .sort((a, b) => a - b)
      .map(value => ({ value: String(value), label: `گروه ${toPersianDigits(value)}` }));
    const periods = [...new Set(catalog.map(element => element.classification?.period).filter(Boolean))]
      .sort((a, b) => a - b)
      .map(value => ({ value: String(value), label: `دورهٔ ${toPersianDigits(value)}` }));
    const families = [...new Map(catalog.map(element => {
      const classification = element.classification || {};
      const label = classification.familyFa || classification.familyEn;
      return [normalise(classification.familyEn || label), label];
    }).filter(([value, label]) => value && label))]
      .sort(([, a], [, b]) => String(a).localeCompare(String(b), 'fa'))
      .map(([value, label]) => ({ value, label }));
    addOptions(groupFilter, groups);
    addOptions(periodFilter, periods);
    addOptions(familyFilter, families);
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

  function getRelatedElements(element) {
    const classification = element.classification || {};
    return catalog
      .filter(candidate => candidate.atomicNumber !== element.atomicNumber)
      .map(candidate => {
        const candidateClassification = candidate.classification || {};
        const sameGroup = classification.group && classification.group === candidateClassification.group;
        const sameFamily = classification.familyEn && classification.familyEn === candidateClassification.familyEn;
        const samePeriod = classification.period === candidateClassification.period;
        const score = (sameGroup ? 4 : 0) + (sameFamily ? 2 : 0) + (samePeriod ? 1 : 0);
        return { candidate, score };
      })
      .sort((a, b) => b.score - a.score || a.candidate.atomicNumber - b.candidate.atomicNumber)
      .slice(0, 8)
      .map(item => item.candidate);
  }

  function renderRelated(element) {
    const related = getRelatedElements(element);
    return `
      <section class="element-related" aria-labelledby="element-related-title">
        <div class="element-section-heading">
          <div><span class="element-section-kicker">برای مقایسه</span><h3 id="element-related-title">عناصر مرتبط</h3></div>
          <div class="element-related-controls">
            <button type="button" class="element-related-button" data-element-related="prev" aria-label="عناصر مرتبط قبلی">${icon('arrow-left', 'element-icon-reversed')}</button>
            <button type="button" class="element-related-button" data-element-related="next" aria-label="عناصر مرتبط بعدی">${icon('arrow-left')}</button>
          </div>
        </div>
        <div class="element-related-track" data-element-related-track tabindex="0">
          ${related.map(item => renderElementCard(item, true)).join('')}
        </div>
      </section>
    `;
  }

  function renderDetail(element) {
    const classification = element.classification || {};
    const properties = element.properties || {};
    const radioactivity = element.radioactivity || {};
    const isotopeText = element.isotopes || 'جزئیات ایزوتوپ در منبع محلی این build ثبت نشده است؛ برای نوکلید یا ایزوتوپ مشخص، مرجع همان ماده را بررسی کنید.';
    const sources = (element.sources || []).map(source => `<li><a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.label)}</a><span>${escapeHTML(source.scope || '')}</span></li>`).join('');
    const radioBadge = classification.radioactive ? `<span class="element-badge element-badge-danger">${icon('warning')}پرتوزا</span>` : '';
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
              ${radioBadge}
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
            ${element.uses ? `<details><summary>کاربردهای ثبت‌شده در مرجع</summary><p>${escapeHTML(element.uses)}</p></details>` : ''}
            ${element.history ? `<details><summary>پیشینه و کشف</summary><p>${escapeHTML(element.history)}</p></details>` : ''}
          </article>
          <article class="element-detail-card">
            <div class="element-card-heading">${icon('tune')} دسته‌بندی</div>
            <dl class="element-property-list">
              ${renderProperty('خانواده', classification.familyFa)}
              ${renderProperty('دوره', classification.period)}
              ${renderProperty('گروه', classification.group || classification.familyFa)}
              ${renderProperty('حالت استاندارد', classification.standardState)}
            </dl>
          </article>
          <article class="element-detail-card">
            <div class="element-card-heading">${icon('science')} خواص کلیدی</div>
            <dl class="element-property-list">
              ${renderProperty('پیکربندی الکترونی', properties.electronConfiguration)}
              ${renderProperty('الکترونگاتیوی', properties.electronegativity)}
              ${renderProperty('نقطهٔ ذوب', properties.meltingPoint, properties.temperatureUnit)}
              ${renderProperty('نقطهٔ جوش', properties.boilingPoint, properties.temperatureUnit)}
              ${renderProperty('چگالی', properties.density, properties.densityUnit)}
              ${renderProperty('عددهای اکسایش', properties.oxidationStates)}
            </dl>
          </article>
          <article class="element-detail-card">
            <div class="element-card-heading">${icon('science')} ایزوتوپ و پرتوزایی</div>
            <p>${escapeHTML(isotopeText)}</p>
            <div class="element-safety-scope"><strong>وضعیت رکورد:</strong><span>${radioactivity.status === 'radioactive' ? 'پرتوزا' : 'در این رکورد پرتوزا علامت‌گذاری نشده است'}</span></div>
            ${radioactivity.note ? `<p class="element-detail-note">${escapeHTML(radioactivity.note)}</p>` : ''}
          </article>
          <article class="element-detail-card element-detail-card-wide element-safety-card">
            <div class="element-card-heading">${icon('health_and_safety')} ایمنی، پسماند و محدودیت داده</div>
            ${renderHazards(element)}
            ${element.waste ? `<div class="element-waste-note"><strong>گروه پسماند:</strong> ${escapeHTML(element.waste.group || 'نیازمند بررسی')}<br><span>${escapeHTML(element.waste.note)}</span></div>` : ''}
            <div class="element-caution-note">${icon('report')} نبودن NFPA یا GHS عمومی برای عنصر، به معنی بی‌خطر بودن همهٔ ترکیبات آن نیست.</div>
          </article>
        </div>

        ${renderRelated(element)}
        <section class="element-sources" aria-labelledby="element-sources-title">
          <div class="element-section-heading"><div><span class="element-section-kicker">provenance</span><h3 id="element-sources-title">منابع و وضعیت بررسی</h3></div></div>
          <ul>${sources}</ul>
        </section>
      </section>
    `;
  }

  function bindRelatedControls() {
    relatedTrack = detailRoot?.querySelector('[data-element-related-track]');
    if (!relatedTrack) return;
    detailRoot.querySelectorAll('[data-element-related]').forEach(button => {
      button.addEventListener('click', () => {
        const distance = button.dataset.elementRelated === 'next' ? -280 : 280;
        relatedTrack.scrollBy({ left: distance, behavior: 'smooth' });
      });
    });
    relatedTrack.addEventListener('keydown', event => {
      const action = event.key === 'ArrowLeft' ? 'next' : event.key === 'ArrowRight' ? 'prev' : null;
      if (action) {
        event.preventDefault();
        detailRoot.querySelector(`[data-element-related="${action}"]`)?.click();
        return;
      }
      if (event.key === 'Home' || event.key === 'End') {
        const cards = relatedTrack.querySelectorAll('[data-element-number]');
        const target = event.key === 'Home' ? cards[0] : cards[cards.length - 1];
        if (target) {
          event.preventDefault();
          target.focus();
        }
      }
    });
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
    bindRelatedControls();
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
    listRoot = document.getElementById('element-list');
    detailRoot = document.getElementById('element-detail-root');
    countRoot = document.getElementById('element-result-count');
    emptyRoot = document.getElementById('element-empty-state');
    searchInput = document.getElementById('element-search');
    groupFilter = document.getElementById('element-group-filter');
    periodFilter = document.getElementById('element-period-filter');
    familyFilter = document.getElementById('element-family-filter');
    viewButtons = Array.from(root.querySelectorAll('[data-element-view-toggle]'));

    const setElementView = view => {
      const nextView = view === 'table' ? 'table' : 'list';
      root.dataset.elementView = nextView;
      viewButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.elementViewToggle === nextView)));
    };

    const defaultView = window.matchMedia?.('(max-width: 992px)').matches ? 'list' : 'table';
    setElementView(defaultView);
    viewButtons.forEach(button => {
      button.addEventListener('click', () => {
        hasManualView = true;
        setElementView(button.dataset.elementViewToggle);
      });
    });
    const viewMedia = window.matchMedia?.('(max-width: 992px)');
    viewMedia?.addEventListener?.('change', event => {
      if (!hasManualView) setElementView(event.matches ? 'list' : 'table');
    });

    document.querySelectorAll('[data-element-filter]').forEach(button => {
      button.addEventListener('click', () => {
        activeFilter = button.dataset.elementFilter || 'all';
        renderCatalog();
      });
    });
    searchInput?.addEventListener('input', () => {
      activeQuery = searchInput.value;
      renderCatalog();
    });
    groupFilter?.addEventListener('change', () => {
      activeGroup = groupFilter.value;
      renderCatalog();
    });
    periodFilter?.addEventListener('change', () => {
      activePeriod = periodFilter.value;
      renderCatalog();
    });
    familyFilter?.addEventListener('change', () => {
      activeFamily = familyFilter.value;
      renderCatalog();
    });
    document.addEventListener('click', event => {
      const button = event.target.closest('[data-element-number]');
      if (button && root.contains(button)) openElement(button.dataset.elementNumber);
    });
    setupSearchIntegration();
    setupFilterOptions();
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

  document.addEventListener('DOMContentLoaded', init);
})();
