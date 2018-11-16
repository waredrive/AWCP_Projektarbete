import React from 'react';
import MovieAndTvCard from './MovieAndTvCard/MovieAndTvCard';
import { getImageUrl } from '../../../../shared/helperMethods';

const PersonTopMoviesAndTvs = props => {
  const { credits } = props;

  const movieAndTvCards =
    credits && credits.length > 0
      ? [...credits]
          .filter((e, i, self) => self.findIndex(x => x.id === e.id) === i)
          .sort(
            (a, b) =>
              b.popularity * b.vote_average * b.vote_count -
              a.popularity * a.vote_average * a.vote_count
          )
          .slice(0, 8)
          .map(item => (
            <MovieAndTvCard
              type={item.title ? 'movie' : 'tv'}
              id={item.id}
              key={item.id}
              name={item.title || item.name}
              imagePath={getImageUrl(item.poster_path, 'w185')}
            />
          ))
      : null;

  return (
    <div>
      <div className="row">
        <h4 className="ml-3">Known For</h4>
      </div>
      {movieAndTvCards ? (
        <div className="row d-flex align-items-stretch float-left mb-3">
          {movieAndTvCards}
        </div>
      ) : (
        <p>There is no productions the person is known for.</p>
      )}
    </div>
  );
};

export default PersonTopMoviesAndTvs;
