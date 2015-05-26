var userInvitedLimit = 5000;

function loadEventInvitedList(eventId, callback) {
    //Bada alla paginazione
/* "paging": {
    "cursors": {
      "after": "MTAxMDI2OTU0Mzk1NDk0MDE=",
      "before": "MTAyMDM4NjY0Njg1OTQ0ODE="
    },
    "previous": "https://graph.facebook.com/v2.3/{{eventid}}/invited?limit=25&before=MTAyMDM4NjY0Njg1OTQ0ODE=",
    "next": "https://graph.facebook.com/v2.3/{{eventid}}/invited?limit=25&after=MTAxMDI2OTU0Mzk1NDk0MDE="
  }*/
    FB.api('/' + eventId + '/invited?limit=' + userInvitedLimit,
           'get',
           {access_token:Meteor.user().services.facebook.accessToken},
           function(response){

        var invitedList = [];

        if (response && !response.error) {
            invitedList = response.data;
        } else {
            console.log("Error " + JSON.stringify(response.error));
        }

        //console.log("Returning " + JSON.stringify(invitedList));
        callback(invitedList);
    });
}


function setNextInvitedChunk(nextHttpUrl,invitedList, callback) {
    FB.api(
        nextHttpUrl,
        'get',
        {access_token:Meteor.user().services.facebook.accessToken},
        function(res){

            if (res && !res.error) {
                invitedList.concat(res.data);
            } else {
                console.log("Error " + JSON.stringify(res.error));
            }

            var hasNextVal = res.paging && res.paging.next;
            var next;

            if(hasNextVal){
                next = res.paging.next;
                setNextInvitedChunk(next, invitedList);
            } else {
                callback(invitedList);
                console.log("calbacking");
            }
    });
}

fbGraphUtil = {

    loadEventInvitedList: function(eventId, callback) {
        loadEventInvitedList(eventId, callback);
    }


}
