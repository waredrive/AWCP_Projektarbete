import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

export const fetchPeopleSearchResultsSuccess = searchResults => ({
  type: actionTypes.FETCH_PEOPLE_SEARCH_RESULTS_SUCCESS,
  searchResults
});

export const fetchPeopleSearchResultsFailed = error => ({
  type: actionTypes.FETCH_PEOPLE_SEARCH_RESULTS_FAILED,
  error
});

export const fetchPeopleSearchResultsStart = () => ({
  type: actionTypes.FETCH_PEOPLE_SEARCH_RESULTS_START
});

export const fetchPeopleSearchResults = (searchQuery, page) => dispatch => {
  dispatch(fetchPeopleSearchResultsStart());
  axios
    .get(
      `search/person?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&query=${searchQuery}&language=en-US&page=${page}&include_adult=false`
    )
    .then(res => {
      dispatch(fetchPeopleSearchResultsSuccess(res.data));
    })
    .catch(err => {
      dispatch(fetchPeopleSearchResultsFailed(err));
    });
};
