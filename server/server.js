if (Meteor.isServer) {
    // Questions= new Mongo.Collection('questions');
    Meteor.startup(function () {

        smtp = {
            username: 'info@cbabemore.co.ke',   // eg: server@gentlenode.com
            password: 'morris@cba2015!',   // eg: 3eeP1gtizk5eziohfervU
            server:   'mail.cbabemore.co.ke',  // eg: mail.gandi.net
            port: 25
        };

        process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

        var key ='c:\\key.pem', // '/home/meshack/CBABeMore/private/key.pem', //Assets.getBinary('key.pem'),
            cert ='c:\\cert.pem';// '/home/meshack/CBABeMore/private/cert.pem';//Assets.getBinary('cert.pem');
        SSL(key, cert, 443);
    });

    Meteor.methods({
        fetchQuiz: function () {
            var data = Questions.find({});
            return data;
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
}