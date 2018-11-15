import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { fetchCreditsFromAPI } from '../fetchFromAPI';
import CastAndCrewCard from './CastAndCrewCard/CastAndCrewCard';
import { getImageUrl } from '../helperMethods';

class FullCastAndCrew extends Component {
  state = {
    crew: [],
    cast: []
  };

  componentDidMount() {
    const { location } = this.props;
    fetchCreditsFromAPI(location.pathname).then(resp => {
      this.setState({ crew: resp.crew, cast: resp.cast });
    });
  }

  render() {
    const { crew, cast } = this.state;

    const allCast =
      cast.length > 0
        ? cast.map(person => (
            <CastAndCrewCard
              id={person.id}
              key={person.id + person.character}
              actorName={person.name}
              playedRoleName={person.character}
              imagePath={getImageUrl(person.profile_path, 92)}
            />
          ))
        : null;

    const allCrew =
      crew.length > 0
        ? crew.map(person => (
            <CastAndCrewCard
              id={person.id}
              key={person.id + person.job}
              actorName={person.name}
              playedRoleName={person.job}
              imagePath={getImageUrl(person.profile_path, 92)}
            />
          ))
        : null;

    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h4 className="text-light ml-3 mt-3">Cast</h4>
            {allCast}
          </div>
          <div className="col-6">
            <h4 className="text-light ml-3 mt-3">Crew</h4>
            {allCrew}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FullCastAndCrew);
