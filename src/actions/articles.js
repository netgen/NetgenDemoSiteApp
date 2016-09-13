import NetgenRestClient from '../NetgenRestClient';

export const FETCH_ARTICLE_BY_ID_REQUEST = 'FETCH_ARTICLE_BY_ID_REQUEST';
export const FETCH_ARTICLE_BY_ID_SUCCESS = 'FETCH_ARTICLE_BY_ID_SUCCESS';
export const FETCH_ARTICLE_BY_ID_FAILURE = 'FETCH_ARTICLE_BY_ID_FAILURE';

export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';


const ngRestCAPI = new NetgenRestClient({ endPointUrl: 'http://example.com/api/ezp/v2/' });

export function fetchArticles(numberOfArticles, category) {
  return async (dispatch, getState) => {
    if (!shouldFetch(getState())) return;

    dispatch({ type: FETCH_ARTICLES_REQUEST });
    try {
      const { View: response } = await ngRestCAPI.getArticles(numberOfArticles, category);
      const articles = response.Result.searchHits.searchHit;
      dispatch({ type: FETCH_ARTICLES_SUCCESS, articles });
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
      const { Content: article } = await ngRestCAPI.getArticleByID(id);
      dispatch({ type: FETCH_ARTICLE_BY_ID_SUCCESS, article });
    } catch (error) {
      dispatch({ type: FETCH_ARTICLE_BY_ID_FAILURE, error });
    }
  };
}


function shouldFetch(state) {
  const articles = state.articles;

  if (!articles) return true;
  if (articles.isFetching) return false;
  // TODO: For now, only prevents simultaneous fetch calls on server.
  // In future it should check if articles of specified category are already fetched.
  // Futhermore, should check if article already exists in store when making single fetch.
  return true;
}
