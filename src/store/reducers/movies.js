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

const fetchMovieSearchResultsStart = state =>
  updateObject(state, { sLoading: true });

const fetchMovieSearchResultsSuccess = (state, action) =>
  updateObject(state, { searchResults: action.searchResults, sLoading: true });

const fetchMovieSearchResultsFailed = state =>
  updateObject(state, { sLoading: false });

const fetchTrendingMoviesStart = state =>
  updateObject(state, { tLoading: true });

const fetchTrendingMoviesSuccess = (state, action) =>
  updateObject(state, { trending: action.trending, tLoading: true });

const fetchTrendingMoviesFailed = state =>
  updateObject(state, { tLoading: false });

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
    default:
      return state;
  }
};

export default reducer;
