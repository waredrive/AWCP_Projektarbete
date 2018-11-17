import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helperMethods';

const initialState = {
  fetchedPage: null,
  fetchedMovie: null,
  error: null,
  loading: false
};

const fetchMoviesStart = state => updateObject(state, { loading: true });

const fetchMoviesSuccess = (state, action) =>
  updateObject(state, { fetchedPage: action.movies, loading: true });

const fetchMoviesFailed = state => updateObject(state, { loading: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MOVIES_START:
      return fetchMoviesStart(state, action);
    case actionTypes.FETCH_MOVIES_SUCCESS:
      return fetchMoviesSuccess(state, action);
    case actionTypes.FETCH_MOVIES_FAILED:
      return fetchMoviesFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
