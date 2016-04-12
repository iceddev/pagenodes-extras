module.exports = {

  loadClient: function(RED){
    console.log('loading client');
  },
  loadBackend: function(RED){
    console.log('loading backend');
  },
  clientReady: function(RED){
    console.log('client ready');
  },
  backendReady: function(RED){
    console.log('backend ready');
  },
  loadServiceWorker: function(context){
    console.log('loading service worker');
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
