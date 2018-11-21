import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncTypeahead, Highlighter } from 'react-bootstrap-typeahead';
import { withRouter } from 'react-router-dom';
import { FormGroup, InputGroup, Button, InputGroupAddon } from 'reactstrap';
import * as actions from '../../store/actions';

import './SearchBar.css';

class SearchBar extends Component {
  clearSearch = () => {
    const { onTypeaheadClear } = this.props;
    if (this.typeahead.state.query.length === 0) {
      return;
    }
    this.typeahead.getInstance().clear();
    this.typeahead.getInstance().focus();
    onTypeaheadClear();
  };

  onSearchSelected = selection => {
    const { history } = this.props;
    if (selection.length !== 1) {
      return;
    }
    history.push(
      `/search?type=${selection[0].type}&query=${encodeURIComponent(
        selection[0].name
      )}`
    );
    this.clearSearch();
    this.typeahead.getInstance().blur();
  };

  // Styling and formatting of the list-item typeahead shows in results
  renderMenuItemChildren = (result, props) => [
    <i className={result.icon} key="icon" />,
    <Highlighter key="name" search={props.text}>
      {result.name}
    </Highlighter>
  ];

  render() {
    const {
      noMatch,
      searchEmptyLabel,
      searchResults,
      loading,
      input,
      onFetchResults,
      onInputChanged
    } = this.props;

    const buttonStyle = noMatch
      ? {
          backgroundColor: '#dc3545',
          borderColor: 'red',
          color: 'white'
        }
      : null;

    let buttonIcon = '';
    if (input.length === 0) {
      buttonIcon = 'fa fa-search fa-fw';
    } else if (loading) {
      buttonIcon = 'fa fa-circle-o-notch fa-spin fa-fw';
    } else {
      buttonIcon = 'fa fa-close fa-fw';
    }

    return (
      <FormGroup className="input-group my-3">
        <InputGroup>
          <AsyncTypeahead
            maxHeight="700px"
            maxResults={10}
            isInvalid={noMatch}
            isLoading={false}
            selectHintOnEnter
            highlightOnlyResult
            hint={false}
            bsSize="large"
            minLength={1}
            placeholder="Search for a movie, tv show, person..."
            emptyLabel={searchEmptyLabel}
            filterBy={option => option.name}
            labelKey={option => option.name}
            renderMenuItemChildren={this.renderMenuItemChildren}
            useCache={false}
            options={searchResults}
            onChange={selected => this.onSearchSelected(selected)}
            onInputChange={t => {
              onInputChanged(t);
            }}
            onSearch={query => {
              onFetchResults(query);
            }}
            ref={ref => {
              this.typeahead = ref;
            }}
          />
          <InputGroupAddon addonType="append">
            <Button
              className="btn btn-dark btn-lg rounded-right"
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

const mapStateAsProps = state => ({
  noMatch: state.typeahead.noMatch,
  searchEmptyLabel: state.typeahead.searchEmptyLabel,
  searchResults: state.typeahead.searchResults,
  loading: state.typeahead.loading,
  input: state.typeahead.input
});

const mapDispatchAsProps = dispatch => ({
  onFetchResults: query => dispatch(actions.fetchTypeaheadResults(query)),
  onTypeaheadClear: () => dispatch(actions.clearTypeahead()),
  onInputChanged: input => dispatch(actions.changeTypeaheadInput(input))
});

export default withRouter(
  connect(
    mapStateAsProps,
    mapDispatchAsProps
  )(SearchBar)
);
