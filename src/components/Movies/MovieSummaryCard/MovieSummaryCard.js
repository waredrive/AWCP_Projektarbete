import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';

export const MovieSummaryCard = props => {
  const { movie } = props;
  const overviewText = movie.overview
    ? movie.overview
    : "We don't have a description of this movie.";
  const posterImagePath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
    : 'https://imgplaceholder.com/185x278/393939/8A8A8A/fa-image';

  return (
    <div className="card my-3 container">
      <div className="card-body">
        <img
          className="float-left mr-3 mb-3"
          src={posterImagePath}
          title={movie.title}
          alt={`Poster of ${movie.title}`}
        />
        <div className="d-flex align-items-start">
          <div
            style={{ minWidth: '50px', width: '50px' }}
            className="d-inline-block mr-3"
            title={`Average vote: ${movie.vote_average}. Votes: ${
              movie.vote_count
            }`}
          >
            <CircularProgressbar
              percentage={movie.vote_average * 10}
              text={`${movie.vote_average}`}
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
            <h5 className="card-title mb-0 pb-0">{movie.title}</h5>
            <p className="font-italic">{movie.release_date}</p>
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

export default MovieSummaryCard;
