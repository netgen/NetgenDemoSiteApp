import { combineReducers } from 'redux';
import articles from './articles';


// All reducers should be added here
const rootReducer = combineReducers({
  articles,
});


export default rootReducer;
