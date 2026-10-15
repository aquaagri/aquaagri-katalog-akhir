importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Listener fetch untuk standar PWA & WebAPK (HANYA tangani aset GET lokal agar tidak mengganggu OneSignal Push)
self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  if (!event.request.url.startsWith("http")) return;

  try {
    const reqUrl = new URL(event.request.url);
    // Jangan mencegat request ke domain luar (OneSignal, Google FCM, Supabase, CDN)
    if (reqUrl.origin !== self.location.origin) return;
  } catch (err) {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request);
    })
  );
});
