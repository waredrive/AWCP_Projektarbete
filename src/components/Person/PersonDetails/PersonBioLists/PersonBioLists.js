import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent } from 'reactstrap';
import classnames from 'classnames';
import PersonFactTabPane from '../PersonFacts/PersonFactTabPane/PersonFactTabPane';

class PersonBioLists extends Component {
  state = {
    activeTab: 'movie'
  };

  componentDidMount() {
    this.setActiveTab();
  }

  setActiveTab = () => {
    const { movieCredits, tvCredits } = this.props;
    let active = '';

    if (
      movieCredits.cast.length + movieCredits.crew.length === 0 &&
      tvCredits.cast.length + tvCredits.crew.length > 0
    ) {
      active = 'tv';
    } else {
      active = 'movie';
    }
    this.setState({ activeTab: active });
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
    const { movieCredits, tvCredits } = this.props;
    const { activeTab } = this.state;

    return (
      <div className="row d-block pr-4 mt-5">
        <Nav pills className="bg-light rounded justify-content-end">
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === 'movie'
              })}
              href="#"
              onClick={() => {
                this.toggleTabs('movie');
              }}
            >
              Movies
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="#"
              className={classnames({ active: activeTab === 'tv' })}
              onClick={() => {
                this.toggleTabs('tv');
              }}
            >
              Tv Shows
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <PersonFactTabPane tabId="movie" credits={movieCredits} />
          <PersonFactTabPane tabId="tv" credits={tvCredits} />
        </TabContent>
      </div>
    );
  }
}

export default PersonBioLists;
