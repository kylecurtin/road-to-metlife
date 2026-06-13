// Offline support that still updates: network-first for the page, cache-first for static assets.
const CACHE = 'worldcupplanner-v4';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const isPage = req.mode === 'navigate' || req.destination === 'document';

  if (isPage) {
    // Network-first with a timeout, falling back to cache so a hung/offline
    // connection still paints. Only cache a genuinely good page response.
    const fromCache = () => caches.match(req).then(hit => hit || caches.match('./index.html'));
    const network = new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('timeout')), 3500);
      fetch(req).then(res => { clearTimeout(timer); resolve(res); }, err => { clearTimeout(timer); reject(err); });
    });
    e.respondWith(
      network.then(res => {
        if (res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put('./index.html', copy));
        }
        return res;
      }).catch(fromCache)
    );
    return;
  }

  // Cache-first for everything else (icons, manifest, fonts).
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      if (res.ok && req.url.startsWith(self.location.origin)) {
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => undefined))
  );
});
