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
          btn.innerHTML = `${originalTabTexts[tabId]} <span class="search-badge">${generalCount}</span>`;
          btn.style.opacity = '1';
        } else {
          btn.innerHTML = originalTabTexts[tabId];
          btn.style.opacity = '0.4';
        }
      } else if (tabId === 'tab-equipment') {
        if (equipmentCount > 0) {
          btn.innerHTML = `${originalTabTexts[tabId]} <span class="search-badge">${equipmentCount}</span>`;
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
        btn.innerHTML = `${originalEqTexts[eqId]} <span class="search-badge">${count}</span>`;
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
                <span>موردی در قوانین عمومی یافت نشد. اما <strong>${equipmentCount} مورد</strong> در بخش راهنمای تجهیزات یافت شد.</span>
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
                <span>تعداد <strong>${generalCount} مورد</strong> در قوانین عمومی و ایمنی یافت شد.</span>
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
              if (centrifugeCount > 0) suggestions.push(`<a class="switch-eq-link" data-eq="eq-centrifuge">سانتریفیوژ (${centrifugeCount})</a>`);
              if (ovenCount > 0) suggestions.push(`<a class="switch-eq-link" data-eq="eq-oven">فور (${ovenCount})</a>`);
              if (phmeterCount > 0) suggestions.push(`<a class="switch-eq-link" data-eq="eq-phmeter">pH متر (${phmeterCount})</a>`);
              if (balanceCount > 0) suggestions.push(`<a class="switch-eq-link" data-eq="eq-balance">ترازو (${balanceCount})</a>`);
              
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
                  <span>موردی در تجهیزات یافت نشد. اما <strong>${generalCount} مورد</strong> در قوانین عمومی یافت شد.</span>
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
                <span>تعداد <strong>${activeEqCount} مورد</strong> در راهنمای این دستگاه یافت شد.</span>
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
  const compatSelectA = document.getElementById('compat-chemical-a');
  const compatSelectB = document.getElementById('compat-chemical-b');
  const compatResultBox = document.getElementById('compat-result-box');
  const compatStatusIcon = document.getElementById('compat-status-icon');
  const compatStatusTitle = document.getElementById('compat-status-title');
  const compatStatusBadge = document.getElementById('compat-status-badge');
  const compatDesc = document.getElementById('compat-desc');

  function populateCompatDropdowns() {
    if (!compatSelectA || !compatSelectB) return;
    if (!window.chemicalMsdsDb) {
      setTimeout(populateCompatDropdowns, 100);
      return;
    }

    // Populate using sorted chemicals (same order as MSDS)
    let sortedChems = [];
    try {
      sortedChems = [...window.chemicalMsdsDb].sort((a, b) => a.nameFa.localeCompare(b.nameFa, 'fa'));
    } catch (err) {
      sortedChems = window.chemicalMsdsDb;
    }

    compatSelectA.innerHTML = '<option value="">-- انتخاب ماده اول (A) --</option>';
    compatSelectB.innerHTML = '<option value="">-- انتخاب ماده دوم (B) --</option>';

    sortedChems.forEach(chem => {
      const optionA = document.createElement('option');
      optionA.value = chem.id;
      optionA.textContent = `${chem.nameFa} (${chem.nameEn})`;
      compatSelectA.appendChild(optionA);

      const optionB = document.createElement('option');
      optionB.value = chem.id;
      optionB.textContent = `${chem.nameFa} (${chem.nameEn})`;
      compatSelectB.appendChild(optionB);
    });
  }

  populateCompatDropdowns();

  function checkCompatibility() {
    const idA = compatSelectA.value;
    const idB = compatSelectB.value;

    if (!idA || !idB) {
      compatResultBox.style.display = 'none';
      return;
    }

    const chemA = window.chemicalMsdsDb.find(c => c.id === idA);
    const chemB = window.chemicalMsdsDb.find(c => c.id === idB);

    if (!chemA || !chemB) return;

    // 1. Check if same chemical
    if (idA === idB) {
      showCompatResult('compatible', 'ماده یکسان (Same Substance)', 
        `هر دو مورد انتخاب شده ${chemA.nameFa} هستند. ذخیره یا اختلاط این دو مورد با هم کاملاً سازگار و ایمن است.`);
      return;
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
      showCompatResult('danger', 'تداخل مستقیم و شدید (Severe Incompatibility)', directConflictText);
      return;
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
      showCompatResult('warning', 'تداخل اسید و باز (Neutralization Warning)', 
        `اسیدها و بازها هرگز نباید در یک گالن تخلیه یا کنار هم نگهداری شوند. اختلاط مستقیم آن‌ها واکنش خنثی‌سازی شدید همراه با تولید حرارت بسیار زیاد ایجاد می‌کند که می‌تواند منجر به جوشش اسید و پاشش مواد خورنده شود.`);
      return;
    }

    if ((catA === 'acid' && catB === 'cyanide_sulfide') || (catB === 'acid' && catA === 'cyanide_sulfide')) {
      showCompatResult('danger', 'خطر تولید گاز فوق‌العاده سمی (Lethal Gas Hazard)', 
        `بسیار خطرناک! اسیدها در تماس با ترکیبات سیانیدی یا سولفیدی، فوراً گازهای فوق‌العاده کشنده و سمی هیدروژن سیانید (HCN) یا هیدروژن سولفید (H₂S) تولید می‌کنند. هرگز نباید در مجاورت یکدیگر قرار گیرند یا مخلوط شوند.`);
      return;
    }

    if ((catA === 'oxidizer' && catB === 'organic_solvent') || (catB === 'oxidizer' && catA === 'organic_solvent')) {
      showCompatResult('danger', 'خطر حریق خودبه‌خودی و انفجار (Explosion Hazard)', 
        `بسیار خطرناک! مواد اکسیدکننده در حضور حلال‌های آلی یا مواد قابل اشتعال می‌توانند واکنش‌های به شدت گرمازا، حریق خودبه‌خودی یا انفجار فوری بدون نیاز به جرقه ایجاد کنند. این دو گروه را کاملاً مجزا نگهداری کنید.`);
      return;
    }

    if (catA === 'water_reactive' || catB === 'water_reactive') {
      showCompatResult('danger', 'خطر واکنش شدید با رطوبت و حلال‌های آبی (Water Reactive Hazard)', 
        `بسیار خطرناک! مواد واکنش‌دهنده با آب در تماس با حلال‌های آبی، محلول‌های اسیدی/بازی یا حتی رطوبت هوا، واکنش انفجاری نشان داده و گازهای آتش‌گیر یا سمی به همراه حرارت بسیار بالا تولید می‌کنند.`);
      return;
    }

    if ((catA === 'acid' && catB === 'organic_solvent') || (catB === 'acid' && catA === 'organic_solvent')) {
      // Check if it's nitric acid + organic
      if (idA === 'nitric_acid' || idB === 'nitric_acid') {
        showCompatResult('danger', 'خطر واکنش شدید اسید نیتریک با مواد آلی (Violent Reaction Hazard)',
          `بسیار خطرناک! اسید نیتریک یک اکسیدکننده بسیار قوی و اسید معدنی است. ترکیب آن با حلال‌های آلی (مانند استون، اتانول) باعث واکنش به شدت گرمازا، تولید گازهای قهوه‌ای سمی (NOx) و انفجار شدید گالن پسماند می‌شود.`);
        return;
      }
    }

    // Default: Compatible
    showCompatResult('compatible', 'بدون تداخل مستقیم (Compatible for Storage)', 
      `تداخل مستقیم یا واکنش شدیدی بین ${chemA.nameFa} و ${chemB.nameFa} ثبت نشده است. با این حال، جهت دفع پسماند آن‌ها حتماً اصول تفکیک را رعایت کرده و اسیدها را در گالن‌های اسیدی و حلال‌های آلی را بر اساس هالوژن‌دار بودن در گالن مخصوص (قرمز یا زرد) تخلیه نمایید.`);
  }

  function showCompatResult(status, title, desc) {
    compatResultBox.className = 'compat-result-box'; // reset
    compatResultBox.classList.add(status);

    compatStatusIcon.className = 'material-symbols-outlined'; // reset
    compatStatusIcon.classList.add(status);
    
    // Set appropriate icon
    if (status === 'compatible') {
      compatStatusIcon.textContent = 'check_circle';
      compatStatusBadge.textContent = 'سازگار';
    } else if (status === 'warning') {
      compatStatusIcon.textContent = 'warning';
      compatStatusBadge.textContent = 'احتیاط / تداخل عمومی';
    } else if (status === 'danger') {
      compatStatusIcon.textContent = 'dangerous';
      compatStatusBadge.textContent = 'ناسازگار / خطر شدید';
    }

    compatStatusBadge.className = ''; // reset
    compatStatusBadge.classList.add(status);

    compatStatusTitle.textContent = title;
    compatDesc.textContent = desc;

    compatResultBox.style.display = 'block';
  }

  if (compatSelectA && compatSelectB) {
    compatSelectA.addEventListener('change', checkCompatibility);
    compatSelectB.addEventListener('change', checkCompatibility);
  }
});
