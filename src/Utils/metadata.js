const AppetiteQuestions = [
    {
        id: 'BOPNumOfEmployees',
        desc: 'Total number of Employees:',
        type: 'number'
    },
    {
        id: 'BOPNumOfLosses',
        desc: 'Number of claims in last 3 years:',
        type: 'number'
    }
];

export class AppetiteMetadata {
    static findQuestionByID(id){
        return AppetiteQuestions.find((question) => {
            return question.id === id
        })
    }

}