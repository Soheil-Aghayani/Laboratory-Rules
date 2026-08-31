const CACHE_VERSION = 'lab-rules-v1';
const APP_SHELL = [
  './',
  './index.html',
  './offline.html',
  './manifest.webmanifest',
  './styles.min.css?v=4.0',
  './script.min.js?v=4.0',
  './chatbot/chatbot.min.css?v=4.0',
  './chatbot/chatbot.min.js?v=4.0',
  './chatbot/msds/msds-db.min.js?v=4.0',
  './asset/vazirmatn-arabic.woff2',
  './asset/material-symbols-outlined-subset.woff2',
  './asset/outfit-latin.woff2',
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
            caches.open(CACHE_VERSION).then((cache) => cache.put('./index.html', responseCopy));
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
