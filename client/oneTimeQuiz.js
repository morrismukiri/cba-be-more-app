if (Meteor.isClient) {
    var questions = [
        {
            no: 1,
            question: 'The CBA Be More Account is designed for people aged?',
            optionA: '18 -25 years',
            optionB: '18- 29 years',
            optionC: '18- 35 years',
            optionD: 'None of the above'

        },
        {
            no: 2,
            question: 'What url can one use to open a CBA Be More Account online?',
            optionA: 'www.cbagroup.com only',
            optionB: 'www.cba.co.ke only',
            optionC: 'www.cbagroup.com/bemore and www.cbagroup.com',
            optionD: 'All of the above'

        },
        {
            no: 3,
            question: 'How much does one need to have to open and activate a CBA Be More Account and get an International Visa Debit Card, internet and mobile banking set-up?',
            optionA: 'KShs. 100',
            optionB: 'KShs. 1000',
            optionC: 'KShs. 500',
            optionD: 'No amount'

        },
        {
            no: 4,
            question: 'Which of the following is not a location CBA has a branch at?',
            optionA: 'Galleria mall, Junction mall, TRM mall, Village Market mall.',
            optionB: 'Kisii town',
            optionC: 'Eldoret town',
            optionD: 'Swissport'

        },
        {
            no: 5,
            question: 'What is the name of the initiative that Senator Barrack Obama came to launch in Kenya?',
            optionA: 'Global Entrepreneurship Summit',
            optionB: 'Global Enterprise Summit',
            optionC: 'Global Education Summit',
            optionD: 'None of the above'

        },
        {
            no: 6,
            question: 'What is the name given to an investment where your money and that of other investors is pooled together and invested in a portfolio of assets to give an attractive return?',
            optionA: 'Fixed Deposit Account',
            optionB: 'Unit Trust Fund',
            optionC: 'Savings Account',
            optionD: 'Chama Account'

        },
        {
            no: 7,
            question: 'Which among the following Kenyan locations is set to be the latest addition on Google Street View?',
            optionA: 'I-TECH Kenya',
            optionB:  'Samburu National Reserve',
            optionC: 'Lewa Conservatory',
            optionD: 'Taita Taveta'

        },
        {
            no: 8,
            question: 'What version of Windows preceded Windows 7?',
            optionA: 'Windows 95',
            optionB:  'Windows Vista',
            optionC: 'Windows XP',
            optionD: 'Windows 2010'

        },
        {
            no: 9,
            question: 'Who among the following African artistes was not nominated for 2015 BET Awards?',
            optionA: 'Wiz kid',
            optionB:  'Sauti Sol',
            optionC: 'Davido',
            optionD: 'Stoneboy'

        },
        {
            no: 10,
            question: 'In fashion, Retro Style refers to?',
            optionA: 'Clothing made between 20 and 100 years ago',
            optionB:  'Recently made clothing designed to resemble the style of another period',
            optionC: 'Fashion inspired by the hippie movement of the late 1960s and 1970s',
            optionD: 'None of the above'

        }
    ];
    Template.oneTimeQuiz.helpers({
        questions: function () {
            return questions;
        }


    });
}
