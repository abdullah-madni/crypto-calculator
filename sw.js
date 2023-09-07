const siteCacheName = 'stite-static-v1.1';
const dynamicCacheName = 'site-dynamic-v1.1';

const assets = [
    '/',
    '/index.html',
    '/css/style.css',
    '/css/bootstrap.css',
    '/img/logo.png',
    '/img/maskable_icon_x192.png',
    '/js/myScript.js',
    '/js/jquery-3.7.1.js',
    '/js/bootstrap.bundle.js',
    '/manifest.json',
    '/sw.js'
];


self.addEventListener('install', event => {
    console.log("Service worker installed");
    event.waitUntil(
        caches.open(siteCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    )
});


self.addEventListener('activate', event => {
    console.log("Service worker activated");
    event.waitUntil(
        caches.keys().then(keys => {
            // console.log(key);
            return Promise.all(
                keys.filter(key => key != siteCacheName && key != dynamicCacheName)
                    .map(key => caches.delete(key))
            );
        })
    )
});



self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(async (cacheRes) => {
            if (cacheRes) {
                return cacheRes;
            } else {
                const fetchRes = await fetch(event.request);
                if (fetchRes.status == 404) {
                    return fetchRes;
                } else {
                    return caches.open(dynamicCacheName).then(cache => {
                        cache.put(event.request.url, fetchRes.clone()).then(() => fetchRes);
                    });
                }
            }
        })
    );
});
