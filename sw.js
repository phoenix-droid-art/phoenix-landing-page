'use strict';

const CACHE_NAME = 'phoenix-offline-v1';
const OFFLINE_URL = '/offline.html';
const ASSETS = [
  OFFLINE_URL,
  '/src/assets/logo-phoenix.png',
  '/src/assets/logo-ico.png',
  '/src/fonts/Axiforma-Regular.woff2',
  '/src/fonts/Axiforma-Bold.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : undefined))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          return res;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME);
          const cached = await cache.match(OFFLINE_URL);
          return cached || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
        })
    );
    return;
  }

  if (req.method === 'GET') {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req).catch(() => cached))
    );
  }
});
