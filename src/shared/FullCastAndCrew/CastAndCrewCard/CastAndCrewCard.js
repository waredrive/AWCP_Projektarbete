import React from 'react';

const CastAndCrewCard = props => {
  const { actorName, playedRoleName, imagePath } = props;

  return (
    <div className="card m-3 w-75">
      <div className="card-body">
        <div className="float-left d-flex align-items-center mr-3">
          <img
            className="border rounded"
            src={imagePath}
            title={actorName}
            alt={actorName}
          />
        </div>
        <div className="d-flex align-items-start">
          <div className="d-inline-block">
            <h5 className="card-title mb-0 pb-0" title={actorName}>
              {actorName}
            </h5>
          </div>
        </div>
        <p className="card-text">{playedRoleName}</p>
      </div>
    </div>
  );
};

export default CastAndCrewCard;
