import React, { Component } from 'react';
import { AsyncTypeahead, Highlighter } from 'react-bootstrap-typeahead';
import { withRouter } from 'react-router-dom';
import { FormGroup, InputGroup, Button } from 'react-bootstrap';
import axios from '../../axios-settings';

import './SearchBar.css';

class SearchBar extends Component {
  state = {
    searchResults: [],
    searchMinLength: 3,
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

  clearSearch = () => {
    const { input } = this.state;

    if (input.length === 0) {
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
    // console.log(selection[0]);
    history.push(`/search/${encodeURIComponent(selection[0])}}`);
    setTimeout(() => {
      console.log(this.typeahead);
    }, 10);

    // this.clearSearch();
    this.typeahead.getInstance().blur();
  };

  onInputChangeHandler = e => {
    console.log(e);
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

  renderMenuItemChildren = (result, props) => {
    switch (result.media_type) {
      case 'tv':
        return this.isMatchingStrings(result.name, props.text)
          ? this.formatMenuItemChild(result.name, 'fa fa-tv pr-2', props)
          : this.formatMenuItemChild(result.original_name, 'fas fa-tv', props);
      case 'person':
        return this.formatMenuItemChild(result.name, 'fa fa-user pr-2', props);
      case 'movie':
        return this.isMatchingStrings(result.title, props.text)
          ? this.formatMenuItemChild(result.title, 'fa fa-film pr-2', props)
          : this.formatMenuItemChild(
              result.original_title,
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
      <FormGroup className="input-group mt-1" validationState="error">
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
          <InputGroup.Button className="input-group-append">
            <Button
              className="btn btn-light btn-lg rounded-right"
              style={buttonStyle}
              onClick={this.clearSearch}
            >
              <i className={buttonIcon} />
            </Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    );
  }
}

export default withRouter(SearchBar);
