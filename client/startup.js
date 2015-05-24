

    console.log("Starting up..");
Meteor.startup(function(){
    
    console.log("Starting up..");
    HTTP.get(
        "graph.facebook.com/v2.3/me/events",
        {
         params: {
            format:"json",
            "access-token": "CAACEdEose0cBAK9RMT9ZC8gVOZCx3Jn1tytsewlTZAQmQMCTJFQ6fK3gUMFu5sPZAHmSxCkYQVL8JSTAdWf8V0ZCyL5P0rCWc7JUjzoXBwlXszlVdUVqjZAN9q5qpU9GiEZBVrZBjHuZCrq3HRccxlA6HBQllBnF04LtBYzYV94ZCLPz0udul16XE1hy483OMZAtD5QZA57omBUqStmtDG0k8bDtpYzF8EYmNqIQAWbwa3TbRwZDZD"
         }
        },
        function(err,data){
            if(err) {
                console.log("error: " + err);
                return;
            }
            var events;

            console.log("Result:"+JSON.stringify(data));
            Session.set("events",events);
    });

});