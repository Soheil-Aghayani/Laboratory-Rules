const CACHE_VERSION = 'lab-rules-v71';
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
  './elements.min.css?v=1.4',
  './site-pages.min.css?v=1.7',
  './asset/icon-system.min.js?v=1.0',
  './asset/icons.svg',
  './script.min.js?v=7.1',
  './site-runtime.min.js?v=1.2',
  './equipment-data.min.js?v=2.2',
  './gallery.min.js?v=3.1',
  './elements-data.min.js?v=2.2',
  './elements.min.js?v=2.4',
  './welcome-carousel.min.js?v=2.2',
  './data/elements.json',
  './data/chemical-records.json',
  './data/chemical-index.json',
  './data/catalog-index.json',
  './equipment-detail.min.js?v=1.8',
  './equipment-detail.min.css?v=1.8',
  './catalog-redesign.min.css?v=1.5',
  './catalog-detail-chrome.min.css?v=1.0',
  './catalog-detail-runtime.min.js?v=1.1',
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
  './Equipment/beakers.html',
  './Equipment/conical-centrifuge-tubes.html',
  './Equipment/measuring-cylinders.html',
  './Equipment/boiling-flasks.html',
  './Equipment/erlenmeyer-flasks.html',
  './Equipment/filter-flasks.html',
  './Equipment/wash-bottles.html',
  './Equipment/vials.html',
  './asset/equipment/beakers-multiple-volumes.webp',
  './asset/equipment/beaker-low-form.webp',
  './asset/equipment/volumetric-flasks-multiple-volumes.webp',
  './asset/equipment/volumetric-flask-5ml.webp',
  './asset/equipment/measuring-cylinders-multiple-volumes.webp',
  './asset/equipment/conical-centrifuge-tube-15ml.webp',
  './asset/equipment/conical-centrifuge-tube-50ml.webp',
  './asset/equipment/measuring-cylinder-5ml.webp',
  './asset/equipment/measuring-cylinder-10ml.webp',
  './asset/equipment/measuring-cylinder-50ml.webp',
  './asset/equipment/measuring-cylinder-100ml.webp',
  './asset/equipment/measuring-cylinder-250ml.webp',
  './asset/equipment/measuring-cylinder-500ml.webp',
  './asset/equipment/measuring-cylinder-1000ml.webp',
  './asset/equipment/boiling-flask-round-joint.webp',
  './asset/equipment/boiling-flask-flat-bottom.webp',
  './asset/equipment/boiling-flask-round-bottom.webp',
  './asset/equipment/erlenmeyer-flask-joint.webp',
  './asset/equipment/erlenmeyer-flask-wide-mouth.webp',
  './asset/equipment/erlenmeyer-flask-screw-cap.webp',
  './asset/equipment/erlenmeyer-flask-narrow-mouth.webp',
  './asset/equipment/filter-flask.webp',
  './asset/equipment/wash-bottle.webp',
  './asset/equipment/vial.webp',
  './asset/equipment/porcelain-crucible-medium.webp',
  './asset/equipment/fused-quartz-crucible.webp',
  './asset/equipment/alumina-crucible.webp',
  './asset/equipment/nickel-crucible.webp',
  './asset/equipment/nickel-chromium-crucible.webp',
  './asset/equipment/zirconium-crucible.webp',
  './asset/gallery/catalog-equipment-hero.webp',
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
