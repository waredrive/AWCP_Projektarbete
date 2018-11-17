import React, { Component } from 'react';
import { fetchDetailsFromAPI } from '../../../shared/fetchFromAPI';
import PersonHeader from './PersonHeader/PersonHeader';
import { getImageUrl } from '../../../shared/helperMethods';
import Backdrop from '../../../shared/Backdrop/Backdrop';
import PersonFacts from './PersonFacts/PersonFacts';
import PersonBioLists from './PersonBioLists/PersonBioLists';
import PersonTopMoviesAndTvs from './PersonTopMoviesAndTvs/PersonTopMoviesAndTvs';

class PersonDetails extends Component {
  state = {
    person: {}
  };

  componentDidMount() {
    const { match } = this.props;
    this.fetchPersonFromAPI(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (prevProps.match.params.id === match.params.id) {
      return;
    }
    this.fetchPersonFromAPI(match.params.id);
  }

  fetchPersonFromAPI = id => {
    fetchDetailsFromAPI('person', id).then(response => {
      this.setState({ person: response });
      console.log(this.state);
    });
  };

  render() {
    const { person } = this.state;

    return (
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
    );
  }
}

export default PersonDetails;
