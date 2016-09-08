import * as types from '../actions/articles';


const INITIAL_STATE = {
  isFetching: false,
  articles: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_ARTICLES_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case types.FETCH_ARTICLES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        articles: {
          ...state.articles,
          // action.articles,
        },
        error: null,
      };
    }
    case types.FETCH_ARTICLES_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    default: return state;
  }
}
