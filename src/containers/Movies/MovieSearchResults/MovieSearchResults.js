import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MovieAndTvSummaryCard from '../../../shared/MovieAndTvSummaryCard/MovieAndTvSummaryCard';
import PaginationNav from '../../../shared/PaginationNav/PaginationNav';
import { getImageUrl } from '../../../shared/helperMethods';
import * as actions from '../../../store/actions/index';

class MovieSearchResults extends Component {
  componentDidMount() {
    this.fetchMoviesFromAPI(1);
  }

  componentDidUpdate(prevProps) {
    const { searchQuery } = this.props;
    if (prevProps.searchQuery !== searchQuery) {
      this.fetchMoviesFromAPI(1);
    }
  }

  onPageChangedHandler = page => {
    this.fetchMoviesFromAPI(page);
  };

  onShowDetailsClickHandler = id => {
    const { history } = this.props;
    history.push(`/movie/${id}`);
  };

  fetchMoviesFromAPI(page) {
    const { onFetchMovies, searchQuery } = this.props;
    onFetchMovies(searchQuery, page);
  }

  render() {
    const { movies } = this.props;

    const searchPage = [];
    let pagination = null;

    if (movies) {
      movies.results.forEach(result => {
        const overviewText = result.overview
          ? result.overview
          : "We don't have a description of this movie.";

        searchPage.push(
          <MovieAndTvSummaryCard
            id={result.id}
            type="movie"
            key={result.id}
            title={result.title}
            overviewText={overviewText}
            posterPath={getImageUrl(result.poster_path, 'w185')}
            voteAverage={result.vote_average}
            voteCount={result.vote_count}
            releaseDate={result.release_date}
            onShowDetailsClick={() => this.onShowDetailsClickHandler(result.id)}
          />
        );
      });

      pagination =
        searchPage.length > 0 ? (
          <PaginationNav
            currentPage={movies.page}
            totalPages={movies.total_pages}
            onPageChanged={page => this.onPageChangedHandler(page)}
          />
        ) : null;
    }
    return (
      <div>
        {searchPage}
        {pagination}
      </div>
    );
  }
}

const mapStateAsProps = state => ({
  movies: state.movies.fetchedPage
});

const mapDispatchAsProps = dispatch => ({
  onFetchMovies: (query, page) => dispatch(actions.fetchMovies(query, page))
});

export default withRouter(
  connect(
    mapStateAsProps,
    mapDispatchAsProps
  )(MovieSearchResults)
);
