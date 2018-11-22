import React from 'react';
import MovieAndTvCard from './MovieAndTvCard/MovieAndTvCard';
import {
  getImageUrl,
  arrayExistsIsNotEmpty
} from '../../../shared/helperMethods';

const PersonTopMoviesAndTvs = props => {
  const { credits } = props;

  // Filters out duplicated productions from array (based on productions id) and sort the
  // top eight popular productions based on popularity, average vote and average count.
  const movieAndTvCards = arrayExistsIsNotEmpty(credits)
    ? credits
        .filter(
          (obj, index, self) => self.findIndex(s => s.id === obj.id) === index
        )
        .sort(
          (objA, objB) =>
            objB.popularity * objB.vote_average * objB.vote_count -
            objA.popularity * objA.vote_average * objA.vote_count
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
    : [];

  return (
    <div>
      <div className="row">
        <h4 className="ml-3">Known For</h4>
      </div>
      {movieAndTvCards.length > 0 ? (
        <div className="row d-flex align-items-stretch float-left mb-3">
          {movieAndTvCards}
        </div>
      ) : (
        <p>There is no productions the person has starred in.</p>
      )}
    </div>
  );
};

export default PersonTopMoviesAndTvs;
