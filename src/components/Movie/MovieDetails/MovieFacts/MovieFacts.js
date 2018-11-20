import React from 'react';
import ISO6391 from 'iso-639-1';
import GenreButton from '../../../../shared/GenreButton/GenreButton';
import './MovieFacts.module.css';
import {
  formatEmptyFields,
  convertRuntimeToHoursAndMinutes,
  formatCurrency
} from '../../../../shared/helperMethods';

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
      <div>
        <h6>Status</h6>
        <p>{formatEmptyFields(movie.status)}</p>
      </div>
      <div>
        <h6>Release date</h6>
        <p>{formatEmptyFields(movie.release_date)}</p>
      </div>
      <div>
        <h6>Runtime</h6>
        <p>
          {formatEmptyFields(movie.runtime, convertRuntimeToHoursAndMinutes)}
        </p>
      </div>
      <div>
        <h6>Original Language</h6>
        <p>{formatEmptyFields(movie.original_language, ISO6391.getName)}</p>
      </div>
      <div>
        <h6>Budget</h6>
        <p>{formatEmptyFields(movie.budget, formatCurrency)}</p>
      </div>
      <div>
        <h6>Revenue</h6>
        <p>{formatEmptyFields(movie.revenue, formatCurrency)}</p>
      </div>
      <div>
        <h6>Genres</h6>
        {formatEmptyFields(genres)}
      </div>
    </div>
  );
};

export default MovieFacts;
