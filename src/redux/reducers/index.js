import { combineReducers } from 'redux';
import courses from './courseReducer';
import app from './appReducer';
import submission from './submissonReducer';


const rootReducer = combineReducers({
    app 
});

export default rootReducer;

