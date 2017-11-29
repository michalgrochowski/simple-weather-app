const CACHE_NAME = "simple-weather-v1";
const URLS_TO_CACHE  = [
    "/simple-weather-app/app/",
    "/simple-weather-app/app/index.html",
    "/simple-weather-app/app/manifest.json",
    "https://fonts.googleapis.com/css?family=Montserrat&amp;subset=latin-ext",
    "/simple-weather-app/app/css/main.min.css",
    "/simple-weather-app/app/js/main.js",
    "/simple-weather-app/app/font/weathericons-regular-webfont",
    "/simple-weather-app/app/font/weathericons-regular-webfont.svg",
    "/simple-weather-app/app/font/weathericons-regular-webfont.ttf",
    "/simple-weather-app/app/font/weathericons-regular-webfont.woff",
    "/simple-weather-app/app/font/weathericons-regular-webfont.woff2"
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name.includes("simple-weather") && name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
            if (response) {
                return response;
            }
            var fetchRequest = event.request.clone();
            return fetch(fetchRequest).then(
            function(response) {
                if(!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
            }
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
                .then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                }
            );
        })
    );
});