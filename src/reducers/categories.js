import * as types from '../actions/categories';


const INITIAL_STATE = {
  items: [],
  currentlyActive: '',
  error: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_CATEGORIES_SUCCESS: {
      return {
        ...state,
        items: action.categories
      };
    }
    case types.FETCH_CATEGORIES_FAILURE: {
      return {
        ...state,
        error: action.error,
      };
    }
    case types.CHANGE_CATEGORY: {
      return {
        ...state,
        currentlyActive: action.category,
      };
    }
    default: return state;
  }
}
