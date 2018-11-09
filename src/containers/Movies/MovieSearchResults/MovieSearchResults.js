import React, { Component } from 'react';
import { fetchSearchesFromAPI } from '../../../shared/fetchFromAPI';
import { MovieAndTvSummaryCard } from '../../../shared/MovieAndTvSummaryCard/MovieAndTvSummaryCard';
import { Pagination } from '../../../shared/Pagination/Pagination';

class MovieSearchResults extends Component {
  state = {
    movies: [],
    activePage: null
  };

  componentDidMount() {
    const { searchQuery } = this.props;
    const { movies } = this.state;
    const fetchedMovies = [...movies];
    fetchSearchesFromAPI(searchQuery, 'movies').then(response => {
      console.log(response);
      fetchedMovies.push(response);
    });
    this.setState({ movies: fetchedMovies, activePage: 1 });
  }

  render() {
    const { movies, activePage } = this.state;

    return (
      <div>
        {movies.map(movie =>
          movie.results.map(result => {
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
                voteCount={result.vote_count}
                releaseDate={result.release_date}
              />
            );
          })
        )}
        <Pagination currentPage={activePage} totalPages={1} />
      </div>
    );
  }
}

export default MovieSearchResults;
