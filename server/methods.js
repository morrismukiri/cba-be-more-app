if (Meteor.isServer) {
    var oneTimeAnswers =
        [
            {
                no: 1,
                A: 'B'
            },
            {
                no: 2,
                A: 'D'
            },
            {
                no: 3,
                A: 'C'
            },
            {
                no: 4,
                A: 'C'
            },
            {
                no: 5,
                A: 'B'
            },
            {
                no: 6,
                A: 'B'
            },
            {
                no: 7,
                A: 'B'
            },
            {
                no: 8,
                A: 'B'
            },
            {
                no: 9,
                A: 'A'
            },
            {
                no: 10,
                A: 'B'
            }
        ];
    Meteor.methods({
        fetchQuiz: function () {
            var data = Questions.find({});
            return data;
        },
        fbAddEmail: function () {
            var user = Meteor.user();
            if (user.hasOwnProperty('services') && user.services.hasOwnProperty('facebook')) {
                var fb = user.services.facebook;
                var result = Meteor.http.get('https://graph.facebook.com/v2.4/' + fb.id + '?access_token=' + fb.accessToken + '&fields=name,email');

                if (!result.error) {
                    Meteor.users.update({_id: user._id}, {
                        $addToSet: {
                            "emails": {
                                'address': result.data.email
                                //,
                                //'verified': false
                            }
                        },
                        $set:{
                            'currentLevel':0,
                            'cumulativePoints':1
                        }
                    });
                }
            }
        },
        getParticipatingInstitutions: function () {
            var allowed = [];
            var inst = participatingInstitutions.find({}).fetch();
            //console.log(inst);
            inst.forEach(function (participant) {

                allowed.push((participant.name));
            });
            // console.log('allowed:');
            //console.log(allowed);

            return allowed;
        },
        getCurrentUserInfo: function () {
            //console.log('current user: ' + this.userId);
            if (this.userId) {
                console.log('current user: ' + this.userId);
                //return Meteor.user();
                var userData = Meteor.users.findOne({_id: this.userId});
                Session.set('currentUser', userData);
                // console.log(userData);
                return userData;
            }
            console.log('not logged in');
            return null;
        },
        getCurrentLevel: function () {
            var level = 0;
            var level1 = userActivity.find({_id: this.userId}).count();
            var level2 = userActivity.find({_id: this.userId, avtivity: 'quiz'}).count();
            var level3 = userActivity.find({_id: this.userId, avtivity: 'trivia'}).count();
            if (level3) {
                level = 3;
            } else if (level2) {
                level = 2;
            } else if (level1) {
                level = 1;
            }
            return level;

        },
        addActivity: function (activity, data) {
            userActivity.insert({
                user: this.userId,
                activity: activity,
                data: data,
                recordedTime: new Date()
            });
            if(activity==='share'){
                addPoints(1);
            }else if(activity==='Wheelspin'){
                Meteor.users.update({_id: Meteor.userId()},{$set:{wonItem:data.won}});
                addPoints(50);
                changeLevel(5);
            }else if(activity==='profileEdit'){
                console.log('profile edited');
                //addPoints(1);
               changeLevel(LEVEL_QUIZ);
            }else if(activity==='quiz'){
                console.log('quiz ansewered');
               changeLevel(LEVEL_ACCOUNT);
            }else if(activity==='signup'){
                console.log('new signup');
                addPoints(1);
                console.log('set level to '+LEVEL_PROFILE);
                changeLevel(LEVEL_PROFILE);
            }else if(activity==='trivia'){
                console.log(Meteor.user().services.facebook.name + ' Answered trivia question');
                //addPoints(1);
                //changeLevel(0);
            }
        },
        checkQuestion: function (quiz, answer) {
            if (oneTimeAnswers[quiz].A === answer) {
                addPoints(2)
            }
        },
        checkTrivia: function (qData) {
            if(qData.a=== Questions.findOne({_id:qData.q}).answer ){
                addPoints(1);
            }
        },

        getCurrentScore: function () {
            return Meteor.user().cumulativePoints;
        },
        //getTopPlayer: function () {
        //    return Meteor.users.find();
        //}

    });
    addPoints = function (points, user) {
        user = user ? user : Meteor.userId();
        var curPoints = Meteor.user().cumulativePoints?Meteor.user().cumulativePoints:0;
        Meteor.users.update(
            {_id: user}, {
                $set: {
                    cumulativePoints: curPoints + points
                }
            });
    }
    changeLevel = function (level) {
        //user = user ? user : Meteor.userId();
        Meteor.users.update(
            {_id: Meteor.userId()}, {
                $set: {
                    'currentLevel': level
                }
            });
        console.log('update successful to level '+ level);
    }
}