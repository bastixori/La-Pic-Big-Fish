const CACHE_NAME = 'bigfish-v6';
const URLS_TO_CACHE = [
    '/La-Pic-Big-Fish/',
    '/La-Pic-Big-Fish/index.html',
    '/La-Pic-Big-Fish/menu.html',
    '/La-Pic-Big-Fish/menu_con_carrito.html',
    '/La-Pic-Big-Fish/carta_tradicional.html',
    '/La-Pic-Big-Fish/css/style.css',
    '/La-Pic-Big-Fish/js/main.js',
    '/La-Pic-Big-Fish/js/underwater.js'
];

// Install Event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(URLS_TO_CACHE))
            .then(() => self.skipWaiting())
            .catch(() => {})
    );
});

// Activate Event (Cleanup old caches)
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event (Network First Strategy to ensure fresh updates with offline fallback)
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then(networkResponse => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                return caches.match(event.request);
            })
    );
});
