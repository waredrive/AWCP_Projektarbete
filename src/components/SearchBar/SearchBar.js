import React, { Component } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { withRouter } from 'react-router-dom';
import { FormGroup, InputGroup, Button } from 'react-bootstrap';
import axios from '../../axios-settings';

import './SearchBar.css';

class SearchBar extends Component {
  state = {
    searchResults: [],
    // searchHistoryStorage: [],
    searchMinLength: 3,
    searchEmptyLabel: 'No movies found.',
    isNoMatch: false,
    isLoading: false,
    isError: false,
    touched: false
  };

  // componentWillMount() {
  //   const history = this.getSearchHistory();
  //   this.setState({ searchHistoryStorage: history });
  // }

  findMatchingStrings = (stringToMatch, query) =>
    stringToMatch
      .toLowerCase()
      .trim()
      .includes(query.toLowerCase().trim());

  fetchFromApi = query => {
    this.setState({ isLoading: true });

    axios
      .get(
        `search/multi?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&query=${query}&include_adult=false`
      )
      .then(response => {
        console.log(response.data.results);
        const filteredResponse = response.data.results.filter(val => {
          switch (val.media_type) {
            case 'person':
              return this.findMatchingStrings(val.name, query);
            case 'movie':
              return (
                this.findMatchingStrings(val.title, query) ||
                this.findMatchingStrings(val.original_title, query)
              );
            case 'tv':
              return (
                this.findMatchingStrings(val.name, query) ||
                this.findMatchingStrings(val.original_name, query)
              );
            default:
              return {};
          }
        });
        console.log(filteredResponse);
        const isEmpty = filteredResponse.length === 0;
        this.setState({
          isLoading: false,
          searchResults: filteredResponse,
          isNoMatch: isEmpty
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isLoading: false,
          isError: true,
          searchEmptyLabel:
            'An Error has occurred while fetching data from TMDB. Please try again.',
          isNoMatch: true
        });
      });
  };

  // fetchFromSessionStorage = () => {
  //   const searchHistory = [...this.state.searchHistoryStorage];
  //   const minLength = this.state.searchHistoryStorage.length > 0 ? 0 : 3;
  //   this.setState({ searchResults: searchHistory, searchMinLength: minLength });
  // };

  // getSearchHistory() {
  //   let storage = [];
  //   if (sessionStorage) {
  //     if (sessionStorage.getItem('searchHistory')) {
  //       storage = JSON.parse(sessionStorage.getItem('searchHistory'));
  //     }
  //   }
  //   return storage;
  // }

  // addToSearchHistory = station => {
  //   const storage = [...this.state.searchHistoryStorage];

  //   if (sessionStorage) {
  //     if (!storage.some(s => s.Name === station.Name)) {
  //       storage.unshift(station);
  //     }
  //     if (storage.length > 5) {
  //       storage.pop();
  //     }
  //     this.setState({ searchHistoryStorage: storage });
  //     sessionStorage.setItem('searchHistory', JSON.stringify(storage));
  //   }
  // };

  clearSearch = () => {
    this.typeahead.getInstance().clear();
    this.typeahead.getInstance().focus();
    this.setState({ touched: false, isNoMatch: false });
  };

  searchSelectedStation = station => {
    const { history } = this.props;

    if (station.length !== 1) {
      return;
    }
    this.addToSearchHistory(station[0]);
    history.push(
      `/${encodeURIComponent(station[0].Name.replace(/\//g, '_'))}/${
        station[0].SiteId
      }`
    );
    this.clearSearch();
    this.typeahead.getInstance().blur();
  };

  onInputChangeHandler = e => {
    if (e.length < 3) {
      // this.fetchFromSessionStorage();
      this.setState({ isNoMatch: false });
    }
  };

  onFocusHandler = () => {
    const { touched } = this.state;
    if (touched || !this.typeahead.state.query.length === 0) {
      return;
    }
    this.setState({ touched: true });
    // this.fetchFromSessionStorage();
  };

  render() {
    const {
      isNoMatch,
      searchMinLength,
      searchEmptyLabel,
      searchResults,
      isLoading
    } = this.state;

    return (
      <FormGroup className="input-group mt-1" validationState="error">
        <InputGroup>
          <AsyncTypeahead
            isInvalid={isNoMatch}
            isLoading={false}
            selectHintOnEnter
            highlightOnlyResult
            bsSize="large"
            minLength={searchMinLength}
            placeholder="From station..."
            emptyLabel={searchEmptyLabel}
            filterBy={option =>
              option.title ||
              option.original_title ||
              option.name ||
              option.original_name
            }
            labelKey={option =>
              option.title ||
              option.original_title ||
              option.name ||
              option.original_name
            }
            useCache={false}
            options={searchResults}
            onFocus={this.onFocusHandler}
            onChange={selected => this.searchSelectedStation(selected)}
            onInputChange={e => {
              this.onInputChangeHandler(e);
            }}
            onSearch={query => {
              this.fetchFromApi(query);
              // query.trim().length > 2 ? this.fetchFromApi(query) : this.fetchFromSessionStorage();
            }}
            ref={ref => {
              this.typeahead = ref;
            }}
          />
          <InputGroup.Button className="input-group-append">
            <Button
              className="btn btn-light btn-lg rounded-right"
              style={
                isNoMatch
                  ? {
                      backgroundColor: '#dc3545',
                      borderColor: 'red',
                      color: 'white'
                    }
                  : null
              }
              onClick={this.clearSearch}
            >
              {isLoading ? (
                <i className="fa fa-circle-o-notch fa-spin fa-fw" />
              ) : (
                <i className="fa fa-close fa-fw" />
              )}
            </Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    );
  }
}

export default withRouter(SearchBar);
