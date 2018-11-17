import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

export const fetchMovieSearchResultsSuccess = searchResults => ({
  type: actionTypes.FETCH_MOVIE_SEARCH_RESULTS_SUCCESS,
  searchResults
});

export const fetchMovieSearchResultsFailed = error => ({
  type: actionTypes.FETCH_MOVIE_SEARCH_RESULTS_FAILED,
  error
});

export const fetchMovieSearchResultsStart = () => ({
  type: actionTypes.FETCH_MOVIE_SEARCH_RESULTS_START
});

export const fetchMovieSearchResults = (searchQuery, page) => dispatch => {
  dispatch(fetchMovieSearchResultsStart());
  axios
    .get(
      `search/movie?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&query=${searchQuery}&language=en-US&page=${page}&include_adult=false`
    )
    .then(res => {
      dispatch(fetchMovieSearchResultsSuccess(res.data));
    })
    .catch(err => {
      dispatch(fetchMovieSearchResultsFailed(err));
    });
};
