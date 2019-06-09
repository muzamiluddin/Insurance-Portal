export default function appReducer(state = [], action) {
    switch (action.type) {
        case "NEW_QUOTE":
            return Object.assign({}, state, {QuoteInProgress: true, screen: 'Appetite'});
        default:
            return state;
    }

}