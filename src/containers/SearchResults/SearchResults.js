import React, { Component } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { fetchSearchesFromAPI } from '../../shared/fetchFromAPI';
import { MovieAndTvSummaryCard } from '../../shared/MovieAndTvSummaryCard/MovieAndTvSummaryCard';
import { Pagination } from '../../shared/Pagination/Pagination';

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

  render() {
    const { movies } = this.state;
    const mov = movies.map(movie => movie);
    console.log(mov);
    return movies.map(movie => (
      <div>
        {movie.results.map(result => {
          const overviewText = result.overview
            ? result.overview
            : "We don't have a description of this movie.";
          const posterImagePath = result.poster_path
            ? `https://image.tmdb.org/t/p/w185/${result.poster_path}`
            : 'https://imgplaceholder.com/185x278/393939/8A8A8A/fa-image';

          return (
            <MovieAndTvSummaryCard
              key={result.id}
              title={result.title}
              overviewText={overviewText}
              posterPath={posterImagePath}
              voteAverage={result.vote_average}
              vote_count={result.voteCount}
              releaseDate={result.release_date}
            />
          );
        })}
        <Pagination currentPage={1} totalPages={mov.total_pages} />
      </div>
    ));
  }
}

export default SearchResults;
