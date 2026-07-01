document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeBtn = document.getElementById('theme-btn');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    themeBtn.innerHTML = theme === 'dark'
      ? `<span class="material-symbols-outlined">light_mode</span>`
      : `<span class="material-symbols-outlined">dark_mode</span>`;
  }

  // Active Lab Status Widget
  function updateLabStatus() {
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    const now = new Date();
    const currentHour = now.getHours();
    
    // Lab hours: 7:00 to 16:00
    if (currentHour >= 7 && currentHour < 16) {
      statusDot.classList.add('active');
      statusText.textContent = 'آزمایشگاه باز است (ساعت کاری: ۷ الی ۱۶)';
    } else {
      statusDot.classList.remove('active');
      statusText.textContent = 'آزمایشگاه در حال حاضر بسته است (ساعت کاری: ۷ الی ۱۶)';
    }
  }
  updateLabStatus();
  setInterval(updateLabStatus, 60000); // Update every minute

  // Main Tabs switching
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  function switchTab(tabId) {
    tabBtns.forEach(b => {
      if (b.getAttribute('data-tab') === tabId) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
    tabContents.forEach(c => {
      if (c.id === tabId) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
      if (searchInput) searchInput.dispatchEvent(new Event('input'));
    });
  });

  // Equipment Sub-navigation
  const eqBtns = document.querySelectorAll('.eq-nav-btn');
  const eqContents = document.querySelectorAll('.eq-content');

  function switchEquipment(eqId) {
    eqBtns.forEach(b => {
      if (b.getAttribute('data-eq') === eqId) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
    eqContents.forEach(c => {
      if (c.id === eqId) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });
  }

  eqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const eqId = btn.getAttribute('data-eq');
      switchEquipment(eqId);
      if (searchInput) searchInput.dispatchEvent(new Event('input'));
    });
  });

  // Expose switching functions globally for other modules (like the chatbot)
  window.switchTab = switchTab;
  window.switchEquipment = switchEquipment;

  // Emergency Modal Controls
  const emergencyFab = document.getElementById('emergency-fab');
  const emergencyModal = document.getElementById('emergency-modal');
  const closeEmergency = document.getElementById('close-emergency');

  if (emergencyFab && emergencyModal && closeEmergency) {
    emergencyFab.addEventListener('click', () => {
      emergencyModal.classList.add('active');
    });

    closeEmergency.addEventListener('click', () => {
      emergencyModal.classList.remove('active');
    });

    emergencyModal.addEventListener('click', (e) => {
      if (e.target === emergencyModal) {
        emergencyModal.classList.remove('active');
      }
    });
  }

  // URL Hash Routing for QR Codes
  function handleHashRoute() {
    const hash = window.location.hash.toLowerCase().substring(1);
    if (!hash) return;
    
    if (hash === 'centrifuge' || hash === 'eq-centrifuge') {
      switchTab('tab-equipment');
      switchEquipment('eq-centrifuge');
      setTimeout(() => {
        const el = document.getElementById('eq-centrifuge');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else if (hash === 'oven' || hash === 'eq-oven') {
      switchTab('tab-equipment');
      switchEquipment('eq-oven');
      setTimeout(() => {
        const el = document.getElementById('eq-oven');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else if (hash === 'balance' || hash === 'eq-balance' || hash === 'measure') {
      switchTab('tab-equipment');
      switchEquipment('eq-balance');
      setTimeout(() => {
        const el = document.getElementById('eq-balance');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else if (hash === 'phmeter' || hash === 'eq-phmeter') {
      switchTab('tab-equipment');
      switchEquipment('eq-phmeter');
      setTimeout(() => {
        const el = document.getElementById('eq-phmeter');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else if (hash === 'rules' || hash === 'tab-general') {
      switchTab('tab-general');
      setTimeout(() => {
        const el = document.getElementById('tab-general');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else if (hash === 'quiz' || hash === 'tab-quiz') {
      switchTab('tab-quiz');
      setTimeout(() => {
        const el = document.getElementById('tab-quiz');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  window.addEventListener('hashchange', handleHashRoute);
  setTimeout(handleHashRoute, 250);

  // Original texts for buttons
  const originalTabTexts = {
    'tab-general': 'قوانین عمومی و ایمنی',
    'tab-equipment': 'راهنمای کاربری تجهیزات'
  };

  const originalEqTexts = {
    'eq-centrifuge': 'دستگاه سانتریفیوژ',
    'eq-oven': 'دستگاه فور (Oven)',
    'eq-phmeter': 'دستگاه pH متر',
    'eq-balance': 'ترازوی دیجیتال دقیق (Radwag)'
  };

  const searchTargets = [
    {
      id: 'eq-centrifuge',
      type: 'eq',
      names: ['سانتریفیوژ', 'سنتریفیوژ', 'سنتریفیوز', 'سانتریفیوز', 'سانتریفیو', 'سنتریفی', 'سنترفیوژ', 'centrifuge', 'rcf', 'rpm'],
      displayName: 'دستگاه سانتریفیوژ'
    },
    {
      id: 'eq-oven',
      type: 'eq',
      names: ['فور', 'آون', 'اون', 'اوان', 'اوون', 'oven', 'e.h.t', 'eht', 'lo.t', 'lot'],
      displayName: 'دستگاه فور (Oven)'
    },
    {
      id: 'eq-phmeter',
      type: 'eq',
      names: ['ph', 'پی اچ', 'پ هاش', 'ph متر', 'phmeter', 'کالیبره', 'الکترود', 'پ هاچ', 'پیاچ'],
      displayName: 'دستگاه pH متر'
    },
    {
      id: 'eq-balance',
      type: 'eq',
      names: ['ترازو', 'رادواگ', 'ترازو دیجیتال', 'ترازوی دقیق', 'ترازو آنالیتیکال', 'وزن', 'توزین', 'ترا', 'کالیبراسیون داخلی', 'radwag', 'as r', 'ps r', 'balance', 'as r plus', 'lo mass'],
      displayName: 'ترازوی دیجیتال دقیق (Radwag)'
    },
    {
      id: 'tab-general',
      type: 'tab',
      names: ['قوانین', 'مقررات', 'ایمنی', 'پوشش', 'ساعت', 'پسماند', 'rules', 'general', 'safety'],
      displayName: 'قوانین عمومی و ایمنی'
    }
  ];

  function getLevenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  function getStringSimilarity(s1, s2) {
    s1 = s1.toLowerCase().trim();
    s2 = s2.toLowerCase().trim();
    if (s1 === s2) return 1.0;
    const maxLen = Math.max(s1.length, s2.length);
    if (maxLen === 0) return 1.0;
    const dist = getLevenshteinDistance(s1, s2);
    return 1.0 - (dist / maxLen);
  }

  function detectTargetMatch(query) {
    const cleanQuery = query.toLowerCase().trim();
    if (cleanQuery.length < 2) return null;

    let bestMatch = null;
    let highestScore = 0;
    let matchedName = '';

    for (const target of searchTargets) {
      for (const name of target.names) {
        if (cleanQuery === name || cleanQuery.includes(name) || name.includes(cleanQuery)) {
          const score = cleanQuery === name ? 1.0 : 0.9;
          if (score > highestScore) {
            highestScore = score;
            bestMatch = target;
            matchedName = name;
          }
        } else {
          const sim = getStringSimilarity(cleanQuery, name);
          if (sim >= 0.8 && sim > highestScore) {
            highestScore = sim;
            bestMatch = target;
            matchedName = name;
          }
        }
      }
    }

    if (bestMatch) {
      return { target: bestMatch, score: highestScore, matchedName };
    }
    return null;
  }

  // Global Search and Filter logic with highlighting
  const searchInput = document.getElementById('search-input');
  const searchStatusBanner = document.getElementById('search-status-banner');
  
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    
    // Find all rule items and paragraphs that can be searched
    const searchableItems = document.querySelectorAll('.rule-item, .eq-list li, .eq-section p, .error-table td');
    const targetMatch = detectTargetMatch(query);
    
    // 1. Update matching highlights and opacities
    searchableItems.forEach(item => {
      // Restore original HTML first to remove old highlights
      if (item.getAttribute('data-original-html')) {
        item.innerHTML = item.getAttribute('data-original-html');
      } else {
        item.setAttribute('data-original-html', item.innerHTML);
      }
      
      if (query === '') {
        item.style.opacity = '1';
        item.style.display = '';
        return;
      }
      
      let isMatch = false;
      if (targetMatch) {
        // Mode 1: Device/Tab Intent Mode
        const target = targetMatch.target;
        if (target.type === 'eq') {
          const eqContainer = item.closest(`#${target.id}`);
          if (eqContainer) isMatch = true;
        } else if (target.type === 'tab') {
          const tabContainer = item.closest(`#${target.id}`);
          if (tabContainer) isMatch = true;
        }
      } else {
        // Mode 2: Standard Text Search Mode
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          isMatch = true;
        }
      }
      
      if (isMatch) {
        item.style.opacity = '1';
        item.style.display = '';
        const originalHTML = item.getAttribute('data-original-html');
        if (item.textContent.toLowerCase().includes(query)) {
          item.innerHTML = highlightHTML(originalHTML, query);
        }
      } else {
        item.style.opacity = '0.3';
      }
    });

    // 2. If query is empty, reset display of all card containers and exit
    if (query === '') {
      document.querySelectorAll('.rule-card, .eq-section').forEach(el => {
        el.style.display = '';
      });
      
      // Restore original tab texts
      document.querySelectorAll('.tab-btn').forEach(btn => {
        const tabId = btn.getAttribute('data-tab');
        if (originalTabTexts[tabId]) {
          btn.innerHTML = originalTabTexts[tabId];
        }
        btn.style.opacity = '1';
      });

      document.querySelectorAll('.eq-nav-btn').forEach(btn => {
        const eqId = btn.getAttribute('data-eq');
        if (originalEqTexts[eqId]) {
          btn.innerHTML = originalEqTexts[eqId];
        }
        btn.style.opacity = '1';
      });

      if (searchStatusBanner) {
        searchStatusBanner.style.display = 'none';
        searchStatusBanner.innerHTML = '';
      }
      return;
    }

    // 3. Handle card display inside tab-general
    const cards = document.querySelectorAll('.rule-card');
    let generalCount = 0;
    cards.forEach(card => {
      const cardItems = card.querySelectorAll('.rule-item');
      let hasVisibleMatch = false;
      cardItems.forEach(item => {
        if (item.style.opacity === '1') {
          hasVisibleMatch = true;
          generalCount++;
        }
      });
      
      if (hasVisibleMatch) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });

    // 4. Handle section display inside tab-equipment
    const eqSections = document.querySelectorAll('.eq-section');
    eqSections.forEach(sec => {
      const secItems = sec.querySelectorAll('.eq-list li, p, .error-table td');
      let hasVisibleMatch = false;
      secItems.forEach(item => {
        if (item.style.opacity === '1') {
          hasVisibleMatch = true;
        }
      });
      
      if (hasVisibleMatch) {
        sec.style.display = '';
      } else {
        sec.style.display = 'none';
      }
    });

    // 5. Count matches in equipment sub-tabs
    let centrifugeCount = 0;
    let ovenCount = 0;
    let phmeterCount = 0;
    let balanceCount = 0;

    document.querySelectorAll('#eq-centrifuge .eq-list li, #eq-centrifuge p, #eq-centrifuge .error-table td').forEach(item => {
      if (item.style.opacity === '1') centrifugeCount++;
    });

    document.querySelectorAll('#eq-oven .eq-list li, #eq-oven p, #eq-oven .error-table td').forEach(item => {
      if (item.style.opacity === '1') ovenCount++;
    });

    document.querySelectorAll('#eq-phmeter .eq-list li, #eq-phmeter p, #eq-phmeter .error-table td').forEach(item => {
      if (item.style.opacity === '1') phmeterCount++;
    });

    document.querySelectorAll('#eq-balance .eq-list li, #eq-balance p, #eq-balance .error-table td').forEach(item => {
      if (item.style.opacity === '1') balanceCount++;
    });

    const equipmentCount = centrifugeCount + ovenCount + phmeterCount + balanceCount;

    // 6. Update Tab buttons display & badges
    document.querySelectorAll('.tab-btn').forEach(btn => {
      const tabId = btn.getAttribute('data-tab');
      if (tabId === 'tab-general') {
        if (generalCount > 0) {
          btn.innerHTML = `${originalTabTexts[tabId]} <span class="search-badge">${toPersianDigits(generalCount)}</span>`;
          btn.style.opacity = '1';
        } else {
          btn.innerHTML = originalTabTexts[tabId];
          btn.style.opacity = '0.4';
        }
      } else if (tabId === 'tab-equipment') {
        if (equipmentCount > 0) {
          btn.innerHTML = `${originalTabTexts[tabId]} <span class="search-badge">${toPersianDigits(equipmentCount)}</span>`;
          btn.style.opacity = '1';
        } else {
          btn.innerHTML = originalTabTexts[tabId];
          btn.style.opacity = '0.4';
        }
      }
    });

    // 7. Update Equipment sub-navigation buttons
    document.querySelectorAll('.eq-nav-btn').forEach(btn => {
      const eqId = btn.getAttribute('data-eq');
      let count = 0;
      if (eqId === 'eq-centrifuge') count = centrifugeCount;
      if (eqId === 'eq-oven') count = ovenCount;
      if (eqId === 'eq-phmeter') count = phmeterCount;
      if (eqId === 'eq-balance') count = balanceCount;

      if (count > 0) {
        btn.innerHTML = `${originalEqTexts[eqId]} <span class="search-badge">${toPersianDigits(count)}</span>`;
        btn.style.opacity = '1';
      } else {
        btn.innerHTML = originalEqTexts[eqId];
        btn.style.opacity = '0.4';
      }
    });

    // 8. Update search status banner/navigation
    if (searchStatusBanner) {
      const activeTabBtn = document.querySelector('.tab-btn.active');
      const activeTabId = activeTabBtn ? activeTabBtn.getAttribute('data-tab') : 'tab-general';

      if (targetMatch) {
        // Intent Routing Mode Banner
        const target = targetMatch.target;
        if (target.type === 'eq') {
          const activeEqBtn = document.querySelector('.eq-nav-btn.active');
          const activeEqId = activeEqBtn ? activeEqBtn.getAttribute('data-eq') : '';
          const isEqActive = (activeEqId === target.id);
          const isTabActive = (activeTabId === 'tab-equipment');
          
          const isTypo = (targetMatch.score < 1.0 && targetMatch.matchedName !== query);
          let msg = isTypo ? `نمایش راهنمای <strong>«${target.displayName}»</strong> (تصحیح شده از «${query}»)` : `نمایش راهنمای <strong>«${target.displayName}»</strong>`;
          
          let navLink = '';
          if (!isTabActive) {
            navLink = `<a class="switch-tab-link" data-tab="tab-equipment">ورود به بخش تجهیزات &larr;</a>`;
          } else if (!isEqActive) {
            navLink = `<a class="switch-eq-link" data-eq="${target.id}">ورود به بخش دستگاه &larr;</a>`;
          }
          
          searchStatusBanner.style.display = 'flex';
          searchStatusBanner.innerHTML = `
            <div class="banner-message">
              <span class="material-symbols-outlined" style="color: var(--accent-emerald);">auto_awesome</span>
              <span>${msg}</span>
            </div>
            ${navLink}
          `;
        } else if (target.type === 'tab') {
          const isTabActive = (activeTabId === target.id);
          let msg = `نمایش محتوای بخش <strong>«${target.displayName}»</strong>`;
          let navLink = '';
          if (!isTabActive) {
            navLink = `<a class="switch-tab-link" data-tab="${target.id}">ورود به این بخش &larr;</a>`;
          }
          
          searchStatusBanner.style.display = 'flex';
          searchStatusBanner.innerHTML = `
            <div class="banner-message">
              <span class="material-symbols-outlined" style="color: var(--accent-emerald);">auto_awesome</span>
              <span>${msg}</span>
            </div>
            ${navLink}
          `;
        }
      } else {
        // Standard Text Search Mode Banner
        if (activeTabId === 'tab-general') {
          if (generalCount === 0 && equipmentCount > 0) {
            searchStatusBanner.style.display = 'flex';
            searchStatusBanner.innerHTML = `
              <div class="banner-message">
                <span class="material-symbols-outlined" style="color: var(--accent-amber);">info</span>
                <span>موردی در قوانین عمومی یافت نشد. اما <strong>${toPersianDigits(equipmentCount)} مورد</strong> در بخش راهنمای تجهیزات یافت شد.</span>
              </div>
              <a class="switch-tab-link" data-tab="tab-equipment">مشاهده نتایج در راهنمای تجهیزات &larr;</a>
            `;
          } else if (generalCount === 0 && equipmentCount === 0) {
            searchStatusBanner.style.display = 'flex';
            searchStatusBanner.innerHTML = `
              <div class="banner-message">
                <span class="material-symbols-outlined" style="color: var(--accent-red);">cancel</span>
                <span>هیچ موردی یافت نشد.</span>
              </div>
            `;
          } else {
            searchStatusBanner.style.display = 'flex';
            searchStatusBanner.innerHTML = `
              <div class="banner-message">
                <span class="material-symbols-outlined">check_circle</span>
                <span>تعداد <strong>${toPersianDigits(generalCount)} مورد</strong> در قوانین عمومی و ایمنی یافت شد.</span>
              </div>
            `;
          }
        } else if (activeTabId === 'tab-equipment') {
          const activeEqBtn = document.querySelector('.eq-nav-btn.active');
          const activeEqId = activeEqBtn ? activeEqBtn.getAttribute('data-eq') : 'eq-centrifuge';
          
          let activeEqCount = 0;
          if (activeEqId === 'eq-centrifuge') activeEqCount = centrifugeCount;
          if (activeEqId === 'eq-oven') activeEqCount = ovenCount;
          if (activeEqId === 'eq-phmeter') activeEqCount = phmeterCount;
          if (activeEqId === 'eq-balance') activeEqCount = balanceCount;

          if (activeEqCount === 0) {
            if (equipmentCount > 0) {
              let suggestions = [];
              if (centrifugeCount > 0) suggestions.push(`<a class="switch-eq-link" data-eq="eq-centrifuge">سانتریفیوژ (${toPersianDigits(centrifugeCount)})</a>`);
              if (ovenCount > 0) suggestions.push(`<a class="switch-eq-link" data-eq="eq-oven">فور (${toPersianDigits(ovenCount)})</a>`);
              if (phmeterCount > 0) suggestions.push(`<a class="switch-eq-link" data-eq="eq-phmeter">pH متر (${toPersianDigits(phmeterCount)})</a>`);
              if (balanceCount > 0) suggestions.push(`<a class="switch-eq-link" data-eq="eq-balance">ترازو (${toPersianDigits(balanceCount)})</a>`);
              
              searchStatusBanner.style.display = 'flex';
              searchStatusBanner.innerHTML = `
                <div class="banner-message">
                  <span class="material-symbols-outlined" style="color: var(--accent-amber);">info</span>
                  <span>موردی در راهنمای دستگاه فعلی یافت نشد. نتایج در سایر دستگاه‌ها: </span>
                  ${suggestions.join(' ')}
                </div>
              `;
            } else if (generalCount > 0) {
              searchStatusBanner.style.display = 'flex';
              searchStatusBanner.innerHTML = `
                <div class="banner-message">
                  <span class="material-symbols-outlined" style="color: var(--accent-amber);">info</span>
                  <span>موردی در تجهیزات یافت نشد. اما <strong>${toPersianDigits(generalCount)} مورد</strong> در قوانین عمومی یافت شد.</span>
                </div>
                <a class="switch-tab-link" data-tab="tab-general">مشاهده نتایج در قوانین عمومی &larr;</a>
              `;
            } else {
              searchStatusBanner.style.display = 'flex';
              searchStatusBanner.innerHTML = `
                <div class="banner-message">
                  <span class="material-symbols-outlined" style="color: var(--accent-red);">cancel</span>
                  <span>هیچ موردی یافت نشد.</span>
                </div>
              `;
            }
          } else {
            searchStatusBanner.style.display = 'flex';
            searchStatusBanner.innerHTML = `
              <div class="banner-message">
                <span class="material-symbols-outlined">check_circle</span>
                <span>تعداد <strong>${toPersianDigits(activeEqCount)} مورد</strong> در راهنمای این دستگاه یافت شد.</span>
              </div>
            `;
          }
        } else {
          searchStatusBanner.style.display = 'none';
        }
      }
    }
  });

  // Event delegation for search banner tab-switching actions
  if (searchStatusBanner) {
    searchStatusBanner.addEventListener('click', (e) => {
      const tabLink = e.target.closest('.switch-tab-link');
      if (tabLink) {
        const tabId = tabLink.getAttribute('data-tab');
        switchTab(tabId);
        searchInput.dispatchEvent(new Event('input'));
      }
      
      const eqLink = e.target.closest('.switch-eq-link');
      if (eqLink) {
        const eqId = eqLink.getAttribute('data-eq');
        switchEquipment(eqId);
        searchInput.dispatchEvent(new Event('input'));
      }
    });
  }

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlightHTML(html, query) {
    // Regex matches the search query only outside of html tags
    const escapedQuery = escapeRegExp(query);
    const regex = new RegExp(`(?<!<[^>]*)(${escapedQuery})`, 'gi');
    return html.replace(regex, '<span class="highlight">$1</span>');
  }

  // Centrifuge RPM/RCF Calculator
  const calcBtn = document.getElementById('calc-btn');
  const inputRadius = document.getElementById('calc-radius');
  const inputRpm = document.getElementById('calc-rpm');
  const inputRcf = document.getElementById('calc-rcf');
  const calcResult = document.getElementById('calc-result');

  calcBtn.addEventListener('click', () => {
    const radius = parseFloat(inputRadius.value);
    const rpm = parseFloat(inputRpm.value);
    const rcf = parseFloat(inputRcf.value);

    if (isNaN(radius) || radius <= 0) {
      alert('لطفاً شعاع روتور معتبری (بزرگتر از صفر میلی‌متر) وارد نمایید.');
      return;
    }

    if (!isNaN(rpm) && rpm > 0) {
      // Calculate RCF from RPM
      // RCF = 1.12 * Radius * (RPM/1000)^2
      const calculatedRcf = 1.12 * radius * Math.pow(rpm / 1000, 2);
      calcResult.style.display = 'block';
      calcResult.innerHTML = `نیروی گریز از مرکز نسبی محاسبه‌شده: <span>${Math.round(calculatedRcf)} x g</span>`;
      inputRcf.value = Math.round(calculatedRcf);
    } else if (!isNaN(rcf) && rcf > 0) {
      // Calculate RPM from RCF
      // RPM = 1000 * sqrt(RCF / (1.12 * Radius))
      const calculatedRpm = 1000 * Math.sqrt(rcf / (1.12 * radius));
      calcResult.style.display = 'block';
      calcResult.innerHTML = `سرعت دورانی محاسبه‌شده: <span>${Math.round(calculatedRpm)} RPM</span>`;
      inputRpm.value = Math.round(calculatedRpm);
    } else {
      alert('لطفاً حداقل یکی از مقادیر دور (RPM) یا نیروی گریز از مرکز (RCF) را وارد کنید.');
    }
  });

  // Sync inputs clearing for calculator
  inputRpm.addEventListener('input', () => {
    if (inputRpm.value !== '') inputRcf.value = '';
  });
  inputRcf.addEventListener('input', () => {
    if (inputRcf.value !== '') inputRpm.value = '';
  });

  // Oven Error Lookup interactive widget
  const errorSelect = document.getElementById('error-select');
  const errorDetailsBox = document.getElementById('error-details-box');
  
  const errorDescriptions = {
    'E.H.t': {
      text: 'افزایش دما بیش از مقدار خطای تنظیم شده. عملیات دستگاه ممکن است بسته به تنظیمات متوقف گردد. احتمال دارد ترموستات حفاظتی قطع شده باشد یا رله المنت قفل کرده باشد.',
      type: 'danger'
    },
    'Lo.t': {
      text: 'کاهش دما کمتر از مقدار خطای تنظیم شده. عملیات دستگاه متوقف می‌شود. این خطا نشان می‌دهد نشت حرارت وجود دارد یا زمان گرمادهی طولانی شده است.',
      type: 'warning'
    },
    't': {
      text: 'بیش از سه ساعت بعد از استارت، دمای محفظه به مقدار تنظیم شده نرسیده است. این خطا نشان‌دهنده خرابی شدید در سیستم گرمایشی (مانند سوختن المنت یا خرابی برد قدرت) است.',
      type: 'danger'
    },
    'E.SEN': {
      text: 'ایراد جدی در سنسور؛ سنسور دقیق دما (PT100) توسط کنترلر مرکزی شناسایی نشده است. احتمال قطع شدن اتصالات یا خرابی خود سنسور وجود دارد.',
      type: 'danger'
    },
    'door': {
      text: 'درب دستگاه باز مانده است. در صورتی که درب بیش از ۱۵ ثانیه باز بماند، آلارم هشدار صوتی هر ثانیه یک‌بار به صدا در می‌آید تا مانع اتلاف انرژی و نوسان دما شود.',
      type: 'warning'
    },
    'End.E': {
      text: 'پایان کار دستگاه همراه با خطا (توقف کار در اثر وقوع خطاهای بحرانی مانند قطعی سنسور یا عدم کارکرد المنت).',
      type: 'danger'
    },
    'End.t': {
      text: 'پایان موفقیت‌آمیز چرخه حرارتی بدون هیچ‌گونه خطا یا قطعی در سیستم.',
      type: 'info'
    }
  };

  if (errorSelect && errorDetailsBox) {
    errorSelect.addEventListener('change', () => {
      const code = errorSelect.value;
      if (!code) {
        errorDetailsBox.style.display = 'none';
        return;
      }

      const data = errorDescriptions[code];
      errorDetailsBox.className = `error-details-box ${data.type}`;
      errorDetailsBox.style.display = 'block';
      errorDetailsBox.innerHTML = `<strong>علت و اقدام پیشنهادی:</strong><br>${data.text}`;
    });
  }

  // pH Meter Error Lookup widget
  const phErrorSelect = document.getElementById('ph-error-select');
  const phErrorDetailsBox = document.getElementById('ph-error-details-box');

  const phErrorDescriptions = {
    'Err.Cal': {
      text: 'خطای کالیبراسیون. غشای الکترود شیشه‌ای کثیف است، محلول‌های بافر آلوده یا کهنه هستند، یا الکترود عمر مفید خود را از دست داده است. بافرهای تازه و تمیز تهیه کرده و الکترود را شستشو دهید.',
      type: 'danger'
    },
    'Err.Temp': {
      text: 'عدم شناسایی سنسور دما. فیش اتصال سنسور دمای خودکار (ATC) قطع است یا خود سنسور دما دچار نقص فنی شده است. کابل اتصال را بررسی و مجدداً وصل کنید.',
      type: 'danger'
    },
    'no.Stb': {
      text: 'عدم پایداری و ثبات عدد pH. ممکن است به دلیل حباب‌های هوا در زیر حباب الکترود، وجود لایه‌های چربی روی شیشه الکترود، یا همگن نبودن نمونه باشد. الکترود را تکان دهید تا حباب‌ها خارج شوند و نمونه را به آرامی هم بزنید.',
      type: 'warning'
    },
    'OR/UR': {
      text: 'مقدار خارج از محدوده اندازه‌گیری (Over/Under Range). پ هاش نمونه خارج از دامنه ۰ تا ۱۴ است، یا سیم اتصال الکترود اصلی قطع شده است. اتصالات کابل کواکسیال الکترود را بررسی کنید.',
      type: 'danger'
    }
  };

  if (phErrorSelect && phErrorDetailsBox) {
    phErrorSelect.addEventListener('change', () => {
      const code = phErrorSelect.value;
      if (!code) {
        phErrorDetailsBox.style.display = 'none';
        return;
      }

      const data = phErrorDescriptions[code];
      phErrorDetailsBox.className = `error-details-box ${data.type}`;
      phErrorDetailsBox.style.display = 'block';
      phErrorDetailsBox.innerHTML = `<strong>علت و اقدام پیشنهادی:</strong><br>${data.text}`;
    });
  }

  // Digital Balance Error Lookup widget
  const balanceErrorSelect = document.getElementById('balance-error-select');
  const balanceErrorDetailsBox = document.getElementById('balance-error-details-box');

  const balanceErrorDescriptions = {
    'Lo.mass': {
      text: 'نمایش پیام <code>Lo mass</code> به این معنی است که وزن نمونه کمتر از حداقل ظرفیت مجاز ترازو (Min) برای اندازه‌گیری معتبر است. نمونه بیشتری روی کله قرار داده و دکمه Zero را بزنید.',
      type: 'warning'
    },
    'Thermometer': {
      text: 'چشمک زدن نماد دماسنج نشان‌دهنده ناپایداری حرارتی شدید یا تغییرات ناگهانی دمای محیط ترازو است (مخصوص سری AS). در این حالت توزین‌های حساس را متوقف کنید، اجازه دهید دمای محیط پایدار شود یا یک کالیبراسیون داخلی دستی (Internal Adjustment) برای انطباق سنسور اجرا کنید.',
      type: 'danger'
    },
    'Drift': {
      text: 'نوسان دائمی رقم آخر و خزش آرام اعداد به علت عدم پایداری دمای اولیه ترازو (گرم نشدن قطعات الکترونیک)، وجود کوران هوا، لرزش میز یا بارهای الکترواستاتیک روی بدنه رخ می‌دهد. اتصال ارت را بررسی کنید و زمان پایداری اولیه را رعایت فرمایید (مدل‌های PS حداقل ۴ ساعت و AS حداقل ۸ ساعت).',
      type: 'warning'
    },
    'Err.Null': {
      text: 'خطای ناتوانی در تعیین نقطه صفر هنگام روشن کردن دستگاه. کفه را بردارید، مطمئن شوید که قفل حمل و نقل باز است، هیچ مانعی زیر کفه وجود ندارد و پین توزین آزاد است؛ سپس مجدداً ترازو را روشن کنید.',
      type: 'danger'
    },
    'Err.Full': {
      text: 'وزن کفه از حداکثر ظرفیت مجاز ترازو (Max) فراتر رفته است. برای جلوگیری از آسیب دیدن سنسور سلولی توزین (Load Cell)، سریعاً وزنه سنگین را از روی کفه بردارید.',
      type: 'danger'
    }
  };

  if (balanceErrorSelect && balanceErrorDetailsBox) {
    balanceErrorSelect.addEventListener('change', () => {
      const code = balanceErrorSelect.value;
      if (!code) {
        balanceErrorDetailsBox.style.display = 'none';
        return;
      }

      const data = balanceErrorDescriptions[code];
      balanceErrorDetailsBox.className = `error-details-box ${data.type}`;
      balanceErrorDetailsBox.style.display = 'block';
      balanceErrorDetailsBox.innerHTML = `<strong>علت و اقدام پیشنهادی:</strong><br>${data.text}`;
    });
  }

  // Interactive badges in the tables to link to respective select dropdowns
  const errorBadges = document.querySelectorAll('.error-code-badge');
  errorBadges.forEach(badge => {
    badge.addEventListener('click', () => {
      const code = badge.getAttribute('data-code');
      
      if (code === 'Err.Cal' || code === 'Err.Temp' || code === 'no.Stb' || code === 'OR/UR') {
        if (phErrorSelect) {
          phErrorSelect.value = code;
          phErrorSelect.dispatchEvent(new Event('change'));
          phErrorSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else if (code === 'Lo.mass' || code === 'Thermometer' || code === 'Drift' || code === 'Err.Null' || code === 'Err.Full') {
        if (balanceErrorSelect) {
          balanceErrorSelect.value = code;
          balanceErrorSelect.dispatchEvent(new Event('change'));
          balanceErrorSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        if (errorSelect) {
          errorSelect.value = code;
          errorSelect.dispatchEvent(new Event('change'));
          errorSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });

  // Acknowledgment & Safety Quiz Logic
  const declarations = document.querySelectorAll('.declaration-item');
  const startQuizBtn = document.getElementById('start-quiz-btn');
  const quizSection = document.getElementById('quiz-section');
  const declarationsContainer = document.getElementById('declarations-container');
  const progressFill = document.getElementById('progress-fill');
  
  // Declaration checklists toggle
  declarations.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
      checkQuizPreconditions();
    });
  });

  function checkQuizPreconditions() {
    const checkedCount = document.querySelectorAll('.declaration-item.checked').length;
    if (checkedCount === declarations.length) {
      startQuizBtn.removeAttribute('disabled');
      startQuizBtn.style.opacity = '1';
    } else {
      startQuizBtn.setAttribute('disabled', 'true');
      startQuizBtn.style.opacity = '0.5';
    }
  }

  // Quiz Questions database
  const quizQuestions = [
    {
      question: '۱. روش صحیح برای رقیق‌سازی اسیدهای غلیظ در آزمایشگاه چیست؟',
      options: [
        'ریختن آب بر روی اسید به صورت سریع',
        'ریختن تدریجی و مرحله‌به‌مرحله اسید به داخل آب زیر هود شیمیایی',
        'ترکیب مستقیم اسید غلیظ با باز قوی',
        'ریختن همزمان اسید و آب در یک بشر'
      ],
      correct: 1
    },
    {
      question: '۲. نحوه دفع پسماند حلال‌ها و مواد اسیدی/بازی چگونه است؟',
      options: [
        'تخلیه در سینک آزمایشگاه و باز کردن شیر آب',
        'ریختن در بطری شیشه‌ای لیبل‌دار پسماند و قرار دادن آن زیر سینک',
        'ریختن در سطل زباله معمولی داخل آزمایشگاه',
        'انتقال به ظروف فلزی و بستن درب آن'
      ],
      correct: 1
    },
    {
      question: '۳. در صورت شکستن لوله نمونه در سانتریفیوژ، اولین و مهم‌ترین اقدام چیست؟',
      options: [
        'بلافاصله باز کردن درب دستگاه و پاک‌سازی خرده شیشه‌ها',
        'خاموش نگه داشتن دستگاه به مدت حداقل ۳۰ دقیقه جهت ته نشین شدن ذرات معلق (ایروسل‌ها)',
        'افزایش دور سانتریفیوژ جهت خشک کردن مایعات ریخته شده',
        'ریختن سریع آب داخل محفظه چرخنده'
      ],
      correct: 1
    },
    {
      question: '۴. کدام یک از موارد زیر خروج آن از آزمایشگاه تحت هر شرایطی کاملاً ممنوع است؟',
      options: [
        'روپوش آزمایشگاهی شخصی',
        'هرگونه تجهیزات، شیشه‌آلات، حلال‌ها و مواد شیمیایی آزمایشگاه',
        'برگه اطلاعات ایمنی ماده (MSDS)',
        'دستکش کارکرده مستعمل'
      ],
      correct: 1
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  const questionContainer = document.getElementById('question-container');
  const nextQuizBtn = document.getElementById('next-quiz-btn');
  const studentFormSection = document.getElementById('student-form-section');
  const submitFormBtn = document.getElementById('submit-form-btn');
  const certificateBox = document.getElementById('certificate-box');

  startQuizBtn.addEventListener('click', () => {
    declarationsContainer.style.display = 'none';
    quizSection.classList.add('active');
    loadQuestion(0);
  });

  function loadQuestion(index) {
    const qData = quizQuestions[index];
    progressFill.style.width = `${((index) / quizQuestions.length) * 100}%`;
    
    let optionsHtml = '';
    qData.options.forEach((opt, oIdx) => {
      optionsHtml += `<div class="option-item" data-idx="${oIdx}">${opt}</div>`;
    });

    questionContainer.innerHTML = `
      <div class="question-card">
        <div class="question-title">${qData.question}</div>
        <div class="option-list">${optionsHtml}</div>
      </div>
    `;

    // Handle Option Selection
    const options = questionContainer.querySelectorAll('.option-item');
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        nextQuizBtn.removeAttribute('disabled');
        nextQuizBtn.style.opacity = '1';
      });
    });

    nextQuizBtn.setAttribute('disabled', 'true');
    nextQuizBtn.style.opacity = '0.5';
  }

  nextQuizBtn.addEventListener('click', () => {
    const selectedOpt = questionContainer.querySelector('.option-item.selected');
    if (!selectedOpt) return;

    const selectedIdx = parseInt(selectedOpt.getAttribute('data-idx'));
    if (selectedIdx === quizQuestions[currentQuestionIndex].correct) {
      score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      loadQuestion(currentQuestionIndex);
    } else {
      // Quiz Finished, check score
      progressFill.style.width = '100%';
      quizSection.classList.remove('active');
      
      if (score === quizQuestions.length) {
        studentFormSection.classList.add('active');
      } else {
        // Failed, restart quiz
        alert(`شما به ${score} سوال از ${quizQuestions.length} پاسخ صحیح دادید. برای قبولی باید به تمامی سوالات پاسخ صحیح دهید. لطفاً دوباره تلاش کنید.`);
        currentQuestionIndex = 0;
        score = 0;
        declarationsContainer.style.display = 'block';
        quizSection.classList.remove('active');
        checkQuizPreconditions();
      }
    }
  });

  // Submit student info & generate certificate
  submitFormBtn.addEventListener('click', () => {
    const studentName = document.getElementById('student-name').value.trim();
    const studentId = document.getElementById('student-id').value.trim();

    if (!studentName || !studentId) {
      alert('لطفاً نام و شماره دانشجویی خود را به صورت کامل وارد کنید.');
      return;
    }

    // Generate random verification code
    const randomCode = 'WLAB-' + Math.floor(100000 + Math.random() * 900000);
    const currentDate = new Date().toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    document.getElementById('cert-name').textContent = studentName;
    document.getElementById('cert-id-val').textContent = studentId;
    document.getElementById('cert-code-val').textContent = randomCode;
    document.getElementById('cert-date-val').textContent = currentDate;

    studentFormSection.classList.remove('active');
    certificateBox.classList.add('active');
    
    // Save to LocalStorage
    localStorage.setItem('lab_permit_name', studentName);
    localStorage.setItem('lab_permit_id', studentId);
    localStorage.setItem('lab_permit_code', randomCode);
    localStorage.setItem('lab_permit_date', currentDate);
  });

  // Print button action
  const printBtn = document.getElementById('print-btn');
  printBtn.addEventListener('click', () => {
    window.print();
  });

  // Restart quiz after completion if needed
  const restartBtn = document.getElementById('restart-btn');
  restartBtn.addEventListener('click', () => {
    localStorage.removeItem('lab_permit_name');
    localStorage.removeItem('lab_permit_id');
    localStorage.removeItem('lab_permit_code');
    localStorage.removeItem('lab_permit_date');
    
    currentQuestionIndex = 0;
    score = 0;
    certificateBox.classList.remove('active');
    declarationsContainer.style.display = 'block';
    
    // Uncheck declarations
    declarations.forEach(item => item.classList.remove('checked'));
    checkQuizPreconditions();
  });

  // Check if student already has a valid permit in local storage
  const savedName = localStorage.getItem('lab_permit_name');
  const savedId = localStorage.getItem('lab_permit_id');
  const savedCode = localStorage.getItem('lab_permit_code');
  const savedDate = localStorage.getItem('lab_permit_date');

  if (savedName && savedId && savedCode && savedDate) {
    declarationsContainer.style.display = 'none';
    document.getElementById('cert-name').textContent = savedName;
    document.getElementById('cert-id-val').textContent = savedId;
    document.getElementById('cert-code-val').textContent = savedCode;
    document.getElementById('cert-date-val').textContent = savedDate;
    certificateBox.classList.add('active');
  }

  // Initialize KaTeX Auto-Render for LaTeX equations
  if (typeof renderMathInElement === 'function') {
    renderMathInElement(document.body, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
      ],
      throwOnError: false
    });
  }

  // --- MSDS Chemical Safety Lookup Widget Logic ---
  const msdsSelect = document.getElementById('msds-chemical-select');
  const msdsDetailsCard = document.getElementById('msds-details-card');

  // Populate chemical dropdown menu dynamically from window.chemicalMsdsDb
  function populateMsdsDropdown() {
    if (!msdsSelect) return;
    
    // Check if the MSDS database is loaded
    if (!window.chemicalMsdsDb) {
      // If it is not loaded yet (since it is loaded in another script), try again after a small delay
      setTimeout(populateMsdsDropdown, 100);
      return;
    }

    // Clear existing options except the first one
    msdsSelect.innerHTML = '<option value="">-- انتخاب ماده شیمیایی --</option>';

    // Sort chemicals alphabetically by Persian name with safety fallback for older mobile engines
    let sortedChems = window.chemicalMsdsDb;
    try {
      sortedChems = [...window.chemicalMsdsDb].sort((a, b) => {
        if (a && b && a.nameFa && b.nameFa) {
          return a.nameFa.localeCompare(b.nameFa, 'fa');
        }
        return 0;
      });
    } catch (err) {
      console.warn("Alphabetical sorting failed, falling back to default order:", err);
    }

    // Loop through sorted chemicals and append options
    sortedChems.forEach(chem => {
      const option = document.createElement('option');
      option.value = chem.id;
      option.textContent = `${chem.nameFa} (${chem.nameEn})`;
      msdsSelect.appendChild(option);
    });
  }

  // Populate dropdown on startup
  populateMsdsDropdown();

  // Listen for selection changes
  if (msdsSelect && msdsDetailsCard) {
    msdsSelect.addEventListener('change', () => {
      const chemId = msdsSelect.value;
      if (!chemId) {
        msdsDetailsCard.style.display = 'none';
        return;
      }

      const chem = window.chemicalMsdsDb.find(c => c.id === chemId);
      if (!chem) return;

      // Update NFPA and GHS Visualizers
      updateNfpaAndGhs(chem);

      // Update text fields
      document.getElementById('msds-name-fa').textContent = chem.nameFa;
      document.getElementById('msds-name-en').textContent = chem.nameEn;
      document.getElementById('msds-formula').textContent = chem.formula;
      document.getElementById('msds-cas').textContent = `CAS: ${chem.cas}`;
      document.getElementById('msds-exposure').textContent = chem.exposure;

      // Update waste container color box
      const wasteBox = document.getElementById('msds-waste-group');
      wasteBox.className = 'msds-container-box'; // reset class
      wasteBox.classList.add(`${chem.containerColor}-container`);
      wasteBox.innerHTML = `
        <span class="material-symbols-outlined">delete</span>
        <span>${chem.wasteGroup}</span>
      `;

      // Update Hazards list
      const hazardsList = document.getElementById('msds-hazards-list');
      hazardsList.innerHTML = '';
      chem.hazards.forEach(h => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${h.label}</strong>`;
        hazardsList.appendChild(li);
      });

      // Update Incompatibilities list
      const incompatibleList = document.getElementById('msds-incompatible-list');
      incompatibleList.innerHTML = '';
      chem.incompatible.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        incompatibleList.appendChild(li);
      });

      // Update First Aid paragraphs safely
      const firstAid = chem.firstAid || {};
      document.getElementById('first-aid-skin').textContent = firstAid.skin || "شستشو با آب فراوان. لباس‌های آلوده را درآورید.";
      document.getElementById('first-aid-eyes').textContent = firstAid.eyes || "چشم‌ها را بلافاصله با آب فراوان به مدت ۱۵ دقیقه شستشو دهید.";
      document.getElementById('first-aid-inhalation').textContent = firstAid.inhalation || "خطر حاد تنفسی گزارش نشده است یا غبار غیرفرار است.";

      // Update Spill Action
      document.getElementById('msds-spill-action').textContent = chem.spillAction;

      // Reset first aid tabs to Skin
      const aidTabs = document.querySelectorAll('.first-aid-tab-btn');
      const aidTexts = document.querySelectorAll('.first-aid-text');
      
      aidTabs.forEach(tab => {
        if (tab.getAttribute('data-aid-tab') === 'skin') {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });

      aidTexts.forEach(txt => {
        if (txt.id === 'first-aid-skin') {
          txt.classList.add('active');
        } else {
          txt.classList.remove('active');
        }
      });

      // Show details card
      msdsDetailsCard.style.display = 'block';
    });
  }

  // Handle first aid tabs switching
  const aidTabs = document.querySelectorAll('.first-aid-tab-btn');
  aidTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-aid-tab');
      
      // Toggle tabs
      aidTabs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');

      // Toggle text blocks
      const aidTexts = document.querySelectorAll('.first-aid-text');
      aidTexts.forEach(txt => {
        if (txt.id === `first-aid-${tabName}`) {
          txt.classList.add('active');
        } else {
          txt.classList.remove('active');
        }
      });
    });
  });

  // --- Chemical Compatibility Checker ---
  const compatResultBox = document.getElementById('compat-result-box');
  const compatStatusIcon = document.getElementById('compat-status-icon');
  const compatStatusTitle = document.getElementById('compat-status-title');
  const compatStatusBadge = document.getElementById('compat-status-badge');
  const compatDesc = document.getElementById('compat-desc');
  const compatTags = document.getElementById('compat-tags');
  const compatFormulaSection = document.getElementById('compat-formula-section');
  const compatFormula = document.getElementById('compat-formula');

  function addChemicalRow(selectedId = '') {
    const container = document.getElementById('compat-chemicals-container');
    if (!container) return;

    const row = document.createElement('div');
    row.className = 'compat-chemical-row';
    row.style.display = 'flex';
    row.style.gap = '0.75rem';
    row.style.alignItems = 'center';
    row.style.width = '100%';

    // Create select
    const select = document.createElement('select');
    select.className = 'error-lookup-select compat-chemical-select';
    select.style.flex = '1';
    
    // Default/placeholder option
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = '-- انتخاب ماده شیمیایی --';
    select.appendChild(placeholder);

    // Populate options
    let sortedChems = [];
    try {
      sortedChems = [...window.chemicalMsdsDb].sort((a, b) => a.nameFa.localeCompare(b.nameFa, 'fa'));
    } catch (err) {
      sortedChems = window.chemicalMsdsDb || [];
    }

    sortedChems.forEach(chem => {
      const option = document.createElement('option');
      option.value = chem.id;
      option.textContent = `${chem.nameFa} (${chem.nameEn})`;
      if (chem.id === selectedId) {
        option.selected = true;
      }
      select.appendChild(option);
    });

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn-remove-chemical';
    removeBtn.style.background = 'transparent';
    removeBtn.style.border = 'none';
    removeBtn.style.padding = '0.4rem';
    removeBtn.style.color = 'var(--accent-red)';
    removeBtn.style.cursor = 'pointer';
    removeBtn.style.display = 'inline-flex';
    removeBtn.style.alignItems = 'center';
    removeBtn.style.borderRadius = '6px';
    removeBtn.style.transition = 'background 0.2s';
    removeBtn.title = 'حذف این ماده';
    removeBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size: 20px;">delete</span>';

    // Hover effect for remove button
    removeBtn.addEventListener('mouseenter', () => {
      removeBtn.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
    });
    removeBtn.addEventListener('mouseleave', () => {
      removeBtn.style.backgroundColor = 'transparent';
    });

    removeBtn.addEventListener('click', () => {
      row.remove();
      updateDeleteButtonsVisibility();
      checkMultiCompatibility();
    });

    select.addEventListener('change', checkMultiCompatibility);

    row.appendChild(select);
    row.appendChild(removeBtn);
    container.appendChild(row);

    updateDeleteButtonsVisibility();
  }

  function updateDeleteButtonsVisibility() {
    const container = document.getElementById('compat-chemicals-container');
    if (!container) return;
    const rows = container.querySelectorAll('.compat-chemical-row');
    rows.forEach(row => {
      const removeBtn = row.querySelector('.btn-remove-chemical');
      if (removeBtn) {
        if (rows.length <= 2) {
          removeBtn.style.visibility = 'hidden';
          removeBtn.style.opacity = '0';
          removeBtn.style.pointerEvents = 'none';
        } else {
          removeBtn.style.visibility = 'visible';
          removeBtn.style.opacity = '1';
          removeBtn.style.pointerEvents = 'auto';
        }
      }
    });
  }

  function initCompatWidget() {
    const container = document.getElementById('compat-chemicals-container');
    const addBtn = document.getElementById('add-compat-chemical-btn');
    if (!container) return;

    if (!window.chemicalMsdsDb) {
      setTimeout(initCompatWidget, 100);
      return;
    }

    // Clear and add 2 initial rows
    container.innerHTML = '';
    addChemicalRow();
    addChemicalRow();

    if (addBtn) {
      // Recreate to avoid duplicate event listeners if initialized multiple times
      const newAddBtn = addBtn.cloneNode(true);
      addBtn.parentNode.replaceChild(newAddBtn, addBtn);
      newAddBtn.addEventListener('click', () => {
        addChemicalRow();
      });
    }
  }

  initCompatWidget();

  function checkMultiCompatibility() {
    if (!compatResultBox) return;

    const container = document.getElementById('compat-chemicals-container');
    if (!container) return;

    // Gather selected values
    const selectElements = container.querySelectorAll('.compat-chemical-select');
    const selectedChems = [];
    const seen = new Set();

    selectElements.forEach(select => {
      const val = select.value;
      if (val && !seen.has(val)) {
        seen.add(val);
        const chem = window.chemicalMsdsDb.find(c => c.id === val);
        if (chem) {
          selectedChems.push(chem);
        }
      }
    });

    // If less than 2 unique chemicals selected, hide result box
    if (selectedChems.length < 2) {
      compatResultBox.style.display = 'none';
      return;
    }

    // Evaluate all pairs
    const conflicts = [];
    let worstStatus = 'compatible';
    let combinedOdor = '';
    let combinedToxicity = '';
    let combinedSafety = '';
    let arrowCondition = '';

    for (let i = 0; i < selectedChems.length; i++) {
      for (let j = i + 1; j < selectedChems.length; j++) {
        const res = evaluatePairCompatibility(selectedChems[i], selectedChems[j]);
        if (res.isReaction) {
          conflicts.push(res);
          if (res.status === 'danger') {
            worstStatus = 'danger';
          } else if (res.status === 'warning' && worstStatus !== 'danger') {
            worstStatus = 'warning';
          }
          if (res.odor && !combinedOdor) combinedOdor = res.odor;
          if (res.toxicity && !combinedToxicity) combinedToxicity = res.toxicity;
          if (res.safety && !combinedSafety) combinedSafety = res.safety;
        }
      }
    }

    // Build formula LHS & RHS
    const lhsParts = selectedChems.map(c => convertFormulaToLatex(c.formula) || `\\text{${c.nameEn}}`);
    const lhsFormula = lhsParts.join(' + ');

    let rhsFormula = '';
    if (conflicts.length === 0) {
      // Safe coexistence: RHS is identical to LHS
      const rhsParts = selectedChems.map(c => convertFormulaToLatex(c.formula) || `\\text{${c.nameEn}}`);
      rhsFormula = rhsParts.join(' + ') + ' \\quad \\text{(Safe Coexistence)}';
    } else {
      // Reacting: perform group merging
      let groups = selectedChems.map((chem, idx) => ({
        indices: [idx],
        formula: convertFormulaToLatex(chem.formula) || `\\text{${chem.nameEn}}`,
        reacted: false
      }));

      let changed = true;
      while (changed) {
        changed = false;
        for (let i = 0; i < groups.length; i++) {
          for (let j = i + 1; j < groups.length; j++) {
            let reactionFound = null;
            for (let idxA of groups[i].indices) {
              for (let idxB of groups[j].indices) {
                const res = evaluatePairCompatibility(selectedChems[idxA], selectedChems[idxB]);
                if (res.isReaction) {
                  reactionFound = res;
                  break;
                }
              }
              if (reactionFound) break;
            }

            if (reactionFound) {
              const mergedIndices = [...groups[i].indices, ...groups[j].indices];
              const productFormula = reactionFound.productsFormula;
              if (reactionFound.arrowCondition) {
                arrowCondition = reactionFound.arrowCondition;
              }
              groups[i] = {
                indices: mergedIndices,
                formula: productFormula,
                reacted: true
              };
              groups.splice(j, 1);
              changed = true;
              break;
            }
          }
          if (changed) break;
        }
      }
      rhsFormula = groups.map(g => g.formula).join(' + ');
    }

    const arrowSymbol = arrowCondition ? ` \\xrightarrow{${arrowCondition}} ` : ' \\rightarrow ';
    const finalFormula = `${lhsFormula}${arrowSymbol}${rhsFormula}`;

    // Compile result details based on worst status and conflicts
    let finalTitle = '';
    let finalDesc = '';
    let finalOdor = '';
    let finalToxicity = '';
    let finalSafety = '';

    if (worstStatus === 'compatible') {
      finalTitle = 'بدون تداخل مستقیم (Compatible for Storage)';
      finalDesc = `تداخل مستقیم یا واکنش شدیدی بین مواد انتخاب‌شده ثبت نشده است. با این حال، جهت دفع پسماند آن‌ها حتماً اصول تفکیک را رعایت کرده و اسیدها را در گالن‌های اسیدی و حلال‌های آلی را بر اساس هالوژن‌دار بودن در گالن مخصوص (قرمز یا زرد) تخلیه نمایید.`;
      finalOdor = 'بدون بوی خاص';
      finalToxicity = 'غیرسمی در اثر اختلاط';
      finalSafety = 'ایمن';
    } else {
      // Collect safety tags and format descriptions
      if (conflicts.length === 1) {
        finalTitle = conflicts[0].title;
        finalDesc = conflicts[0].desc;
      } else {
        finalTitle = 'تداخلات چندگانه شناسایی شد (Multiple Conflicts Detected)';
        // Build list of descriptions
        const descList = conflicts.map(c => `<li><strong>${c.title}:</strong> ${c.desc}</li>`).join('');
        finalDesc = `<ul style="margin: 0; padding-right: 1.2rem; line-height: 1.6; color: var(--text-primary);">${descList}</ul>`;
      }
      finalOdor = combinedOdor || 'احتمال واکنش شدید';
      finalToxicity = combinedToxicity || 'خطرناک و سمی';
      finalSafety = combinedSafety || 'تداخل ثبت شده';
    }

    // Call showCompatResult to display everything beautifully
    showCompatResult(worstStatus, finalTitle, finalDesc, finalFormula, finalOdor, finalToxicity, finalSafety);
  }

  function evaluatePairCompatibility(chemA, chemB) {
    const idA = chemA.id;
    const idB = chemB.id;

    // 1. Check for known chemical reactions / synthesis pathways
    const knownReactions = [
      {
        ids: ['melamine', 'urea'],
        status: 'warning',
        title: 'واکنش پلیمریزاسیون تحت حرارت (Thermal Condensation)',
        productsFormula: '\\text{g-C}_3\\text{N}_4 + \\text{NH}_3 \\uparrow',
        arrowCondition: '\\text{Heat } 550^\\circ\\text{C}',
        odor: 'دارای بو (بوی گاز آمونیاک)',
        toxicity: 'سمی (محرک تنفسی شدید)',
        safety: 'نیاز به هود و کوره',
        desc: 'ترکیب ملامین و اوره در دمای بالا (معمولاً ۵۵۰ درجه سانتی‌گراد در کوره) باعث سنتز گرافیتیک کربن نیترید (<span dir="ltr">$\\text{g-C}_3\\text{N}_4$</span>) و آزاد شدن گاز آمونیاک (<span dir="ltr">$\\text{NH}_3$</span>) می‌شود. این کار الزاما باید تحت هود مناسب، در بوته چینی و داخل کوره آزمایشگاه انجام پذیرد.'
      },
      {
        ids: ['hydrochloric_acid', 'sodium_hydroxide'],
        status: 'warning',
        title: 'واکنش خنثی‌سازی شدید (Strong Neutralization)',
        productsFormula: '\\text{NaCl} + \\text{H}_2\\text{O} + \\text{Heat}',
        arrowCondition: '',
        odor: 'بدون بو',
        toxicity: 'غیرسمی (محصولات خنثی)',
        safety: 'شدیداً گرمازا',
        desc: 'اختلاط مستقیم اسید کلریدریک غلیظ و سدیم هیدروکسید (سود سوزآور) واکنش خنثی‌سازی شدید و فوق‌العاده گرمازایی ایجاد می‌کند. این کار می‌تواند منجر به جوشش و پاشش مواد خورنده شود. هرگز آن‌ها را مستقیماً ترکیب نکنید.'
      },
      {
        ids: ['nitric_acid', 'ethanol'],
        status: 'danger',
        title: 'واکنش اکسیداسیون شدید و خطر انفجار (Violent Explosion)',
        productsFormula: '\\text{NO}_x \\uparrow + \\text{Explosion}',
        arrowCondition: '',
        odor: 'دارای بو (بخارات سمی NOx)',
        toxicity: 'بسیار سمی و انفجاری',
        safety: 'انفجاری و مرگبار',
        desc: 'بسیار خطرناک! اسید نیتریک یک اکسیدکننده بسیار قوی است. ترکیب آن با اتانول منجر به واکنش اکسیداسیون به شدت گرمازا و سریع می‌شود که می‌تواند ظرف پسماند را منفجر کرده و گازهای قهوه‌ای سمی دی‌اکسید نیتروژن تولید کند.'
      },
      {
        ids: ['hydrochloric_acid', 'sodium_cyanide'],
        status: 'danger',
        title: 'تولید گاز مرگبار هیدروژن سیانید (Extremely Lethal Gas)',
        productsFormula: '\\text{NaCl} + \\text{HCN} \\uparrow',
        arrowCondition: '',
        odor: 'دارای بوی ملایم (بادام تلخ)',
        toxicity: 'مرگبار و کشنده فوری',
        safety: 'فوق‌العاده مرگبار',
        desc: 'مرگبارترین تداخل! اسید کلریدریک در مجاورت سدیم سیانید واکنش داده و گاز هیدروژن سیانید (<span dir="ltr">$\\text{HCN}$</span>) تولید می‌کند که مانع تنفس سلولی شده و در چند ثانیه منجر به مرگ می‌شود.'
      },
      {
        ids: ['acetic_acid', 'sodium_bicarbonate'],
        status: 'warning',
        title: 'واکنش خنثی‌سازی ملایم (Mild Neutralization & Gas)',
        productsFormula: '\\text{CH}_3\\text{COONa} + \\text{H}_2\\text{O} + \\text{CO}_2 \\uparrow',
        arrowCondition: '',
        odor: 'بدون بو',
        toxicity: 'غیرسمی و ایمن',
        safety: 'تولید گاز CO2',
        desc: 'اسید استیک (سرکه) با سدیم بیکربنات (جوش شیرین) واکنش خنثی‌سازی ملایمی نشان داده و با فوران گاز بی‌خطر دی‌اکسید کربن (<span dir="ltr">$\\text{CO}_2$</span>) همراه است.'
      }
    ];

    const reaction = knownReactions.find(r => 
      (r.ids[0] === idA && r.ids[1] === idB) || (r.ids[0] === idB && r.ids[1] === idA)
    );

    if (reaction) {
      return {
        isReaction: true,
        status: reaction.status,
        title: reaction.title,
        productsFormula: reaction.productsFormula,
        arrowCondition: reaction.arrowCondition,
        odor: reaction.odor,
        toxicity: reaction.toxicity,
        safety: reaction.safety,
        desc: reaction.desc
      };
    }

    // 2. Check direct incompatibility text match
    let directConflictText = '';
    const cleanNameFaA = chemA.nameFa.replace(/\s+/g, '');
    const cleanNameEnA = chemA.nameEn.toLowerCase();
    const cleanNameFaB = chemB.nameFa.replace(/\s+/g, '');
    const cleanNameEnB = chemB.nameEn.toLowerCase();

    // Check A's incompatibilities against B
    chemA.incompatible.forEach(incompat => {
      const cleanInc = incompat.replace(/\s+/g, '').toLowerCase();
      if (cleanInc.includes(cleanNameFaB) || cleanInc.includes(cleanNameEnB) || 
          (chemB.formula && cleanInc.includes(chemB.formula.toLowerCase()))) {
        directConflictText = `بر اساس برگه اطلاعات ایمنی ${chemA.nameFa}، این ماده با ${chemB.nameFa} ناسازگار است: «${incompat}»`;
      }
    });

    // Check B's incompatibilities against A
    chemB.incompatible.forEach(incompat => {
      const cleanInc = incompat.replace(/\s+/g, '').toLowerCase();
      if (cleanInc.includes(cleanNameFaA) || cleanInc.includes(cleanNameEnA) || 
          (chemA.formula && cleanInc.includes(chemA.formula.toLowerCase()))) {
        directConflictText = `بر اساس برگه اطلاعات ایمنی ${chemB.nameFa}، این ماده با ${chemA.nameFa} ناسازگار است: «${incompat}»`;
      }
    });

    if (directConflictText) {
      return {
        isReaction: true,
        status: 'danger',
        title: 'تداخل مستقیم و شدید (Severe Incompatibility)',
        productsFormula: '\\text{Incompatible (Do Not Mix!)}',
        arrowCondition: '',
        odor: 'احتمال واکنش شدید',
        toxicity: 'خطرناک و سمی',
        safety: 'تداخل ثبت شده',
        desc: directConflictText
      };
    }

    // 3. Category matching logic
    const getSafetyCategory = (chem) => {
      const nameFa = chem.nameFa.toLowerCase();
      const nameEn = chem.nameEn.toLowerCase();
      const id = chem.id;
      const formula = (chem.formula || '').toLowerCase();
      const wasteGroup = chem.wasteGroup.toLowerCase();

      // Water-Reactive (highly dangerous)
      if (id === 'sodium_hydride' || id === 'lithium_aluminium_hydride' || id === 'titanium_tetrachloride' || 
          id === 'n_butyllithium' || id === 'sodium_methoxide' || id === 'boron_trifluoride_etherate' || 
          id === 'thionyl_chloride' || id === 'phosphorus_pentoxide' || nameFa.includes('واکنش‌دهنده با آب') || 
          wasteGroup.includes('واکنش‌دهنده با آب') || wasteGroup.includes('پیروفوریک')) {
        return 'water_reactive';
      }

      // Cyanide / Sulfide
      if (nameFa.includes('سیانید') || nameFa.includes('سولفید') || nameEn.includes('cyanide') || 
          nameEn.includes('sulfide') || id.includes('cyanide') || id.includes('sulfide') || id === 'sodium_hydrosulfite') {
        return 'cyanide_sulfide';
      }

      // Oxidizer
      if (nameFa.includes('پراکسید') || nameFa.includes('پرمنگنات') || nameFa.includes('دی‌کرومات') || 
          nameFa.includes('کرومات') || nameFa.includes('نیترات') || nameEn.includes('peroxide') || 
          nameEn.includes('permanganate') || nameEn.includes('dichromate') || nameEn.includes('chromate') || 
          nameEn.includes('nitrate') || id.includes('peroxide') || id.includes('nitrate') || id.includes('chromate') ||
          wasteGroup.includes('اکسیدکننده')) {
        return 'oxidizer';
      }

      // Acids (including strong organic/inorganic)
      if (nameFa.includes('اسید') || nameEn.includes('acid') || id.includes('acid') || 
          formula.includes('cooh') || wasteGroup.includes('اسیدی') || wasteGroup.includes('اسید')) {
        return 'acid';
      }

      // Bases
      if (nameFa.includes('هیدروکسید') || nameFa.includes('آمونیاک') || nameFa.includes('پتاس') || 
          nameFa.includes('سود') || nameEn.includes('hydroxide') || nameEn.includes('ammonia') || 
          id.includes('hydroxide') || id === 'ammonia' || wasteGroup.includes('بازی') || wasteGroup.includes('کاستیک')) {
        return 'base';
      }

      // Organic Solvent (flammable/halogenated/non-halogenated)
      if (wasteGroup.includes('حلال‌های آلی') || wasteGroup.includes('گروه a') || wasteGroup.includes('گروه b') ||
          id === 'acetone' || id === 'chloroform' || id === 'ethanol' || id === 'methanol' || id === 'dichloromethane' ||
          id === 'toluene' || id === 'isopropanol' || id === 'hexane' || id === 'tetrahydrofuran' || id === 'ethyl_acetate' ||
          id === 'diethyl_ether') {
        return 'organic_solvent';
      }

      return 'other';
    };

    const catA = getSafetyCategory(chemA);
    const catB = getSafetyCategory(chemB);

    // Conflict rules between categories
    if ((catA === 'acid' && catB === 'base') || (catB === 'acid' && catA === 'base')) {
      return {
        isReaction: true,
        status: 'warning',
        title: 'تداخل اسید و باز (Neutralization Warning)',
        productsFormula: '\\text{Salt} + \\text{H}_2\\text{O} + \\text{Heat}',
        arrowCondition: '',
        odor: 'بدون بو (معمولاً)',
        toxicity: 'خورنده (حرارت شدید)',
        safety: 'گرمازای شدید',
        desc: 'اسیدها و بازها هرگز نباید در یک گالن تخلیه یا کنار هم نگهداری شوند. اختلاط مستقیم آن‌ها واکنش خنثی‌سازی شدید همراه با تولید حرارت بسیار زیاد ایجاد می‌کند که می‌تواند منجر به جوشش اسید و پاشش مواد خورنده شود.'
      };
    }

    if ((catA === 'acid' && catB === 'cyanide_sulfide') || (catB === 'acid' && catA === 'cyanide_sulfide')) {
      const isSulfide = chemA.nameFa.includes('سولفید') || chemB.nameFa.includes('سولفید') || 
                        chemA.nameEn.toLowerCase().includes('sulfide') || chemB.nameEn.toLowerCase().includes('sulfide');
      const gasResult = isSulfide ? '\\text{H}_2\\text{S} \\uparrow' : '\\text{HCN} \\uparrow';
      const gasDesc = isSulfide ? 'هیدروژن سولفید (<span dir="ltr">$\\text{H}_2\\text{S}$</span>)' : 'هیدروژن سیانید (<span dir="ltr">$\\text{HCN}$</span>)';
      return {
        isReaction: true,
        status: 'danger',
        title: 'خطر تولید گاز فوق‌العاده سمی (Lethal Gas Hazard)',
        productsFormula: `\\text{Salt} + ${gasResult}`,
        arrowCondition: '',
        odor: 'دارای بو (بادام تلخ / تخم‌مرغ گندیده)',
        toxicity: 'فوق‌العاده سمی و مرگبار',
        safety: 'گاز کشنده فوری',
        desc: `بسیار خطرناک! اسیدها در تماس با ترکیبات سیانیدی یا سولفیدی، فوراً گازهای فوق‌العاده کشنده و سمی ${gasDesc} تولید می‌کنند. هرگز نباید در مجاورت یکدیگر قرار گیرند یا مخلوط شوند.`
      };
    }

    if ((catA === 'oxidizer' && catB === 'organic_solvent') || (catB === 'oxidizer' && catA === 'organic_solvent')) {
      return {
        isReaction: true,
        status: 'danger',
        title: 'خطر حریق خودبه‌خودی و انفجار (Explosion Hazard)',
        productsFormula: '\\text{Heat} / \\text{Fire} / \\text{Explosion}',
        arrowCondition: '',
        odor: 'بوی حلال',
        toxicity: 'بسیار خطرناک',
        safety: 'خطر آتش‌سوزی و انفجار',
        desc: 'بسیار خطرناک! مواد اکسیدکننده در حضور حلال‌های آلی یا مواد قابل اشتعال می‌توانند واکنش‌های به شدت گرمازا، حریق خودبه‌خودی یا انفجار فوری بدون نیاز به جرقه ایجاد کنند. این دو گروه را کاملاً مجزا نگهداری کنید.'
      };
    }

    if (catA === 'water_reactive' || catB === 'water_reactive') {
      const isHydride = idA === 'sodium_hydride' || idB === 'sodium_hydride' || 
                        idA === 'lithium_aluminium_hydride' || idB === 'lithium_aluminium_hydride' || 
                        idA === 'n_butyllithium' || idB === 'n_butyllithium' || 
                        idA === 'sodium_methoxide' || idB === 'sodium_methoxide';
      const releasedGas = isHydride ? '\\text{H}_2 \\uparrow' : '\\text{HCl} \\uparrow';
      return {
        isReaction: true,
        status: 'danger',
        title: 'خطر واکنش شدید با رطوبت و حلال‌های آبی (Water Reactive Hazard)',
        productsFormula: `${releasedGas} + \\text{Heat}`,
        arrowCondition: '',
        odor: 'دارای گازهای محرک',
        toxicity: 'بسیار سمی و خورنده',
        safety: 'خطر انفجار و حریق',
        desc: 'بسیار خطرناک! مواد واکنش‌دهنده با آب در تماس با حلال‌های آبی، محلول‌های اسیدی/بازی یا حتی رطوبت هوا، واکنش انفجاری نشان داده و گازهای آتش‌گیر یا سمی به همراه حرارت بسیار بالا تولید می‌کنند.'
      };
    }

    if ((catA === 'acid' && catB === 'organic_solvent') || (catB === 'acid' && catA === 'organic_solvent')) {
      if (idA === 'nitric_acid' || idB === 'nitric_acid') {
        return {
          isReaction: true,
          status: 'danger',
          title: 'خطر واکنش شدید اسید نیتریک با مواد آلی (Violent Reaction Hazard)',
          productsFormula: '\\text{NO}_x \\uparrow + \\text{Violent Oxidation}',
          arrowCondition: '',
          odor: 'دارای بوی تند گازهای NOx',
          toxicity: 'سمی و خطر انفجار شدید',
          safety: 'خطر حریق و انفجار',
          desc: 'بسیار خطرناک! اسید نیتریک یک اکسیدکننده بسیار قوی و اسید معدنی است. ترکیب آن با حلال‌های آلی (مانند استون، اتانول) باعث واکنش به شدت گرمازا، تولید گازهای قهوه‌ای سمی (<span dir="ltr">$\\text{NO}_x$</span>) و انفجار شدید گالن پسماند می‌شود.'
        };
      }
    }

    return {
      isReaction: false,
      status: 'compatible'
    };
  }

  function showCompatResult(status, title, desc, formula = '', odor = '', toxicity = '', safety = '') {
    compatResultBox.className = 'compat-result-box'; // reset
    compatResultBox.classList.add(status);

    compatStatusIcon.className = 'material-symbols-outlined'; // reset
    compatStatusIcon.classList.add(status);
    
    // Set appropriate icon
    if (status === 'compatible') {
      compatStatusIcon.textContent = 'check_circle';
      compatStatusBadge.textContent = 'سازگار';
      compatFormulaSection.style.borderLeft = '4px solid var(--accent-emerald)';
      compatFormula.style.color = 'var(--accent-emerald)';
    } else if (status === 'warning') {
      compatStatusIcon.textContent = 'warning';
      compatStatusBadge.textContent = 'احتیاط / تداخل عمومی';
      compatFormulaSection.style.borderLeft = '4px solid var(--accent-amber)';
      compatFormula.style.color = 'var(--accent-amber)';
    } else if (status === 'danger') {
      compatStatusIcon.textContent = 'dangerous';
      compatStatusBadge.textContent = 'ناسازگار / خطر شدید';
      compatFormulaSection.style.borderLeft = '4px solid var(--accent-red)';
      compatFormula.style.color = 'var(--accent-red)';
    }

    compatStatusBadge.className = ''; // reset
    compatStatusBadge.classList.add(status);

    compatStatusTitle.textContent = title;
    
    if (typeof renderMathInElement === 'function') {
      compatDesc.innerHTML = desc;
      try {
        renderMathInElement(compatDesc, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false},
            {left: '\\[', right: '\\]', display: true}
          ],
          throwOnError: false
        });
      } catch (e) {
        console.error('KaTeX text render error:', e);
        compatDesc.innerHTML = cleanLatexText(desc);
      }
    } else {
      compatDesc.innerHTML = cleanLatexText(desc);
    }

    // Handle reaction formula display
    if (formula && typeof katex !== 'undefined') {
      try {
        katex.render(formula, compatFormula, {
          displayMode: true,
          throwOnError: false
        });
        compatFormulaSection.style.display = 'block';
      } catch (err) {
        console.error('KaTeX error:', err);
        compatFormula.textContent = cleanLatexFormula(formula);
        compatFormulaSection.style.display = 'block';
      }
    } else if (formula) {
      compatFormula.textContent = cleanLatexFormula(formula);
      compatFormulaSection.style.display = 'block';
    } else {
      compatFormulaSection.style.display = 'none';
    }

    // Handle tags rendering
    compatTags.innerHTML = '';
    
    if (odor) {
      const isOdorless = odor.includes('بدون بو');
      const odorBg = isOdorless ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)';
      const odorColor = isOdorless ? 'var(--accent-emerald)' : 'var(--accent-amber)';
      compatTags.innerHTML += `
        <span style="font-size: 0.8rem; padding: 0.25rem 0.6rem; border-radius: 6px; background: ${odorBg}; color: ${odorColor}; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem;">
          <span class="material-symbols-outlined" style="font-size: 14px;">air</span>
          ${odor}
        </span>
      `;
    }

    if (toxicity) {
      const isNonToxic = toxicity.includes('غیرسمی') || toxicity.includes('ایمن');
      const toxBg = isNonToxic ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)';
      const toxColor = isNonToxic ? 'var(--accent-emerald)' : 'var(--accent-red)';
      compatTags.innerHTML += `
        <span style="font-size: 0.8rem; padding: 0.25rem 0.6rem; border-radius: 6px; background: ${toxBg}; color: ${toxColor}; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem;">
          <span class="material-symbols-outlined" style="font-size: 14px;">skull</span>
          ${toxicity}
        </span>
      `;
    }

    if (safety) {
      compatTags.innerHTML += `
        <span style="font-size: 0.8rem; padding: 0.25rem 0.6rem; border-radius: 6px; background: rgba(239, 68, 68, 0.1); color: var(--accent-red); font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem;">
          <span class="material-symbols-outlined" style="font-size: 14px;">gpp_maybe</span>
          ${safety}
        </span>
      `;
    }

    compatResultBox.style.display = 'block';
  }

  function cleanLatexFormula(latex) {
    if (!latex) return '';
    return latex
      .replace(/\\mathrm\{([^}]+)\}/g, '$1')
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\xrightarrow\{([^}]+)\}/g, ' --$1--> ')
      .replace(/\\rightarrow/g, ' --> ')
      .replace(/\\leftrightarrow/g, ' <--> ')
      .replace(/\\uparrow/g, ' (گاز)')
      .replace(/\\downarrow/g, ' (رسوب)')
      .replace(/\\overset\{([^}]+)\}\{([^}]+)\}/g, ' --$1--> ')
      .replace(/\\times/g, ' × ')
      .replace(/\\circ/g, '°')
      .replace(/_([a-zA-Z0-9])/g, '$1')
      .replace(/_\{([^}]+)\}/g, '$1')
      .replace(/[\{\}]/g, '')
      .replace(/\\/g, '')
      .trim();
  }

  function cleanLatexText(text) {
    if (!text) return '';
    return text.replace(/\$([^$]+)\$/g, (match, formula) => {
      return cleanLatexFormula(formula);
    });
  }

  function convertFormulaToLatex(formula) {
    if (!formula) return '';
    const subscriptMap = {
      '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
      '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9'
    };
    let result = formula.replace(/[₀₁₂₃₄₅₆₇₈₉]+/g, (match) => {
      const digits = match.split('').map(sub => subscriptMap[sub]).join('');
      return `_{${digits}}`;
    });
    return `\\mathrm{${result}}`;
  }

  // --- NFPA 704 & GHS Estimation and Rendering ---
  function getNfpaRatings(chem) {
    // 1. Explicit mapping for common/high-profile chemicals by ID
    const explicitMap = {
      'water': { h: 0, f: 0, r: 0, s: '' },
      'sulfuric_acid': { h: 3, f: 0, r: 2, s: '₩' },
      'nitric_acid': { h: 4, f: 0, r: 0, s: 'OX' },
      'hydrochloric_acid': { h: 3, f: 0, r: 1, s: '' },
      'phosphoric_acid': { h: 3, f: 0, r: 0, s: '' },
      'acetic_acid': { h: 3, f: 2, r: 1, s: '' },
      'hydrofluoric_acid': { h: 4, f: 0, r: 1, s: '' },
      'sodium_hydroxide': { h: 3, f: 0, r: 1, s: '' },
      'potassium_hydroxide': { h: 3, f: 0, r: 1, s: '' },
      'ammonia': { h: 3, f: 1, r: 0, s: '' },
      'methanol': { h: 2, f: 3, r: 0, s: '' },
      'ethanol': { h: 2, f: 3, r: 0, s: '' },
      'acetone': { h: 2, f: 3, r: 0, s: '' },
      'acetonitrile': { h: 2, f: 3, r: 0, s: '' },
      'toluene': { h: 2, f: 3, r: 0, s: '' },
      'hexane': { h: 2, f: 3, r: 0, s: '' },
      'diethyl_ether': { h: 2, f: 4, r: 1, s: '' },
      'tetrahydrofuran': { h: 2, f: 3, r: 1, s: '' },
      'dichloromethane': { h: 2, f: 1, r: 0, s: '' },
      'chloroform': { h: 3, f: 0, r: 0, s: '' },
      'mercury': { h: 3, f: 0, r: 0, s: '' },
      'sodium_cyanide': { h: 4, f: 0, r: 0, s: '' },
      'potassium_cyanide': { h: 4, f: 0, r: 0, s: '' },
      'sodium_azide': { h: 4, f: 1, r: 2, s: '' },
      'hydrogen_peroxide': { h: 3, f: 0, r: 2, s: 'OX' },
      'potassium_permanganate': { h: 2, f: 0, r: 0, s: 'OX' },
      'potassium_dichromate': { h: 3, f: 0, r: 1, s: 'OX' },
      'sodium_metal': { h: 3, f: 3, r: 2, s: '₩' }
    };

    // If matches by ID directly, return it
    if (explicitMap[chem.id]) {
      return explicitMap[chem.id];
    }

    // 2. Otherwise, estimate dynamically based on containerColor, name, and hazards descriptions
    let h = 1; // Default Health: 1
    let f = 0; // Default Flammability: 0
    let r = 0; // Default Instability: 0
    let s = ''; // Default Special: None

    if (chem.containerColor === 'red') {
      f = 3;
      h = 2;
    } else if (chem.containerColor === 'blue') {
      h = 3;
    } else if (chem.containerColor === 'yellow') {
      r = 1;
    }

    const textToSearch = (
      (chem.nameFa || '') + ' ' + 
      (chem.nameEn || '') + ' ' + 
      (chem.formula || '') + ' ' + 
      chem.hazards.map(haz => haz.label).join(' ') + ' ' + 
      (chem.spillAction || '')
    ).toLowerCase();

    // Health
    if (textToSearch.includes('کشنده') || textToSearch.includes('مرگبار') || textToSearch.includes('سیانید') || textToSearch.includes('جیوه') || textToSearch.includes('آزید') || textToSearch.includes('deadly') || textToSearch.includes('fatal')) {
      h = 4;
    } else if (textToSearch.includes('سمی') || textToSearch.includes('سرطان‌زا') || textToSearch.includes('سوختگی شدید') || textToSearch.includes('خوردگی') || textToSearch.includes('toxic') || textToSearch.includes('corrosive')) {
      h = 3;
    } else if (textToSearch.includes('تحریک') || textToSearch.includes('محرک') || textToSearch.includes('سوزش') || textToSearch.includes('irritant') || textToSearch.includes('harmful')) {
      h = 2;
    } else if (textToSearch.includes('بی‌خطر') || textToSearch.includes('آب') || chem.id === 'water') {
      h = 0;
    }

    // Flammability
    if (textToSearch.includes('بسیار قابل اشتعال') || textToSearch.includes('اتر') || textToSearch.includes('دی‌اتیل اتر') || textToSearch.includes('highly flammable')) {
      f = 4;
    } else if (textToSearch.includes('قابل اشتعال') || textToSearch.includes('مشتعل') || textToSearch.includes('آتش') || textToSearch.includes('flammable')) {
      f = 3;
    } else if (textToSearch.includes('کمی قابل اشتعال') || textToSearch.includes('روغن') || textToSearch.includes('گرم کردن') || textToSearch.includes('combustible')) {
      f = 2;
    } else if (textToSearch.includes('هالوژنه') || textToSearch.includes('کلروفرم') || textToSearch.includes('دی‌کلرومتان')) {
      f = 1;
    }

    // Instability
    if (textToSearch.includes('پراکسید انفجاری') || textToSearch.includes('شوک') || textToSearch.includes('آزید') || textToSearch.includes('explosive')) {
      r = 3;
    } else if (textToSearch.includes('انفجار') || textToSearch.includes('ناپایدار') || textToSearch.includes('اکسیدکننده قوی') || textToSearch.includes('شدید واکنش') || textToSearch.includes('oxidizer')) {
      r = 2;
    } else if (textToSearch.includes('گرماده') || textToSearch.includes('واکنش با') || textToSearch.includes('حساس به') || textToSearch.includes('reactive')) {
      r = 1;
    }

    // Special
    if (textToSearch.includes('اکسیدکننده') || textToSearch.includes('پرمنگنات') || textToSearch.includes('پراکسید') || textToSearch.includes('oxidiz')) {
      s = 'OX';
    } else if (textToSearch.includes('واکنش شدید با آب') || textToSearch.includes('فلز سدیم') || textToSearch.includes('آب‌گریز') || textToSearch.includes('water-reactive')) {
      s = '₩';
    }

    return { h, f, r, s };
  }

  function updateNfpaAndGhs(chem) {
    const ratings = getNfpaRatings(chem);

    // Update NFPA UI
    document.getElementById('nfpa-health').textContent = ratings.h;
    document.getElementById('nfpa-flammability').textContent = ratings.f;
    document.getElementById('nfpa-instability').textContent = ratings.r;
    document.getElementById('nfpa-special').textContent = ratings.s || '';

    // Map GHS icons
    const ghsContainer = document.getElementById('msds-ghs-container');
    if (!ghsContainer) return;
    ghsContainer.innerHTML = '';

    const textToSearch = (
      (chem.nameFa || '') + ' ' + 
      (chem.nameEn || '') + ' ' + 
      chem.hazards.map(haz => haz.label).join(' ') + ' ' + 
      (chem.spillAction || '')
    ).toLowerCase();

    const ghsMap = [];

    if (textToSearch.includes('بمب') || textToSearch.includes('انفجار') || textToSearch.includes('پراکسیدهای انفجاری') || textToSearch.includes('شوک') || textToSearch.includes('explosive')) {
      ghsMap.push({ icon: 'explosion', label: 'انفجاری' });
    }
    if (textToSearch.includes('اشتعال') || textToSearch.includes('مشتعل') || textToSearch.includes('آتش') || textToSearch.includes('flammable')) {
      ghsMap.push({ icon: 'local_fire_department', label: 'قابل اشتعال' });
    }
    if (textToSearch.includes('اکسیدکننده') || textToSearch.includes('oxidiz') || textToSearch.includes('پرمنگنات')) {
      ghsMap.push({ icon: 'component_exchange', label: 'اکسیدکننده' });
    }
    if (textToSearch.includes('گاز تحت فشار') || textToSearch.includes('سیلندر') || textToSearch.includes('کپسول گاز') || textToSearch.includes('propane_tank')) {
      ghsMap.push({ icon: 'propane_tank', label: 'گاز تحت فشار' });
    }
    if (textToSearch.includes('خورنده') || textToSearch.includes('خوردگی') || textToSearch.includes('سوختگی شدید') || textToSearch.includes('آسیب جدی به چشم') || textToSearch.includes('corrosive') || textToSearch.includes('acid') || textToSearch.includes('هیدروکسید')) {
      ghsMap.push({ icon: 'science', label: 'خورنده' });
    }
    if (textToSearch.includes('کشنده') || textToSearch.includes('مرگبار') || textToSearch.includes('جیوه') || textToSearch.includes('سیانید') || textToSearch.includes('آزید') || textToSearch.includes('highly toxic') || textToSearch.includes('fatal')) {
      ghsMap.push({ icon: 'skull', label: 'سمی شدید' });
    }
    if (textToSearch.includes('تحریک') || textToSearch.includes('محرک') || textToSearch.includes('سوزش') || textToSearch.includes('irritant') || textToSearch.includes('harmful')) {
      if (!textToSearch.includes('کشنده') && !textToSearch.includes('مرگبار')) {
        ghsMap.push({ icon: 'priority_high', label: 'تحریک‌کننده/مضر' });
      }
    }
    if (textToSearch.includes('سرطان') || textToSearch.includes('سرطان‌زا') || textToSearch.includes('جهش‌زا') || textToSearch.includes('تولد') || textToSearch.includes('کبد') || textToSearch.includes('carcinogen') || textToSearch.includes('سرطان زا')) {
      ghsMap.push({ icon: 'personal_injury', label: 'خطر سلامت' });
    }
    if (textToSearch.includes('محیط زیست') || textToSearch.includes('آبزیان') || textToSearch.includes('دریا') || textToSearch.includes('aquatic') || textToSearch.includes('environment')) {
      ghsMap.push({ icon: 'eco', label: 'محیط زیست' });
    }

    if (ghsMap.length === 0) {
      ghsContainer.innerHTML = '<span style="font-size: 0.85rem; color: var(--text-muted);">بدون خطرات حاد شناخته شده GHS</span>';
      return;
    }

    ghsMap.forEach(item => {
      const badge = document.createElement('div');
      badge.className = 'ghs-badge';
      badge.innerHTML = `
        <div class="ghs-diamond-wrapper" title="${item.label}">
          <span class="material-symbols-outlined ghs-symbol">${item.icon}</span>
        </div>
        <div class="ghs-label">${item.label}</div>
      `;
      ghsContainer.appendChild(badge);
    });
  }

  // --- Chemical Spill Simulator Logic ---
  const drillScenarios = {
    acid: {
      title: 'سناریو: نشت اسید سولفوریک غلیظ (۹۸٪)',
      steps: [
        {
          question: 'گام ۱: در ابتدای ورود به آزمایشگاه متوجه نشت ۵۰۰ میلی‌لیتر اسید سولفوریک غلیظ روی زمین به همراه گازهای محرک می‌شوید. اولین اقدام ایمنی شما چیست؟',
          choices: [
            { text: 'بشر یا ظرف آب برداشته و آب را سریع روی اسید بریزید تا رقیق شود.', correct: false, feedback: 'نادرست! ریختن آب روی اسید سولفوریک غلیظ به علت واکنش بسیار گرمازا باعث فوران و پاشش شدید اسید به اطراف می‌شود.' },
            { text: 'ماسک تنفسی زده، درب پنجره‌ها را باز کرده، هودها را روشن کنید و آزمایشگاه را تخلیه و ورود دیگران را ممنوع کنید.', correct: true, feedback: 'درست! تهویه هوا و ایمن‌سازی محیط (تخلیه فضا) اولویت اول در هر حادثه شیمیایی گاززا است.' },
            { text: 'بلافاصله با دستمال یا پمپ پسماند اقدام به جمع‌آوری اسید کنید.', correct: false, feedback: 'نادرست! تماس بدون تجهیزات حفاظتی با اسید سولفوریک منجر به سوختگی شدید پوستی و آسیب ریوی می‌شود.' }
          ]
        },
        {
          question: 'گام ۲: محیط تهویه شد و ورود دیگران مسدود گردید. اکنون برای جمع‌آوری اسید چه نوع پوشش حفاظتی (PPE) به تن می‌کنید؟',
          choices: [
            { text: 'روپوش نخی معمولی و عینک ایمنی کافی است.', correct: false, feedback: 'نادرست! اسید سولفوریک غلیظ روپوش نخی را فوراً ذوب کرده و از آن عبور می‌کند.' },
            { text: 'روپوش آزمایشگاهی، دستکش نیتریل ضخیم (مقاوم در برابر اسید)، عینک محافظ جانبی و شیلد صورت.', correct: true, feedback: 'درست! برای کار با اسیدهای خورنده قوی، دستکش مقاوم شیمیایی و شیلد صورت الزامی است.' },
            { text: 'بدون پوشش اضافی و فقط با ماسک کاغذی شروع به کار می‌کنید.', correct: false, feedback: 'نادرست! ماسک کاغذی جلوی گازهای اسیدی را نمی‌گیرد و عدم استفاده از دستکش و شیلد بسیار خطرناک است.' }
          ]
        },
        {
          question: 'گام ۳: پوشش ایمنی کامل شد. روش مهار و خنثی‌سازی اسید ریخته شده چیست؟',
          choices: [
            { text: 'مقداری سدیم هیدروکسید (سود سوزآور غلیظ) را روی اسید بریزید تا خنثی شود.', correct: false, feedback: 'نادرست! خنثی‌سازی با یک باز قوی مانند سود، گرما و جوشش بسیار شدیدی تولید می‌کند و بسیار خطرناک است.' },
            { text: 'اسید را با مقداری پودر سدیم هیدروژن‌کربنات (جوش شیرین) یا خنثی‌کننده ضعیف بپوشانید تا گاز دی‌اکسید کربن تمام شود و خنثی گردد.', correct: true, feedback: 'درست! برای خنثی‌سازی اسیدها همیشه از بازهای ضعیف و پودری مانند جوش شیرین یا کربنات کلسیم استفاده می‌شود.' },
            { text: 'بلافاصله آب زیادی سرازیر کنید تا اسید به سمت سینک حرکت کند.', correct: false, feedback: 'نادرست! تخلیه اسید غلیظ در سینک اکیداً ممنوع بوده و واکنش شدید ایجاد می‌کند.' }
          ]
        },
        {
          question: 'گام ۴: فرآیند خنثی‌سازی کامل شد و خمیر حاصله بی‌خطر است. نحوه دفع پسماند و تمیزکاری نهایی چگونه است؟',
          choices: [
            { text: 'مواد خنثی‌شده را با خاک‌انداز پلاستیکی جمع کرده، در ظرف پسماندهای اسیدی/معدنی جامد ریخته و محل را با آب فراوان شستشو و خشک کنید.', correct: true, feedback: 'درست! پسماند خنثی‌شده جامد را باید در گالن پسماند مربوطه تخلیه کرد و سپس کف را شستشو داد.' },
            { text: 'مواد را مستقیماً در سطل زباله معمولی شهری تخلیه کنید.', correct: false, feedback: 'نادرست! پسماندهای شیمیایی حتی پس از خنثی‌سازی نسبی باید در گالن‌های دفع پسماند مشخص شده تخلیه شوند.' }
          ]
        }
      ],
      recap: [
        'هرگز آب را روی اسید نریزید (واکنش شدیداً گرمازا).',
        'برای خنثی‌سازی از بازهای ضعیف پودری مثل جوش شیرین استفاده کنید، نه بازهای قوی.',
        'استفاده از شیلد صورت و دستکش مقاوم به اسید ضخیم الزامی است.',
        'پسماند حاصل را در گالن پسماند جامد شیمیایی تخلیه کنید.'
      ]
    },
    solvent: {
      title: 'سناریو: ریزش حلال آلی فرار (تولوئن)',
      steps: [
        {
          question: 'گام ۱: یک لیتر حلال بسیار فرار و اشتعال‌پذیر تولوئن در نزدیکی کوره داغ روی زمین ریخته است. اولین اقدام اضطراری چیست؟',
          choices: [
            { text: 'کوره و تمامی منابع شعله و جرقه را خاموش کنید و درها را برای تهویه باز کنید.', correct: true, feedback: 'درست! حذف منابع احتراق و جرقه، حیاتی‌ترین کار هنگام نشت حلال‌های فرار و قابل اشتعال است.' },
            { text: 'سریعاً با جاروبرقی یا دستمال نخی شروع به مکش و جمع‌آوری حلال کنید.', correct: false, feedback: 'نادرست! موتور جاروبرقی جرقه ایجاد کرده و ممکن است تولوئن فوراً منفجر شود.' },
            { text: 'روی تولوئن آب بریزید تا آن را رقیق و غیرقابل اشتعال کنید.', correct: false, feedback: 'نادرست! تولوئن در آب حل نمی‌شود (روی آب شناور می‌ماند) و ریختن آب فقط باعث پخش شدن بیشتر آن می‌گردد.' }
          ]
        },
        {
          question: 'گام ۲: خطرات اشتعال فوری برطرف شد. اکنون برای مهار و جذب مایع چه می‌کنید؟',
          choices: [
            { text: 'از خاک اره معمولی برای جذب حلال استفاده می‌کنید.', correct: false, feedback: 'نادرست! خاک اره آغشته به حلال آلی، ترکیبی بسیار مشتعل شونده ایجاد می‌کند که خطر آتش‌سوزی را دوچندان می‌کند.' },
            { text: 'از پدهای جاذب مخصوص حلال‌های آلی یا خاک دیاتومه (ورمیکولیت) جهت مهار نشت استفاده می‌کنید.', correct: true, feedback: 'درست! حلال‌های آلی باید با استفاده از پدهای بی اثر یا مواد جاذب نسوز مانند ورمیکولیت مهار شوند.' },
            { text: 'اجازه می‌دهید حلال خود به خود در هوای آزمایشگاه تبخیر و خشک شود.', correct: false, feedback: 'نادرست! تبخیر تولوئن غلظت بخار قابل انفجار در فضا ایجاد کرده و سمی است.' }
          ]
        },
        {
          question: 'گام ۳: حلال کاملاً جذب پدهای مخصوص شد. نحوه تخلیه و دفع پسماند به چه صورت است؟',
          choices: [
            { text: 'پدهای آلوده را در سطل زباله معمولی بیندازید.', correct: false, feedback: 'نادرست! پدهای آغشته به تولوئن خطر آتش‌سوزی در سطل زباله ایجاد می‌کنند.' },
            { text: 'پدها را فشرده کرده و مایع را در گالن پسماندهای آلی غیرهالوژنه (گروه A - گالن قرمز) تخلیه کنید و پدهای خشک‌شده را در مخزن پسماند جامد آلوده قرار دهید.', correct: true, feedback: 'درست! حلال‌های آلی غیرهالوژنه متعلق به پسماندهای گروه A (گالن قرمز) هستند.' },
            { text: 'مایع را در گالن بازها یا اسیدها تخلیه کنید.', correct: false, feedback: 'نادرست! ترکیب حلال‌های آلی با اسیدها یا بازهای قوی ممکن است به واکنش‌های شدید منتهی شود.' }
          ]
        }
      ],
      recap: [
        'در مواجهه با حلال‌ها، تمام وسایل حرارتی و الکتریکی جرقه زا را فوراً خاموش کنید.',
        'تولوئن و سایر هیدروکربن‌ها روی آب شناور می‌شوند، آب پاشی بی‌فایده و خطرناک است.',
        'از خاک اره برای حلال‌ها استفاده نکنید (خطر حریق شدید). از پدهای نسوز استفاده کنید.',
        'پسماند حلال را در گالن گروه A (پسماند آلی غیرهالوژنه - قرمز) بریزید.'
      ]
    },
    mercury: {
      title: 'سناریو: شکستن دماسنج و نشت جیوه مایع',
      steps: [
        {
          question: 'گام ۱: یک دماسنج جیوه‌ای روی سطح میز کار شکسته و قطرات کوچک جیوه مایع پراکنده شده‌اند. اولین اقدام شما چیست؟',
          choices: [
            { text: 'با جاروبرقی یا دستمال مرطوب سریعاً جیوه را جمع کنید.', correct: false, feedback: 'نادرست! جاروبرقی جیوه را تبخیر کرده و کل هوای آزمایشگاه را به شدت مسموم می‌کند.' },
            { text: 'با استفاده از قلم‌مو یا کارت مقوایی قطرات ریز را به هم نزدیک کنید تا قطره بزرگتری تشکیل شود و آن را با قطره‌چکان جمع‌آوری کنید.', correct: true, feedback: 'درست! قطرات جیوه به دلیل کشش سطحی بالا به هم می‌پیوندند و با قطره‌چکان یا کیت مخصوص برداشته می‌شوند.' },
            { text: 'به روی جیوه آب داغ بریزید تا شسته شود.', correct: false, feedback: 'نادرست! آب داغ تبخیر جیوه را افزایش می‌دهد و خطر مسمومیت تنفسی شدید دارد.' }
          ]
        },
        {
          question: 'گام ۲: قطرات درشت جیوه جمع‌آوری شد. اما هنوز ذرات بسیار ریز جیوه در شکاف‌ها و درزهای میز باقی مانده است. برای خنثی‌سازی کامل چه می‌کنید؟',
          choices: [
            { text: 'روی درزها پودر گوگرد (Sulfur) بپاشید تا با جیوه واکنش داده و جیوه سولفید غیرفرار تشکیل دهد.', correct: true, feedback: 'درست! گوگرد با جیوه واکنش آهسته داده و آن را به ماده جامد بی‌خطر جیوه سولفید تبدیل می‌کند که به راحتی جارو می‌شود.' },
            { text: 'روی شکاف‌ها اسید نیتریک بریزید تا جیوه را حل کند.', correct: false, feedback: 'نادرست! اسید نیتریک با جیوه واکنش داده و گاز قهوه‌ای رنگ بسیار سمی دی‌اکسید نیتروژن تولید می‌کند.' },
            { text: 'میز را به همان شکل رها کنید تا در هوای آزاد تبخیر شود.', correct: false, feedback: 'نادرست! بخار جیوه یک سم عصبی تجمعی شدید است که آسیب جبران‌ناپذیر به همراه دارد.' }
          ]
        },
        {
          question: 'گام ۳: پسماند خنثی‌شده و جیوه جمع‌آوری شده را چگونه دفع می‌کنید؟',
          choices: [
            { text: 'آنها را به همراه زباله‌های شیشه‌ای در سطل زباله معمولی بیندازید.', correct: false, feedback: 'نادرست! جیوه زباله خطرناک زیست‌محیطی است و نباید وارد زباله‌های شهری شود.' },
            { text: 'جیوه جمع‌آوری شده را در ظرف دربسته محکم حاوی آب نگهداری کرده و تحویل مسئول ایمنی دهید. پسماندهای گوگردی آلوده را در ظرف پسماندهای فلزات سنگین جامد تخلیه کنید.', correct: true, feedback: 'درست! جیوه مایع باید در ظرف سربسته حاوی آب (برای جلوگیری از تبخیر) ذخیره و به عنوان پسماند خاص فلزات سنگین تحویل داده شود.' }
          ]
        }
      ],
      recap: [
        'هرگز برای جمع‌آوری جیوه از جاروبرقی یا جارو دستی استفاده نکنید (خطر تبخیر شدید جیوه).',
        'از پودر گوگرد جهت خنثی‌سازی و مهار ذرات ریز جیوه در شکاف‌ها استفاده کنید.',
        'جیوه مایع جمع‌شده را زیر آب در یک ظرف کاملاً دربسته نگهداری کنید.',
        'بخارات جیوه بدون رنگ و بو بوده ولی به شدت سمی و تاثیرگذار روی سیستم عصبی است.'
      ]
    }
  };

  let activeScenario = null;
  let activeStep = 0;
  let activeScore = 0;

  const scenariosSelection = document.getElementById('spill-scenarios-selection');
  const drillActivePanel = document.getElementById('drill-active-panel');
  const drillScenarioTitle = document.getElementById('drill-scenario-title');
  const drillProgressBar = document.getElementById('drill-progress-bar');
  const drillStepIndicator = document.getElementById('drill-step-indicator');
  const drillStepQuestion = document.getElementById('drill-step-question');
  const drillChoicesContainer = document.getElementById('drill-choices-container');
  const drillFeedbackBox = document.getElementById('drill-feedback-box');
  const drillFeedbackIcon = document.getElementById('drill-feedback-icon');
  const drillFeedbackTitle = document.getElementById('drill-feedback-title');
  const drillFeedbackDesc = document.getElementById('drill-feedback-desc');
  const drillNextBtn = document.getElementById('drill-next-btn');
  const drillCompleteBox = document.getElementById('drill-complete-box');
  const drillScoreReport = document.getElementById('drill-score-report');
  const drillRecapNotes = document.getElementById('drill-recap-notes');
  const drillResetBtn = document.getElementById('drill-reset-btn');

  // Modal Controls
  const drillModalBtn = document.getElementById('drill-modal-btn');
  const drillModal = document.getElementById('drill-modal');
  const closeDrillModal = document.getElementById('close-drill-modal');

  if (drillModalBtn && drillModal && closeDrillModal) {
    drillModalBtn.addEventListener('click', () => {
      drillModal.classList.add('active');
      // Reset to selection screen when opening modal
      if (scenariosSelection) scenariosSelection.style.display = 'grid';
      if (drillActivePanel) drillActivePanel.style.display = 'none';
      if (drillCompleteBox) drillCompleteBox.style.display = 'none';
    });

    closeDrillModal.addEventListener('click', () => {
      drillModal.classList.remove('active');
    });

    drillModal.addEventListener('click', (e) => {
      if (e.target === drillModal) {
        drillModal.classList.remove('active');
      }
    });
  }

  // Wire up drill selection buttons
  document.querySelectorAll('.drill-scenario-card').forEach(card => {
    const startBtn = card.querySelector('.select-scenario-btn');
    if (startBtn) {
      startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const scenarioKey = card.getAttribute('data-scenario');
        startDrill(scenarioKey);
      });
    }
    card.addEventListener('click', () => {
      const scenarioKey = card.getAttribute('data-scenario');
      startDrill(scenarioKey);
    });
  });

  function startDrill(scenarioKey) {
    activeScenario = drillScenarios[scenarioKey];
    if (!activeScenario) return;

    activeStep = 0;
    activeScore = 0;

    if (scenariosSelection) scenariosSelection.style.display = 'none';
    if (drillActivePanel) drillActivePanel.style.display = 'block';
    if (drillCompleteBox) drillCompleteBox.style.display = 'none';

    const stepBox = document.querySelector('.drill-step-box');
    if (stepBox) stepBox.style.display = 'block';

    renderDrillStep();
  }

  function toPersianDigits(text) {
    if (text === undefined || text === null) return '';
    const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return text.toString().replace(/[0-9]/g, function (w) {
      return id[+w];
    });
  }

  function renderDrillStep() {
    if (drillFeedbackBox) drillFeedbackBox.style.display = 'none';
    if (drillNextBtn) drillNextBtn.style.display = 'none';

    const stepData = activeScenario.steps[activeStep];
    const totalSteps = activeScenario.steps.length;

    if (drillScenarioTitle) drillScenarioTitle.textContent = activeScenario.title;
    
    const progressPercent = Math.round((activeStep / totalSteps) * 100);
    if (drillProgressBar) drillProgressBar.style.width = `${progressPercent}%`;
    if (drillStepIndicator) {
      const indicatorText = `مرحله ${activeStep + 1} از ${totalSteps}`;
      drillStepIndicator.textContent = toPersianDigits(indicatorText);
    }
    if (drillStepQuestion) drillStepQuestion.textContent = stepData.question;

    if (drillChoicesContainer) {
      drillChoicesContainer.innerHTML = '';
      stepData.choices.forEach((choice, index) => {
        const choiceBtn = document.createElement('button');
        choiceBtn.className = 'drill-choice-btn';
        choiceBtn.innerHTML = `
          <span class="material-symbols-outlined choice-icon">radio_button_unchecked</span>
          <span>${choice.text}</span>
        `;
        choiceBtn.addEventListener('click', () => {
          handleChoiceSelection(choice, choiceBtn);
        });
        drillChoicesContainer.appendChild(choiceBtn);
      });
    }
  }

  function handleChoiceSelection(choice, choiceBtn) {
    if (!drillChoicesContainer) return;
    const allButtons = drillChoicesContainer.querySelectorAll('.drill-choice-btn');
    allButtons.forEach(btn => {
      btn.classList.add('disabled');
      const icon = btn.querySelector('.choice-icon');
      if (icon) icon.textContent = 'radio_button_unchecked';
    });

    const currentIcon = choiceBtn.querySelector('.choice-icon');

    if (drillFeedbackBox) {
      drillFeedbackBox.style.display = 'block';
      if (drillFeedbackDesc) drillFeedbackDesc.textContent = choice.feedback;

      if (choice.correct) {
        activeScore++;
        choiceBtn.classList.remove('disabled');
        choiceBtn.classList.add('selected-correct');
        if (currentIcon) currentIcon.textContent = 'check_circle';

        drillFeedbackBox.className = 'drill-feedback-box correct';
        if (drillFeedbackIcon) drillFeedbackIcon.textContent = 'check_circle';
        if (drillFeedbackTitle) drillFeedbackTitle.textContent = 'پاسخ صحیح است';
      } else {
        choiceBtn.classList.remove('disabled');
        choiceBtn.classList.add('selected-incorrect');
        if (currentIcon) currentIcon.textContent = 'cancel';

        drillFeedbackBox.className = 'drill-feedback-box incorrect';
        if (drillFeedbackIcon) drillFeedbackIcon.textContent = 'error';
        if (drillFeedbackTitle) drillFeedbackTitle.textContent = 'پاسخ نادرست است';

        // Highlight correct choice
        const correctIndex = activeScenario.steps[activeStep].choices.findIndex(c => c.correct);
        if (correctIndex !== -1) {
          const correctBtn = allButtons[correctIndex];
          correctBtn.classList.remove('disabled');
          correctBtn.classList.add('selected-correct');
          const correctIcon = correctBtn.querySelector('.choice-icon');
          if (correctIcon) correctIcon.textContent = 'check_circle';
        }
      }
    }

    if (drillNextBtn) {
      drillNextBtn.style.display = 'inline-block';
      if (activeStep === activeScenario.steps.length - 1) {
        drillNextBtn.textContent = 'مشاهده خلاصه سناریو';
      } else {
        drillNextBtn.textContent = 'مرحله بعد';
      }
    }
  }

  if (drillNextBtn) {
    drillNextBtn.addEventListener('click', () => {
      activeStep++;
      if (activeStep < activeScenario.steps.length) {
        renderDrillStep();
      } else {
        showDrillCompletion();
      }
    });
  }

  function showDrillCompletion() {
    if (drillProgressBar) drillProgressBar.style.width = '100%';
    const stepBox = document.querySelector('.drill-step-box');
    if (stepBox) stepBox.style.display = 'none';
    if (drillFeedbackBox) drillFeedbackBox.style.display = 'none';
    if (drillCompleteBox) drillCompleteBox.style.display = 'block';

    const totalQuestions = activeScenario.steps.length;
    if (drillScoreReport) {
      const scoreText = `امتیاز شما: ${activeScore} از ${totalQuestions} پاسخ صحیح`;
      drillScoreReport.textContent = toPersianDigits(scoreText);
    }

    if (drillRecapNotes) {
      drillRecapNotes.innerHTML = `
        <div class="recap-title">
          <span class="material-symbols-outlined" style="color: var(--accent-amber);">emoji_objects</span>
          نکات طلایی مهار و ایمنی سناریو:
        </div>
        <ul class="recap-list">
          ${activeScenario.recap.map(note => `<li class="recap-item">${note}</li>`).join('')}
        </ul>
      `;
    }
  }

  if (drillResetBtn) {
    drillResetBtn.addEventListener('click', () => {
      if (drillActivePanel) drillActivePanel.style.display = 'none';
      if (scenariosSelection) scenariosSelection.style.display = 'grid';
    });
  }

  // Voice Input Speech-to-Text Setup for Main Search Bar
  const searchVoiceBtn = document.getElementById('search-voice-btn');
  if (searchVoiceBtn && searchInput) {
    const MainSpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let mainRecognition = null;
    let mainIsListening = false;

    if (MainSpeechRecognition) {
      mainRecognition = new MainSpeechRecognition();
      mainRecognition.lang = 'fa-IR';
      mainRecognition.interimResults = false;
      mainRecognition.maxAlternatives = 1;

      mainRecognition.onstart = () => {
        mainIsListening = true;
        searchVoiceBtn.classList.add('recording');
        searchInput.placeholder = 'در حال شنیدن... صحبت کنید...';
      };

      mainRecognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        searchInput.value = speechToText;
        searchInput.dispatchEvent(new Event('input'));
      };

      mainRecognition.onerror = (event) => {
        console.error('Main search speech recognition error:', event.error);
        mainStopListening();
      };

      mainRecognition.onend = () => {
        mainStopListening();
      };

      function mainStartListening() {
        if (mainRecognition && !mainIsListening) {
          try {
            mainRecognition.start();
          } catch (err) {
            console.error(err);
          }
        }
      }

      function mainStopListening() {
        mainIsListening = false;
        if (searchVoiceBtn) searchVoiceBtn.classList.remove('recording');
        if (searchInput) searchInput.placeholder = 'جستجو در قوانین، خطاها یا دستورالعمل‌ها...';
        if (mainRecognition) {
          try {
            mainRecognition.stop();
          } catch (err) {
            // already stopped
          }
        }
      }

      searchVoiceBtn.addEventListener('click', () => {
        if (mainIsListening) {
          mainStopListening();
        } else {
          mainStartListening();
        }
      });
    } else {
      searchVoiceBtn.style.display = 'none'; // Hide if not supported
    }
  }
});
