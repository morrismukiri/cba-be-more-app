//routes
//if (Meteor.isClient) {
Router.configure({
    fastRender: true
});
Router.route('/', function () {
    this.render('fbApp');
    //this.render('login');
});
Router.route('/profile', function () {
    //this.render('updateProfile');
    this.render('updateProfileNew');


});
Router.route('/quiz', function () {
    //this.layout('updateProfile');

    //console.log(questions);
    //this.render('topbar');
    this.render('oneTimeQuiz');
});
Router.route('/adminLogin', function () {
    this.render('adminLogin');

});
Router.route('/cbaDetails', function () {
    this.render('cbaAccount');

});
Router.route('/spinWheel', function () {
    this.render('spinWheel');

});
Router.route('/terms', function () {
    this.render('terms');
});
Router.route('/trivia', function () {
    this.render('trivia');
});
Router.route('/invite/:referrer', function () {
    var data = {referrer: this.params.referrer}
    this.render('appHome', data);

});
//end routes


//SimpleSchema.debug = true;
//Accounts.config({
//    forbidClientAccountCreation: false
//});
//ServiceConfiguration.configurations.remove({
//    service: 'facebook'
//});

//ServiceConfiguration.configurations.insert({
//    service: 'facebook',
//    appId: '1654065948142055',
//    secret: '6e046603487c934150125fcb220cd265'
//});