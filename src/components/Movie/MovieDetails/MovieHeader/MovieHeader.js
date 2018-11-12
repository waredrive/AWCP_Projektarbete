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
    crew,
    homePage
  } = props;

  const crewInfo =
    crew && crew.length > 0 ? (
      crew.splice(0, 3).map(person => (
        <div key={person.job + person.id}>
          <h5 className="mb-0">{person.name}</h5>
          <p>{person.job}</p>
        </div>
      ))
    ) : (
      <p>There is no crew added to this movie.</p>
    );

  const homepage = homePage ? (
    <a href={homePage}>
      <button
        type="button"
        className="btn btn-outline-light btn-circle btn-lg d-inline-flex ml-4 justify-content-center"
        onClick={() => {}}
        title={homePage}
      >
        <i className="fa fa-home fa-lg" />
      </button>
    </a>
  ) : null;

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
              <RatingBar
                sizeInPixels={55}
                voteAverage={voteAverage}
                voteCount={voteCount}
                hexColor="#000"
              />
              {homepage}
            </div>
            <div>
              <h4>Overview</h4>
              <p>{overview}</p>
            </div>
            <div className="mt-5">
              <h4>Crew</h4>
              <div className="d-flex justify-content-between">{crewInfo}</div>
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};

export default MovieHeader;
