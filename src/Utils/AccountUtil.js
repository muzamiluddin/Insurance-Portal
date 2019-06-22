import ax from "./API";

export class AccountUtil {
    static createAccount(values) {
        return ax.post('gateway/account', {
            "method": "getOrCreateAccount",
            "params": [{
                "accountHolder": {
                    "subtype": "Company",
                    "primaryAddress": {
                        "state": values.address.state,
                        "country": "US",
                        "postalCode": values.address.postalcode,
                        "city": values.address.city,
                        "addressLine1": values.address.addressLine1,
                        "addressType": "business",
                        "addressLine2":  values.address.addressLine2
                    },
                    "emailAddress1": values.email, 
                    "accountHolder": true,
                    "workNumber": values.phone,
                    "contactName": values.name,
                    "primaryPhoneType": "work"
                },
                "producerCodes": [
                    {
                        "code": "PROD001",
                        "description": "test",
                        "publicID": "pc:1"
                    }
                ]
            }]
        })
    }

}