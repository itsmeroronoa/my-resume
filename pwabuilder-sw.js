// pwabuilder-sw.js

self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open("mysite-cache").then((cache) =>
      cache.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
        );
      })
    )
  );
});
