import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helperMethods';

const initialState = {
  cast: null,
  crew: null,
  error: null,
  loading: false
};

const fetchCreditsStart = state => updateObject(state, { loading: true });

const fetchCreditsSuccess = (state, action) =>
  updateObject(state, {
    cast: action.credits.cast,
    crew: action.credits.crew,
    loading: true
  });

const fetchCreditsFailed = state => updateObject(state, { loading: false });

// ACTION TYPE SWITCH

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CREDITS_START:
      return fetchCreditsStart(state, action);
    case actionTypes.FETCH_CREDITS_SUCCESS:
      return fetchCreditsSuccess(state, action);
    case actionTypes.FETCH_CREDITS_FAILED:
      return fetchCreditsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
