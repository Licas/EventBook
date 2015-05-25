
var paginationStep = 5; //5 elements for single page

Template.body.rendered = function(){
    Session.set("pageIndex",0);
    geoLocalization.getLatLng();
};

Template.body.helpers({
    yourEventList: function() {
        return Session.get("yourEventList");
    },
    eventList: function() {
        return Session.get("localEvents");
    },
    pageCount: function() {
        return Session.get("localEvents").length;
    },
    pageIndex: function() {
        return Session.get("pageIndex");
    },
    eventListPage: function() {
        var idx = 0;
        if(Session.get("pageIndex")) {
            idx = Session.get("pageIndex");
        } else {
            Session.set("pageIndex", idx);
        }

        return Session.get("localEvents").slice(idx, idx+paginationStep);
    },
    isfriend: function() {
        FB.api('/me/friends/'+this.id,//+ friend_id,
               'get',
               {access_token:Meteor.user().services.facebook.accessToken},
               function(res){

            if (res && !res.error) {
                if(res.data) {
                    console.log("is your friend? " + res.data);
                    Session.set("isfriend",res.data);
                }
            }  else {
                console.log("error occurred: " + res.error);
                Session.set("isfriend",false);
            }
        });

        return Session.get("isfriend");
    }
});

Template.body.events({
    "click #checkFriends": function() {

        for(index in Session.get("localEvents")) {
            for(invIdx in Session.get("localEvents")[index].invited) {
                var curr = Session.get("localEvents")[index].invited[invIdx];
                console.log("check friendship " + Meteor.user().services.facebook.id +  "(you) and " + curr.id);
                FB.api('/'+Meteor.user().services.facebook.id+'/friends/' + curr.id,
                    'get', {
                        access_token: Meteor.user().services.facebook.accessToken
                    },
                    function (res) {

                        if (res && !res.error) {
                            if (res.data) {
                                console.log("is your friend? " + res.data);
                                Session.get("localEvents")[index].invited[invIdx].isfriend = res.data;
                            }
                        } else {
                            console.log("error occurred: " + res.error);
                            Session.get("localEvents")[index].invited[invIdx].isfriend = false;
                        }
                });
            }
        }
    },
    "click #prevEvent": function() {
        if( Session.get("pageIndex") > 0) {
            Session.set("pageIndex", Session.get("pageIndex") - paginationStep);
        }
    },
    "click #nextEvent": function() {
        if( Session.get("pageIndex") <= Session.get("localEvents").length) {
            Session.set("pageIndex", Session.get("pageIndex") + paginationStep);
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
    },

    "click #findEvents":function() {

        var lat = Session.get("lat");
        var lng = Session.get("lng");
        var query = $('#query').val();

        //FB.api('/search?q='+query+'&type=event&center='+lat+','+lng+'&distance=10000',
        FB.api('/search?q='+query+'&type=event',
              {access_token:Meteor.user().services.facebook.accessToken},
              function(res){
                var events= [];

                if (res && !res.error) {
                    res.data.forEach(function(element) {
                        //console.log("current event: "+JSON.stringify(element));

                        FB.api('/'+element.id+'/invited',function(response){
                            element.invited= response.data;
                            events.push(element);
                            console.log("invitation list: " + JSON.stringify(element.invited));
                            Session.set("localEvents",events);
                        });

                    });

                } else {
                    console.log("error occurred: " + JSON.stringify(res.error));
                }
        });
    }
});
