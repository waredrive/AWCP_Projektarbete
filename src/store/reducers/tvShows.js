import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helperMethods';

const initialState = {
  searchResults: null,
  tvShowDetails: null,
  trendingTvShows: null,
  sError: null,
  sLoading: false,
  dError: null,
  dLoading: false,
  tError: null,
  tLoading: false
};

const fetchTvShowSearchResultsStart = state =>
  updateObject(state, { loading: true });

const fetchTvShowSearchResultsSuccess = (state, action) =>
  updateObject(state, { searchResults: action.searchResults, sLoading: true });

const fetchTvShowSearchResultsFailed = state =>
  updateObject(state, { sLoading: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TV_SHOW_SEARCH_RESULTS_START:
      return fetchTvShowSearchResultsStart(state, action);
    case actionTypes.FETCH_TV_SHOW_SEARCH_RESULTS_SUCCESS:
      return fetchTvShowSearchResultsSuccess(state, action);
    case actionTypes.FETCH_TV_SHOW_SEARCH_RESULTS_FAILED:
      return fetchTvShowSearchResultsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
