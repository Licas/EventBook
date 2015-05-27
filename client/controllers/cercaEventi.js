
var paginationStep = 10; //5 elements for single page

Template.cercaeventi.rendered = function(){
    Session.set("pageIndex",0);

    geoLocalization.getLatLng();

    $('#query').focus();
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
    "keyup #query": function(event) {
        if (event.which == 13) {
            event.stopPropagation();
            Session.set("localEvents",[]);
            Meteor.flush();
            findEvents();
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
    "click #findEvents":function(event) {
        event.stopPropagation();
        findEvents();
    }

});



function findEvents() {
    Session.set("pageIndex",0);

    var friendList = Session.get("friendList");

    var lat = Session.get("lat");
    var lng = Session.get("lng");
    var query = $('#query').val();
    $('#query').val('');

    FB.api('/search?q=\"'+query+'\"&type=event&center='+lat+','+lng+'&limit=200',
          {access_token:Meteor.user().services.facebook.accessToken},
          function(res){
            var events= [];

            if (res && !res.error) {

                res.data.forEach(function(element) {
                    var timeToCompare;
                    if(element.end_time) {
                        timeToCompare = element.end_time;
                    } else {
                        timeToCompare = element.start_time;
                    }

                    if( eventUtil.checkEventEndTime(timeToCompare) ) {
                       fbGraphUtil.loadEventInvitedList(element.id, function(list){
                            element.invited = list;
                            events.push(element);
                            //events = eventUtil.sortEventsByInvited(events);
                            Session.set("localEvents",events);
                        });
                    }
                });

            } else {
                console.log("error occurred: " + JSON.stringify(res.error));
            }
    });
}
