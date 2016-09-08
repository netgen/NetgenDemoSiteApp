export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';


export function fetchArticles() {
  return (dispatch) => {
    dispatch({ type: FETCH_ARTICLES_REQUEST });
    try {
      // TODO: actually fetch articles
      const articles = {};
      dispatch({ type: FETCH_ARTICLES_SUCCESS, articles });
    } catch (error) {
      dispatch({ type: FETCH_ARTICLES_FAILURE, error });
    }
  };
}
