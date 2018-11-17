import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helperMethods';

const initialState = {
  searchResults: null,
  personDetails: null,
  trendingPeople: null,
  sError: null,
  sLoading: false,
  dError: null,
  dLoading: false,
  tError: null,
  tLoading: false
};

const fetchPeopleSearchResultsStart = state =>
  updateObject(state, { sLoading: true });

const fetchPeopleSearchResultsSuccess = (state, action) =>
  updateObject(state, { searchResults: action.searchResults, sLoading: true });

const fetchPeopleSearchResultsFailed = state =>
  updateObject(state, { sLoading: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PEOPLE_SEARCH_RESULTS_START:
      return fetchPeopleSearchResultsStart(state, action);
    case actionTypes.FETCH_PEOPLE_SEARCH_RESULTS_SUCCESS:
      return fetchPeopleSearchResultsSuccess(state, action);
    case actionTypes.FETCH_PEOPLE_SEARCH_RESULTS_FAILED:
      return fetchPeopleSearchResultsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
