Schemas = {},
    Questions = new Mongo.Collection('questions'),
    rewards = new Mongo.Collection('rewards'),
    howItWorksItems = new Mongo.Collection('howItWorksItems');

Schemas.Questions = new SimpleSchema({
    question: {
        type: String
    },
    optionA: {
        type: String,
        label: 'Option A'
    },
    optionB: {
        type: String,
        label: 'Option B'
    },
    optionC: {
        type: String,
        label: 'Option C'
    },
    optionD: {
        type: String,
        label: 'Option D'
    },
    answer: {
        type: String,
        label: 'Right Answer',
        allowedValues: ['A', 'B', 'C', 'D']
    }
});
Questions.attachSchema(Schemas.Questions);

Schemas.howItWorksItems = new SimpleSchema({
    no: {
        type: Number
    },
    icon: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    }
});
howItWorksItems.attachSchema(Schemas.howItWorksItems);

Schemas.rewards = new SimpleSchema({
    no: {
        type: Number
    },
    icon: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    }
});
rewards.attachSchema(Schemas.rewards);


AdminConfig = {
    name: 'CBA Be More',
    //'adminEmails':['morris@ondemand.co.ke','tmruttu@ondemand.co.ke'],
    //'password':'password123',
    dashboard: {
        homeUrl: '/',
        //skin: 'black'

    },
    //adminEmails: ['morrismukiri@gmail.com'],
    collections: {

        Questions: {
            label:'Questions',
            icon: 'tasks',
            omitFields: ['_id'],
            tableColumns: [
                {label: 'Question', name: 'question'},
                {label: 'A', name: 'optionA'},
                {label: 'B', name: 'optionB'},
                {label: 'C', name: 'optionC'},
                {label: 'D', name: 'optionD'},
                {label: '<i class="fa fa-check"></i>', name: 'answer'}
            ]
        },
        howItWorksItems: {
            label:"How it Works Items",
            icon: 'question',
            omitFields: ['_id'],
            tableColumns: [
                {label: 'Item No', name: 'no'},
                {label: 'Title', name: 'title'},
                {label: 'Description', name: 'description'},
                {label: 'Icon', name: 'icon'}
            ]
        },
        rewards: {
            label:'Rewards Items',
            icon: 'gift',
            omitFields: ['_id'],
            tableColumns: [
                {label: 'Item No', name: 'no'},
                {label: 'Title', name: 'title'},
                {label: 'Description', name: 'description'},
                {label: 'Icon', name: 'icon'}
            ]
        }

    }
}

if (Meteor.isServer) {

}
