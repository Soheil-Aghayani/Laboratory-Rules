(() => {
      const assetVersion = '5.7';
      const assetCdnBase = '.';
      let msdsDbPromise = null;
      let chatbotPromise = null;
      let elementCatalogPromise = null;

      function loadScript(src) {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      function loadStyle(href) {
        const existing = document.querySelector(`link[data-lazy-style="${href}"]`);
        if (existing) return Promise.resolve();

        return new Promise((resolve, reject) => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = href;
          link.dataset.lazyStyle = href;
          link.onload = resolve;
          link.onerror = reject;
          document.head.appendChild(link);
        });
      }

      function loadMsdsDatabase() {
        if (window.chemicalMsdsDb) return Promise.resolve(window.chemicalMsdsDb);
        if (msdsDbPromise) return msdsDbPromise;

        msdsDbPromise = loadScript(`${assetCdnBase}/chatbot/msds/msds-db.min.js?v=${assetVersion}`)
          .then(() => {
            window.dispatchEvent(new Event('msdsdb:ready'));
            return window.chemicalMsdsDb;
          })
          .catch((error) => {
            msdsDbPromise = null;
            throw error;
          });

        return msdsDbPromise;
      }

      function loadChatbot() {
        if (chatbotPromise) return chatbotPromise;

        chatbotPromise = Promise.all([
          loadStyle(`${assetCdnBase}/chatbot/chatbot.min.css?v=${assetVersion}`),
          loadMsdsDatabase()
        ])
          .then(() => loadScript(`${assetCdnBase}/chatbot/chatbot.min.js?v=${assetVersion}`))
          .catch((error) => {
            chatbotPromise = null;
            throw error;
          });

        return chatbotPromise;
      }

      function loadElementCatalog() {
        if (window.elementCatalogReady) return Promise.resolve();
        if (elementCatalogPromise) return elementCatalogPromise;

        elementCatalogPromise = loadScript(`${assetCdnBase}/elements-data.min.js?v=2.2`)
          .then(() => loadScript(`${assetCdnBase}/elements.min.js?v=2.6`))
          .then(() => {
            window.elementCatalogReady = true;
          })
          .catch((error) => {
            elementCatalogPromise = null;
            throw error;
          });

        return elementCatalogPromise;
      }

      window.loadMsdsDatabase = loadMsdsDatabase;
      window.loadChatbot = loadChatbot;
      window.loadElementCatalog = loadElementCatalog;

      const hydrateMsds = () => loadMsdsDatabase().catch((error) => console.error('MSDS database failed to load:', error));

      const msdsSelect = document.getElementById('msds-chemical-select');
      if (msdsSelect) msdsSelect.addEventListener('focus', hydrateMsds, { once: true });

      const compatContainer = document.getElementById('compat-chemicals-container');
      const compatAddButton = document.getElementById('add-compat-chemical-btn');
      if (compatContainer) compatContainer.addEventListener('focusin', hydrateMsds, { once: true });
      if (compatAddButton) compatAddButton.addEventListener('click', hydrateMsds, { once: true });

      const elementAccordion = document.querySelector('.elements-accordion-primary');
      const elementHashPattern = /^#element-\d+$/i;
      const hydrateElements = () => {
        if (!elementAccordion || (!elementAccordion.open && !elementHashPattern.test(window.location.hash))) return;
        loadElementCatalog().catch((error) => console.error('Element catalog failed to load:', error));
      };
      if (elementAccordion) {
        elementAccordion.addEventListener('toggle', hydrateElements);
        document.getElementById('element-search')?.addEventListener('focus', hydrateElements, { once: true });
        if (elementHashPattern.test(window.location.hash)) {
          elementAccordion.open = true;
          hydrateElements();
        }
        window.addEventListener('hashchange', () => {
          if (elementHashPattern.test(window.location.hash)) {
            elementAccordion.open = true;
            hydrateElements();
          }
        });
      }

      const chatbotLoader = document.getElementById('chatbot-loader-fab');
      if (chatbotLoader) {
        chatbotLoader.addEventListener('click', async () => {
          if (chatbotLoader.disabled) return;
          chatbotLoader.disabled = true;
          chatbotLoader.setAttribute('aria-busy', 'true');

          try {
            await loadChatbot();
            chatbotLoader.remove();
            const chatbotFab = document.getElementById('chatbot-fab');
            if (chatbotFab) chatbotFab.click();
          } catch (error) {
            chatbotLoader.disabled = false;
            chatbotLoader.removeAttribute('aria-busy');
            console.error('Assistant failed to load:', error);
          }
        });
      }

      const offlineStatus = document.getElementById('offline-status');
      const updateOfflineStatus = () => {
        if (offlineStatus) offlineStatus.hidden = navigator.onLine;
      };

      updateOfflineStatus();
      window.addEventListener('online', updateOfflineStatus);
      window.addEventListener('offline', updateOfflineStatus);

      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('./sw.js', { scope: './' })
            .catch((error) => console.warn('Offline support failed to initialize:', error));
        }, { once: true });
      }
    })();
