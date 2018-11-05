import React, { Component } from 'react';
import { AsyncTypeahead, Highlighter } from 'react-bootstrap-typeahead';
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

  isMatchingStrings = (stringToMatch, query) =>
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
              return this.isMatchingStrings(val.name, query);
            case 'movie':
              return (
                this.isMatchingStrings(val.title, query) ||
                this.isMatchingStrings(val.original_title, query)
              );
            case 'tv':
              return (
                this.isMatchingStrings(val.name, query) ||
                this.isMatchingStrings(val.original_name, query)
              );
            default:
              return '';
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

  searchSelected = selection => {
    const { history } = this.props;

    if (selection.length !== 1) {
      return;
    }
    // this.addToSearchHistory(station[0]);
    history.push(
      `/${encodeURIComponent(selection[0].media_type.replace(/\//g, '_'))}/${
        selection[0].id
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

  formatMenuItemChildren = (text, icon, props) => [
    <i className={icon} key="icon" />,
    <Highlighter key="name" search={props.text}>
      {text}
    </Highlighter>
  ];

  renderMenuItemChildren = (option, props) => {
    switch (option.media_type) {
      case 'tv':
        return this.isMatchingStrings(option.name, props.text)
          ? this.formatMenuItemChildren(option.name, 'fa fa-tv pr-2', props)
          : this.formatMenuItemChildren(
              option.original_name,
              'fas fa-tv',
              props
            );
      case 'person':
        return this.formatMenuItemChildren(
          option.name,
          'fa fa-user pr-2',
          props
        );
      case 'movie':
        return this.isMatchingStrings(option.title, props.text)
          ? this.formatMenuItemChildren(option.title, 'fa fa-film pr-2', props)
          : this.formatMenuItemChildren(
              option.original_title,
              'fa fa-film pr-2',
              props
            );
      default:
        return [];
    }
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
            placeholder="Search for a movie, tv show, person..."
            emptyLabel={searchEmptyLabel}
            filterBy={option =>
              option.title ||
              option.original_title ||
              option.name ||
              option.original_name
            }
            labelKey={option =>
              option.name ||
              option.original_name ||
              option.title ||
              option.original_title
            }
            renderMenuItemChildren={this.renderMenuItemChildren}
            useCache={false}
            options={searchResults}
            onFocus={this.onFocusHandler}
            onChange={selected => this.searchSelected(selected)}
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
