// Brevo web push service worker (setup file provided by Brevo, hosted at the site root).
// It loads Brevo's SDK and initialises it with the client key from the registration URL
// (sw.js?key=...), which the Brevo SDK adds when it registers this worker.
//
// Update safety: this worker caches nothing and does not intercept fetches, so it cannot
// serve stale pages. skipWaiting/clients.claim make a new version of this file take over
// immediately instead of waiting for every tab to close.
self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

try {
  importScripts("https://cdn.brevo.com/js/sdk-loader.js");

  var match = /[?&]key=([^&]*)/.exec(self.location.search);
  var clientKey = match ? decodeURIComponent(match[1]) : "";

  if (clientKey && typeof Brevo !== "undefined") {
    Brevo.push(["init", { client_key: clientKey }]);
  }
} catch (error) {
  // If the CDN is unreachable the worker still installs and updates normally;
  // push features just stay inactive until the next successful load.
  console.warn("Brevo SDK could not be loaded in the service worker:", error);
}
