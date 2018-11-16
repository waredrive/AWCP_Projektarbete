import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import PersonBioList from './PersonBioList/PersonBioList';

class PersonBioLists extends Component {
  state = {
    activeTab: 'Movies'
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
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="Movies">
            <PersonBioList bioList={movieCredits} />
          </TabPane>
          <TabPane tabId="Tv">
            <PersonBioList bioList={tvCredits} />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default PersonBioLists;
