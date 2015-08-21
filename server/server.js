if (Meteor.isServer) {
    // Questions= new Mongo.Collection('questions');
    Meteor.startup(function () {
        //SSLProxy({
        //    port: 443, //or 443 (normal port/requires sudo)
        //    ssl : {
        //        key: Assets.getText("key.pem"),
        //        cert: Assets.getText("cert.pem"),
        //
        //        //Optional CA
        //        //Assets.getText("ca.pem")
        //    }
        //});
        //var base = process.env.PWD;
        //var key = '/home/meshack/CBABeMore/private/key.pem', //Assets.getBinary('key.pem'),
        //    cert = '/home/meshack/CBABeMore/private/cert.pem';//Assets.getBinary('cert.pem');
        //SSL(key, cert, 443);
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
}