import React from 'react';
import ISO6391 from 'iso-639-1';
import GenreButton from '../../../shared/GenreButton/GenreButton';
import './TvShowFacts.module.css';
import {
  convertRuntimeToHoursAndMinutes,
  arrayExistsIsNotEmpty
} from '../../../shared/helperMethods';
import FactField from '../../../shared/FactField/FactField';

// A facts sidebar in movie details page
const TvShowFacts = props => {
  const { tvShow } = props;

  const genres = arrayExistsIsNotEmpty(tvShow.genres)
    ? tvShow.genres.map(genre => (
        <GenreButton key={genre.id} name={genre.name} />
      ))
    : null;

  const networks = arrayExistsIsNotEmpty(tvShow.networks)
    ? tvShow.networks.map(
        network =>
          network.logo_path ? (
            <img
              key={network.id}
              className="d-block py-2"
              alt={network.name}
              src={`https://image.tmdb.org/t/p/w92${network.logo_path}`}
              title={network.name}
              style={{ maxHeight: '4rem' }}
            />
          ) : (
            network.name
          )
      )
    : null;

  const runtime = arrayExistsIsNotEmpty(tvShow.episode_run_time)
    ? tvShow.episode_run_time
        .map(rt => convertRuntimeToHoursAndMinutes(rt))
        .join(', ')
    : null;

  return (
    <div className="ml-3 py-4 pr-3 position-sticky sticky-top">
      <h5>Facts</h5>
      <FactField headline="Status" text={tvShow.status} />
      <FactField headline="Networks" text={networks} />
      <FactField headline="Type" text={tvShow.type} />
      <FactField
        headline="Original Language"
        text={tvShow.original_language}
        functionToRunOnText={ISO6391.getName}
      />
      <FactField headline="First Aired" text={tvShow.first_air_date} />
      <FactField headline="Last Aired" text={tvShow.last_air_date} />
      <FactField headline="Runtime" text={runtime} />
      <FactField headline="Number Of Seasons" text={tvShow.number_of_seasons} />
      <FactField
        headline="Number Of Episodes"
        text={tvShow.number_of_episodes}
      />
      <FactField headline="Genres" text={genres} />
    </div>
  );
};

export default TvShowFacts;
