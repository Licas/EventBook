App.info({
  id: 'eventbook.app',
  name: 'EventBook',
  description: '',
  author: 'Manuel Morini',
  email: 'morinimanuel@gmail.com',
  website: 'http://eventbook.meteor.org',
  version: '0.0.1'
});


App.accessRule('http://*.meteor.local/*');
App.accessRule('http://*.facebook.com/*');
App.accessRule('https://*.facebook.com/*');

App.accessRule( "https://api.twitter.com/*", { launchExternal: false } );

App.accessRule('http://*.timulto.org/*');
App.accessRule('http://*.mqcdn.com/*');
App.accessRule('http://*.mapquestapi.com/*');
App.accessRule('http://*.openstreetmap.org/*');
App.accessRule('http://*.google.com/*');
App.accessRule('https://*.google.com/*');
App.accessRule('http://*.googleapis.com/*');
App.accessRule('https://*.googleapis.com/*');
App.accessRule('http://*.gstatic.com/*');
App.accessRule('https://*.gstatic.com/*');
App.accessRule('http://*..google-analytics.com.com/*');
App.accessRule('https://*..google-analytics.com.com/*');
