if (Meteor.isServer) {
    // Questions= new Mongo.Collection('questions');
    //Kadira.connect('W8W7AXJ5JHwFiZpee', 'ed68ecc7-8ec3-4868-aa60-9f97aa1a9235');
    Meteor.startup(function () {

        smtp = {
            username: 'info@cbabemore.co.ke',   // eg: server@gentlenode.com
            password: 'morris@cba2015!',   // eg: 3eeP1gtizk5eziohfervU
            server: 'mail.cbabemore.co.ke',  // eg: mail.gandi.net
            port: 25
        };

        process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
        process.env.ROOT_URL = 'https://cbabemore.co.ke/';
        process.env.MONGO_URL = 'mongodb://localhost:81/meteor';

        var key = 'c:\\key.pem', // '/home/meshack/CBABeMore/private/key.pem', //Assets.getBinary('key.pem'),
            cert = 'c:\\cert.pem';// '/home/meshack/CBABeMore/private/cert.pem';//Assets.getBinary('cert.pem');
        SSL(key, cert, 443);
    });

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
            console.log('current user: ' + this.userId);
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
        }
    });
    Meteor.publish('questions', function () {
        var data = Questions.find({});
        return data;
    });
    Meteor.publish('howItWorksItems', function () {
        var data = howItWorksItems.find({});
        return data;
    });
    Meteor.publish('rewards', function () {
        var data = rewards.find({});
        return data;
    });
    Meteor.publish('participatingInstitutions', function () {
        var data = participatingInstitutions.find({});
        return data;
    });
    Meteor.publish('users', function () {
        var data = Meteor.users.find({_id: this.userId});
        return data;
    });
}