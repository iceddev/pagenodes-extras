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
  }
};
