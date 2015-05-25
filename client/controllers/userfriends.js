
Template.userfriends.rendered = function(){

    if(!Session.get("friendList")) {
        Session.set("friendList", []);
    }
};

Template.userfriends.helpers({
    friendList: function() {
        return Session.get("friendList");
    }
});

Template.userfriends.events({
    "click #addfriend": function() {
        var friendName = $('#addfriendin').val();
        $('#addfriendin').val('');

        if(friendName) {
            var friendList = Session.get("friendList");

            if(friendList.indexOf(friendName) < 0) {
                friendList.push(friendName);
                Session.set("friendList", friendList);
                localStorage.setItem("friendList",friendList);
            }
        }
    }
});
