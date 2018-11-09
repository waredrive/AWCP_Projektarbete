import React, { Component } from 'react';
import { AsyncTypeahead, Highlighter } from 'react-bootstrap-typeahead';
import { withRouter } from 'react-router-dom';
import { FormGroup, InputGroup, Button, InputGroupAddon } from 'reactstrap';
import { fetchSearchesFromAPI } from '../../shared/fetchFromAPI';

import './SearchBar.css';

class SearchBar extends Component {
  state = {
    searchResults: [],
    searchMinLength: 1,
    searchEmptyLabel: 'No movies found.',
    input: '',
    isNoMatch: false,
    isLoading: false,
    isError: false
  };

  isMatchingStrings = (stringToMatch, query) =>
    stringToMatch
      .toLowerCase()
      .trim()
      .includes(query.toLowerCase().trim());

  formatSearchResults = (results, query) =>
    results.map(result => {
      let matchedName = '';
      let typeIcon = '';

      if (
        result.media_type === 'person' &&
        this.isMatchingStrings(result.name, query)
      ) {
        typeIcon = 'fa fa-user pr-2';
        matchedName = result.name;
      }
      if (result.media_type === 'movie') {
        typeIcon = 'fa fa-film pr-2';
        if (this.isMatchingStrings(result.title, query)) {
          matchedName = result.title;
        } else if (this.isMatchingStrings(result.original_title, query)) {
          matchedName = result.original_title;
        }
      }
      if (result.media_type === 'tv') {
        typeIcon = 'fa fa-tv pr-2';
        if (this.isMatchingStrings(result.name, query)) {
          matchedName = result.name;
        } else if (this.isMatchingStrings(result.original_name, query)) {
          matchedName = result.original_name;
        }
      }
      return { name: matchedName, type: result.media_type, icon: typeIcon };
    });

  fetchFromApi = query => {
    this.setState({ isLoading: true });
    fetchSearchesFromAPI(query)
      .then(response => {
        const formatedResults = this.formatSearchResults(
          response.results,
          query
        );
        const isEmpty = response.results.length === 0;
        this.setState({
          isLoading: false,
          searchResults: formatedResults,
          isNoMatch: isEmpty
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          isError: true,
          searchEmptyLabel:
            'An Error has occurred while fetching data from TMDB. Please try again.',
          isNoMatch: true
        });
      });
  };

  clearSearch = () => {
    if (this.typeahead.state.query.length === 0) {
      return;
    }

    this.typeahead.getInstance().clear();
    this.typeahead.getInstance().focus();
    this.setState({
      isTouched: false,
      isNoMatch: false,
      input: ''
    });
  };

  searchSelected = selection => {
    const { history } = this.props;
    if (selection.length !== 1) {
      return;
    }
    history.push(`/search?query=${encodeURIComponent(selection[0].name)}`);
    this.clearSearch();
    this.typeahead.getInstance().blur();
  };

  onInputChangeHandler = e => {
    const updatedState = { ...this.state };
    updatedState.input = e;
    if (e.length < 3) {
      updatedState.isNoMatch = false;
    }
    this.setState({ ...updatedState });
  };

  formatMenuItemChild = (text, icon, props) => [
    <i className={icon} key="icon" />,
    <Highlighter key="name" search={props.text}>
      {text}
    </Highlighter>
  ];

  renderMenuItemChildren = (result, props) => [
    <i className={result.icon} key="icon" />,
    <Highlighter key="name" search={props.text}>
      {result.name}
    </Highlighter>
  ];

  render() {
    const {
      isNoMatch,
      searchMinLength,
      searchEmptyLabel,
      searchResults,
      isLoading,
      input
    } = this.state;

    const buttonStyle = isNoMatch
      ? {
          backgroundColor: '#dc3545',
          borderColor: 'red',
          color: 'white'
        }
      : null;

    let buttonIcon = '';
    if (input.length === 0) {
      buttonIcon = 'fa fa-search fa-fw';
    } else if (isLoading) {
      buttonIcon = 'fa fa-circle-o-notch fa-spin fa-fw';
    } else {
      buttonIcon = 'fa fa-close fa-fw';
    }

    return (
      <FormGroup className="input-group mt-1">
        <InputGroup>
          <AsyncTypeahead
            maxHeight="700px"
            maxResults={10}
            isInvalid={isNoMatch}
            isLoading={false}
            selectHintOnEnter
            highlightOnlyResult
            hint={false}
            bsSize="large"
            minLength={searchMinLength}
            placeholder="Search for a movie, tv show, person..."
            emptyLabel={searchEmptyLabel}
            filterBy={option => option.name}
            labelKey={option => option.name}
            renderMenuItemChildren={this.renderMenuItemChildren}
            useCache={false}
            options={searchResults}
            onChange={selected => this.searchSelected(selected)}
            onInputChange={e => {
              this.onInputChangeHandler(e);
            }}
            onSearch={query => {
              this.fetchFromApi(query);
            }}
            ref={ref => {
              this.typeahead = ref;
            }}
          />
          <InputGroupAddon addonType="append">
            <Button
              className="btn btn-light btn-lg rounded-right"
              style={buttonStyle}
              onClick={this.clearSearch}
            >
              <i className={buttonIcon} />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
    );
  }
}

export default withRouter(SearchBar);
