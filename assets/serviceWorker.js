(function () {
  'use strict';

  var cacheKey = 'v1';
  var cacheFontKey = 'v1';

  self.addEventListener('install', function (event) {
    event.waitUntil(
      caches.open(cacheKey)
        .then(function (cache) {
          return cache.addAll([
            '/img/abatantuono.jpg',
            '/img/boris.jpg',
            '/img/fantozzi.jpg',
            '/img/griffin.jpg',
            '/img/nanni.jpg',
            '/img/r.jpg',
            '/system.js'
          ]);
        })
    );
  });

  // A new ServiceWorker is now active
  self.addEventListener('activate', function (event) {
    event.waitUntil(
      caches.keys()
        .then(function (cacheNames) {
          return Promise.all(
            cacheNames.map(function (cacheName) {
              if (cacheName !== cacheKey && cacheName !== cacheFontKey) {
                return caches.delete(cacheName);
              }
            })
          );
        })
    );
  });

  // The page has made a request
  self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.match(event.request)
        .then(function (response) {
          if (response) {
            //console.log('From cache:', event.request.url);
            return response;
          }

          var fetchRequest = event.request.clone();
          return fetch(fetchRequest).then(
            function (response) {
              if (fetchRequest.url.indexOf('https://fonts.') === 0) {
                var responseToCache = response.clone();

                caches.open(cacheFontKey)
                  .then(function (cache) {
                    var cacheRequest = event.request.clone();
                    cache.put(cacheRequest, responseToCache);
                  });
              }

              return response;
            }
          );
        })
    );
  });
})();
