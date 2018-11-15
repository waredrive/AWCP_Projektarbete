import React from 'react';
import { Link } from 'react-router-dom';
import RatingBar from '../RatingBar/RatingBar';
import Backdrop from '../Backdrop/Backdrop';
import ExternalPagesNavBar from '../ExternalPagesNavBar/ExternalPagesNavBar';
import PlayTrailerButton from '../PlayTrailerButton/PlayTrailerButton';

const MovieAndTvHeader = props => {
  const {
    backdropImagePath,
    posterImagePath,
    title,
    yearOfProduction,
    quote,
    voteAverage,
    voteCount,
    overview,
    crew,
    creator,
    homepage,
    externalIds,
    videos
  } = props;

  const crewInfo =
    crew && crew.length > 0
      ? crew.splice(0, 3).map(person => (
          <div key={person.job + person.id}>
            <Link to={`/person/${person.id}`} className="light">
              <h5 className="mb-0">{person.name}</h5>
            </Link>
            <p>{person.job}</p>
          </div>
        ))
      : null;

  const creatorInfo =
    creator && creator.length > 0
      ? creator.splice(0, 3).map(person => (
          <div key={person.id}>
            <Link to={`/person/${person.id}`} className="light">
              <h5 className="mb-0">{person.name}</h5>
            </Link>
            <p>Creator</p>
          </div>
        ))
      : null;

  const trailer =
    videos && videos.length > 0
      ? videos.map(video => video).filter(vid => vid.type === 'Trailer')[0]
      : null;

  return (
    <Backdrop backdropPath={backdropImagePath}>
      <div className="container text-light">
        <div className="row">
          <div className="col-4 mt-4 d-flex">
            <img
              className="rounded align-self-start"
              src={posterImagePath}
              title={title}
              alt={`Poster of ${title}`}
            />
          </div>
          <div className="col-8 my-3">
            <h1 className="mb-1">{title}</h1>
            <p className="font-weight-light h4">({yearOfProduction})</p>
            <p className="font-italic h5 font-weight-light mt-4">{quote}</p>
            <div className="my-5 d-inline-block">
              <div className=" d-inline-block mr-4">
                <RatingBar
                  sizeInPixels={55}
                  voteAverage={voteAverage}
                  voteCount={voteCount}
                  hexColor="#000"
                />
              </div>
              <ExternalPagesNavBar
                homepage={homepage}
                externalIds={externalIds}
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
                {creatorInfo ||
                  crewInfo || <p>There is no crew added to this movie.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};

export default MovieAndTvHeader;
