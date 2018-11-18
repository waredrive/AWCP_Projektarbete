import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helperMethods';

const initialState = {
  searchResults: null,
  details: null,
  trending: null,
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

const fetchTrendingTvShowsStart = state =>
  updateObject(state, { tLoading: true });

const fetchTrendingTvShowsSuccess = (state, action) =>
  updateObject(state, { trending: action.trending, tLoading: true });

const fetchTrendingTvShowsFailed = state =>
  updateObject(state, { tLoading: false });

const fetchTvShowDetailsStart = state =>
  updateObject(state, { dLoading: true });

const fetchTvShowDetailsSuccess = (state, action) =>
  updateObject(state, { details: action.details, dLoading: true });

const fetchTvShowDetailsFailed = state =>
  updateObject(state, { dLoading: false });

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
