import React from 'react';
import { Link } from 'react-router-dom';

const PersonSummaryCard = props => {
  const { knownFor, profilePath, name, onShowDetailsClick, id } = props;

  const known =
    knownFor && knownFor.length > 1 ? (
      <div className="mt-3">
        <p className="font-weight-bold mb-0">Known For:</p>
        <ul className="list-unstyled">
          {knownFor.map(production => (
            <li key={production.id}>{production.title}</li>
          ))}
        </ul>
      </div>
    ) : null;

  return (
    <div className="card my-3">
      <div className="card-body">
        <Link to={`/person/${id}`}>
          <img
            className="float-left border rounded mr-3 mb-3"
            src={profilePath}
            title={name}
            alt={`Poster of ${name}`}
          />
        </Link>
        <div className="d-flex align-items-start">
          <div className="d-inline-block">
            <Link to={`/person/${id}`}>
              <h5 className="card-title mb-0 pb-0">{name}</h5>
            </Link>
          </div>
        </div>
        <div className="card-text">{known}</div>
        <button
          type="button"
          className="btn btn-outline-secondary btn-block btn-lg mt-2"
          title={name}
          onClick={onShowDetailsClick}
        >
          More details
        </button>
      </div>
    </div>
  );
};

export default PersonSummaryCard;
