const STATIC_CACHE_NAME = "simple-weather-v1";
const BASE_STATIC_URLS = [
    "/",
    "/index.html",
    "/manifest.json",
    "https://fonts.googleapis.com/css?family=Montserrat&amp;subset=latin-ext",
    "/css/main.min.css",
    "/js/main.js",
    "/font/weathericons-regular-webfont",
    "/font/weathericons-regular-webfont.svg",
    "/font/weathericons-regular-webfont.ttf",
    "/font/weathericons-regular-webfont.woff",
    "/font/weathericons-regular-webfont.woff2"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      cache.addAll([
        "/android-chrome-36x36.png",
        "/android-chrome-48x48.png",
        "/android-chrome-72x72.png",
        "/android-chrome-96x96.png",
        "/android-chrome-144x144.png",
        "/android-chrome-192x192.png",
        "/android-chrome-256x256.png",
        "/android-chrome-384x384.png",
        "/android-chrome-512x512.png"
      ]);
      return cache.addAll(STATIC_URLS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name.includes("simple-weather") && name !== STATIC_CACHE_NAME)
          .map(name => caches.delete(name))
      )
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});