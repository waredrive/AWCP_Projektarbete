import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { MovieSearchResults } from '../Movies/MovieSearchResults/MovieSearchResults';
import { TvShowsSearchResults } from '../TvShows/TvShowsSearchResults/TvShowsSearchResults';
import { PeopleSearchResults } from '../People/PeopleSearchResults/PeopleSearchResults';

class SearchResults extends Component {
  state = {
    activeTab: 'Movies'
  };

  fetchQueryString = () => {
    const { location } = this.props;
    const queryParam = new URLSearchParams(location.search);
    return queryParam.get('query');
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
    return (
      <div>
        <Nav pills className=" bg-light rounded">
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
            <MovieSearchResults searchQuery={this.fetchQueryString()} />
          </TabPane>
          <TabPane tabId="Tv">
            <TvShowsSearchResults searchQuery={this.fetchQueryString()} />
          </TabPane>
          <TabPane tabId="People">
            <PeopleSearchResults searchQuery={this.fetchQueryString()} />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default SearchResults;
