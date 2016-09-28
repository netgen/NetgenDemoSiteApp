import * as types from '../actions/articles';

const INITIAL_STATE = {
  isFetching: {},
  fetchedArticles: {},
  error: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_ARTICLES_REQUEST: {
      return {
        ...state,
        isFetching: {
          ...state.isFetching,
          [action.parentLocationID]: true,
        },
        error: null,
      };
    }
    case types.FETCH_ARTICLES_SUCCESS: {
      return {
        ...state,
        isFetching: {
          ...state.isFetching,
          [action.parentLocationID]: false,
        },
        fetchedArticles: {
          ...state.fetchedArticles,
          [action.parentLocationID]: action.articles,
        },
        error: null,
      };
    }
    case types.FETCH_ARTICLES_FAILURE: {
      return {
        ...state,
        isFetching: {
          ...state.isFetching,
          [action.parentLocationID]: false,
        },
        error: action.error,
      };
    }
    default: return state;
  }
}
