
if (Meteor.isClient) {
    Session.setDefault('loggedIn', false);
    Session.setDefault('authorised', false);
    Session.setDefault('hasAnseredTrivia', false);
    Session.setDefault('currentLevel', 0);


    Meteor.subscribe('questions');
    Meteor.subscribe('howItWorksItems');
    Meteor.subscribe('rewards');
//fb models
//    Template.fbLogin.helpers({
//        loggedIn: function () {
//            return Session.get('loggedIn');
//        },
//        authorised: function () {
//            return Session.get('authorised');
//        },
//        questions: function () {
//            //var foundQuestions= Meteor.call('fetchQuiz');
//            // fi//console.log(foundQuestions);
//
//            return questions.find({}); // foundQuestions;
//        },
//
//    });
    Template.fbApp.helpers({
        currentLevel:function(level){
            var level= Session.get('currentLevel');
                console.log('level '+level);
            return level;
            //return Session.get('currentLevel')===level;

        }
    });
    Meteor.call('getCurrentLevel',function(err,val){
        if (err) {
                console.log('Error Trying to get level');
                console.log(err);
                throw new Meteor.Error("Could not get level");
        }
        Session.set('currentLevel',val);
    });
    Template.howItWorks.helpers({
        howItWorksItems: function () {
            return howItWorksItems.find({});
        }
    });
    Template.rewards.helpers({
        rewards: function () {
            return rewards.find({});
        }
    });
    Template.unLoggedInBody.events({
        'click .facebook-login': function (event) {
            console.log('Trying to login');
            Meteor.loginWithFacebook({
                requestPermissions: ['public_profile', 'email']
            }, function (err) {

                if (err) {
                    console.log('Error Trying to login ');
                    console.log(err);
                    throw new Meteor.Error("Facebook login failed");
                } else {
                    console.log('login successful');
                    Meteor.call('fbAddEmail');
                    Meteor.call('addActivity','signup',null);
                }
            });
        }
        //,

        //currentInfo
        //'click #logout': function(event) {
        //    Meteor.logout(function(err){
        //        if (err) {
        //            throw new Meteor.Error("Logout failed");
        //        }
        //    })
        //}
    });
    //Meteor.subscribe('users');
    Template.updateProfile.helpers({
            currentUserInfo: function () {
                //console.log('getting user info...');
                //Meteor.call('getCurrentUserInfo');
                //var userinfo = Session.get('currentUser');
                var userinfo = Meteor.user();
                //console.log(userinfo);
                return userinfo;
            }
        }
    )

}