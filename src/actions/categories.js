import NetgenRestClient from '../NetgenRestClient';

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';


const ngRestCAPI = new NetgenRestClient({ endPointUrl: 'http://example.com' });

export function fetchCategories(siteInfoContentID) {
  return async (dispatch, getState) => {
    // dispatch({ type: FETCH_CATEGORIES_REQUEST });
    try {
      const categories = await ngRestCAPI.getCategories(siteInfoContentID);
      dispatch({ type: FETCH_CATEGORIES_SUCCESS, categories });
    } catch (error) {
      dispatch({ type: FETCH_CATEGORIES_FAILURE, error });
    }
  };
}
