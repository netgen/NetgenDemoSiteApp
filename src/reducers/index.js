import { combineReducers } from 'redux';
import articles from './articles';
import categories from './categories';


// All reducers should be added here
const rootReducer = combineReducers({
  articles,
  categories,
});


export default rootReducer;
