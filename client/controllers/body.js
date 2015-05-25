
Template.body.rendered = function(){
    if(!Session.get("friendList")) {
        Session.set("friendList", []);
    }
};

Template.body.helpers({
    yourEventList: function() {
        return Session.get("yourEventList");
    },
    friendList: function() {
        return Session.get("friendList");
    }
});

Template.body.events({
    "click #addfriend": function() {
        var friendName = $('#addfriendin').val();
        $('#addfriendin').val('');

        if(friendName) {
            var friendList = Session.get("friendList");

            if(friendList.indexOf(friendName) < 0) {
                friendList.push(friendName);
                Session.set("friendList", friendList);
            }
        }
    },

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
