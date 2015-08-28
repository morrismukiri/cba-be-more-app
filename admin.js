Schemas = {},
    Questions = new Mongo.Collection('questions'),
    rewards = new Mongo.Collection('rewards'),
    participatingInstitutions = new Mongo.Collection('participatingInstitutions'),
    userActivity = new Mongo.Collection('userActivity'),
    gameActivity = new Mongo.Collection('gameActivity'),
    howItWorksItems = new Mongo.Collection('howItWorksItems');
terms = new Mongo.Collection('terms');
//users=new Mongo.Collection('users');
var allowedUniversities = //participatingInstitutions.find({}).fetch();
[
    'Nairobi University',
    'Kenyatta University',
    'Jomo Kenyatta Univeristy Of Agriculture and Technology',
    'Strathmore Univeristy', 'United States International University', 'others'];
Schemas.participatingInstitutions = new SimpleSchema({
    name: {type: String}
});
Schemas.terms = new SimpleSchema({
    content: {
        type: String,
        autoform: {
            rows: 30
        }
    }
});
participatingInstitutions.attachSchema(Schemas.participatingInstitutions);
terms.attachSchema(Schemas.terms);
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


//Schemas.institution = new SimpleSchema({
//    name: {
//        type: String,
//        optional: true
//    },
//    code: {
//        type: String,
//        optional: true
//    }
//});
Schemas.CBAAccount = new SimpleSchema({
    name: {
        type: String,
        optional: true
    },
    accountNo: {
        type: String,
        optional: true
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    verified: {
        type: Boolean,
        optional: true
    }
});

Schemas.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        //regEx: /^[a-zA-Z-]{2,25}$/,
        optional: true
    },
    lastName: {
        type: String,
        //regEx: /^[a-zA-Z]{2,25}$/,
        //optional: true
    },
    phoneNo: {
        type: String,
        regEx: /(0|\+?254)7([0-3|7])(\d|){7}/,
        optional: true
    },
    ageGroup: {
        type: String,
        allowedValues: ['18-24', '24-29'],
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },
    //organization : {
    //    type: String,
    //    regEx: /^[a-z0-9A-z .]{3,30}$/,
    //    optional: true
    //},
    bio: {
        type: String,
        optional: true
    },
    institution: {
        type: String,
        optional: true,
        allowedValues: allowedUniversities
        //function () {
        //    return Meteor.call('getParticipatingInstitutions');
        //}

    }
});

Schemas.User = new SimpleSchema({
    //username: {
    //    type: String,
    //    //optional: true
    //    //,
    //    //regEx: /^[a-z0-9A-Z_]{3,15}$/
    //},
    emails: {
        type: [Object],
        // this must be optional if you also use other login services like facebook,
        // but if you use only accounts-password, then it can be required
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean,
        optional: true
    },
    createdAt: {
        type: Date,
        defaultValue: function () {
            return new Date();
        }
    },
    profile: {
        type: Schemas.UserProfile,
        optional: true,
        blackbox: true
    },
    CBAAccount: {
        type: Schemas.CBAAccount,
        optional: true,
        blackbox: true
    },

    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    }
    //,
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type
    //roles: {
    //    type: [String],
    //    optional: true
    //}
});

Meteor.users.attachSchema(Schemas.User);

Schemas.userActivity = new SimpleSchema({
    user: {
        type: String
    },
    activity: {
        type: String
    },
    data: {
        type: Object,
        optional: true,
        blackbox: true
    },
    recordedTime:{
        type: Date,
        defaultValue: function () {
            return new Date();
        }
    }
});
userActivity.attachSchema(Schemas.userActivity);
AdminConfig = {
    name: 'CBA Be More',
    //'adminEmails': ['morris@ondemand.co.ke', 'tmruttu@ondemand.co.ke'],
    //'password':'password123',
    skin: 'green',
    dashboard: {
        homeUrl: '/',
        //skin: 'black'

    },
    userSchema: Schemas.User,
    //adminEmails: ['morrismukiri@gmail.com'],
    collections: {
        Questions: {
            label: 'Questions',
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
            label: "How it Works Items",
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
            label: 'Rewards Items',
            icon: 'gift',
            omitFields: ['_id'],
            tableColumns: [
                {label: 'Item No', name: 'no'},
                {label: 'Title', name: 'title'},
                {label: 'Description', name: 'description'},
                {label: 'Icon', name: 'icon'}
            ]
        },
        participatingInstitutions: {
            label: 'Participating Institutions',
            icon: 'fa-graduation-cap',
            tableColumns: [
                {label: 'Name', name: 'name'}
            ]
        },
        terms: {
            label: 'Terms and Conditions',
            icon: 'book-open',
            template: {
                add: null
            },
            tableColumns: [
                {label: 'Content', name: 'content'}
            ]
        }
        //,
        //users:{
        //    label: 'Registered Users',
        //    tableColumns:[
        //        {label:'name',name:'profile.name'},
        //        {label:'email',name:'profile.email'}
        //    ]
        //}


    }
}

if (Meteor.isServer) {
}
