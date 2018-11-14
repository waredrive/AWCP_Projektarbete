import React from 'react';
import ISO6391 from 'iso-639-1';
import './TvShowFacts.module.css';
import {
  formatEmptyFields,
  convertRuntimeToHoursAndMinutes
} from '../../../../shared/helperMethods';

const TvShowFacts = props => {
  const { tvShow } = props;

  const genres =
    tvShow.genres && tvShow.genres.length > 0
      ? tvShow.genres.map(genre => (
          <button
            type="button"
            key={genre.id}
            className="btn btn-light btn-sm mr-2 mt-2 disabled"
          >
            {genre.name.toUpperCase()}
          </button>
        ))
      : null;

  const networks =
    tvShow.networks && tvShow.networks.length > 0
      ? tvShow.networks.map(network => (
          <img
            key={network.id}
            className="mb-3 mt-1"
            alt={network.name}
            src={`https://image.tmdb.org/t/p/w92${network.logo_path}`}
            title={network.name}
          />
        ))
      : null;

  const runtime =
    tvShow.episode_run_time && tvShow.episode_run_time.length > 0
      ? tvShow.episode_run_time
          .map(rt => convertRuntimeToHoursAndMinutes(rt))
          .join(', ')
      : null;

  return (
    <div className="ml-3 my-3">
      <h5>Facts</h5>
      <div>
        <h6>Status</h6>
        <p>{formatEmptyFields(tvShow.status)}</p>
      </div>
      <div>
        <h6>Network</h6>
        {formatEmptyFields(networks)}
      </div>
      <div>
        <h6>First Aired</h6>
        <p>{formatEmptyFields(tvShow.first_air_date)}</p>
      </div>
      <div>
        <h6>Last Aired</h6>
        <p>{formatEmptyFields(tvShow.last_air_date)}</p>
      </div>
      <div>
        <h6>Runtime</h6>
        <p>{formatEmptyFields(runtime)}</p>
      </div>
      <div>
        <h6>Number Of Seasons</h6>
        <p>{formatEmptyFields(tvShow.number_of_seasons)}</p>
      </div>
      <div>
        <h6>Number Of Episodes</h6>
        <p>{formatEmptyFields(tvShow.number_of_episodes)}</p>
      </div>
      <div>
        <h6>Original Language</h6>
        <p>{formatEmptyFields(tvShow.original_language, ISO6391.getName)}</p>
      </div>
      <div>
        <h6>Type</h6>
        <p>{formatEmptyFields(tvShow.type)}</p>
      </div>
      <div>
        <h6>Genres</h6>
        {formatEmptyFields(genres)}
      </div>
    </div>
  );
};

export default TvShowFacts;
