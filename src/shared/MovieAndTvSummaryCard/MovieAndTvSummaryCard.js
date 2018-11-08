import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';

export const MovieAndTvSummaryCard = props => {
  const {
    overviewText,
    posterPath,
    title,
    voteAverage,
    voteCount,
    releaseDate
  } = props;

  return (
    <div className="card my-3 container">
      <div className="card-body">
        <img
          className="float-left mr-3 mb-3"
          src={posterPath}
          title={title}
          alt={`Poster of ${title}`}
        />
        <div className="d-flex align-items-start">
          <div
            style={{ minWidth: '50px', width: '50px' }}
            className="d-inline-block mr-3"
            title={`Average vote: ${voteAverage}. Votes: ${voteCount}`}
          >
            <CircularProgressbar
              percentage={voteAverage * 10}
              text={`${voteAverage}`}
              background
              backgroundPadding={6}
              styles={{
                background: {
                  fill: '#3e98c7'
                },
                text: {
                  fill: '#fff',
                  fontSize: '2rem'
                },
                path: {
                  stroke: '#fff'
                },
                trail: { stroke: 'transparent' }
              }}
            />
          </div>
          <div className="d-inline-block">
            <h5 className="card-title mb-0 pb-0">{title}</h5>
            <p className="font-italic">{releaseDate}</p>
          </div>
        </div>
        <p className="card-text">{overviewText}</p>
        <button
          type="button"
          className="btn btn-outline-secondary btn-block btn-lg mt-2"
        >
          More details
        </button>
      </div>
    </div>
  );
};

export default MovieAndTvSummaryCard;
