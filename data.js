LEVEL_BEGGINER = 0;
LEVEL_PROFILE = 1;
LEVEL_QUIZ = 2;
LEVEL_ACCOUNT = 3;
LEVEL_WHEEL = 4;
Schemas = {},
    Questions = new Mongo.Collection('questions'),
    rewards = new Mongo.Collection('rewards'),
    participatingInstitutions = new Mongo.Collection('participatingInstitutions'),
    userActivity = new Mongo.Collection('userActivity'),
    gameActivity = new Mongo.Collection('gameActivity'),
    //firstQuiz = new Mongo.Collection('firstQuiz'),
    howItWorksItems = new Mongo.Collection('howItWorksItems');
terms = new Mongo.Collection('terms');
gameUsers = Meteor.users;

var allowedUniversities =
        //participatingInstitutions.find({}).fetch();
        [
            'Africa Nazarene University',
            'Catholic University of E.A.',
            'Daystar University',
            'JKUAT',
            'Kenyatta University',
            'Strathmore',
            'University of Nairobi',
            'USIU-Africa',
            'Other University'
        ],
    counties = ['Baringo county', 'Bomet county', 'Bungoma county', 'Busia county', 'Elgeyo-Marakwet county', 'Embu county', 'Garissa county', 'Homabay county', 'Isiolo county', 'Kajiado county', 'Kakamega county', 'Kericho county', 'Kiambu county', 'Kilifi county', 'Kirinyaga county', 'Kisii county', 'kisumu county', 'Kitui county', 'Kwale county', 'Laikipia county', 'Lamu county', 'Machakos county', 'Makueni county', 'Mandera county', 'Marsabit county', 'Meru county', 'Migori county', 'Mombasa county', 'Murang\'a county', 'Nairobi city county', 'Nakuru county', 'Nandi county', 'Narok county', 'Nyamira county', 'Nyandarua county', 'Nyeri county', 'Samburu county', 'Siaya county', 'Taita-Taveta county', 'Tana River county', 'Tharaka-Nithi county', 'Trans Nzoia county', 'Turkana county', 'Uasin Gishu county', 'Vihiga county', 'Wajir county', 'West Pokot county'];
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
        type: String,
        optional: true

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

Schemas.CBAAccount = new SimpleSchema({
    name: {
        type: String,
        optional: true
    },
    accountNo: {
        type: String,
        optional: true,
        label: 'First six digits of your account number'
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    verified: {
        type: Boolean,
        optional: true
        //,
        //allowedValues:[true,false]
    }
});
Schemas.CBAAccountUpdate = new SimpleSchema({
    name: {
        type: String,
        optional: true
    },
    accountNo: {
        type: String,
        optional: true,
        label: 'First six digits of account number'

    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    verified: {
        type: Boolean,
        optional: true
        //,
        //allowedValues:[true,false]
    }
});
Schemas.UserProfileUpdate = new SimpleSchema({
    firstName: {
        type: String,
        regEx: /^[a-zA-Z']{2,25}$/
        //optional: true
    },
    lastName: {
        type: String,
        regEx: /^[a-zA-Z']{2,25}$/
        //optional: true
    },
    phoneNo: {
        type: String,
        regEx: /^(0|\+?254)7([0-9])(\d){7}$/
        //optional: true
    },
    ageGroup: {
        type: String,
        allowedValues: ['18-24', '24-29']
        //optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female']
    },
    institution: {
        type: String,
        //optional: true,

        allowedValues: allowedUniversities
    },
    location: {
        type: String,
        //optional: true,
        allowedValues: counties
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
        regEx: /^(0|\+?254)7([0-9])(\d){7}$/,
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
    institution: {
        type: String,
        optional: true,
        allowedValues: allowedUniversities

    },
    location: {
        type: String,
        optional: true,
        allowedValues: counties
    }
});
SimpleSchema.messages({
    regEx: [
        {msg: 'Invalid value'},
        {exp: /^[a-zA-Z']{2,25}$/, msg: 'Please enter a valid Name'},
        {exp: /^(0|\+?254)7([0-3|7])(\d){7}$/, msg: 'Please enter a valid Kenyan mobile phone number'}
    ]
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
        },
        optional: true
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
    },
    currentLevel: {
        type: Number,
        optional: true
    },
    cumulativePoints: {
        type: Number,
        optional: true

    },
    wonItem: {
        type: String,
        optional: true,

    },
    wonItemCollected: {
        type: Boolean,
        optional: true
        //allowedValues:[true,false]

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
Schemas.UserUpdate = new SimpleSchema({
    profile: {
        type: Schemas.UserProfileUpdate
    }
});
Schemas.gameActivity = new SimpleSchema({
    user: {
        type: String,
        optional: true
    },
    activity: {
        type: String,
        optional: String
    },
    details: {
        type: String,
        optional: true
    },
    recordedTime: {
        type: Date,
        defaultValue: function () {
            return new Date();
        },
        optional: true
    }
});
gameActivity.attachSchema(Schemas.gameActivity);
account = Meteor.users;
//Schemas.account = new SimpleSchema({
//    name: {
//        type: String,
//
//    },
//    verified: {
//        type: Boolean
//    }
//});
//Schemas.accountVerify = new SimpleSchema({
//    CBAAccount: {
//        type: Schemas.account
//    }
//});
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
    recordedTime: {
        type: Date,
        defaultValue: function () {
            return new Date();
        }
    }
});
userActivity.attachSchema(Schemas.userActivity);

//Admin.collections.add('Questions',{collection:Questions});
//Admin.collections.add('Users', {
//    collection: gameUsers,
//    Columns: [
//    {title: 'Date', data: 'createdAt'},
//    {title: 'Facebook data', data: 'profile.name'},
//    {title: 'Email', data: 'emails.[0].address'},
//    {title: 'PhoneNo', data: 'profile.phoneNo'},
//    {title: 'Age', data: 'profile.ageGroup'},
//    {title: 'Points', data: 'cumulativePoints'},
//    {title: 'AC data', data: 'CBAAccount.name'},
//    {title: 'CBA AC', data: 'CBAAccount.accountNo'},
//    {title: 'Verified', data: 'CBAAccount.verified'},
//    {title: 'Campus', data: 'profile.institution'},
//    {title: 'Won', data: 'wonItem'},
//    {title: 'Collected', data: 'wonItemCollected'}
//    ]
//});
AdminConfig = {
    name: 'CBA Be More',
    'adminEmails': ['lucy.mbuba@cbagroup.com', 'morris@ondemand.co.ke', 'morrismukiri@gmail.com','geoffrey.nganga@meyousnetworking.com'],
    //'password':'password123',
    skin: 'green',
    dashboard: {
        homeUrl: '/'
        //skin: 'black'

    },
    //userSchema: new SimpleSchema({}),
    //userSchema: null,
    //userSchema: Schemas.User,
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
        //rewards: {
        //    label: 'Rewards Items',
        //    icon: 'gift',
        //    omitFields: ['_id'],
        //    tableColumns: [
        //        {label: 'Item No', name: 'no'},
        //        {label: 'Title', name: 'title'},
        //        {label: 'Description', name: 'description'},
        //        {label: 'Icon', name: 'icon'}
        //    ]
        //},
        //participatingInstitutions: {
        //    label: 'Participating Institutions',
        //    icon: 'university',
        //    tableColumns: [
        //        {label: 'Name', name: 'name'}
        //    ]
        //},
        terms: {
            label: 'Terms and Conditions',
            icon: 'list-alt',
            template: {
                add: null
            },
            tableColumns: [
                {label: 'Content', name: 'content'}
            ],
            showWidget: false
        }
        ,
        gameUsers: {
            label: 'Registered Users',
            icon: 'gamepad',
            tableColumns: [
                {label: 'Date', name: 'createdAt'},
                {label: 'Facebook name', name: 'profile.name'},
                {label: 'Email', name: 'emails.[0].address'},
                {label: 'PhoneNo', name: 'profile.phoneNo'},
                {label: 'Age', name: 'profile.ageGroup'},
                {label: 'Points', name: 'cumulativePoints'},
                {label: 'AC Name', name: 'CBAAccount.name'},
                {label: 'CBA AC', name: 'CBAAccount.accountNo'},
                {label: 'Verified', name: 'CBAAccount.verified'},
                {label: 'Campus', name: 'profile.institution'},

                {label: 'Won', name: 'wonItem'},
                {label: 'Collected', name: 'wonItemCollected'}
            ],

            omitFields: ['profile',  'CBAAccount.name', 'CBAAccount.accountNo', 'emails', 'currentLevel', 'CBAAccount.email', 'services', 'roles', 'wonItem'],
            //extraFields:['createdAt'],
            //showEditColumn: false, // Set to false to hide the edit button. True by default.
            //showEditColumn: false, // Set to false to hide the edit button. True by default.
            showDelColumn: false, // Set to false to hide the edit button. True by default.
            showWidget: true,
            color: 'green'
        }
        ,
        //userActivity: {
        //    label: 'User Gameplay log',
        //    icon: 'share-square',
        //    showWidget: false,
        //    tableColumns: [
        //        {label: 'Activity', name: 'activity'},
        //        {label: 'Time', name: 'recordedTime'}
        //    ]
        //}
       // gameActivity: {
        //    label: 'Game Activity',
        //    icon: 'share-square',
        //    tableColumns: [
        //        {label: 'Time', name: 'recordedTime'},
        //        {label: 'User', name: 'user'},
        //        {label: 'Activity', name: 'activity'}
        //
        //    ],
        //    showEditColumn: false, // Set to false to hide the edit button. True by default.
        //    //showEditColumn: false, // Set to false to hide the edit button. True by default.
        //    showDelColumn: false, // Set to false to hide the edit button. True by default.
        //    showWidget: false
        //}


    }
};

//AdminDashboard.addSidebarItem('Top Playes', AdminDashboard.path('/Users'), { icon: 'person' })

if (Meteor.isServer) {
    Meteor.publish('topPlayes', function () {
        if (this.userId) {
            var campus = Meteor.users.findOne({_id: this.userId}).profile.institution;
            //console.log(campus);
            var us = Meteor.users.find({
                cumulativePoints: {$gt: 0},
                'profile.institution': campus,
                'services.facebook': {$exists: true}
            }, {sort: {cumulativePoints: -1}, limit: 30});
            //console.log('found '+us.count());
            return us;
        }
    });
    Meteor.publish('terms', function () {
        return terms.find({});
    });
    Meteor.publish('userinfo', function () {
        return Meteor.users.find({_id: this.userId});
    });


    Meteor.publish('Questions', function () {

        var max = Questions.find({}).count(),
            min = 1,
            q = Math.floor(Math.random() * (max - min + 1)) + min;
        return Questions.find({}, {answer: 0, skip: q, limit: 1});
    });
    Meteor.publish('howItWorksItems', function () {
        return howItWorksItems.find({});
    });
    Meteor.publish('userActivity', function () {
        return userActivity.find({user: this.userId});
    });
}


