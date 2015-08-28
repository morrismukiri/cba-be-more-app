if(Meteor.isServer) {
    Security.permit(['insert', 'update', 'remove']).collections([
        Meteor.users
    ]).never().apply();
    Meteor.users.permit('update').ifLoggedIn().exceptProps(['profile.isAdmin', 'emails.$.verified','CBAAccount.verified']).apply();
}