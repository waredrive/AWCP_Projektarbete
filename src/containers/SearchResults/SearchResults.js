import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';
import MovieAndTvSearchResults from '../../shared/MovieAndTvSearchResults/MovieAndTvSearchResults';
import PeopleSearchResults from '../People/PeopleSearchResults/PeopleSearchResults';
import * as actions from '../../store/actions/index';

class SearchResults extends Component {
  state = {
    activeTab: 'Movies'
  };

  componentDidMount() {
    this.fetchMoviesFromAPI(1);
    this.fetchTvShowsFromAPI(1);
    this.fetchPeopleFromAPI(1);
  }

  componentDidUpdate(prevProps) {
    if (this.fetchQueryString(prevProps) !== this.fetchQueryString()) {
      this.fetchMoviesFromAPI(1);
      this.fetchTvShowsFromAPI(1);
      this.fetchPeopleFromAPI(1);
    }
  }

  fetchQueryString = loc => {
    const { location } = loc || this.props;
    const queryParam = new URLSearchParams(location.search);
    return queryParam.get('query');
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
    onFetchMovies(this.fetchQueryString(), page);
  }

  fetchTvShowsFromAPI(page) {
    const { onFetchTvShows } = this.props;
    onFetchTvShows(this.fetchQueryString(), page);
  }

  fetchPeopleFromAPI(page) {
    const { onFetchPeople } = this.props;
    onFetchPeople(this.fetchQueryString(), page);
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
                  className={classnames({
                    active: activeTab === 'Movies'
                  })}
                  href="#"
                  onClick={() => {
                    this.toggleTabs('Movies');
                  }}
                >
                  Movies
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#"
                  className={classnames({ active: activeTab === 'Tv' })}
                  onClick={() => {
                    this.toggleTabs('Tv');
                  }}
                >
                  Tv Shows
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#"
                  className={classnames({
                    active: activeTab === 'People'
                  })}
                  onClick={() => {
                    this.toggleTabs('People');
                  }}
                >
                  People
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="Movies">
                <MovieAndTvSearchResults
                  searchResults={movies}
                  onPageChange={page => this.onMoviesPageChangeHandler(page)}
                  type="movie"
                />
              </TabPane>
              <TabPane tabId="Tv">
                <MovieAndTvSearchResults
                  searchResults={tvShows}
                  onPageChange={page => this.onTvShowsPageChangeHandler(page)}
                  type="tv"
                />
              </TabPane>
              <TabPane tabId="People">
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
  people: state.people.searchResults
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
