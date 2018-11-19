import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

// Fetch Movie Searches

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

// Fetch Trending Movies

export const fetchTrendingMoviesSuccess = trending => ({
  type: actionTypes.FETCH_TRENDING_MOVIES_SUCCESS,
  trending
});

export const fetchTrendingMoviesFailed = error => ({
  type: actionTypes.FETCH_TRENDING_MOVIES_FAILED,
  error
});

export const fetchTrendingMoviesStart = () => ({
  type: actionTypes.FETCH_TRENDING_MOVIES_START
});

export const fetchTrendingMovies = () => dispatch => {
  dispatch(fetchMovieSearchResultsStart());
  axios
    .get(`trending/movie/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
    .then(res => {
      dispatch(fetchTrendingMoviesSuccess(res.data));
    })
    .catch(err => {
      dispatch(fetchTrendingMoviesFailed(err));
    });
};

// Fetch Movie Details

export const fetchMovieDetailsSuccess = details => ({
  type: actionTypes.FETCH_MOVIE_DETAILS_SUCCESS,
  details
});

export const fetchMovieDetailsFailed = error => ({
  type: actionTypes.FETCH_MOVIE_DETAILS_FAILED,
  error
});

export const fetchMovieDetailsStart = () => ({
  type: actionTypes.FETCH_MOVIE_DETAILS_START
});

export const fetchMovieDetails = id => dispatch => {
  dispatch(fetchMovieDetailsStart());
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&language=en-US&append_to_response=videos,external_ids,recommendations,credits,similar`
    )
    .then(res => {
      dispatch(fetchMovieDetailsSuccess(res.data));
    })
    .catch(err => {
      dispatch(fetchMovieDetailsFailed(err));
    });
};
