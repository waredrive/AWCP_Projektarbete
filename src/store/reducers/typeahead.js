import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/helperMethods';

const initialState = {
  searchResults: [],
  searchEmptyLabel: 'No movies found.',
  input: '',
  selectedItem: null,
  noMatch: false,
  loading: false,
  error: null
};

const isMatchingStrings = (stringToMatch, query) =>
  stringToMatch
    .toLowerCase()
    .trim()
    .includes(query.toLowerCase().trim());

// Maps the three types of response objects to a new uniform object that can be easily
// styled and displayed in typeahead search results window. This function checks for
// original name/title of the movie/tv-series so a search for those also returns
// a result.
const formatSearchResults = (results, query) =>
  results.map(result => {
    let matchedName = '';
    let typeIcon = '';

    if (
      result.media_type === 'person' &&
      isMatchingStrings(result.name, query)
    ) {
      typeIcon = 'fa fa-user pr-2';
      matchedName = result.name;
    }
    if (result.media_type === 'movie') {
      typeIcon = 'fa fa-film pr-2';
      if (isMatchingStrings(result.title, query)) {
        matchedName = result.title;
      } else if (isMatchingStrings(result.original_title, query)) {
        matchedName = result.original_title;
      }
    }
    if (result.media_type === 'tv') {
      typeIcon = 'fa fa-tv pr-2';
      if (isMatchingStrings(result.name, query)) {
        matchedName = result.name;
      } else if (isMatchingStrings(result.original_name, query)) {
        matchedName = result.original_name;
      }
    }
    return { name: matchedName, type: result.media_type, icon: typeIcon };
  });

// FETCH TYPEAHEAD RESULTS

const fetchTypeaheadResultsStart = state =>
  updateObject(state, { loading: true });

const fetchTypeaheadResultsSuccess = (state, action) =>
  updateObject(state, {
    searchResults: formatSearchResults(action.searchResults, action.query),
    loading: false,
    noMatch: action.searchResults.length === 0
  });

const fetchTypeaheadResultsFailed = (state, action) =>
  updateObject(state, {
    loading: false,
    error: action.error,
    searchEmptyLabel:
      'An Error has occurred while fetching data from TMDB. Please try again.',
    noMatch: true
  });

// MISC TYPEAHEAD ACTIONS

const clearTypeahead = state =>
  updateObject(state, { noMatch: false, input: '' });

const changeTypeaheadInput = (state, action) =>
  updateObject(state, { input: action.input });

// ACTION TYPE SWITCH

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TYPEAHEAD_RESULTS_START:
      return fetchTypeaheadResultsStart(state, action);
    case actionTypes.FETCH_TYPEAHEAD_RESULTS_SUCCESS:
      return fetchTypeaheadResultsSuccess(state, action);
    case actionTypes.FETCH_TYPEAHEAD_RESULTS_FAILED:
      return fetchTypeaheadResultsFailed(state, action);
    case actionTypes.CLEAR_TYPEAHEAD:
      return clearTypeahead(state, action);
    case actionTypes.CHANGE_TYPEAHEAD_INPUT:
      return changeTypeaheadInput(state, action);
    default:
      return state;
  }
};

export default reducer;
