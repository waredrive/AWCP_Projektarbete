import React from 'react';
import RatingBar from '../RatingBar/RatingBar';
import Backdrop from '../Backdrop/Backdrop';
import ExternalPagesNavBar from '../ExternalPagesNavBar/ExternalPagesNavBar';
import PlayTrailerButton from '../PlayTrailerButton/PlayTrailerButton';
import { getImageUrl, arrayExistsIsNotEmpty } from '../helperMethods';
import CrewHeaderItem from './CrewHeaderItem/CrewHeaderItem';

// A header to be shown on a movies/tv-shows details page.
const MovieAndTvHeader = props => {
  const { production } = props;

  const yearOfProduction =
    production.release_date || production.first_air_date ? (
      <p className="font-weight-light h4">
        {`(${new Date(
          production.release_date || production.first_air_date
        ).getFullYear()})`}
      </p>
    ) : null;

  const posterImagePath = getImageUrl(production.poster_path, 'w300');

  const quote = production.tagline ? (
    <p className="font-italic h5 font-weight-light mt-4">
      &quot;
      {production.tagline}
      &quot;
    </p>
  ) : null;

  const overview = production
    ? production.overview || "We don't have a description of this production."
    : null;

  let crew = null;

  // Because movies have credits.crew array and tv-shows have created_by array this
  // if-statement checks for both cases.
  if (production.created_by) {
    crew = production.created_by;
  } else if (production.credits) {
    const c = production.credits.crew;
    crew = c;
  }

  // Takes first three persons of the crew array determined above to add them to the header.
  const crewInfo = arrayExistsIsNotEmpty(crew)
    ? crew
        .splice(0, 3)
        .map(person => (
          <CrewHeaderItem
            key={person.job + String(person.id)}
            personJob={person.job || 'Creator'}
            personName={person.name}
            personId={person.id}
          />
        ))
    : null;

  const videos = production.videos ? production.videos.results : null;

  // Takes first video with the type 'Trailer' from the videos array.
  const trailer = arrayExistsIsNotEmpty(videos)
    ? videos.map(video => video).filter(vid => vid.type === 'Trailer')[0]
    : null;

  return (
    <Backdrop backdropPath={production.backdrop_path}>
      <div className="container text-light">
        <div className="row">
          <div className="col-4 mt-4 d-flex">
            <img
              className="rounded align-self-center"
              src={posterImagePath}
              title={production.title || production.name}
              alt={`Poster of ${production.title || production.name}`}
            />
          </div>
          <div className="col-8 my-3">
            <h1 className="mb-1">{production.title || production.name}</h1>
            {yearOfProduction}
            {quote}
            <div className="my-5 d-inline-block">
              <div className=" d-inline-block mr-4">
                <RatingBar
                  sizeInPixels={55}
                  voteAverage={production.vote_average}
                  voteCount={production.vote_count}
                  hexColor="#000"
                />
              </div>
              <ExternalPagesNavBar
                homepage={production.homepage}
                externalIds={production.external_ids}
              />
              {trailer ? <PlayTrailerButton video={trailer} /> : null}
            </div>
            <div>
              <h4>Overview</h4>
              <p className="text-justify">{overview}</p>
            </div>
            <div className="mt-5">
              <h4>Crew</h4>
              <div className="d-flex justify-content-between">
                {crewInfo || <p>There is no crew added.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};

export default MovieAndTvHeader;
