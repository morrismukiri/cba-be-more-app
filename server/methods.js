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
                A: 'B'
            },
            {
                no: 5,
                A: 'A'
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
                A: 'C'
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
                        $set: {
                            'currentLevel': 0,
                            'cumulativePoints': 1
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
                var userData = Meteor.user();
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


            var userName = 'Anonymous';
            if (checkNested(Meteor.user(), 'services', 'facebook', 'name')) {
                userName = Meteor.user().services.facebook.name;
            } else {
                userName = Meteor.userId();
            }

            gameActivity.insert({
                user: userName,
                activity: activity,
                details: JSON.stringify(data),
                recordedTime: new Date()
            });
            if (activity === 'share') {
                addPoints(1);
            } else if (activity === 'Wheelspin') {
                Meteor.users.update({_id: Meteor.userId()}, {$set: {wonItem: data.won}});
                addPoints(50);
                changeLevel(5);
            } else if (activity === 'profileEdit') {
                console.log(Meteor.user().services.facebook.name + 'profile edited');
                if(firstTimer()){addPoints(1);}
                if (Meteor.user().currentLevel===LEVEL_PROFILE || Meteor.user().currentLevel===LEVEL_QUIZ) {
                    changeLevel(LEVEL_ACCOUNT)
                } else {
                    changeLevel(LEVEL_QUIZ);
                }
            } else if (activity === 'quiz') {
                console.log(Meteor.user().services.facebook.name + ' quiz answered earned '+Meteor.user().cumulativePoints);
                changeLevel(LEVEL_ACCOUNT);
                //if(!Meteor.user().cumulativePoints){
                //    Meteor.user().cumulativePoints=19;
                //    console.log(Meteor.user().services.facebook.name + ' fixed points '+Meteor.user().cumulativePoints);
                //}
            } else if (activity === 'signup') {
                console.log('new signup');
                //addPoints(1);
                console.log('set level to ' + LEVEL_PROFILE);
                changeLevel(LEVEL_PROFILE);
            } else if (activity === 'trivia') {
                console.log(Meteor.user().services.facebook.name + ' Answered trivia question');
                //addPoints(1);
                //changeLevel(0);
            }
        },
        checkQuestion: function (quiz, answer) {
            console.log(Meteor.user().services.facebook.name + ' Answered ' + answer+ ' for question '+quiz +'. Correct answer is '+ oneTimeAnswers[quiz].A);
            if (!answeredGeneralKnowledge() && oneTimeAnswers[quiz].A === answer) {
                addPoints(2);
                //console.log(Meteor.user().services.facebook.name + ' got it right ')
            }
        },
        checkTrivia: function (qData) {
            console.log(Meteor.user().services.facebook.name +' answering trivia..');
            var oid = new Meteor.Collection.ObjectID(qData.q);
            if (!answeredTrivia()) {
                console.log(Meteor.user().services.facebook.name +' has not answered trivia question today');
                if (qData.a === Questions.findOne(oid).answer) {
                    addPoints(1);
                    console.log(Meteor.user().services.facebook.name +' got trivia question right. Should get an extra point');
                }


            }
            console.log(Meteor.user().services.facebook.name + ' Answered trivia question '+qData.a+' expected ' + Questions.findOne(oid).answer + ' =>');
          //  console.log(qData);
        },

        getCurrentScore: function () {
            return Meteor.user().cumulativePoints;
        },
        errorLog: function (er) {
            console.log(er);
        },
        getTime: function () {
            return new Date();
        }
        //getTopPlayer: function () {
        //    return Meteor.users.find();
        //}

    });
    addPoints = function (points) {
        //user = user ? user : Meteor.userId();
        //var curPoints=(checkNested(Meteor.user().cumulativePoints)& &Meteor.user().cumulativePoints)?Meteor.user().cumulativePoints:0;
        var curPoints = Meteor.user().cumulativePoints || 0;
        var newScore= curPoints + points;
        console.log(Meteor.user().services.facebook.name +' has '+ Meteor.user().cumulativePoints +', curpoints= '+ curPoints+' points to add= '+points+' new score should be '+newScore);
        Meteor.users.update(
            {_id:  Meteor.userId()}, {
                $set: {
                    'cumulativePoints':newScore
                }
            });
        console.log(points +' earned now '+ Meteor.user().services.facebook.name +' has '+ Meteor.user().cumulativePoints)
    };
    changeLevel = function (level) {
        //user = user ? user : Meteor.userId();
        Meteor.users.update(
            {_id: Meteor.userId()}, {
                $set: {
                    'currentLevel': level
                }
            });
        console.log(Meteor.user().services.facebook.name +'update successful to level ' + Meteor.user().services.facebook.currentLevel+ ' expected=' + level);
    };
    function checkNested(obj /*, level1, level2, ... levelN*/) {
        var args = Array.prototype.slice.call(arguments, 1);

        for (var i = 0; i < args.length; i++) {
            if (!obj || !obj.hasOwnProperty(args[i])) {
                return false;
            }
            obj = obj[args[i]];
        }
        return true;
    }
    var answeredTrivia = function () {
        var today = new Date(),
            //dd = ("0" + (today.getDate())).slice(-2),
            dd2 = today.getDate()-1,
            mm = today.getMonth() + 1, //January is 0!
            yyyy = today.getFullYear();
        var count=userActivity.find({
            user: Meteor.userId(),
            activity: 'trivia',

                recordedTime: {$gte: new Date(yyyy+'-'+mm+'-'+dd2+'T00:00:00.000Z')}
        }).count();
        console.log(Meteor.user().services.facebook.name+' has answered trivia '+count +' Times on this '+dd2 +' day 0f '+mm+' year '+yyyy );
        return count > 0;
    };
    var answeredGeneralKnowledge= function () {
        return userActivity.find({user:Meteor.userId(), activity:'quiz'}).count()>0;
    };
    var firstTimer = function () {
        return !(userActivity.find({user:Meteor.userId(), activity:'profileEdit'}).count()>0);
    };
}