if(Meteor.isServer) {
    Security.permit(['update', 'remove']).collections([
        Meteor.users
    ]).never().apply();
    Meteor.users.permit('update').ifLoggedIn().exceptProps(['profile.isAdmin','roles', 'emails.$.verified','CBAAccount.verified','currentLevel','cumulativePoints','wonItem']).apply();
}