const cacheName = 'gun-caches-v0.31'; // every time update the app, should update the cacheName 
const cacheNameDynamic = 'gun-caches-v0.31-dyn';
const filesToCache = [
    './',
    './index.html',
    './GunStyle.css',
    './GunHelperScript.js',
    './GunScript.js',
    './manifest.json',
    './sw.js',
];

// 
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(filesToCache);
        }
        )
    );
});

// update cache, delete old version caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== cacheName && key !== cacheNameDynamic) {
                    return caches.delete(key);
                }
            }))
        })
    );
    return self.clients.claim();
});


// cache first
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(cacheResponse => {
            return cacheResponse || fetch(e.request).then(async response => {
                console.log('fetch online');
                let cache = await caches.open(cacheNameDynamic);
                cache.put(e.request, response.clone());
                return response;
            });
        })
    );
});
