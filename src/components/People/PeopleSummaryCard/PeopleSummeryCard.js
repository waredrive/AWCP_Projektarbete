import React from 'react';

export const PeopleSummaryCard = props => {
  const { knownFor, profilePath, name } = props;

  const known =
    knownFor.length > 1 ? (
      <div className="mt-3">
        <p className="font-weight-bold mb-0">Known For:</p>
        <ul className="list-unstyled">
          {knownFor.map(title => (
            <li key={title}>{title}</li>
          ))}
        </ul>
      </div>
    ) : null;

  return (
    <div className="card my-3 container">
      <div className="card-body">
        <img
          className="float-left border rounded mr-3 mb-3"
          src={profilePath}
          title={name}
          alt={`Poster of ${name}`}
        />
        <div className="d-flex align-items-start">
          <div className="d-inline-block">
            <h5 className="card-title mb-0 pb-0" title={name}>
              {name}
            </h5>
          </div>
        </div>
        <div className="card-text">{known}</div>
        <button
          type="button"
          className="btn btn-outline-secondary btn-block btn-lg mt-2"
          title={name}
        >
          More details
        </button>
      </div>
    </div>
  );
};

export default PeopleSummaryCard;
