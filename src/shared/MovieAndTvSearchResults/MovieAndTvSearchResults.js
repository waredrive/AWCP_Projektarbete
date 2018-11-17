import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MovieAndTvSummaryCard from './MovieAndTvSummaryCard/MovieAndTvSummaryCard';
import PaginationNav from '../PaginationNav/PaginationNav';
import { getImageUrl } from '../helperMethods';

class MovieSearchResults extends Component {
  onShowDetailsClickHandler = id => {
    const { history, type } = this.props;
    history.push(`/${type}/${id}`);
  };

  render() {
    const { searchResults, onPageChange } = this.props;

    const searchPage = [];
    let pagination = null;

    if (searchResults) {
      searchResults.results.forEach(result => {
        const overviewText = result.overview
          ? result.overview
          : "We don't have a description of this movie.";

        searchPage.push(
          <MovieAndTvSummaryCard
            id={result.id}
            type="movie"
            key={result.id}
            title={result.title || result.name}
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
            currentPage={searchResults.page}
            totalPages={searchResults.total_pages}
            onPageChanged={page => onPageChange(page)}
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

export default withRouter(MovieSearchResults);
