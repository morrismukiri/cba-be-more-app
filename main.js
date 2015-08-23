//routes
if(Meteor.isClient) {
    Router.route('/', function () {
        this.layout('mainBody');
        //this.render('login');
    });
    Router.route('/adminLogin', function () {
        this.render('adminLogin');
    });
//end routes

}
Accounts.config({
    forbidClientAccountCreation: false
});