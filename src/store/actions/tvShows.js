import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

// FETCH TV SHOW SEARCHES

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

// FETCH TRENDING TV SHOWS

export const fetchTrendingTvShowsSuccess = trending => ({
  type: actionTypes.FETCH_TRENDING_TV_SHOWS_SUCCESS,
  trending
});

export const fetchTrendingTvShowsFailed = error => ({
  type: actionTypes.FETCH_TRENDING_TV_SHOWS_FAILED,
  error
});

export const fetchTrendingTvShowsStart = () => ({
  type: actionTypes.FETCH_TRENDING_TV_SHOWS_START
});

export const fetchTrendingTvShows = () => dispatch => {
  dispatch(fetchTrendingTvShowsStart());
  axios
    .get(`trending/tv/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
    .then(res => {
      dispatch(fetchTrendingTvShowsSuccess(res.data));
    })
    .catch(err => {
      dispatch(fetchTrendingTvShowsFailed(err));
    });
};

// FETCH TV SHOW DETAILS

export const fetchTvShowDetailsSuccess = details => ({
  type: actionTypes.FETCH_TV_SHOW_DETAILS_SUCCESS,
  details
});

export const fetchTvShowDetailsFailed = error => ({
  type: actionTypes.FETCH_TV_SHOW_DETAILS_FAILED,
  error
});

export const fetchTvShowDetailsStart = () => ({
  type: actionTypes.FETCH_TV_SHOW_DETAILS_START
});

export const fetchTvShowDetails = id => dispatch => {
  dispatch(fetchTvShowDetailsStart());
  axios
    .get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&language=en-US&append_to_response=videos,external_ids,recommendations,credits,similar`
    )
    .then(res => {
      dispatch(fetchTvShowDetailsSuccess(res.data));
    })
    .catch(err => {
      dispatch(fetchTvShowDetailsFailed(err));
    });
};
