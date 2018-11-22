import React, { Component } from 'react';
import { connect } from 'react-redux';
import PersonHeader from '../../../components/Person/PersonHeader/PersonHeader';
import { getImageUrl } from '../../../shared/helperMethods';
import Backdrop from '../../../shared/Backdrop/Backdrop';
import PersonFacts from '../../../components/Person/PersonFacts/PersonFacts';
import PersonBio from '../../../components/Person/PersonBio/PersonBio';
import PersonTopMoviesAndTvs from '../../../components/Person/PersonTopMoviesAndTvs/PersonTopMoviesAndTvs';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../shared/Spinner/Spinner';

class PersonDetails extends Component {
  componentDidMount() {
    const { match, onFetchPerson } = this.props;
    onFetchPerson(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const { match, onFetchPerson } = this.props;
    if (prevProps.match.params.id === match.params.id) {
      return;
    }
    onFetchPerson(match.params.id);
  }

  render() {
    const { person, loading } = this.props;

    return person && !loading ? (
      <div>
        <PersonHeader
          imagePath={getImageUrl(person.profile_path, 'h632')}
          name={person.name}
          biography={person.biography}
          homepage={person.homepage}
          externalIds={person.external_ids}
        />
        <div className="bg-light">
          <div className="container bg-light">
            <div className="row">
              <div className="col-9 my-3 pr-5">
                <div className="row">
                  <PersonTopMoviesAndTvs
                    credits={
                      person.combined_credits
                        ? person.combined_credits.cast
                        : null
                    }
                  />
                </div>
                <PersonBio
                  movieCredits={person.movie_credits}
                  tvCredits={person.tv_credits}
                />
              </div>
              <div
                className="col-3 my-3 text-light rounded"
                style={{ backgroundColor: '#5C6165' }}
              >
                <PersonFacts person={person} />
              </div>
            </div>
          </div>
        </div>
        <Backdrop />
      </div>
    ) : (
      <Spinner />
    );
  }
}

const mapStateAsProps = state => ({
  person: state.people.details,
  loading: state.people.detailsLoading
});

const mapDispatchAsProps = dispatch => ({
  onFetchPerson: id => dispatch(actions.fetchPersonDetails(id))
});

export default connect(
  mapStateAsProps,
  mapDispatchAsProps
)(PersonDetails);
