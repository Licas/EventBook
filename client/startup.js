

Meteor.startup(function(){
    
     window.fbAsyncInit = function() {
        FB.init({
          channelUrl:'http://localhost:3000',
          appId:    Meteor.settings.public.APP_ID,
          status:   true,
          cookie:   true,
          xfbml:    true,
          oauth:    true,
          version:'v2.3'
        });
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));


    Meteor.subscribe("users");

    Session.set("friendList", []);

    console.log("Starting up..");

    geoLocalization.getLatLng();
});
