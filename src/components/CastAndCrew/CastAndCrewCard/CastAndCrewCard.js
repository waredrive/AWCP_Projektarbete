import React from 'react';
import { Link } from 'react-router-dom';

// A person card to be shown in all cast and crew view.
const CastAndCrewCard = props => {
  const { actorName, playedRoleName, imagePath, id } = props;

  return (
    <div className="card m-3 w-75">
      <div className="card-body">
        <div className="float-left d-flex align-items-center mr-3">
          <Link to={`/person/${id}`}>
            <img
              className="border rounded"
              src={imagePath}
              alt={actorName}
              title={actorName}
            />
          </Link>
        </div>
        <div className="d-flex align-items-start">
          <div className="d-inline-block">
            <Link to={`/person/${id}`}>
              <h5 className="card-title mb-0 pb-0">{actorName}</h5>
            </Link>
          </div>
        </div>
        <p className="card-text">{playedRoleName}</p>
      </div>
    </div>
  );
};

export default CastAndCrewCard;
