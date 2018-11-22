import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helperMethods';

const initialState = {
  searchResults: null,
  details: null,
  trending: null,
  searchError: null,
  searchLoading: false,
  trendingError: null,
  trendingLoading: false,
  detailsError: null,
  detailsLoading: false
};

// FETCH PEOPLE SEARCHES

const fetchPeopleSearchResultsStart = state =>
  updateObject(state, { searchLoading: true, searchError: null });

const fetchPeopleSearchResultsSuccess = (state, action) =>
  updateObject(state, {
    searchResults: action.searchResults,
    searchLoading: false
  });

const fetchPeopleSearchResultsFailed = (state, action) =>
  updateObject(state, { searchLoading: false, searchError: action.error });

// FETCH TRENDING PEOPLE

const fetchTrendingPeopleStart = state =>
  updateObject(state, { trendingLoading: true, trendingError: null });

const fetchTrendingPeopleSuccess = (state, action) =>
  updateObject(state, { trending: action.trending, trendingLoading: false });

const fetchTrendingPeopleFailed = (state, action) =>
  updateObject(state, { trendingLoading: false, trendingError: action.error });

// FETCH PERSON DETAILS

const fetchPersonDetailsStart = state =>
  updateObject(state, { detailsLoading: true, detailsError: null });

const fetchPersonDetailsSuccess = (state, action) =>
  updateObject(state, { details: action.details, detailsLoading: false });

const fetchPersonDetailsFailed = (state, action) =>
  updateObject(state, { detailsLoading: false, detailsError: action.error });

// ACTION TYPE SWITCH

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
    case actionTypes.FETCH_PERSON_DETAILS_START:
      return fetchPersonDetailsStart(state, action);
    case actionTypes.FETCH_PERSON_DETAILS_SUCCESS:
      return fetchPersonDetailsSuccess(state, action);
    case actionTypes.FETCH_PERSON_DETAILS_FAILED:
      return fetchPersonDetailsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
