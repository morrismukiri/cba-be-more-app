if (Meteor.isClient) {
    Session.setDefault('loggedIn', false);
    Session.setDefault('authorised', false);
    Session.setDefault('hasAnseredTrivia', false);
    Session.setDefault('currentLevel', 0);
 //   console.log('It\'s only fair that you get to peek uder the hood after all the picking I\'ve done in my days:)\n Contact me through morrismukiri@gmail.com and we can have a chat about this')

    Meteor.subscribe('Questions');
    Meteor.subscribe('howItWorksItems');
    Meteor.subscribe('rewards');
    Meteor.subscribe('userinfo');
    Meteor.subscribe('userActivity');
    Meteor.subscribe('users');
    Meteor.call('getTime', function (e,d) {
        if(!e){
            Session.set('today',d);
        }
    });
    Template.fbApp.helpers({
        isOperaMini: function () {
            return !!window['operamini'];
        },
        currentLevel: function () {
            var level = Meteor.user().currentLevel;// ? Meteor.user().currentLevel : 0;
            //console.log('level ' + level);
            return level;
            //return Session.get('currentLevel')===level;

        },
        isLevel: function (level) {
            var curLevel = Meteor.user().currentLevel ? Meteor.user().currentLevel : 0;
            //console.log('someone asked for levels ' + level + ' But I only know of ' + curLevel);
            return curLevel === level;
        },
        toUpdateProfile: function () {
            var curLevel=Meteor.user().currentLevel,
                profileInActivity=userActivity.find({
                    user: Meteor.userId(),
                    activity: 'profileEdit',
                }).count();
           // console.log('user at level '+ curLevel+' profile edits in activity '+ profileInActivity);
            return profileInActivity===0;
        },
        toAnsewerTrivia: function () {
            var curLevel=Meteor.user().currentLevel,
                quizInActivity=userActivity.find({
                        user: Meteor.userId(),
                        activity: 'quiz',
                    }).count();
                //console.log('user at level '+ curLevel+' quiz in activity '+ quizInActivity);
                return quizInActivity===0;

        }

    });
    isAtLevel = function (level) {
        var curLevel = Meteor.user().currentLevel;
        console.log('someone asked for levels ' + level + ' But I at level ' + curLevel);
        var l = true;
        if (curLevel === level) {
            l = true
        } else {
            l = false
        }
        return l;
    };
    Template.howItWorks.helpers({
        howItWorksItems: function () {
            return howItWorksItems.find({}, {sort: {no: 1}});
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
        },
        'change #acceptTnC': function (event) {
            if (event.target.checked) {
                $('.facebook-login').removeClass('disabled');
                $('.facebook-login').prop('disabled', false);
            } else {
                $('.facebook-login').addClass('disabled');
                $('.facebook-login').prop('disabled', true);
            }
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
            return Meteor.user();
        }
    });
    Template.updateProfileNew.helpers({
        currentUserInfoUpdate: function () {
            //console.log('coming for user info');
            // console.log(Meteor.user());
            return Meteor.user();
        },
        userProfileSchema: function () {
            return Schemas.UserUpdate;
        }
    });
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

            var QnA = {};

            for (i = 1; i <= 10; i++) {
            //for (i = 1; i <= 10; i++) {
                var ans=$("[name='q[" +i +"]']:checked").val();//ev.target['q[]'].value;

                QnA['q[' + i + ']'] = ans;
                console.log( ev.target['q[' + i + ']'].value);
                Meteor.call('checkQuestion', i - 1, ans);
            }

            //console.log(QnA)
            Meteor.call('addActivity', 'quiz', QnA);
                Meteor.call('errorLog',ev.target);
            Router.go('/');

        //}
    }
    });
    Session.setDefault('hasShared', false);
    Template.infoContainer.events({
        'click #fbShare': function (ev) {
            //ev.target.preventDefault();
            FB.ui({
                method: 'share',
                href: 'http://j.mp/bemorechallenge',
            }, function (response) {
                Session.set('hasShared', true);
                //console.log('shared');
                Meteor.call('addActivity', 'share', null);
            });
        }
    });

    //Template.infoContainer.helpers({
    //    todayTrivia: function () {
    //        return Session.get('answeredTrivia');
    //    },
    //    hasShared: function () {
    //        return userActivity.findOne({
    //            user: Meteor.userId(),
    //            activity: 'share'
    //        });
    //    },
    //    answeredTrivia: function () {
    //        var today = new Date(),
    //            dd = today.getDate(),
    //            mm = today.getMonth() + 1, //January is 0!
    //            yyyy = today.getFullYear();
    //        return userActivity.find({
    //            user: Meteor.userId(),
    //            activity: 'trivia',
    //            recordedTime: {$gte: new Date(yyyy + '-' + mm + '-' + dd)}
    //        }).fetch();
    //    },
    //    accountVerified: function () {
    //        return Meteor.user().CBAAccount.verified
    //    }
    //
    //});
    //Template.registerHelper( 'todayTrivia', function () {
    //    return Session.get('answeredTrivia');
    //});
    Template.registerHelper('hasShared', function () {
        return userActivity.findOne({
            user: Meteor.userId(),
            activity: 'share'
        });
    });
    Session.setDefault('today',new Date());
    Template.registerHelper('answeredTrivia', function () {
        var today =Session.get('today'),
            dd = ("0" + (today.getDate())).slice(-2),
            dd2=today.getDate()-1,
            mm = today.getMonth() + 1, //January is 0!
            yyyy = today.getFullYear();
        //console.log('checking for date ');console.log(new Date(yyyy+'-'+mm+'-'+dd2+'T00:00:00.000Z'));
        return userActivity.find({
            user: Meteor.userId(),
            activity: 'trivia',
             recordedTime: {$gte: new Date(yyyy+'-'+mm+'-'+dd2+'T00:00:00.000Z')}
        }).count()>0;
    });
    Template.registerHelper('accountVerified', function () {
        return Meteor.user().CBAAccount.verified
    });
    Template.registerHelper('hasAnswerdQuiz', function () {
        return userActivity.find({
            user: Meteor.userId(),
            activity: 'quiz'
        }).count()>0;
    });
    Template.registerHelper('hasSpinWheel', function () {
        return userActivity.find({
            user: Meteor.userId(),
            activity: 'Wheelspin'
        }).fetch();
    });
    Session.setDefault('currentScore', 0);
    Template.info.helpers({
        currentScore: function () {
            console.log(Meteor.user().cumulativePoints);
            return Meteor.user().cumulativePoints;

        },
        img: function () {
            if (Meteor.userId()) {
                console.log('IMAGE:')
                return "https://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=small"
            } else {
                return "";
            }
        }
    });

    Meteor.subscribe('topPlayes');
    Template.leaderboardNew.helpers({
        leaderBoardPlayers: function () {
            //console.log(Session.get('topPlayers'));
            return Meteor.users.find({cumulativePoints: {$gt: 0}}, {sort: {cumulativePoints: -1}, limit: 30});
        },
        currentInstitution: function () {
            return Meteor.user().profile.institution;
        }

    });
    Template.spinWheel.rendered = function () {
        begin();
    }
    Template.spinWheel.events({
        'click #shareGift': function (ev) {
            ev.preventDefault();
            FB.ui({
                method: 'share',
                href: 'https://apps.facebook.com/bemorechallenge/invite/' + Meteor.userId(),
            }, function (response) {
                console.log('shared');
                Meteor.call('addActivity', 'share', null);
                ev.target.style.display = 'none';
            });

        }
    });
    Meteor.subscribe('terms');
    Template.terms.helpers({
        tnc: function () {
            oneTnc = terms.findOne({});
            return oneTnc;
        }
    });
    AutoForm.hooks({
        updateProfileNew: {
            // Called when any submit operation succeeds
            onSuccess: function (formType, result) {
                Meteor.call('addActivity', 'profileEdit', {formType: formType, result: result});
                //console.log('profile updated');
            }
        },
        cbaAccountForm: {
            // Called when any submit operation succeeds
            onSuccess: function (formType, result) {
                Meteor.call('addActivity', 'accountEdit', {formType: formType, result: result});
                //console.log('account updated');
                Router.go('/');
            }
        }
    });
    Template.trivia.helpers({
        triviaQuestions: function () {
            //console.log(Questions);

            return Questions.find({}, {limit: 1});
        },
        no: function () {
            return 1;
        }
    });
    //Session.setDefault('answeredTrivia', false);
    Template.trivia.events({
        'submit #triviaForm': function (ev) {
            ev.preventDefault();

            //if(ev.target.answer.value==Questions.findOne().answer){
            //console.log( ev.target['q[]'].value);
            var ans=$("[name='q[]']:checked").val();//ev.target['q[]'].value;
            Meteor.call('checkTrivia', {q: Questions.findOne()._id._str, a: ans},function(error,result){
                if(!error){
                    Meteor.call('addActivity', 'trivia', {q: Questions.findOne()._id._str, a: ans});
                    //Session.set('answeredTrivia', true);
                    Meteor.call('errorLog',Meteor.user().services.facebook.name +' Answered trivia using '+navigator.userAgent);
                }
            });
            //}
            //var result = Questions.findOne().answer === ev.target['q[1]'].value;
            if (Questions.findOne().answer === ans) {
                alert('Congratulations! You got it right');
            } else {
                alert('Sorry, wrong answer.');
            }
            //console.log(Meteor.user().services.facebook.name +' Answered '+ans +', Right answer is '+Questions.findOne().answer);
            //Meteor.call('errorLog', Meteor.user().services.facebook.name +' Answered '+ans+', Right answer is '+Questions.findOne().answer+' for question '+ Questions.findOne()._id._str);

            Router.go('/');
        }
    });
    Template.cbaAccount.helpers({
        currentUserInfoUpdate: function () {
            //console.log('coming for user info');
            // console.log(Meteor.user());
            return Meteor.user();
        }
    });
    Template.spinWheel.helpers({});
    Template.quiz.helpers({
        no: function () {
            return 1;
        }
    })
}