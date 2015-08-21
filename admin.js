Schemas={},
Questions= new Mongo.Collection('questions');

Schemas.Questions= new SimpleSchema({
  question:{
      type: String
  },
    optionA:{
        type: String,
        label:'Option A'
    },
    optionB:{
        type: String,
        label:'Option B'
    },
    optionC:{
        type: String,
        label:'Option C'
    },
    optionD:{
        type: String,
        label:'Option D'
    },
    answer:{
        type: String,
        label: 'Right Answer',
        allowedValues:['A','B','C','D']
    }
});
Questions.attachSchema(Schemas.Questions);
AdminConfig = {
    name:'CBA Be More',
    //'email':'morris@ondemand.co.ke',
    //'password':'password123',
    dashboard: {
        homeUrl: '/',
        skin: 'black'

    },
    //adminEmails: ['morrismukiri@gmail.com'],
    collections: {
        Questions: {
            icon: 'tasks',
            omitFields: ['_id'],
            tableColumns: [
                { label: 'Question', name: 'question' },
                { label: 'A', name: 'optionA' },
                { label: 'B', name: 'optionB' },
                { label: 'C', name: 'optionC' },
                { label: 'D', name: 'optionD' },
                { label: '<i class="fa fa-check"></i>', name: 'answer' }
            ]
        }
    }
}

if(Meteor.isServer){

}
