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

// FETCH MOVIE SEARCHES

const fetchMovieSearchResultsStart = state =>
  updateObject(state, { searchLoading: true, searchError: null });

const fetchMovieSearchResultsSuccess = (state, action) =>
  updateObject(state, {
    searchResults: action.searchResults,
    searchLoading: false
  });

const fetchMovieSearchResultsFailed = (state, action) =>
  updateObject(state, { searchLoading: false, searchError: action.error });

// FETCH TRENDING MOVIES

const fetchTrendingMoviesStart = state =>
  updateObject(state, { trendingLoading: true, trendingError: null });

const fetchTrendingMoviesSuccess = (state, action) =>
  updateObject(state, { trending: action.trending, trendingLoading: false });

const fetchTrendingMoviesFailed = (state, action) =>
  updateObject(state, { trendingLoading: false, trendingError: action.error });

// FETCH MOVIE DETAILS

const fetchMovieDetailsStart = state =>
  updateObject(state, { detailsLoading: true, detailsError: null });

const fetchMovieDetailsSuccess = (state, action) =>
  updateObject(state, { details: action.details, detailsLoading: false });

const fetchMovieDetailsFailed = (state, action) =>
  updateObject(state, { detailsLoading: false, detailsError: action.error });

// ACTION TYPE SWITCH

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MOVIE_SEARCH_RESULTS_START:
      return fetchMovieSearchResultsStart(state, action);
    case actionTypes.FETCH_MOVIE_SEARCH_RESULTS_SUCCESS:
      return fetchMovieSearchResultsSuccess(state, action);
    case actionTypes.FETCH_MOVIE_SEARCH_RESULTS_FAILED:
      return fetchMovieSearchResultsFailed(state, action);
    case actionTypes.FETCH_TRENDING_MOVIES_START:
      return fetchTrendingMoviesStart(state, action);
    case actionTypes.FETCH_TRENDING_MOVIES_SUCCESS:
      return fetchTrendingMoviesSuccess(state, action);
    case actionTypes.FETCH_TRENDING_MOVIES_FAILED:
      return fetchTrendingMoviesFailed(state, action);
    case actionTypes.FETCH_MOVIE_DETAILS_START:
      return fetchMovieDetailsStart(state, action);
    case actionTypes.FETCH_MOVIE_DETAILS_SUCCESS:
      return fetchMovieDetailsSuccess(state, action);
    case actionTypes.FETCH_MOVIE_DETAILS_FAILED:
      return fetchMovieDetailsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
