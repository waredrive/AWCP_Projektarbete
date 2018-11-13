import React from 'react';
import { ActorCard } from '../../../../shared/ActorCard/ActorCard';

export const TopCast = props => {
  const { cast } = props;

  const actorCards =
    cast && cast.length > 0
      ? cast
          .slice(0, 5)
          .map(person => (
            <ActorCard
              key={person.id}
              actorName={person.name}
              playedRoleName={person.character}
              imagePath={`https://image.tmdb.org/t/p/w185/${
                person.profile_path
              }`}
            />
          ))
      : null;

  return (
    <>
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
        {/* TODO: this must also check the crew. Will be possible when redux implemented. */}
        {cast && cast.length > 0 ? (
          <button
            type="button"
            className="btn btn-secondary btn-block btn-lg ml-3"
            title="See full cast &amp; crew"
          >
            Full Cast &amp; Crew
          </button>
        ) : null}
      </div>
    </>
  );
};

export default TopCast;
