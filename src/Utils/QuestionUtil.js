import ax from "./API";

export class QuestionUtil {
    static fetchEligibilityQuestions() {
        return ax.post('quote/question', {
            "method": "fetchBOPEligibilityQuestions",
            "params": ["0000129120"]
        })
    }

    static extractAnswers(questions){
        let answerContainer = {};
        Object.keys(questions).map((key) => {
            answerContainer[key] = questions[key].value;
        })
        return answerContainer;
    }

    static updateEligibilityQuestion(questions) {
        let answers = this.extractAnswers(questions);
        return ax.post('quote/question', {
            "method": "updateBOPEligibilityQuestions",
            "params": ["0000129120", {
                "code": "BOPBusinessownersPreQual",
                "answers": this.extractAnswers(questions)
            }]
        })

    } //end of static method



}
