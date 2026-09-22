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

  function renderPage(family, selectedVariant) {
    const variantCount = family.variants.length;
    const variantButtons = family.variants.map(variant => `
      <button type="button" role="radio" class="equipment-detail-variant-button" data-variant-id="${variant.id}" aria-label="${variant.titleFa}" aria-checked="${variant.id === selectedVariant.id}" tabindex="${variant.id === selectedVariant.id ? '0' : '-1'}">
        ${variant.label}
      </button>
    `).join('');

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
          <div class="equipment-detail-image-frame">
            <img class="equipment-detail-image" data-detail-image src="${assetPrefix}${selectedVariant.image}" alt="${selectedVariant.titleFa}" width="720" height="540">
          </div>
          <p class="equipment-detail-image-caption" data-detail-caption>${selectedVariant.titleFa}</p>
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
              <strong>${toPersianDigits(variantCount)} گزینه در این خانواده</strong>
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

          <div class="equipment-detail-variant-picker" aria-labelledby="equipment-detail-variant-title">
            <h2 id="equipment-detail-variant-title">انتخاب گزینه</h2>
            <div class="equipment-detail-variant-list" role="radiogroup" aria-label="گزینه‌های ${family.titleFa}">
              ${variantButtons}
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
    if (!image || !caption || !title || !copy) return;

    image.src = `${assetPrefix}${variant.image}`;
    image.alt = variant.titleFa;
    caption.textContent = variant.titleFa;
    title.textContent = variant.titleFa;
    copy.textContent = variant.detail;

    root.querySelectorAll('[data-variant-id]').forEach(button => {
      const isSelected = button.dataset.variantId === variant.id;
      button.setAttribute('aria-checked', String(isSelected));
      button.tabIndex = isSelected ? 0 : -1;
    });

    try {
      window.history.replaceState(null, '', `${window.location.pathname}#${variant.id}`);
    } catch (error) {
      // Hash persistence is optional when the page is opened from a local file.
    }
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

    const hashId = window.location.hash.slice(1);
    const selectedVariant = family.variants.find(variant => variant.id === hashId) || family.variants[0];
    document.title = `${family.titleFa} | آزمایشگاه پسماند`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', family.introduction);

    root.innerHTML = renderPage(family, selectedVariant);
    const variantButtons = Array.from(root.querySelectorAll('[data-variant-id]'));
    variantButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const variant = family.variants.find(item => item.id === button.dataset.variantId);
        if (variant) updateSelectedVariant(root, family, variant);
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
        if (nextVariant) {
          updateSelectedVariant(root, family, nextVariant);
          nextButton.focus();
        }
      });
    });

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
