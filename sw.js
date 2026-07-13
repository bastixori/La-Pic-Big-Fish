const CACHE_NAME = 'bigfish-v8';
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

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                // Try to cache everything, but catch individual errors so it doesn't fail the whole install
                return Promise.allSettled(
                    URLS_TO_CACHE.map(url => {
                        return cache.add(url).catch(() => {});
                    })
                );
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    // Only intercept HTTP/HTTPS GET requests
    if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(networkResponse => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        if (event.request.url.startsWith('http')) {
                            cache.put(event.request, responseClone).catch(() => {});
                        }
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                return caches.match(event.request);
            })
    );
});
