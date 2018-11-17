import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

export const fetchCreditsSuccess = credits => ({
  type: actionTypes.FETCH_CREDITS_SUCCESS,
  credits
});

export const fetchCreditsFailed = error => ({
  type: actionTypes.FETCH_CREDITS_FAILED,
  error
});

export const fetchCreditsStart = () => ({
  type: actionTypes.FETCH_CREDITS_START
});

export const fetchCredits = (type, id) => dispatch => {
  dispatch(fetchCreditsStart());
  axios
    .get(`${type}/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
    .then(res => {
      dispatch(fetchCreditsSuccess(res.data));
    })
    .catch(err => {
      dispatch(fetchCreditsFailed(err));
    });
};
