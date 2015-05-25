Template.userevents.helpers({
    yourEventList: function() {
        return Session.get("yourEventList");
    }
});


Template.userevents.events({
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
    }
});
