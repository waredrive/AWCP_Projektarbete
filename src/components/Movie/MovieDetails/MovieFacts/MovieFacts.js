import React from 'react';
import ISO6391 from 'iso-639-1';
import GenreButton from '../../../../shared/GenreButton/GenreButton';
import './MovieFacts.module.css';
import {
  convertRuntimeToHoursAndMinutes,
  formatCurrency
} from '../../../../shared/helperMethods';
import FactField from '../../../../shared/FactField/FactField';

const MovieFacts = props => {
  const { movie } = props;

  const genres =
    movie.genres && movie.genres.length > 0
      ? movie.genres.map(genre => (
          <GenreButton key={genre.id} name={genre.name} />
        ))
      : null;

  return (
    <div className="ml-3 py-4 pr-3 position-sticky sticky-top">
      <h5>Facts</h5>
      <FactField headline="Status" text={movie.status} />
      <FactField headline="Release Date" text={movie.release_date} />
      <FactField
        headline="Runtime"
        text={movie.runtime}
        functionToRunOnText={convertRuntimeToHoursAndMinutes}
      />
      <FactField
        headline="Original Language"
        text={movie.original_language}
        functionToRunOnText={ISO6391.getName}
      />
      <FactField
        headline="Budget"
        text={movie.budget}
        functionToRunOnText={formatCurrency}
      />
      <FactField
        headline="Revenue"
        text={movie.revenue}
        functionToRunOnText={formatCurrency}
      />
      <FactField headline="Genres" text={genres} />
    </div>
  );
};

export default MovieFacts;
