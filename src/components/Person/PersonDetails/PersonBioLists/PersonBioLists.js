import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import PersonBioList from './PersonBioList/PersonBioList';

class PersonBioLists extends Component {
  state = {
    activeTab: 'movie'
  };

  componentDidMount() {
    this.setActiveTab();
  }

  hasCrewOrCast = credits => credits.cast.length > 0 || credits.crew.length > 0;

  setActiveTab = () => {
    const { movieCredits, tvCredits } = this.props;
    let active = '';

    if (
      tvCredits.cast.length + tvCredits.crew.length >
      movieCredits.cast.length + movieCredits.crew.length
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
          <TabPane tabId="movie">
            {this.hasCrewOrCast(movieCredits) ? (
              <>
                <PersonBioList
                  members={movieCredits.crew}
                  headline="As Cast Member"
                />
                <PersonBioList
                  members={movieCredits.crew}
                  headline="As Crew Member"
                />
              </>
            ) : (
              <p className="mt-3 ml-1">
                There is no starring list fort this person.
              </p>
            )}
          </TabPane>
          <TabPane tabId="tv">
            {this.hasCrewOrCast(tvCredits) ? (
              <>
                <PersonBioList
                  members={tvCredits.cast}
                  headline="As Cast Member"
                />
                <PersonBioList
                  members={tvCredits.crew}
                  headline="As Crew Member"
                />
              </>
            ) : (
              <p className="mt-3 ml-1">
                There is no starring list fort this person.
              </p>
            )}
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default PersonBioLists;
