import React from 'react';
import { ActorCard } from '../../../../shared/ActorCard/ActorCard';

export const TopCast = props => {
  const { cast } = props;

  const actorCards =
    cast && cast.length > 0 ? (
      cast
        .slice(0, 5)
        .map(person => (
          <ActorCard
            key={person.id}
            actorName={person.name}
            playedRoleName={person.character}
            imagePath={`https://image.tmdb.org/t/p/w185/${person.profile_path}`}
          />
        ))
    ) : (
      <p className="ml-3">There is no cast added to this movie.</p>
    );

  return (
    <div className="col-9 my-3 pr-5">
      <div className="row">
        <h4 className="ml-3">Top Cast</h4>
      </div>
      <div className="row d-flex align-items-stretch float-left mb-3">
        {actorCards}
      </div>
      <div className="row d-block pr-5">
        <button
          type="button"
          className="btn btn-secondary btn-block btn-lg ml-3"
          title="Full Cast &amp; Crew"
        >
          Full Cast &amp; Crew
        </button>
      </div>
    </div>
  );
};

export default TopCast;
