import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

export const fetchMoviesSuccess = movies => ({
  type: actionTypes.FETCH_MOVIES_SUCCESS,
  movies
});

export const fetchMoviesFailed = error => ({
  type: actionTypes.FETCH_MOVIES_FAILED,
  error
});

export const fetchMoviesStart = () => ({
  type: actionTypes.FETCH_MOVIES_START
});

export const fetchMovies = (searchQuery, page) => dispatch => {
  dispatch(fetchMoviesStart());
  axios
    .get(
      `search/movie?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&query=${searchQuery}&language=en-US&page=${page}&include_adult=false`
    )
    .then(res => {
      dispatch(fetchMoviesSuccess(res.data));
    })
    .catch(err => {
      dispatch(fetchMoviesFailed(err));
    });
};
