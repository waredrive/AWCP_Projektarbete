import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';
import MovieAndTvSearchResults from '../../shared/MovieAndTvSearchResults/MovieAndTvSearchResults';
import PeopleSearchResults from '../People/PeopleSearchResults/PeopleSearchResults';
import ResultsBadge from './ResultsBadge/ResultsBadge';
import * as actions from '../../store/actions/index';

class SearchResults extends Component {
  state = {
    activeTab: 'movie'
  };

  componentDidMount() {
    this.onPageLoad();
  }

  componentDidUpdate(prevProps) {
    if (
      this.fetchQueryString('query', prevProps) !==
      this.fetchQueryString('query')
    ) {
      this.onPageLoad();
    }
  }

  onPageLoad = () => {
    this.setState({ activeTab: this.fetchQueryString('type') });
    this.fetchMoviesFromAPI(1);
    this.fetchTvShowsFromAPI(1);
    this.fetchPeopleFromAPI(1);
  };

  fetchQueryString = (param, props) => {
    const { location } = props || this.props;
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(param);
  };

  onMoviesPageChangeHandler = page => {
    this.fetchMoviesFromAPI(page);
  };

  onTvShowsPageChangeHandler = page => {
    this.fetchTvShowsFromAPI(page);
  };

  onPeoplePageChangeHandler = page => {
    this.fetchPeopleFromAPI(page);
  };

  fetchMoviesFromAPI(page) {
    const { onFetchMovies } = this.props;
    onFetchMovies(this.fetchQueryString('query'), page);
  }

  fetchTvShowsFromAPI(page) {
    const { onFetchTvShows } = this.props;
    onFetchTvShows(this.fetchQueryString('query'), page);
  }

  fetchPeopleFromAPI(page) {
    const { onFetchPeople } = this.props;
    onFetchPeople(this.fetchQueryString('query'), page);
  }

  toggleTabs(tab) {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { activeTab } = this.state;
    const { movies, tvShows, people } = this.props;

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <Nav pills className="bg-light rounded">
              <NavItem>
                <NavLink
                  disabled={!movies || movies.results.length === 0}
                  className={classnames({
                    active: activeTab === 'movie'
                  })}
                  href="#"
                  onClick={() => {
                    this.toggleTabs('movie');
                  }}
                >
                  Movies
                  <ResultsBadge type={movies} />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  disabled={!tvShows || tvShows.results.length === 0}
                  href="#"
                  className={classnames({ active: activeTab === 'tv' })}
                  onClick={() => {
                    this.toggleTabs('tv');
                  }}
                >
                  Tv Shows
                  <ResultsBadge type={tvShows} />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  disabled={!people || people.results.length === 0}
                  href="#"
                  className={classnames({
                    active: activeTab === 'person'
                  })}
                  onClick={() => {
                    this.toggleTabs('person');
                  }}
                >
                  People
                  <ResultsBadge type={people} />
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="movie">
                <MovieAndTvSearchResults
                  searchResults={movies}
                  onPageChange={page => this.onMoviesPageChangeHandler(page)}
                  type="movie"
                />
              </TabPane>
              <TabPane tabId="tv">
                <MovieAndTvSearchResults
                  searchResults={tvShows}
                  onPageChange={page => this.onTvShowsPageChangeHandler(page)}
                  type="tv"
                />
              </TabPane>
              <TabPane tabId="person">
                <PeopleSearchResults
                  searchResults={people}
                  onPageChange={page => this.onPeoplePageChangeHandler(page)}
                />
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateAsProps = state => ({
  movies: state.movies.searchResults,
  tvShows: state.tvShows.searchResults,
  people: state.people.searchResults,
  selection: state.typeahead.selectedItem
});

const mapDispatchAsProps = dispatch => ({
  onFetchMovies: (query, page) =>
    dispatch(actions.fetchMovieSearchResults(query, page)),
  onFetchTvShows: (query, page) =>
    dispatch(actions.fetchTvShowSearchResults(query, page)),
  onFetchPeople: (query, page) =>
    dispatch(actions.fetchPeopleSearchResults(query, page))
});

export default connect(
  mapStateAsProps,
  mapDispatchAsProps
)(SearchResults);
