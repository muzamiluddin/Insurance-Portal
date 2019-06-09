import { combineReducers } from 'redux';
import courses from './courseReducer';
import app from './appReducer';
import submission from './submissonReducer';
import { reducer as reduxFormReducer } from 'redux-form';


const rootReducer = combineReducers({
    courses, app, submission,
    form: reduxFormReducer
});

export default rootReducer;

