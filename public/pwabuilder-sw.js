// Retire the old offline cache so visitors receive the current site.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    await caches.delete('pwabuilder-offline');
    await self.registration.unregister();
    await self.clients.claim();
  })());
});
