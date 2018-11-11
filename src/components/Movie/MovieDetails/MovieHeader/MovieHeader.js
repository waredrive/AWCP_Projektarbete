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
    overview
  } = props;

  return (
    <Backdrop backdropPath={backdropImagePath}>
      <div className="container text-light">
        <div className="row">
          <div className="col-12 my-3">
            <img
              className="float-left mr-5 rounded"
              src={posterImagePath}
              title={title}
              alt={`Poster of ${title}`}
            />
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
            <h4>Overview</h4>
            <p>{overview}</p>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};

export default MovieHeader;
