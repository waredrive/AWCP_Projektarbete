import React, { Component } from 'react';
import { connect } from 'react-redux';
import PersonHeader from './PersonHeader/PersonHeader';
import { getImageUrl } from '../../../shared/helperMethods';
import Backdrop from '../../../shared/Backdrop/Backdrop';
import PersonFacts from './PersonFacts/PersonFacts';
import PersonBioLists from './PersonBioLists/PersonBioLists';
import PersonTopMoviesAndTvs from './PersonTopMoviesAndTvs/PersonTopMoviesAndTvs';
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
    const { person, match } = this.props;

    return person && match.params.id.startsWith(String(person.id)) ? (
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
                <PersonBioLists
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
  person: state.people.details
});

const mapDispatchAsProps = dispatch => ({
  onFetchPerson: id => dispatch(actions.fetchPersonDetails(id))
});

export default connect(
  mapStateAsProps,
  mapDispatchAsProps
)(PersonDetails);
