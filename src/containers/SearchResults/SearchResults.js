import React, { Component } from 'react';
import { fetchFromAPI } from '../../shared/fetchFromAPI';

class SearchResults extends Component {
  state = {
    movies: [],
    persons: [],
    shows: []
  };

  componentDidMount() {
    const types = ['movie', 'tv', 'person'];
    const { location } = this.props;
    const queryParam = new URLSearchParams(location.search);
    const query = queryParam.get('query');
    types.forEach(type => {
      fetchFromAPI(query, 1, type).then(response =>
        console.log(response.total_results, response.results)
      );
    });
  }

  render() {
    const { location } = this.props;
    const query = new URLSearchParams(location.search);
    return <p className="text-light">{query.get('query')}</p>;
  }
}

export default SearchResults;
