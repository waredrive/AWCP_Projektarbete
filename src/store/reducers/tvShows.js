import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helperMethods';

const initialState = {
  searchResults: null,
  details: null,
  trending: null,
  searchError: null,
  searchLoading: false,
  trendingError: null,
  trendingLoading: false,
  detailsError: null,
  detailsLoading: false
};

// FETCH TV SHOW SEARCHES

const fetchTvShowSearchResultsStart = state =>
  updateObject(state, { searchLoading: true, searchError: null });

const fetchTvShowSearchResultsSuccess = (state, action) =>
  updateObject(state, {
    searchResults: action.searchResults,
    searchLoading: false
  });

const fetchTvShowSearchResultsFailed = (state, action) =>
  updateObject(state, { searchLoading: false, searchError: action.error });

// FETCH TRENDING TV SHOWS

const fetchTrendingTvShowsStart = state =>
  updateObject(state, { trendingLoading: true, trendingError: null });

const fetchTrendingTvShowsSuccess = (state, action) =>
  updateObject(state, { trending: action.trending, trendingLoading: false });

const fetchTrendingTvShowsFailed = (state, action) =>
  updateObject(state, { trendingLoading: false, trendingError: action.error });

// FETCH TV SHOW DETAILS

const fetchTvShowDetailsStart = state =>
  updateObject(state, { detailsLoading: true, detailsError: null });

const fetchTvShowDetailsSuccess = (state, action) =>
  updateObject(state, { details: action.details, detailsLoading: false });

const fetchTvShowDetailsFailed = (state, action) =>
  updateObject(state, { detailsLoading: false, detailsError: action.error });

// ACTION TYPE SWITCH

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TV_SHOW_SEARCH_RESULTS_START:
      return fetchTvShowSearchResultsStart(state, action);
    case actionTypes.FETCH_TV_SHOW_SEARCH_RESULTS_SUCCESS:
      return fetchTvShowSearchResultsSuccess(state, action);
    case actionTypes.FETCH_TV_SHOW_SEARCH_RESULTS_FAILED:
      return fetchTvShowSearchResultsFailed(state, action);
    case actionTypes.FETCH_TRENDING_TV_SHOWS_START:
      return fetchTrendingTvShowsStart(state, action);
    case actionTypes.FETCH_TRENDING_TV_SHOWS_SUCCESS:
      return fetchTrendingTvShowsSuccess(state, action);
    case actionTypes.FETCH_TRENDING_TV_SHOWS_FAILED:
      return fetchTrendingTvShowsFailed(state, action);
    case actionTypes.FETCH_TV_SHOW_DETAILS_START:
      return fetchTvShowDetailsStart(state, action);
    case actionTypes.FETCH_TV_SHOW_DETAILS_SUCCESS:
      return fetchTvShowDetailsSuccess(state, action);
    case actionTypes.FETCH_TV_SHOW_DETAILS_FAILED:
      return fetchTvShowDetailsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
