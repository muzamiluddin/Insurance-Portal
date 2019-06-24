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
        case "PAGE_LOADED":
            return Object.assign({}, state, { ...action.payload} );
        default:
            return state;
    }

}