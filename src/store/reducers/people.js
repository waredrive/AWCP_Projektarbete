import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helperMethods';

const initialState = {
  searchResults: null,
  details: null,
  trending: null,
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

const fetchTrendingPeopleStart = state =>
  updateObject(state, { tLoading: true });

const fetchTrendingPeopleSuccess = (state, action) =>
  updateObject(state, { trending: action.trending, tLoading: true });

const fetchTrendingPeopleFailed = state =>
  updateObject(state, { tLoading: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PEOPLE_SEARCH_RESULTS_START:
      return fetchPeopleSearchResultsStart(state, action);
    case actionTypes.FETCH_PEOPLE_SEARCH_RESULTS_SUCCESS:
      return fetchPeopleSearchResultsSuccess(state, action);
    case actionTypes.FETCH_PEOPLE_SEARCH_RESULTS_FAILED:
      return fetchPeopleSearchResultsFailed(state, action);

    case actionTypes.FETCH_TRENDING_PEOPLE_START:
      return fetchTrendingPeopleStart(state, action);
    case actionTypes.FETCH_TRENDING_PEOPLE_SUCCESS:
      return fetchTrendingPeopleSuccess(state, action);
    case actionTypes.FETCH_TRENDING_PEOPLE_FAILED:
      return fetchTrendingPeopleFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
