import restEndpoint from '../RestEndpoint';

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';


export function fetchCategories(siteInfoContentID) {
  return async (dispatch) => {
    try {
      const categories = await restEndpoint.getCategories(siteInfoContentID);
      dispatch({ type: FETCH_CATEGORIES_SUCCESS, categories });
    } catch (error) {
      dispatch({ type: FETCH_CATEGORIES_FAILURE, error });
    }
  };
}

export function changeCategory(category) {
  return { type: CHANGE_CATEGORY, category };
}
