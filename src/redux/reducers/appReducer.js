export default function appReducer(state = [], action) {
    switch (action.type) {
        case "NEW_QUOTE":
            return Object.assign({}, state, {QuoteInProgress: true, screen: 'Appetite'});
        case "ACCOUNT_BEFORE_SAVE":
            return Object.assign({}, state, {account: action.payload, screen: 'BusinessInfo'});
        case "ACCOUNT_AFTER_SAVE":
            return Object.assign({}, state, {account: action.payload, screen: 'BusinessInfo'});
        case "SUBMISSION_AFTER_SAVE":
            return Object.assign({}, state, { ...action.payload} );
        default:
            return state;
    }

}