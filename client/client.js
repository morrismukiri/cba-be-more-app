Session.setDefault('loggedIn', false);
Session.setDefault('authorised', false);

if (Meteor.isClient) {


    Meteor.subscribe('questions');
    Meteor.subscribe('howItWorksItems');
    Meteor.subscribe('rewards');
//fb models
    Template.fbLogin.helpers({
        loggedIn: function () {
            return Session.get('loggedIn');
        },
        authorised: function () {
            return Session.get('authorised');
        },
        questions: function () {
            //var foundQuestions= Meteor.call('fetchQuiz');
            // fi//console.log(foundQuestions);

            return questions.find({}); // foundQuestions;
        },

    });
    Template.howItWorks.helpers({
        howItWorksItems: function () {
            return howItWorksItems.find({});
        }
    });
    Template.rewards.helpers({
        rewards: function () {
            return rewards.find({});
        }
    });


}