import NetgenRestClient from '../NetgenRestClient';

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';


const ngRestCAPI = new NetgenRestClient({ endPointUrl: 'http://example.com' });

export function fetchCategories(siteInfoContentID) {
  return async (dispatch, getState) => {
    try {
      const categories = await ngRestCAPI.getCategories(siteInfoContentID);
      dispatch({ type: FETCH_CATEGORIES_SUCCESS, categories });
    } catch (error) {
      dispatch({ type: FETCH_CATEGORIES_FAILURE, error });
    }
  };
}

export function changeCategory(category) {
  return { type: CHANGE_CATEGORY, category }
}
