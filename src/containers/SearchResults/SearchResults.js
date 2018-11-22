import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';
import MovieAndTvSearchResults from '../../shared/MovieAndTvSearchResults/MovieAndTvSearchResults';
import PeopleSearchResults from '../Person/PeopleSearchResults/PeopleSearchResults';
import ResultsBadge from '../../components/SearchResults/ResultsBadge/ResultsBadge';
import * as actions from '../../store/actions/index';
import Spinner from '../../shared/Spinner/Spinner';
import ScrollToTopButton from '../../components/SearchResults/ScrollToTopButton/ScrollToTopButton';

class SearchResults extends Component {
  state = {
    activeTab: 'movie'
  };

  componentDidMount() {
    this.onPageLoad();
  }

  componentDidUpdate(prevProps) {
    if (
      this.getQueryString('query', prevProps) !== this.getQueryString('query')
    ) {
      this.onPageLoad();
    }
  }

  onPageLoad = () => {
    const { onFetchMovies, onFetchTvShows, onFetchPeople } = this.props;
    const query = this.getQueryString('query');
    this.setState({ activeTab: this.getQueryString('type') });
    onFetchMovies(query, 1);
    onFetchTvShows(query, 1);
    onFetchPeople(query, 1);
  };

  // Fetches given query param from URL query string. Can fetch param
  //  from current props or props past in by parameter.
  getQueryString = (param, props) => {
    const { location } = props || this.props;
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(param);
  };

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
    const {
      movies,
      tvShows,
      people,
      onFetchMovies,
      onFetchTvShows,
      onFetchPeople
    } = this.props;
    const query = this.getQueryString('query');

    return movies || tvShows || people ? (
      <div className="container mt-5">
        <ScrollToTopButton />
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
                  onPageChange={page => onFetchMovies(query, page)}
                  type="movie"
                />
              </TabPane>
              <TabPane tabId="tv">
                <MovieAndTvSearchResults
                  searchResults={tvShows}
                  onPageChange={page => onFetchTvShows(query, page)}
                  type="tv"
                />
              </TabPane>
              <TabPane tabId="person">
                <PeopleSearchResults
                  searchResults={people}
                  onPageChange={page => onFetchPeople(query, page)}
                />
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
    ) : (
      <Spinner />
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
