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

        var key = 'c:\\realkey.pem', // '/home/meshack/CBABeMore/private/key.pem', //Assets.getBinary('key.pem'),
            cert = 'c:\\finalcert.crt';//cbabemore_co_ke '/home/meshack/CBABeMore/private/cert.pem';//Assets.getBinary('cert.pem');
        SSL(key, cert, 443);
    });


}