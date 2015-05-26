Template.event.events({

    "click .eventrow": function() {
        console.log("looking for event " + this.id + " details.");
        FB.api('/'+this.id + '/',
               'get',
               {access_token:Meteor.user().services.facebook.accessToken},
               function(res){

            if (res && !res.error) {
               var eventDetails = {};

                eventDetails = res;

                Session.set("eventDetails", eventDetails);
                //console.log("RESPONSE\n"+JSON.stringify(eventDetails));

                Router.go("/eventdetails");
            }  else {
                console.log("error occurred: " + res.error);
            }
        });
    }
});
