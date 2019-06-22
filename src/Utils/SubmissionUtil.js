import ax from "./API";

export class SubmissionUtil {
    static createSubmission(accountData) {
        let today = new Date();
        return ax.post('quote/submission', {
            "method": "createNewSubmission",
            "params": [{
                "accountNumber": accountData.accountNumber,
				"productCode" : "BusinessOwners",
				"state" : accountData.accountHolder.primaryAddress.state,
				"country" : accountData.accountHolder.primaryAddress.country,
				"effectiveDate" : {  
							"year": today.getFullYear(),
							"month": today.getMonth()+1,
							"day": today.getDate()
							},
				"producerCode": "PROD001"
            }]
        })
    }

}