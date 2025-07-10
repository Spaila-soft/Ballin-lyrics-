const CACHE_NAME = "Ballin lyrics";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/icon-192.png",
  "/icon-512.png",
  "/screenshot1.png",
  "/video/Sunday_Service_Choir___Lord_You_re_Holy_Ballin__Instrumental_Music_and_Lyrics_Original_Key__G_(1080p).mp4",
  "/songs/Sunday_Service_Choir___Lord_You_re_Holy_Ballin__Instrumental_Music_and_Lyrics_Original_Key__G_(256k).mp3",
  "/songs/sun.mp3"
  
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
