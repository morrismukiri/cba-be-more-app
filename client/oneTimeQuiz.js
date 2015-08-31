if (Meteor.isClient) {
    var questions = [
        {
            no: 1,
            question: 'Who among the following is the longest serving African head of state',
            optionA: 'Daudi Kabaka',
            optionB: 'Robert Mugabe',
            optionC: 'Omar al-Bashir',
            optionD: 'Yoweri Museveni',

        },
        {
            no: 2,
            question: 'Where is the World Health Organisation Headquater',
            optionA: 'Dar es Salaam',
            optionB: 'New york',
            optionC: 'Copenhagen',
            optionD: 'Nairobi'

        },
        {
            no: 3,
            question: 'Which is the biggest economy in the world',
            optionA: 'Britain',
            optionB: 'China',
            optionC: 'United States',
            optionD: 'Russia'

        },
        {
            no: 4,
            question: 'Where will the 2016 olympics be held',
            optionA: 'Moscow',
            optionB: 'Beijing',
            optionC: 'Rio de janeiro',
            optionD: 'Durban'

        },
        {
            no: 5,
            question: 'Which is the fastest car in the world',
            optionA: 'Ferarrai 458',
            optionB: 'Hennessey venom GT',
            optionC: 'Lamborghini Aventador',
            optionD: 'Buggatti Veyron'

        }
    ];
    Template.oneTimeQuiz.helpers({
        questions: function () {
            return questions;
        }


    });
}
