import React from 'react';
import { withRouter } from 'react-router-dom';
import ActorCard from './ActorCard/ActorCard';
import { getImageUrl, arrayExistsIsNotEmpty } from '../helperMethods';

// Shows most popular actors for a given production.
const MovieAndTvTopCast = props => {
  const { cast, crew } = props;

  // Creates actor-cards for the top five actors sorted by popularity.
  const actorCards = arrayExistsIsNotEmpty(cast)
    ? cast
        .sort((objA, objB) => objB.popularity - objA.popularity)
        .slice(0, 5)
        .map(person => (
          <ActorCard
            id={person.id}
            key={person.id}
            actorName={person.name}
            playedRoleName={person.character}
            imagePath={getImageUrl(person.profile_path, 'w185')}
          />
        ))
    : null;

  return (
    <div className="mb-5 pb-2">
      <div className="row">
        <h4 className="ml-3">Top Cast</h4>
      </div>
      {actorCards ? (
        <div className="row d-flex align-items-stretch float-left mb-3">
          {actorCards}
        </div>
      ) : (
        <p>There is no cast added to this movie.</p>
      )}
      <div className="row d-block pr-5">
        {arrayExistsIsNotEmpty(cast) || arrayExistsIsNotEmpty(crew) ? (
          <button
            type="button"
            className="btn btn-outline-secondary btn-block btn-lg ml-3"
            title="See full cast &amp; crew"
            onClick={() => {
              props.history.push({
                pathname: `${props.location.pathname}/credits`
              });
            }}
          >
            Full Cast &amp; Crew
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default withRouter(MovieAndTvTopCast);
