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

  function renderPage(family, selectedVariant) {
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

          ${family.specifications?.length ? `
            <div class="equipment-detail-meta equipment-detail-specifications" aria-label="مشخصات مرجع">
              ${family.specifications.map(specification => `
                <div class="equipment-detail-meta-item">
                  <span>${specification.label}</span>
                  <strong>${specification.value}</strong>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${variantPickerMarkup(family, selectedVariant)}

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

      <section class="equipment-detail-reference" aria-label="مرجع و یادداشت">
        <div class="equipment-detail-reference-copy">
          <h2>یادداشت اطلاعاتی</h2>
          ${sourceMarkup(family)}
        </div>
      </section>
    `;
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
    updateComparison(root, family, variant);

    root.querySelectorAll('[data-variant-id]').forEach(button => {
      const isSelected = button.dataset.variantId === variant.id;
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
