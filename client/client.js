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
        currentLevel: function (level) {
            var level = Session.get('currentLevel');
            console.log('level ' + level);
            return level;
            //return Session.get('currentLevel')===level;

        }
    });
    Meteor.call('getCurrentLevel', function (err, val) {
        if (err) {
            console.log('Error Trying to get level');
            console.log(err);
            throw new Meteor.Error("Could not get level");
        }
        Session.set('currentLevel', val);
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
                    Meteor.call('addActivity', 'signup', null);
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
    );
    Session.setDefault('leaderBoard', null);
    Template.appHome.helpers({
        topUsers: function () {
            var leaderB = Session.get('leaderBoard');//['name',points,url]
            if (leaderB) {

            }
            // return leaderBoards.find({},{sort:{}})
        }
    });
    Template.oneTimeQuiz.events({
        'submit #oneTimeQuiz': function (ev) {
            //get the answers
            ev.preventDefault();

            var QnA = [],
                points = 0;

            for (i = 1; i <= 5; i++) {
                Meteor.call('checkQuestion', i - 1, ev.target['q[' + i + ']'].value);
            }
            data = ev.target;
            Meteor.call('addActivity', 'quiz', data);
            Router.go('/');

        }
    });
    Template.infoContainer.events({
        'click #fbShare': function (ev) {
            //ev.target.preventDefault();
            FB.ui({
                method: 'share',
                href: 'https://apps.facebook.com/bemorechallenge/invite/' + this.userId,
            }, function (response) {
            });
        }
    });
    Session.setDefault('currentScore',0);
    Template.info.helpers({
        currentScore: function () {
            Meteor.call('getCurrentScore',function(err,res){
                if(!err){
                    Session.set('currentScore',res);
                }
            });
            return Session.get('currentScore');
            //var fromCollectionHelper = Meteor.users.getScore();
            //var fromHelper = Meteor.user().cumulativePoints;
            ////console.log('From collection ' + fromCollectionHelper);
            //console.log('From helper ' + fromHelper);
            //return fromHelper;
        }
    });


}