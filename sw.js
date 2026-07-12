const CACHE_NAME = 'bigfish-v1';
const URLS_TO_CACHE = [
    '/La-Pic-Big-Fish/',
    '/La-Pic-Big-Fish/index.html',
    '/La-Pic-Big-Fish/menu.html',
    '/La-Pic-Big-Fish/css/style.css'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(URLS_TO_CACHE))
            .catch(() => {})
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(() => {})
    );
});
