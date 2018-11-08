import React, { Component } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { fetchSearchesFromAPI } from '../../shared/fetchFromAPI';
import { MovieSummaryCard } from '../../components/Movies/MovieSummaryCard/MovieSummaryCard';

class SearchResults extends Component {
  state = {
    movies: [],
    persons: [],
    shows: []
  };

  componentDidMount() {
    const types = { movie: 'movies', tv: 'shows', person: 'persons' };
    const { location } = this.props;
    const queryParam = new URLSearchParams(location.search);
    const query = queryParam.get('query');
    const updatedState = { ...this.state };

    Object.keys(types).forEach(type => {
      fetchSearchesFromAPI(query, type).then(response => {
        updatedState[types[type]].push(response);
      });
    });
    this.setState({ ...updatedState });
  }

  createPagination = (currentPage, totalPages) => {
    const pagination = [];
    let disableNext = false;
    let disablePrevious = false;
    let startPoint = 1;
    let endPoint = 1;

    if (Math.floor(currentPage / 10) * 10 === 0) {
      startPoint = 1;
      disablePrevious = true;
    } else {
      startPoint = Math.floor(currentPage / 10) * 10;
    }

    if (startPoint + 10 > totalPages) {
      endPoint = totalPages + 1;
      disableNext = true;
    } else {
      endPoint = startPoint + 10;
    }

    for (let i = startPoint; i < endPoint; i += 1) {
      let style = 'page-item';
      if (currentPage === i) {
        style = 'page-item active';
      }
      pagination.push(
        <li className={style} key={i}>
          <a className="page-link" id={i}>
            {i}
          </a>
        </li>
      );
    }

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className={disablePrevious ? 'page-link disabled' : 'page-link'}>
              Previous
            </a>
          </li>
          {pagination}
          <li className="page-item">
            <a className={disableNext ? 'page-link disabled' : 'page-link'}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  render() {
    const { movies } = this.state;
    const mov = movies.map(movie => movie);
    return movies.map(movie => (
      <div>
        {movie.results.map(result => (
          <MovieSummaryCard mov={result} key={result.id} />
        ))}
        {this.createPagination(1, mov.total_pages)}
      </div>
    ));
  }
}

export default SearchResults;
