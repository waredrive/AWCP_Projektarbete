import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CastAndCrewCard from '../../components/CastAndCrew/CastAndCrewCard/CastAndCrewCard';
import { getImageUrl, arrayExistsIsNotEmpty } from '../../shared/helperMethods';
import * as actions from '../../store/actions/index';
import Spinner from '../../shared/Spinner/Spinner';

class CastAndCrew extends Component {
  componentDidMount() {
    const { match, onFetchCredits } = this.props;
    onFetchCredits(match.params.type, match.params.id);
  }

  getCastAndCrewCards = (people, notFoundText) =>
    arrayExistsIsNotEmpty(people) ? (
      people.map(person => (
        <CastAndCrewCard
          id={person.id}
          key={String(person.id) + (person.character || person.job)}
          actorName={person.name}
          playedRoleName={person.character || person.job}
          imagePath={getImageUrl(person.profile_path, 'w92')}
        />
      ))
    ) : (
      <p className="text-light ml-3 mt-3">{notFoundText}</p>
    );

  render() {
    const { crew, cast, loading } = this.props;

    const allCast = this.getCastAndCrewCards(
      cast,
      'No cast was found for this production.'
    );
    const allCrew = this.getCastAndCrewCards(
      crew,
      'No crew was found for this production.'
    );

    return crew && cast && !loading ? (
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
  crew: state.credits.crew,
  loading: state.credits.loading
});

const mapDispatchAsProps = dispatch => ({
  onFetchCredits: (type, id) => dispatch(actions.fetchCredits(type, id))
});

export default withRouter(
  connect(
    mapStateAsProps,
    mapDispatchAsProps
  )(CastAndCrew)
);
