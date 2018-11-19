import React from 'react';
import { withRouter } from 'react-router-dom';
import ActorCard from './ActorCard/ActorCard';
import { getImageUrl } from '../helperMethods';

const MovieAndTvTopCast = props => {
  const { cast, crew } = props;

  const actorCards =
    cast && cast.length > 0
      ? cast
          .sort((a, b) => b.popularity - a.popularity)
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
        {(cast && cast.length > 0) || (crew && crew.length > 0) ? (
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
