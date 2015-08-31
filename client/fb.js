

if (Meteor.isClient) {
    //configs
    //cbagroup.com

    //Meteor.subscribe('')

    //Accounts.ui.config({
    //    requestPermissions: {
    //        facebook: ['user_likes']
    //    }
    //});
    //body events
    Template.body.events({});
    //Body created
    Template.body.created = function () {
        //load facebook sdk
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '1654719238076726',
                xfbml      : true,
                version    : 'v2.4'
            });

            // ADD ADDITIONAL FACEBOOK CODE HERE
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        //end facebook sdk



    }

}