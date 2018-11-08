import React, { Component } from 'react';
import {
  fetchSearchesFromAPI,
  fetchImagesFromAPI
} from '../../shared/fetchFromAPI';

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
        <li className={style}>
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
    const movies = this.state.movies.map(movie => movie);
    console.log(movies);
    return (
      <div>
        {movies.map(movie => (
          <div>
            {movie.results.map(result => (
              <div className="card my-3 container">
                {/* <h5 className="card-header">{result.title}</h5> */}
                <div className="card-body">
                  <img
                    className="float-left mr-3 mb-3"
                    src={
                      result.poster_path
                        ? `https://image.tmdb.org/t/p/w185/${
                            result.poster_path
                          }`
                        : 'https://imgplaceholder.com/185x278/393939/8A8A8A/fa-image'
                    }
                    alt="poster"
                  />
                  <h5 className="card-title">{result.title}</h5>
                  <p>{result.release_date}</p>

                  <p className="card-text">
                    {result.overview
                      ? result.overview
                      : "We don't have a description of this movie."}
                  </p>
                  <button
                    type="button"
                    className="btn btn-secondary btn-block btn-lg mt-2"
                  >
                    More details
                  </button>
                </div>
              </div>
            ))}
            {this.createPagination(2, movie.total_pages)}
          </div>
        ))}
      </div>
    );
  }
}

export default SearchResults;
