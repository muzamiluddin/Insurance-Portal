import { CoverageUtil } from "../../Utils/CoverageUtil";

export default function appReducer(state = [], action) {
    switch (action.type) {
        case "NEW_QUOTE":
            return Object.assign({}, state, {quoteInProgress: true, pageName: 'Appetite'});
        case "ACCOUNT_BEFORE_SAVE":
            return Object.assign({}, state, {account: action.payload, pageName: 'BusinessInfo'});
        case "ACCOUNT_AFTER_SAVE":
            return Object.assign({}, state, {account: action.payload, pageName: 'BusinessInfo'});
        case "SUBMISSION_AFTER_SAVE":
            return Object.assign({}, state, { ...action.payload} );
        case "ELIGIBILITY_BEFORE_SAVE":
            return Object.assign({}, state, { questions: action.payload, pageName: 'Eligibility'} );
        case "FETCH_LINE_COVERAGES":
            return Object.assign({}, state, { lineCoverages: action.payload} );
        case "PAGE_LOADED":
            return Object.assign({}, state, { ...action.payload} );
        case "UPDATE_LINE_COVERAGE":
            let updatedState = CoverageUtil.updateLineCoverage(state, action.payload);
            return Object.assign({}, state, updatedState); 
        case "UPDATE_LINE_COVERAGE_TERM":
            let newState = CoverageUtil.updateLineCoverageTerm(state, action.payload);
            return Object.assign({}, state, newState); 
        default:
            return state;
    }

}
