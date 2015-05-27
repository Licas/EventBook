function sortEventsByInvited(eventList) {

    for(index in eventList) {
        var count = 0;
        if(eventList[index].invited) {
            count = eventList[index].invited.length;
        }

        eventList[index].invitedCount = count;
    }

    eventList.sort(function(a, b) {//DESCENDING ORDER

        if(b.invitedCount > a.invitedCount) {
            return 1;
        } else if (b.invitedCount > a.invitedCount) {
            return -1;
        }

        return 0;
    });

    return eventList;
}

function checkEventEndTime(event_end_time) {
    var today = moment();
    var moment_end_time = moment(event_end_time);

    if(today.isAfter(moment_end_time)) {
  //      console.log( event_end_time + " is a past event");
        return false;
    }

    //console.log("Comparing " + today + " with " + event_end_time);

    return true;
}

eventUtil = {


    sortEventsByInvited: function(eventList) {
        return sortEventsByInvited(eventList);
    },
    checkEventEndTime: function(endTime) {
        return checkEventEndTime(endTime);
    }
}
