/*────────────────────────────
  Aymen Solutions – ETdigitalCard v1.0
  Service Worker (Offline + Cache)
────────────────────────────*/

const CACHE_NAME = "etdigitalcard-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.json",
  "./assets/profile.jpg",
  "./assets/logo.png"
];

// INSTALL SERVICE WORKER
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ACTIVATE (CLEAN OLD CACHES)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// FETCH (NETWORK FIRST, THEN CACHE)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const resClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, resClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
