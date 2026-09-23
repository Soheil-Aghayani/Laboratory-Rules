(() => {
  const catalog = window.LAB_EQUIPMENT_CATALOG || [];
  const assetPrefix = '../asset/equipment/';

  const toPersianDigits = value => String(value).replace(/[0-9]/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit]);

  function applyTheme() {
    let theme = 'dark';
    try {
      const savedTheme = localStorage.getItem('theme');
      theme = savedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    } catch (error) {
      theme = 'dark';
    }

    document.documentElement.setAttribute('data-theme', theme);
    return theme;
  }

  function sourceMarkup(family) {
    const sources = Array.isArray(family.sources) && family.sources.length
      ? family.sources
      : family.source
        ? [{ label: 'مرجع اصلی', url: family.source }]
        : [];

    if (!sources.length) {
      return '<span>این صفحه بر اساس اطلاعات عمومی کاربرد تجهیزات و دادهٔ کاتالوگ داخلی تنظیم شده است.</span>';
    }

    return `<span>مشخصات عمومی از منابع سازنده و تأمین‌کننده جمع‌بندی شده‌اند؛ استاندارد، ظرفیت و سازگاری نهایی به مدل انتخابی وابسته است.</span>
      <div class="equipment-detail-source-list">
        ${sources.map(source => `<a class="equipment-detail-source" href="${source.url}" target="_blank" rel="noopener noreferrer">${source.label}</a>`).join('')}
      </div>`;
  }

  function variantPickerMarkup(family, selectedVariant) {
    if (family.variantSections?.length) {
      const variantById = new Map(family.variants.map(variant => [variant.id, variant]));
      const sections = family.variantSections.map((section, sectionIndex) => {
        const titleId = `equipment-detail-variant-section-${sectionIndex}`;
        const variants = section.variantIds.map(id => variantById.get(id)).filter(Boolean);
        const options = variants.map(variant => `
          <button type="button" role="radio" class="equipment-detail-variant-button" data-variant-id="${variant.id}" aria-label="${variant.titleFa}" aria-checked="${variant.id === selectedVariant.id}" tabindex="${variant.id === selectedVariant.id ? '0' : '-1'}">
            ${variant.label}
          </button>
        `).join('');

        return `
          <section class="equipment-detail-variant-section" aria-labelledby="${titleId}">
            <div class="equipment-detail-variant-section-heading">
              <h3 class="equipment-detail-variant-section-title" id="${titleId}">${section.label}</h3>
              <p class="equipment-detail-variant-section-description">${section.description}</p>
            </div>
            <div class="equipment-detail-variant-list" role="group" aria-label="گزینه‌های جنس ${section.label}">
              ${options}
            </div>
          </section>
        `;
      }).join('');

      return `
        <div class="equipment-detail-variant-picker equipment-detail-variant-picker-sections" aria-labelledby="equipment-detail-variant-title">
          <h2 id="equipment-detail-variant-title">${family.variantPickerTitle || 'انتخاب جنس بدنه و ظرفیت'}</h2>
          <div class="equipment-detail-variant-sections" role="radiogroup" aria-label="جنس و ظرفیت بوته‌ها">
            ${sections}
          </div>
        </div>
      `;
    }

    if (!family.variantGroups?.length) {
      const variantButtons = family.variants.map(variant => `
        <button type="button" role="radio" class="equipment-detail-variant-button" data-variant-id="${variant.id}" aria-label="${variant.titleFa}" aria-checked="${variant.id === selectedVariant.id}" tabindex="${variant.id === selectedVariant.id ? '0' : '-1'}">
          ${variant.label}
        </button>
      `).join('');

      return `
        <div class="equipment-detail-variant-picker" aria-labelledby="equipment-detail-variant-title">
          <h2 id="equipment-detail-variant-title">انتخاب گزینه</h2>
          <div class="equipment-detail-variant-list" role="radiogroup" aria-label="گزینه‌های ${family.titleFa}">
            ${variantButtons}
          </div>
        </div>
      `;
    }

    const groups = family.variantGroups.map((group, groupIndex) => {
      const selectedOption = selectedVariant.metadata?.[group.id] || group.options[0].id;
      const titleId = `equipment-detail-variant-group-${groupIndex}`;
      const options = group.options.map(option => `
        <button type="button" role="radio" class="equipment-detail-variant-button" data-variant-group="${group.id}" data-option-id="${option.id}" aria-checked="${option.id === selectedOption}" tabindex="${option.id === selectedOption ? '0' : '-1'}">
          ${option.label}
        </button>
      `).join('');

      return `
        <div class="equipment-detail-variant-group">
          <h3 class="equipment-detail-variant-group-title" id="${titleId}">${group.label}</h3>
          <div class="equipment-detail-variant-list" role="radiogroup" aria-labelledby="${titleId}">
            ${options}
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="equipment-detail-variant-picker equipment-detail-variant-picker-grouped" aria-labelledby="equipment-detail-variant-title">
        <h2 id="equipment-detail-variant-title">${family.variantPickerTitle || 'مقایسه و انتخاب'}</h2>
        <div class="equipment-detail-variant-groups">
          ${groups}
        </div>
      </div>
    `;
  }

  function variantCountMarkup(family) {
    return family.variantSummary || `${toPersianDigits(family.variants.length)} گزینه در این خانواده`;
  }

  function comparisonVariant(family, selectedVariant, state) {
    const color = selectedVariant.metadata?.color;
    return family.variants.find(variant => variant.metadata?.color === color && variant.metadata?.state === state);
  }

  function detailMediaMarkup(family, selectedVariant) {
    if (!family.comparison) {
      return `
        <div class="equipment-detail-image-frame">
          <img class="equipment-detail-image" data-detail-image src="${assetPrefix}${selectedVariant.image}" alt="${selectedVariant.titleFa}" width="720" height="540">
        </div>
        <p class="equipment-detail-image-caption" data-detail-caption>${selectedVariant.imageCaption || selectedVariant.titleFa}</p>
      `;
    }

    const dryVariant = comparisonVariant(family, selectedVariant, family.comparison.dryState);
    const wetVariant = comparisonVariant(family, selectedVariant, family.comparison.wetState);
    if (!dryVariant || !wetVariant) return '';

    return `
      <div class="equipment-detail-image-frame equipment-detail-compare-frame" data-compare style="--compare-position:50%">
        <img class="equipment-detail-compare-image" data-compare-dry-image src="${assetPrefix}${dryVariant.image}" alt="${dryVariant.titleFa}" width="720" height="540">
        <img class="equipment-detail-compare-image equipment-detail-compare-image-wet" data-compare-wet-image src="${assetPrefix}${wetVariant.image}" alt="${wetVariant.titleFa}" width="720" height="540">
        <div class="equipment-detail-compare-divider" data-compare-divider aria-hidden="true">
          <span class="material-symbols-outlined">swap_horizontal_circle</span>
        </div>
        <span class="equipment-detail-compare-label equipment-detail-compare-label-wet">${family.comparison.wetLabel}</span>
        <span class="equipment-detail-compare-label equipment-detail-compare-label-dry">${family.comparison.dryLabel}</span>
        <input class="equipment-detail-compare-range" data-compare-range type="range" min="0" max="100" value="50" aria-label="جابه‌جایی خط مقایسهٔ حالت خشک و مرطوب">
      </div>
      <p class="equipment-detail-image-caption" data-detail-caption>خط را برای مقایسهٔ حالت خشک و مرطوب جابه‌جا کنید.</p>
    `;
  }

  function findCrucibleSection(family, variant) {
    return family.variantSections?.find(section => section.id === variant.metadata?.material) || family.variantSections?.[0];
  }

  function crucibleModelPickerMarkup(family, selectedVariant) {
    const section = findCrucibleSection(family, selectedVariant);
    if (!section) return '';

    const variantById = new Map(family.variants.map(variant => [variant.id, variant]));
    const options = section.variantIds.map(id => variantById.get(id)).filter(Boolean).map(variant => `
      <button type="button" role="radio" class="crucible-guide-model-button" data-variant-group="model" data-variant-id="${variant.id}" aria-label="${variant.titleFa}" aria-checked="${variant.id === selectedVariant.id}" tabindex="${variant.id === selectedVariant.id ? '0' : '-1'}">
        ${variant.label}
      </button>
    `).join('');

    return `
      <div class="crucible-guide-model-picker">
        <span class="crucible-guide-model-label">مدل‌های مرجع این جنس</span>
        <div class="crucible-guide-model-list" role="radiogroup" aria-label="ظرفیت‌های مرجع ${section.label}">
          ${options}
        </div>
      </div>
    `;
  }

  function crucibleMaterialCardsMarkup(family, selectedVariant) {
    const variantById = new Map(family.variants.map(variant => [variant.id, variant]));
    const icons = {
      porcelain: 'local_fire_department',
      quartz: 'diamond',
      alumina: 'thermostat',
      nickel: 'toll',
      'nickel-chromium': 'layers',
      zirconium: 'hub'
    };

    return family.variantSections.map(section => {
      const primaryVariant = variantById.get(section.primaryVariantId || section.variantIds[0]);
      if (!primaryVariant) return '';
      const isSelected = primaryVariant.metadata?.material === selectedVariant.metadata?.material;
      return `
        <button type="button" role="radio" class="crucible-material-card" data-material-option="${section.id}" data-variant-group="material" data-variant-id="${primaryVariant.id}" aria-label="انتخاب جنس ${section.label}" aria-checked="${isSelected}" tabindex="${isSelected ? '0' : '-1'}">
          <span class="crucible-material-icon material-symbols-outlined" aria-hidden="true">${icons[section.id] || 'science'}</span>
          <span class="crucible-material-copy">
            <strong>${section.label}</strong>
            <span>${section.description}</span>
            <small><span class="material-symbols-outlined" aria-hidden="true">check</span>${section.bestFor}</small>
          </span>
          <span class="crucible-material-arrow material-symbols-outlined" aria-hidden="true">arrow_back</span>
        </button>
      `;
    }).join('');
  }

  function renderCrucibleGuidePage(family, selectedVariant) {
    const selectedSection = findCrucibleSection(family, selectedVariant);
    const selectedTemperature = selectedVariant.metadata?.maxTemperature || 'در صفحهٔ مدل مشخص شود';
    return `
      <header class="equipment-detail-header crucible-guide-header">
        <div>
          <span class="equipment-detail-kicker">راهنمای آشنایی با تجهیزات حرارتی</span>
          <h1 class="equipment-detail-title">${family.titleFa}</h1>
          <p class="equipment-detail-title-en" dir="ltr">${family.titleEn}</p>
        </div>
        <span class="equipment-detail-category">${family.categoryLabel}</span>
      </header>

      <section class="crucible-guide-hero" aria-labelledby="crucible-guide-hero-title">
        <div class="crucible-guide-hero-copy">
          <span class="crucible-guide-kicker">قبل از ظرفیت، جنس را بشناس</span>
          <h2 id="crucible-guide-hero-title">جنس بدنه، انتخاب بوته را مشخص می‌کند</h2>
          <p>بوته‌ها ظاهر مشابهی دارند، اما برای دما و مواد یکسان ساخته نشده‌اند. این راهنما تفاوت جنس‌ها و انتخاب مناسب برای کاربرد آزمایشگاهی را توضیح می‌دهد.</p>
          <div class="crucible-guide-principles">
            <article>
              <span class="material-symbols-outlined" aria-hidden="true">thermostat</span>
              <div><strong>دما</strong><p>هر جنس محدودهٔ حرارتی و رفتار خودش را دارد.</p></div>
            </article>
            <article>
              <span class="material-symbols-outlined" aria-hidden="true">science</span>
              <div><strong>سازگاری</strong><p>جنس بدنه باید با ماده و روش آزمون هماهنگ باشد.</p></div>
            </article>
            <article>
              <span class="material-symbols-outlined" aria-hidden="true">straighten</span>
              <div><strong>ظرفیت</strong><p>سایز بعد از انتخاب جنس و روش کار بررسی می‌شود.</p></div>
            </article>
          </div>
        </div>
        <div class="crucible-guide-visual" aria-live="polite">
          <div class="crucible-guide-image-frame">
            <img class="crucible-guide-image" data-detail-image src="${assetPrefix}${selectedVariant.image}" alt="${selectedVariant.titleFa}" width="720" height="540">
          </div>
          <div class="crucible-guide-image-caption">
            <span>جنس انتخاب‌شده</span>
            <strong data-crucible-material>${selectedSection?.label || 'بوته'}</strong>
            <p data-detail-caption>${selectedVariant.imageCaption || selectedVariant.titleFa}</p>
          </div>
        </div>
      </section>

      <section class="crucible-guide-materials" aria-labelledby="crucible-guide-materials-title">
        <div class="crucible-guide-section-heading">
          <div>
            <span class="crucible-guide-kicker">انتخاب آموزشی</span>
            <h2 id="crucible-guide-materials-title">اول جنس بدنه را انتخاب کن</h2>
          </div>
          <p>روی هر جنس بزن تا پروفایل کاربرد، محدودیت و مدل‌های مرجع آن را ببینی.</p>
        </div>
        <div class="crucible-material-grid" role="radiogroup" aria-label="جنس بدنهٔ بوته">
          ${crucibleMaterialCardsMarkup(family, selectedVariant)}
        </div>
      </section>

      <section class="crucible-guide-profile" aria-labelledby="crucible-guide-profile-title" aria-live="polite">
        <div class="crucible-guide-profile-heading">
          <div>
            <span class="crucible-guide-kicker">پروفایل جنس انتخاب‌شده</span>
            <h2 id="crucible-guide-profile-title" data-crucible-profile-title>${selectedSection?.label || 'بوته'}</h2>
            <p class="crucible-guide-profile-model" data-detail-title>${selectedVariant.titleFa}</p>
            <p data-detail-copy>${selectedVariant.detail}</p>
          </div>
          <span class="crucible-guide-profile-mark material-symbols-outlined" aria-hidden="true">science</span>
        </div>
        <div class="crucible-guide-facts">
          <div><span>بهترین کاربرد</span><strong data-crucible-best-for>${selectedSection?.bestFor || ''}</strong></div>
          <div><span>احتیاط مهم</span><strong data-crucible-caution>${selectedSection?.caution || ''}</strong></div>
          <div><span>دمای مدل مرجع</span><strong data-crucible-temperature>${selectedTemperature}</strong></div>
        </div>
        <details class="crucible-guide-model-details">
          <summary><span class="material-symbols-outlined" aria-hidden="true">tune</span><span>اندازه‌ها و مشخصات مدل مرجع</span><span class="material-symbols-outlined" aria-hidden="true">expand_more</span></summary>
          <div data-crucible-models>${crucibleModelPickerMarkup(family, selectedVariant)}</div>
        </details>
      </section>

      <section class="crucible-guide-safety" aria-labelledby="crucible-guide-safety-title">
        <details>
          <summary id="crucible-guide-safety-title"><span class="material-symbols-outlined" aria-hidden="true">shield</span><span>نکات ایمنی قبل از گرمادهی</span><span class="material-symbols-outlined" aria-hidden="true">expand_more</span></summary>
          <div class="crucible-guide-safety-content">
            <p>${family.safety}</p>
            <ul>${family.details.map(detail => `<li>${detail}</li>`).join('')}</ul>
          </div>
        </details>
      </section>

      <section class="equipment-detail-reference crucible-guide-reference" aria-label="مرجع و یادداشت">
        <details class="equipment-detail-accordion equipment-detail-source-accordion">
          <summary><span class="material-symbols-outlined" aria-hidden="true">link</span><span>منابع و ادامهٔ مطالعه</span><span class="material-symbols-outlined equipment-detail-accordion-chevron" aria-hidden="true">expand_more</span></summary>
          <div class="equipment-detail-reference-copy">
            ${sourceMarkup(family)}
          </div>
        </details>
      </section>
    `;
  }

  function renderPage(family, selectedVariant) {
    if (family.presentation === 'crucible-guide') return renderCrucibleGuidePage(family, selectedVariant);

    return `
      <header class="equipment-detail-header">
        <div>
          <span class="equipment-detail-kicker">کاتالوگ تجهیزات آزمایشگاه</span>
          <h1 class="equipment-detail-title">${family.titleFa}</h1>
          <p class="equipment-detail-title-en" dir="ltr">${family.titleEn}</p>
        </div>
        <span class="equipment-detail-category">${family.categoryLabel}</span>
      </header>

      <section class="equipment-detail-hero" aria-labelledby="equipment-detail-intro-title">
        <div class="equipment-detail-media">
          ${detailMediaMarkup(family, selectedVariant)}
        </div>

        <div class="equipment-detail-intro">
          <p class="equipment-detail-summary" id="equipment-detail-intro-title">${family.introduction}</p>

            <div class="equipment-detail-meta" aria-label="خلاصهٔ اطلاعات">
            <div class="equipment-detail-meta-item">
              <span>کاربرد اصلی</span>
              <strong>${family.primaryUse}</strong>
            </div>
            <div class="equipment-detail-meta-item">
              <span>تعداد گزینه‌ها</span>
              <strong>${variantCountMarkup(family)}</strong>
              </div>
            </div>

          <div class="equipment-detail-selected" aria-live="polite">
            <h2>گزینهٔ انتخاب‌شده</h2>
            <strong class="equipment-detail-selected-title" data-detail-title>${selectedVariant.titleFa}</strong>
            <p class="equipment-detail-selected-copy" data-detail-copy>${selectedVariant.detail}</p>
          </div>
        </div>
      </section>

      <section class="equipment-detail-info-grid" aria-label="راهنمای استفاده و ایمنی">
        <article class="equipment-detail-info-card">
          <h2>راهنمای استفاده</h2>
          <ul>${family.details.map(detail => `<li>${detail}</li>`).join('')}</ul>
        </article>
        <article class="equipment-detail-info-card">
          <h2>نکات ایمنی و نگهداری</h2>
          <p>${family.safety}</p>
        </article>
      </section>

      ${variantPickerMarkup(family, selectedVariant)}

      ${family.specifications?.length ? `
        <details class="equipment-detail-accordion equipment-detail-specification-accordion">
          <summary><span class="material-symbols-outlined" aria-hidden="true">straighten</span><span>مشخصات مرجع و تفاوت مدل‌ها</span><span class="material-symbols-outlined equipment-detail-accordion-chevron" aria-hidden="true">expand_more</span></summary>
          <div class="equipment-detail-meta equipment-detail-specifications" aria-label="مشخصات مرجع">
            ${family.specifications.map(specification => `
              <div class="equipment-detail-meta-item">
                <span>${specification.label}</span>
                <strong>${specification.value}</strong>
              </div>
            `).join('')}
          </div>
        </details>
      ` : ''}

      <section class="equipment-detail-reference" aria-label="مرجع و یادداشت">
        <details class="equipment-detail-accordion equipment-detail-source-accordion">
          <summary><span class="material-symbols-outlined" aria-hidden="true">link</span><span>منابع و یادداشت اطلاعاتی</span><span class="material-symbols-outlined equipment-detail-accordion-chevron" aria-hidden="true">expand_more</span></summary>
          <div class="equipment-detail-reference-copy">
            ${sourceMarkup(family)}
          </div>
        </details>
      </section>
    `;
  }

  function updateCrucibleGuide(root, family, variant) {
    if (family.presentation !== 'crucible-guide') return;

    const section = findCrucibleSection(family, variant);
    if (!section) return;

    const profileTitle = root.querySelector('[data-crucible-profile-title]');
    const material = root.querySelector('[data-crucible-material]');
    const bestFor = root.querySelector('[data-crucible-best-for]');
    const caution = root.querySelector('[data-crucible-caution]');
    const temperature = root.querySelector('[data-crucible-temperature]');
    const models = root.querySelector('[data-crucible-models]');

    if (profileTitle) profileTitle.textContent = section.label;
    if (material) material.textContent = section.label;
    if (bestFor) bestFor.textContent = section.bestFor;
    if (caution) caution.textContent = section.caution;
    if (temperature) temperature.textContent = variant.metadata?.maxTemperature || 'در دیتاشیت مدل بررسی شود';
    if (models) models.innerHTML = crucibleModelPickerMarkup(family, variant);
  }

  function updateSelectedVariant(root, family, variant) {
    const image = root.querySelector('[data-detail-image]');
    const caption = root.querySelector('[data-detail-caption]');
    const title = root.querySelector('[data-detail-title]');
    const copy = root.querySelector('[data-detail-copy]');
    if (!caption || !title || !copy) return;

    if (image) {
      image.src = `${assetPrefix}${variant.image}`;
      image.alt = variant.titleFa;
    }
    caption.textContent = variant.imageCaption || variant.titleFa;
    title.textContent = variant.titleFa;
    copy.textContent = variant.detail;
    updateCrucibleGuide(root, family, variant);
    updateComparison(root, family, variant);

    root.querySelectorAll('[data-variant-id]').forEach(button => {
      const isMaterialButton = button.dataset.materialOption;
      const isSelected = isMaterialButton
        ? isMaterialButton === variant.metadata?.material
        : button.dataset.variantId === variant.id;
      button.setAttribute('aria-checked', String(isSelected));
      button.tabIndex = isSelected ? 0 : -1;
    });
    root.querySelectorAll('[data-variant-group][data-option-id]').forEach(button => {
      const isSelected = variant.metadata?.[button.dataset.variantGroup] === button.dataset.optionId;
      button.setAttribute('aria-checked', String(isSelected));
      button.tabIndex = isSelected ? 0 : -1;
    });

    try {
      window.history.replaceState(null, '', `${window.location.pathname}#${variant.id}`);
    } catch (error) {
      // Hash persistence is optional when the page is opened from a local file.
    }
  }

  function updateComparison(root, family, selectedVariant) {
    if (!family.comparison) return;

    const dryVariant = comparisonVariant(family, selectedVariant, family.comparison.dryState);
    const wetVariant = comparisonVariant(family, selectedVariant, family.comparison.wetState);
    const dryImage = root.querySelector('[data-compare-dry-image]');
    const wetImage = root.querySelector('[data-compare-wet-image]');
    const caption = root.querySelector('[data-detail-caption]');
    if (!dryVariant || !wetVariant || !dryImage || !wetImage) return;

    dryImage.src = `${assetPrefix}${dryVariant.image}`;
    dryImage.alt = dryVariant.titleFa;
    wetImage.src = `${assetPrefix}${wetVariant.image}`;
    wetImage.alt = wetVariant.titleFa;
    if (caption) caption.textContent = 'خط را برای مقایسهٔ حالت خشک و مرطوب جابه‌جا کنید.';
  }

  function updateComparisonPosition(root, value) {
    const compare = root.querySelector('[data-compare]');
    const range = root.querySelector('[data-compare-range]');
    if (!compare || !range) return;

    const position = Math.min(100, Math.max(0, Number(value)));
    compare.style.setProperty('--compare-position', `${position}%`);
    range.setAttribute('aria-valuetext', `${toPersianDigits(Math.round(position))}٪`);
  }

  function initDetailPage() {
    const page = document.querySelector('[data-equipment-slug]');
    const root = document.getElementById('equipment-detail-root');
    if (!page || !root) return;

    const family = catalog.find(item => item.slug === page.dataset.equipmentSlug);
    if (!family) {
      root.innerHTML = '<section class="equipment-detail-error"><h1>این خانواده پیدا نشد</h1><p>به کاتالوگ تجهیزات برگردید و مورد دیگری را انتخاب کنید.</p></section>';
      return;
    }

    const hashId = window.location.hash.slice(1).replace(/^yellow-/, 'orange-');
    const selectedVariant = family.variants.find(variant => variant.id === hashId) || family.variants[0];
    document.title = `${family.titleFa} | آزمایشگاه پسماند`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', family.introduction);

    root.innerHTML = renderPage(family, selectedVariant);
    let activeVariant = selectedVariant;
    const selectVariant = variant => {
      if (!variant) return;
      activeVariant = variant;
      updateSelectedVariant(root, family, variant);
    };

    if (family.presentation === 'crucible-guide') {
      root.addEventListener('click', event => {
        const button = event.target.closest('[data-variant-id]');
        if (!button || !root.contains(button)) return;
        selectVariant(family.variants.find(item => item.id === button.dataset.variantId));
      });

      root.addEventListener('keydown', event => {
        const button = event.target.closest('[data-variant-id]');
        const isForward = event.key === 'ArrowLeft' || event.key === 'ArrowDown';
        const isBackward = event.key === 'ArrowRight' || event.key === 'ArrowUp';
        if (!button || (!isForward && !isBackward)) return;

        event.preventDefault();
        const groupButtons = Array.from(root.querySelectorAll(`[data-variant-group="${button.dataset.variantGroup}"][data-variant-id]`));
        const index = groupButtons.indexOf(button);
        if (index < 0 || !groupButtons.length) return;

        const offset = isForward ? 1 : -1;
        const nextButton = groupButtons[(index + offset + groupButtons.length) % groupButtons.length];
        const nextVariant = family.variants.find(item => item.id === nextButton.dataset.variantId);
        selectVariant(nextVariant);
        const focusTarget = Array.from(root.querySelectorAll('[data-variant-id]')).find(item => item.dataset.variantGroup === button.dataset.variantGroup && item.dataset.variantId === nextVariant.id);
        focusTarget?.focus();
      });
    } else {
      const variantButtons = Array.from(root.querySelectorAll('[data-variant-id]'));
      variantButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
          const variant = family.variants.find(item => item.id === button.dataset.variantId);
          selectVariant(variant);
        });
        button.addEventListener('keydown', event => {
          const isForward = event.key === 'ArrowLeft' || event.key === 'ArrowDown';
          const isBackward = event.key === 'ArrowRight' || event.key === 'ArrowUp';
          if (!isForward && !isBackward) return;

          event.preventDefault();
          const offset = isForward ? 1 : -1;
          const nextIndex = (index + offset + variantButtons.length) % variantButtons.length;
          const nextButton = variantButtons[nextIndex];
          const nextVariant = family.variants.find(item => item.id === nextButton.dataset.variantId);
          selectVariant(nextVariant);
          nextButton.focus();
        });
      });

      const groupedVariantButtons = Array.from(root.querySelectorAll('[data-variant-group][data-option-id]'));
      groupedVariantButtons.forEach(button => {
        const groupButtons = groupedVariantButtons.filter(item => item.dataset.variantGroup === button.dataset.variantGroup);
        const selectGroupedVariant = () => {
          const selection = {};
          family.variantGroups.forEach(group => {
            selection[group.id] = activeVariant.metadata?.[group.id] || group.options[0].id;
          });
          selection[button.dataset.variantGroup] = button.dataset.optionId;
          const variant = family.variants.find(item => family.variantGroups.every(group => item.metadata?.[group.id] === selection[group.id]));
          selectVariant(variant);
        };

        button.addEventListener('click', selectGroupedVariant);
        button.addEventListener('keydown', event => {
          const isForward = event.key === 'ArrowLeft' || event.key === 'ArrowDown';
          const isBackward = event.key === 'ArrowRight' || event.key === 'ArrowUp';
          if (!isForward && !isBackward) return;

          event.preventDefault();
          const index = groupButtons.indexOf(button);
          const offset = isForward ? 1 : -1;
          const nextButton = groupButtons[(index + offset + groupButtons.length) % groupButtons.length];
          nextButton.click();
          nextButton.focus();
        });
      });
    }

    const compareRange = root.querySelector('[data-compare-range]');
    compareRange?.addEventListener('input', () => updateComparisonPosition(root, compareRange.value));
    updateComparisonPosition(root, compareRange?.value || 50);

    const themeButton = document.getElementById('equipment-detail-theme');
    const themeIcon = themeButton?.querySelector('.material-symbols-outlined');
    const updateThemeIcon = theme => {
      if (themeIcon) themeIcon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
      if (themeButton) themeButton.setAttribute('aria-label', theme === 'dark' ? 'فعال‌کردن پوستهٔ روشن' : 'فعال‌کردن پوستهٔ تیره');
    };
    let theme = applyTheme();
    updateThemeIcon(theme);
    themeButton?.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      try {
        localStorage.setItem('theme', theme);
      } catch (error) {
        // Theme persistence is optional.
      }
      updateThemeIcon(theme);
    });
  }

  document.addEventListener('DOMContentLoaded', initDetailPage);
})();
