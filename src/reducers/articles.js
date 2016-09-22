import * as types from '../actions/articles';
import { arrayToObject } from '../utils/helper.js';


const INITIAL_STATE = {
  isFetching: false,
  fetchedArticles: {},
  error: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_ARTICLES_REQUEST:
    case types.FETCH_ARTICLE_BY_ID_REQUEST: {
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
        error: null,
        // TODO: For now, resets previously fetched articles object -> should be changed in future
        // Also, articles should be put in theirs own category
        fetchedArticles: action.articles.reduce(arrayToObject, state.fetchedArticles),
      };
    }
    case types.FETCH_ARTICLE_BY_ID_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        fetchedArticles: {
          ...state.fetchedArticles,
          [action.article.Name]: action.article,
        },
        error: null,
      };
    }
    case types.FETCH_ARTICLES_FAILURE:
    case types.FETCH_ARTICLE_BY_ID_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    default: return state;
  }
}