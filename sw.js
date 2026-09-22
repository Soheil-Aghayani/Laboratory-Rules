const CACHE_VERSION = 'lab-rules-v56';
const APP_SHELL = [
  './',
  './index.html',
  './rules.html',
  './quiz.html',
  './equipment.html',
  './gallery.html',
  './elements.html',
  './offline.html',
  './manifest.webmanifest',
  './styles.min.css?v=6.3',
  './elements.min.css?v=1.3',
  './site-pages.min.css?v=1.1',
  './asset/icon-system.min.js?v=1.0',
  './asset/icons.svg',
  './script.min.js?v=7.1',
  './site-runtime.min.js?v=1.1',
  './equipment-data.min.js?v=2.1',
  './gallery.min.js?v=2.1',
  './elements-data.min.js?v=2.1',
  './elements.min.js?v=2.1',
  './welcome-carousel.min.js?v=2.1',
  './data/elements.json',
  './data/chemical-records.json',
  './data/chemical-index.json',
  './data/catalog-index.json',
  './equipment-detail.min.js?v=1.7',
  './equipment-detail.min.css?v=1.5',
  './asset/equipment/crucible-generic.svg',
  './Equipment/volumetric-flasks.html',
  './Equipment/reagent-bottles.html',
  './Equipment/petri-dishes.html',
  './Equipment/porcelain-crucible.html',
  './Equipment/glass-funnel-long-stem.html',
  './Equipment/serological-pipettes.html',
  './Equipment/watch-glass.html',
  './Equipment/glass-burette.html',
  './Equipment/separating-funnel.html',
  './Equipment/buchner-funnel.html',
  './Equipment/porcelain-mortar-pestle.html',
  './Equipment/screw-cap-test-tube.html',
  './Equipment/crucible-tongs.html',
  './Equipment/crystallizing-dish.html',
  './Equipment/vacuum-desiccator.html',
  './Equipment/coiled-distillate.html',
  './Equipment/pipette-stand.html',
  './Equipment/allihn-condenser.html',
  './Equipment/buffer-solutions.html',
  './Equipment/silica-gel.html',
  './chatbot/chatbot.min.css?v=5.7',
  './chatbot/chatbot.min.js?v=5.7',
  './chatbot/msds/msds-db.min.js?v=5.7',
  './asset/vazirmatn-arabic.woff2',
  './Waste%20Lab.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_VERSION)
          .map((cacheName) => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const requestUrl = new URL(request.url);

  if (request.method !== 'GET' || requestUrl.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const responseCopy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, responseCopy));
          }
          return response;
        })
        .catch(() => caches.match(request)
          .then((cached) => cached || caches.match('./index.html'))
          .then((cached) => cached || caches.match('./offline.html')))
    );
    return;
  }

  const networkUpdate = fetch(request).then((response) => {
    if (response.ok) {
      const responseCopy = response.clone();
      caches.open(CACHE_VERSION).then((cache) => cache.put(request, responseCopy));
    }
    return response;
  });

  event.waitUntil(networkUpdate.catch(() => undefined));
  event.respondWith(caches.match(request).then((cached) => cached || networkUpdate));
});
