
var paginationStep = 5; //5 elements for single page

Template.cercaeventi.rendered = function(){
    Session.set("pageIndex",0);

    geoLocalization.getLatLng();
};

Template.cercaeventi.helpers({

    pageCount: function() {
        if(Session.get("localEvents")) {
            return Session.get("localEvents").length;
        }

        return 0;
    },
    pageIndex: function() {
        return Session.get("pageIndex");
    },
    eventList: function() {
        return Session.get("localEvents");
    },
    eventListPage: function() {
        var idx = 0;
        if(Session.get("localEvents")) {
            if(Session.get("pageIndex")) {
                idx = Session.get("pageIndex");
            } else {
                Session.set("pageIndex", idx);
            }

            return Session.get("localEvents").slice(idx, idx+paginationStep);
        } else {
            return [];
        }
    }
});


Template.cercaeventi.events({
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
    "click #checkFriends": function() {
        var friendList = Session.get("friendList");
        var events = Session.get("localEvents");

        for(index in events) {
            for(invIdx in events[index].invited) {
                var curr = events[index].invited[invIdx];
               // console.log("check friendship " + Meteor.user().services.facebook.id +  "(you) and " + curr.id);
                if(friendList.indexOf(curr.name) >= 0) {
                    curr.isfriend = true;
                    console.log("you have a friend " + JSON.stringify(curr));
                } else {
                    curr.isfriend = false;
                }
            }
        }
        Session.set("localEvents",events);
    },
    "click #findEvents":function() {
        Session.set("pageIndex",0);

        var friendList = Session.get("friendList");

        var lat = Session.get("lat");
        var lng = Session.get("lng");
        var query = $('#query').val();
        $('#query').val('');

        FB.api('/search?q='+query+'&type=event&center='+lat+','+lng,
              {access_token:Meteor.user().services.facebook.accessToken},
              function(res){
                var events= [];

                if (res && !res.error) {
                    res.data.forEach(function(element) {
                        //console.log("current event: "+JSON.stringify(element));

                        FB.api('/'+element.id+'/invited',
                               'get',
                               {access_token:Meteor.user().services.facebook.accessToken},
                               function(response){
                            if (response && !response.error) {
                                element.invited = response.data;

                                for(index in  element.invited) {
                                    if(friendList.indexOf(element.invited[index].name) >= 0) {
                                        element.invited[index].isfriend = true;
                                        console.log("you have a friend " + JSON.stringify(element.invited[index].name));
                                    } else {
                                        element.invited[index].isfriend = false;
                                    }
                                }

                                events.push(element);
                                //console.log("invitation list: " + JSON.stringify(element.invited));
                                Session.set("localEvents",events);
                            } else {
                                console.log("error in retrieving invitation list for event " + element.id + ". Error " + JSON.stringify(response.error));
                            }
                        });

                    });

                } else {
                    console.log("error occurred: " + JSON.stringify(res.error));
                }
        });
    }

});