import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MovieAndTvSummaryCard from './MovieAndTvSummaryCard/MovieAndTvSummaryCard';
import PaginationNav from '../PaginationNav/PaginationNav';
import { getImageUrl } from '../helperMethods';
import Spinner from '../Spinner/Spinner';

// A page showing all the productions found when searching a given query.
class MovieSearchResults extends Component {
  onShowDetailsClickHandler = id => {
    const { history, type } = this.props;
    history.push(`/${type}/${id}`);
  };

  render() {
    const { searchResults, onPageChange, type } = this.props;

    const searchPage = searchResults
      ? searchResults.results.map(result => (
          <MovieAndTvSummaryCard
            id={result.id}
            type={type}
            key={result.id}
            title={result.title || result.name}
            overviewText={
              result.overview ||
              "We don't have a description of this production.."
            }
            posterPath={getImageUrl(result.poster_path, 'w185')}
            voteAverage={result.vote_average}
            voteCount={result.vote_count}
            releaseDate={result.release_date}
            onShowDetailsClick={() => this.onShowDetailsClickHandler(result.id)}
          />
        ))
      : null;

    const pagination = searchResults ? (
      <PaginationNav
        currentPage={searchResults.page}
        totalPages={searchResults.total_pages}
        onPageChanged={page => onPageChange(page)}
      />
    ) : null;

    return (
      <div>
        {searchPage || <Spinner />}
        {pagination}
      </div>
    );
  }
}

export default withRouter(MovieSearchResults);
