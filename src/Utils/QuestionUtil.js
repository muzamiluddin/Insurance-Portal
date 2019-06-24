import ax from "./API";

export class QuestionUtil {
    static fetchEligibilityQuestions() {
        return ax.post('quote/question', {
            "method": "fetchBOPEligibilityQuestions",
            "params": ["0000091373"]
        })
    }

}