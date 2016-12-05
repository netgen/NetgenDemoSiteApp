import restEndpoint from '../RestEndpoint';

export const FETCH_ARTICLE_BY_ID_REQUEST = 'FETCH_ARTICLE_BY_ID_REQUEST';
export const FETCH_ARTICLE_BY_ID_SUCCESS = 'FETCH_ARTICLE_BY_ID_SUCCESS';
export const FETCH_ARTICLE_BY_ID_FAILURE = 'FETCH_ARTICLE_BY_ID_FAILURE';

export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';


function shouldFetch(state, parentLocationID) {
  const articles = state.articles;

  if (!articles) return true;
  if (articles.isFetching[parentLocationID]) return false;
  if (!articles.fetchedArticles[parentLocationID]) return true;
  return true;
}

export function fetchArticles(numberOfArticles, parentLocationID, contentTypes, imageVariation) {
  return async (dispatch, getState) => {
    if (!shouldFetch(getState(), parentLocationID)) return;

    dispatch({ type: FETCH_ARTICLES_REQUEST, parentLocationID });
    try {
      const articles = await restEndpoint.getArticles(numberOfArticles, parentLocationID, contentTypes, imageVariation);
      dispatch({ type: FETCH_ARTICLES_SUCCESS, articles, parentLocationID });
    } catch (error) {
      dispatch({ type: FETCH_ARTICLES_FAILURE, error });
    }
  };
}

export function fetchArticleByID(id) {
  return async (dispatch, getState) => {
    if (!shouldFetch(getState())) return;

    dispatch({ type: FETCH_ARTICLE_BY_ID_REQUEST });
    try {
      const { Content: article } = await restEndpoint.getArticleByID(id);
      dispatch({ type: FETCH_ARTICLE_BY_ID_SUCCESS, article });
    } catch (error) {
      dispatch({ type: FETCH_ARTICLE_BY_ID_FAILURE, error });
    }
  };
}
