import React from 'react';
import { RatingBar } from '../RatingBar/RatingBar';

export const MovieAndTvSummaryCard = props => {
  const {
    overviewText,
    posterPath,
    title,
    voteAverage,
    voteCount,
    releaseDate,
    onShowDetailsClick
  } = props;

  return (
    <div className="card my-3">
      <div className="card-body">
        <img
          className="float-left border rounded mr-3 mb-3"
          src={posterPath}
          title={title}
          alt={`Poster of ${title}`}
        />
        <div className="d-flex align-items-start">
          <div className="d-inline-block mr-3 mb-2">
            <RatingBar
              hexColor="#282a2b"
              sizeInPixels={50}
              voteAverage={voteAverage}
              voteCount={voteCount}
            />
          </div>
          <div className="d-inline-block">
            <h5 className="card-title mb-0 pb-0" title={title}>
              {title}
            </h5>
            <p className="font-italic">{releaseDate}</p>
          </div>
        </div>
        <p className="card-text">{overviewText}</p>
        <button
          type="button"
          className="btn btn-outline-secondary btn-block btn-lg mt-2"
          title={title}
          onClick={onShowDetailsClick}
        >
          More details
        </button>
      </div>
    </div>
  );
};

export default MovieAndTvSummaryCard;
