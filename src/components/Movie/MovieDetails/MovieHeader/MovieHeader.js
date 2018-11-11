import React from 'react';
import { RatingBar } from '../../../../shared/RatingBar/RatingBar';
import { Backdrop } from '../../../../shared/Backdrop/Backdrop';

export const MovieHeader = props => {
  const {
    backdropImagePath,
    posterImagePath,
    title,
    yearOfProduction,
    quote,
    voteAverage,
    voteCount,
    overview,
    crew
  } = props;

  return (
    <Backdrop backdropPath={backdropImagePath}>
      <div className="container text-light">
        <div className="row">
          <div className="col-4 mt-4 d-flex justify-content-center">
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
              <RatingBar
                sizeInPixels={60}
                voteAverage={voteAverage}
                voteCount={voteCount}
                hexColor="#000"
              />
            </div>
            <div>
              <h4>Overview</h4>
              <p>{overview}</p>
            </div>
            <div className="mt-5">
              <h4>Crew</h4>
              <div>
                <h5 className="mb-0">Name</h5>
                <p>Job title</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};

export default MovieHeader;
