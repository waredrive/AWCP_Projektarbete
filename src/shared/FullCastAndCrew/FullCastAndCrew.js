import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { fetchCreditsFromAPI } from '../fetchFromAPI';
import CastAndCrewCard from './CastAndCrewCard/CastAndCrewCard';

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
              key={person.id}
              actorName={person.name}
              playedRoleName={person.character}
              imagePath={`https://image.tmdb.org/t/p/w185/${
                person.profile_path
              }`}
            />
          ))
        : null;

    return <div className="row d-flex mb-3">{allCast}</div>;
  }
}

export default withRouter(FullCastAndCrew);
