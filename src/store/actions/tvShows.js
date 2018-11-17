import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

export const fetchTvShowSearchResultsSuccess = searchResults => ({
  type: actionTypes.FETCH_TV_SHOW_SEARCH_RESULTS_SUCCESS,
  searchResults
});

export const fetchTvShowSearchResultsFailed = error => ({
  type: actionTypes.FETCH_TV_SHOW_SEARCH_RESULTS_FAILED,
  error
});

export const fetchTvShowSearchResultsStart = () => ({
  type: actionTypes.FETCH_TV_SHOW_SEARCH_RESULTS_START
});

export const fetchTvShowSearchResults = (searchQuery, page) => dispatch => {
  dispatch(fetchTvShowSearchResultsStart());
  axios
    .get(
      `search/tv?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&query=${searchQuery}&language=en-US&page=${page}&include_adult=false`
    )
    .then(res => {
      dispatch(fetchTvShowSearchResultsSuccess(res.data));
    })
    .catch(err => {
      dispatch(fetchTvShowSearchResultsFailed(err));
    });
};
