import React, { Component } from 'react';
import fetchSearchFromAPI from '../../shared/fetchSearchFromAPI';

// eslint-disable-next-line react/prefer-stateless-function
class SearchResults extends Component {
  state = {
    results: []
  };

  componentDidMount() {
    const { location } = this.props;
    const query = new URLSearchParams(location.search);
    let res;
    fetchSearchFromAPI(query.get('query')).then(results =>
      console.log(results)
    );
  }

  render() {
    const { location } = this.props;
    const query = new URLSearchParams(location.search);
    return <p className="text-light">{query.get('query')}</p>;
  }
}

export default SearchResults;
