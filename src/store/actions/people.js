import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

// Fetch People Searches

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

// Fetch Trending People

export const fetchTrendingPeopleSuccess = trending => ({
  type: actionTypes.FETCH_TRENDING_PEOPLE_SUCCESS,
  trending
});

export const fetchTrendingPeopleFailed = error => ({
  type: actionTypes.FETCH_TRENDING_PEOPLE_FAILED,
  error
});

export const fetchTrendingPeopleStart = () => ({
  type: actionTypes.FETCH_TRENDING_PEOPLE_START
});

export const fetchTrendingPeople = () => dispatch => {
  dispatch(fetchTrendingPeopleStart());
  axios
    .get(`trending/person/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
    .then(res => {
      dispatch(fetchTrendingPeopleSuccess(res.data));
    })
    .catch(err => {
      dispatch(fetchTrendingPeopleFailed(err));
    });
};

// Fetch Person Details

export const fetchPersonDetailsSuccess = details => ({
  type: actionTypes.FETCH_PERSON_DETAILS_SUCCESS,
  details
});

export const fetchPersonDetailsFailed = error => ({
  type: actionTypes.FETCH_PERSON_DETAILS_FAILED,
  error
});

export const fetchPersonDetailsStart = () => ({
  type: actionTypes.FETCH_PERSON_DETAILS_START
});

export const fetchPersonDetails = id => dispatch => {
  dispatch(fetchPersonDetailsStart());
  axios
    .get(
      `https://api.themoviedb.org/3/person/${id}?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&language=en-US&append_to_response=external_ids,tv_credits,movie_credits,combined_credits`
    )
    .then(res => {
      dispatch(fetchPersonDetailsSuccess(res.data));
    })
    .catch(err => {
      dispatch(fetchPersonDetailsFailed(err));
    });
};
