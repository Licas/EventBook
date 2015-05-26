function sortEventsByInvited(eventList) {

    for(index in eventList) {
        var count = eventList[index].invited.length;
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
}


eventUtil = {


    sortEventsByInvited: function(eventList) {
        sortEventsByInvited(eventList);
    }
}
