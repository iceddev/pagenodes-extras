module.exports = {
  loadServiceWorker: function(context, CACHE_NAME){
    console.log('loading service worker');
    context.addEventListener('install', function(event) {
      var now = Date.now();

      var urlsToPrefetch = [
        'j5-worker.bundle.js',
        'function-worker.bundle.js'
      ];

      // All of these logging statements should be visible via the "Inspect" interface
      // for the relevant SW accessed via chrome://serviceworker-internals
      console.log('Handling install event. Resources to prefetch:', urlsToPrefetch);

      event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
          var cachePromises = urlsToPrefetch.map(function(urlToPrefetch) {
            // This constructs a new URL object using the service worker's script location as the base
            // for relative URLs.
            var url = new URL(urlToPrefetch, location.href);
            // Append a cache-bust=TIMESTAMP URL parameter to each URL's query string.
            // This is particularly important when precaching resources that are later used in the
            // fetch handler as responses directly, without consulting the network (i.e. cache-first).
            // If we were to get back a response from the HTTP browser cache for this precaching request
            // then that stale response would be used indefinitely, or at least until the next time
            // the service worker script changes triggering the install flow.
            url.search += (url.search ? '&' : '?') + 'cache-bust=' + now;

            var request = new Request(url);
            return fetch(request).then(function(response) {
              if (response.status >= 400) {
                throw new Error('request for ' + urlToPrefetch +
                  ' failed with status ' + response.statusText);
              }

              // Use the original URL without the cache-busting parameter as the key for cache.put().
              return cache.put(urlToPrefetch, response);
            }).catch(function(error) {
              console.error('Not caching ' + urlToPrefetch + ' due to ' + error);
            });
          });

          return Promise.all(cachePromises).then(function() {
            console.log('Pre-fetching complete.');
          });
        }).catch(function(error) {
          console.error('Pre-fetching failed:', error);
        })
      );
    });
  },
  registerServiceWorker: function(){
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.bundle.js')
      .then(function(reg) {
        console.log('Service Worker Detected', reg);

      }).catch(function(err) {
        console.log('No Service Worker Detected', err);
      });
    }
  }
};
