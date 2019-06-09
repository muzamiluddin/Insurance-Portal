export default function submissionReducer(state = [], action) {
    switch (action.type) {
        case "UPDATE_APPETITE_QUESTIONS":
            return [...state ];
        case "START_NEW_QUOTE":
            return [...state ];
        default:
            return state;
    }

}