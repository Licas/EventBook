Template.body.rendered = function(){
    geoLocalization.getLatLng();
};

Template.body.helpers({
    yourEventList: function() {
        return Session.get("yourEventList");
    },
        eventList: function() {
        return Session.get("localEvents");
    }

});

Template.body.events({

    "click #yourEvents":function() {
        console.log("your events");
        FB.api('/me/events',
               'get',
               {access_token:Meteor.user().services.facebook.accessToken},
               function(res){

            if (res && !res.error) {
               var events = [];

                if(res.data) {
                    events = res.data;
                }
                Session.set("yourEventList", events);
                console.log("RESPONSE\n"+JSON.stringify(events));
            }  else {
                console.log("error occurred: " + res.error);
            }
        });
    },

    "click #findEvents":function() {

        var lat = Session.get("lat");
        var lng = Session.get("lng");
        var query = $('#query').val();

        FB.api('/search?q='+query+'&type=event&center='+lat+','+lng+'&distance=10000',
              {access_token:Meteor.user().services.facebook.accessToken},
              function(res){
                var events= [];

                if (res && !res.error) {
                    res.data.forEach(function(element) {
                        console.log("current event: "+JSON.stringify(element));

                        FB.api('/'+element.id+'/invited',function(response){
                            element.invited= response.data;
                            events.push(element);

                            Session.set("localEvents",events);
                        });

                    });

                } else {
                    console.log("error occurred: " + JSON.stringify(res.error));
                }
        });
    }
});
