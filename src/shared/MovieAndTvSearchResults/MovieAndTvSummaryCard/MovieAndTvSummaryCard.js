import React from 'react';
import { Link } from 'react-router-dom';
import RatingBar from '../../RatingBar/RatingBar';

const MovieAndTvSummaryCard = props => {
  const {
    overviewText,
    posterPath,
    title,
    voteAverage,
    voteCount,
    releaseDate,
    onShowDetailsClick,
    id,
    type
  } = props;

  return (
    <div className="card my-3">
      <div className="card-body">
        <Link to={`/${type}/${id}`}>
          <img
            className="float-left border rounded mr-3 mb-3"
            src={posterPath}
            title={title}
            alt={`Poster of ${title}`}
          />
        </Link>
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
            <Link to={`/${type}/${id}`}>
              <h5 className="card-title mb-0 pb-0">{title}</h5>
            </Link>
            <p className="font-italic">{releaseDate}</p>
          </div>
        </div>
        <p className="card-text text-justify">{overviewText}</p>
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
