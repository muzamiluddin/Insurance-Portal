export function newQuote(){
    return { type: 'NEW_QUOTE', payload: ""}
}

export function AccountBeforeSave(values){
    return { type: 'ACCOUNT_BEFORE_SAVE', payload: {
        ...values, quoteInProgress: true
    }}
}

export function AccountAfterSave(values){
    return { type: 'ACCOUNT_AFTER_SAVE', payload: { 
        ...values, quoteInProgress: true
    }}
}

export function SubmissionAfterSave(values){
    return { type: 'SUBMISSION_AFTER_SAVE', payload: {
        submissionNumber: values.SubmissionNumber,
        status: values.Status,
        quoteInProgress: true
    }}
}

export function PageLoaded(name){
    return { type: 'PAGE_LOADED', 
             payload: {
                PageName: name,
                quoteInProgress: true
             }
    }
}

export function EligibilityBeforeSave(values){
    return { type: 'ELIGIBILITY_BEFORE_SAVE', 
             payload: {
                quoteInProgress: true,
                questions: values
             }
    }
}

export function FetchLineCoverages(values){
    return { type: 'FETCH_LINE_COVERAGES', 
             payload: values
    }
}

export function updateLineCoverage(values){
    return { type: 'UPDATE_LINE_COVERAGE', payload: values }
}

export function updateLineCoverageTerm(values){
    return { type: 'UPDATE_LINE_COVERAGE_TERM', payload: values }
}
