import React, { Component } from 'react';
import { fetchSearchesFromAPI } from '../../../shared/fetchFromAPI';
import MovieAndTvSummaryCard from '../../../shared/MovieAndTvSummaryCard/MovieAndTvSummaryCard';
import PaginationNav from '../../../shared/PaginationNav/PaginationNav';

class TvShowsSearchResults extends Component {
  state = {
    fetchedShows: [],
    activePage: 1,
    fetchedPages: []
  };

  componentDidMount() {
    this.fetchShowsFromAPI();
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;
    const { activePage, fetchedPages } = this.state;
    if (
      prevProps.searchQuery === searchQuery &&
      prevState.activePage !== activePage &&
      !fetchedPages.includes(activePage)
    ) {
      this.fetchShowsFromAPI(activePage, false);
    } else if (prevProps.searchQuery !== searchQuery) {
      this.fetchShowsFromAPI();
    }
  }

  fetchShowsFromAPI = (page = 1, isNewSearch = true) => {
    const { searchQuery } = this.props;

    fetchSearchesFromAPI(searchQuery, 'tv', page).then(response => {
      const { fetchedShows, fetchedPages } = this.state;
      let shows = [];
      let pages = [];
      if (!isNewSearch) {
        shows = [...fetchedShows];
        pages = [...fetchedPages];
      }
      shows.push(response);
      pages.push(page);

      this.setState({
        fetchedShows: shows,
        activePage: page,
        fetchedPages: pages
      });
    });
  };

  onPageChangedHandler = page => {
    this.setState({ activePage: page });
  };

  onShowDetailsClickHandler = id => {
    const { history } = this.props;
    history.push(`/tv/${id}`);
  };

  render() {
    const { fetchedPages, fetchedShows, activePage } = this.state;

    const searchPage = [];
    let pagination = null;

    if (fetchedPages.includes(activePage)) {
      const searchResultsForChosenPage = fetchedShows
        .filter(show => show.page === activePage)
        .map(result => result);

      searchResultsForChosenPage[0].results.forEach(result => {
        const overviewText = result.overview
          ? result.overview
          : "We don't have a description of this Tv Show.";
        const posterImagePath = result.poster_path
          ? `https://image.tmdb.org/t/p/w185/${result.poster_path}`
          : 'https://imgplaceholder.com/185x278/393939/8A8A8A/fa-image';

        searchPage.push(
          <MovieAndTvSummaryCard
            key={result.id}
            title={result.name}
            overviewText={overviewText}
            posterPath={posterImagePath}
            voteAverage={result.vote_average}
            voteCount={result.vote_count}
            releaseDate={result.first_air_date}
            onShowDetailsClick={() => this.onShowDetailsClickHandler(result.id)}
          />
        );
      });

      pagination =
        searchPage.length > 0 ? (
          <PaginationNav
            currentPage={activePage}
            totalPages={searchResultsForChosenPage[0].total_pages}
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

export default TvShowsSearchResults;
