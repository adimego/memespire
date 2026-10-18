// Retires the old MemeSpire service worker at /memespire/ so installed copies stop serving the old cached site.
// The image cache (ms-img-v1) is left for the MemeGrotto worker at /memegrotto/, which migrates it (same origin).
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil((async () => {
  for (const k of await caches.keys())
    if (/^ms-(shell|data)-/.test(k) || k === "mg-shell-3533dbe91e" || k === "mg-data-3533dbe91e") await caches.delete(k);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type: "window" })) c.navigate(c.url);
})()));
