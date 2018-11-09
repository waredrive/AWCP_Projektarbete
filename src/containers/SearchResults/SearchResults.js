import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import 'react-circular-progressbar/dist/styles.css';
import { fetchSearchesFromAPI } from '../../shared/fetchFromAPI';
import { MovieAndTvSummaryCard } from '../../shared/MovieAndTvSummaryCard/MovieAndTvSummaryCard';
import { Pagination } from '../../shared/Pagination/Pagination';

class SearchResults extends Component {
  state = {
    movies: [],
    persons: [],
    shows: [],
    activeTab: 'Movies'
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

  toggleTabs(tab) {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { movies } = this.state;
    const mov = movies.map(movie => movie);
    console.log(mov);
    return (
      <div>
        <Nav pills className=" bg-light rounded">
          <NavItem>
            <NavLink
              className={{ active: this.state.activeTab === 'Movies' }}
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
              className={{ active: this.state.activeTab === 'Tv' }}
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
              className={{ active: this.state.activeTab === 'People' }}
              onClick={() => {
                this.toggleTabs('People');
              }}
            >
              People
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">
              Disabled Link
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="Movies">
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
            <Pagination currentPage={1} totalPages={mov.total_pages} />
          </TabPane>
          <TabPane tabId="Tv">
            <p>Hello</p>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default SearchResults;
