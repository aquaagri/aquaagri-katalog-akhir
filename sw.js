const CACHE_NAME = "aquaagri-pwa-v1";
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/nama-brand.png",
  "/banner-bahari-real.jpg"
];

self.addEventListener("install", function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE_ASSETS).catch(function () {});
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// Strategi Network-First: Selalu ambil data terbaru dari server/database jika online,
// gunakan cache hanya jika jaringan pengguna sedang terputus (offline).
self.addEventListener("fetch", function (event) {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  // Jangan cache request API Supabase atau halaman Admin
  if (url.hostname.includes("supabase.co") || url.pathname.includes("admin")) {
    return;
  }

  event.respondWith(
    fetch(req)
      .then(function (networkRes) {
        if (networkRes && networkRes.status === 200 && url.origin === self.location.origin) {
          const copy = networkRes.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(req, copy).catch(function () {});
          });
        }
        return networkRes;
      })
      .catch(function () {
        return caches.match(req).then(function (cachedRes) {
          return cachedRes || caches.match("/index.html");
        });
      })
  );
});
