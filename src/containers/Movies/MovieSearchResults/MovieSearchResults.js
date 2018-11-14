import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { fetchSearchesFromAPI } from '../../../shared/fetchFromAPI';
import MovieAndTvSummaryCard from '../../../shared/MovieAndTvSummaryCard/MovieAndTvSummaryCard';
import PaginationNav from '../../../shared/PaginationNav/PaginationNav';

class MovieSearchResults extends Component {
  state = {
    fetchedMovies: [],
    activePage: 1,
    fetchedPages: []
  };

  componentDidMount() {
    console.log(this.props);
    this.fetchMoviesFromAPI();
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;
    const { activePage, fetchedPages } = this.state;
    if (
      prevProps.searchQuery === searchQuery &&
      prevState.activePage !== activePage &&
      !fetchedPages.includes(activePage)
    ) {
      this.fetchMoviesFromAPI(activePage, false);
    } else if (prevProps.searchQuery !== searchQuery) {
      this.fetchMoviesFromAPI();
    }
  }

  fetchMoviesFromAPI = (page = 1, isNewSearch = true) => {
    const { searchQuery } = this.props;

    fetchSearchesFromAPI(searchQuery, 'movie', page).then(response => {
      const { fetchedMovies, fetchedPages } = this.state;
      let movies = [];
      let pages = [];
      if (!isNewSearch) {
        movies = [...fetchedMovies];
        pages = [...fetchedPages];
      }
      movies.push(response);
      pages.push(page);

      this.setState({
        fetchedMovies: movies,
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
    history.push(`/movie/${id}`);
  };

  render() {
    const { fetchedPages, fetchedMovies, activePage } = this.state;

    const searchPage = [];
    let pagination = null;

    if (fetchedPages.includes(activePage)) {
      const searchResultsForChosenPage = fetchedMovies
        .filter(movie => movie.page === activePage)
        .map(result => result);

      searchResultsForChosenPage[0].results.forEach(result => {
        const overviewText = result.overview
          ? result.overview
          : "We don't have a description of this movie.";
        const posterImagePath = result.poster_path
          ? `https://image.tmdb.org/t/p/w185/${result.poster_path}`
          : 'https://imgplaceholder.com/185x278/393939/8A8A8A/fa-image';

        searchPage.push(
          <MovieAndTvSummaryCard
            key={result.id}
            title={result.title}
            overviewText={overviewText}
            posterPath={posterImagePath}
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

export default withRouter(MovieSearchResults);
