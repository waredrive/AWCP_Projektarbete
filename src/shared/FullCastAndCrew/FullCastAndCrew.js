import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CastAndCrewCard from './CastAndCrewCard/CastAndCrewCard';
import { getImageUrl } from '../helperMethods';
import * as actions from '../../store/actions/index';
import Spinner from '../Spinner/Spinner';

class FullCastAndCrew extends Component {
  componentDidMount() {
    const { match, onFetchCredits } = this.props;
    onFetchCredits(match.params.type, match.params.id);
  }

  render() {
    const { crew, cast } = this.props;

    const allCast =
      cast && cast.length > 0 ? (
        cast.map(person => (
          <CastAndCrewCard
            id={person.id}
            key={person.id + person.character}
            actorName={person.name}
            playedRoleName={person.character}
            imagePath={getImageUrl(person.profile_path, 'w92')}
          />
        ))
      ) : (
        <p className="text-light ml-3 mt-3">
          No cast found for this production
        </p>
      );

    const allCrew =
      crew && crew.length > 0 ? (
        crew.map(person => (
          <CastAndCrewCard
            id={person.id}
            key={String(person.id) + person.job}
            actorName={person.name}
            playedRoleName={person.job}
            imagePath={getImageUrl(person.profile_path, 'w92')}
          />
        ))
      ) : (
        <p className="text-light ml-3 mt-3">
          No crew found for this production
        </p>
      );

    return crew && cast ? (
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
    ) : (
      <Spinner />
    );
  }
}

const mapStateAsProps = state => ({
  cast: state.credits.cast,
  crew: state.credits.crew
});

const mapDispatchAsProps = dispatch => ({
  onFetchCredits: (type, id) => dispatch(actions.fetchCredits(type, id))
});

export default withRouter(
  connect(
    mapStateAsProps,
    mapDispatchAsProps
  )(FullCastAndCrew)
);
