//routes
//if (Meteor.isClient) {
Router.configure({
    fastRender:true
});
    Router.route('/', function () {
        this.layout('fbApp');
        //this.render('login');
    });
    Router.route('/profile', function () {
        this.render('updateProfile');


    });
    Router.route('/quiz', function () {
        //this.layout('updateProfile');

        //console.log(questions);
        //this.render('topbar');
        this.render('oneTimeQuiz');
    });
    Router.route('/adminLogin', function () {
        this.render('adminLogin');

    }
);
//end routes

//}
SimpleSchema.debug = true;
//Accounts.config({
//    forbidClientAccountCreation: false
//});
//ServiceConfiguration.configurations.remove({
//    service: 'facebook'
//});

//ServiceConfiguration.configurations.insert({
//    service: 'facebook',
//    appId: '1654719238076726',
//    secret: '034f3d2121eb0fe05b44802ec7013ba7'
//});