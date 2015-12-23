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
            }];
    Meteor.methods({
        updateusrScores: function () {
            var allUsers = Meteor.users.find({}).fetch();
            console.log('starting updating users ' + allUsers.length);
            //console.log(allUsers);
            for (j = 0; j < allUsers.length; j++) {

                var user = allUsers[j]._id;
                if ((allUsers[j].CBAAccount && allUsers[j].CBAAccount.verified  && allUsers[j].cumulativePoints <= 60) || allUsers[j].cumulativePoints<=20) {
                    //resetsers
                    Meteor.users.update(
                        {_id: user}, {
                            $set: {
                                'cumulativePoints': 0
                            }
                        });

                    //give points for signup
                    addPoints2(1, user);
                    //calculate score for general knowledge
                    addPoints2(getGeneralKnowledgeScore(user), user);
                    //calculate score for spin the wheel
                    addPoints2(getWheelMarks(user), user);
                    //calculate score for daily trivia
                    addPoints2(getTriviaScore(user), user);
                    console.log(j + ' updated...');
                }
            }
            console.log('done');
        }
    });


    function getWheelMarks(user) {
        var userProfile = Meteor.users.findOne({_id: user}),
            verified = userProfile.hasOwnProperty('CBAAccount') && userProfile.CBAAccount.hasOwnProperty('verified') && userProfile.CBAAccount.verified;
        var hasSpin = userActivity.find({
                user: user,
                activity: 'Wheelspin'
            }).count() > 0;
        var score = 0;
        if (verified && hasSpin) {
            score = 50;
        }
        return score;
    }

    function getGeneralKnowledgeScore(user) {
        var quizData = userActivity.findOne({
            user: user,
            activity: 'quiz'
        });

        var score = 0;
        if (quizData) {
            if (!quizData.hasOwnProperty('data')) {
                score = 20;
            } else {
                for (i = 1; i <= 10; i++) {
                    console.log(quizData.data['q[' + i + ']'] + ' answer is ' + oneTimeAnswers[i - 1].A);
                    if ((quizData.data['q[' + i + ']'] === oneTimeAnswers[i - 1].A) || (quizData.data['q[' + i + ']'] === undefined)) {
                        score += 2;

                    }
                }
            }
        } else {
            score = 20;
        }

        return score;
    }

    function getTriviaScore(user) {
        userProfile = Meteor.users.findOne({_id: user});
        createdAt = userProfile.createdAt;
        //var today = new Date(),
        dd = ("0" + (createdAt.getDate())).slice(-2),
            //    dd2 = today.getDate(),
            mm = createdAt.getMonth() + 1, //January is 0!
            yyyy = createdAt.getFullYear();
        var earnedPoints = 0;
        var a = moment(createdAt.toString());
        var b = moment();

        for (var m = moment(a); m.isBefore(b); m.add('days', 1)) {
            console.log('checking ' + m.format('YYYY-MM-DD'));
            //}
            //for (d = createdAt.getDate(); d <= 30; d++) {
            var count = userActivity.find({
                user: user,
                activity: 'trivia',
                //recordedTime: {$gte: new Date(yyyy + '-' + mm + '-' + d)}
                recordedTime: {$gte: m.format('YYYY-MM-DD')}
            }).count();
            if (count > 0) {
                earnedPoints += 1;
            }
        }
        //var earnedPoints = 30 - createdAt.getDate();
        return earnedPoints;
    }

    function addPoints2(points, user) {
        userProfile = Meteor.users.findOne({_id: user});
        //var curPoints=(checkNested(userProfile.cumulativePoints)& &userProfile.cumulativePoints)?userProfile.cumulativePoints:0;
        var curPoints = userProfile.cumulativePoints || 0;
        var newScore = curPoints + points;
        //console.log(userProfile.services.facebook.name + ' has ' + userProfile.cumulativePoints + ', curpoints= ' + curPoints + ' points to add= ' + points + ' new score should be ' + newScore);
        Meteor.users.update(
            {_id: user}, {
                $set: {
                    'cumulativePoints': newScore
                }
            });
        //console.log(points + ' earned now ' + userProfile.services.facebook.name + ' has ' + userProfile.cumulativePoints)
    }
}