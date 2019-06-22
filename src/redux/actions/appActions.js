export function newQuote(){
    return { type: 'NEW_QUOTE', payload: ""}
}

export function AccountBeforeSave(values){
    return { type: 'ACCOUNT_BEFORE_SAVE', payload: values}
}

export function AccountAfterSave(values){
    return { type: 'ACCOUNT_AFTER_SAVE', payload: values}
}

export function SubmissionAfterSave(values){
    return { type: 'SUBMISSION_AFTER_SAVE', payload: {
        submissionNumber: values.SubmissionNumber,
        status: values.Status
    }}
}
