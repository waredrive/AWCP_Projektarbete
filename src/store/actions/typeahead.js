import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

// Fetch Typeahead Results

export const fetchTypeaheadResultsSuccess = (searchResults, query) => ({
  type: actionTypes.FETCH_TYPEAHEAD_RESULTS_SUCCESS,
  searchResults,
  query
});

export const fetchTypeaheadResultsFailed = error => ({
  type: actionTypes.FETCH_TYPEAHEAD_RESULTS_FAILED,
  error
});

export const fetchTypeaheadResultsStart = () => ({
  type: actionTypes.FETCH_TYPEAHEAD_RESULTS_START
});

export const fetchTypeaheadResults = searchQuery => dispatch => {
  dispatch(fetchTypeaheadResultsStart());
  axios
    .get(
      `https://api.themoviedb.org/3/search/multi?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&query=${searchQuery}&language=en-US&page=1&include_adult=false`
    )
    .then(res => {
      dispatch(fetchTypeaheadResultsSuccess(res.data.results, searchQuery));
    })
    .catch(err => {
      dispatch(fetchTypeaheadResultsFailed(err));
    });
};

// Misc Typeahead Actions

export const clearTypeahead = () => ({
  type: actionTypes.CLEAR_TYPEAHEAD
});

export const changeTypeaheadInput = input => ({
  type: actionTypes.CHANGE_TYPEAHEAD_INPUT,
  input
});
