import React from 'react';

export const ActorCard = props => {
  const { actorName, playedRoleName, imagePath } = props;

  return (
    <div className="col">
      <div className="card h-100" style={{ width: '132px' }}>
        <img
          className="card-img-top"
          src={imagePath}
          alt={actorName}
          style={{
            objectPosition: 'top',
            objectFit: 'cover',
            height: '185px'
          }}
          title={actorName}
        />
        <div className="card-body">
          <h6 className="card-subtitle mb-2">{actorName}</h6>
          <p className="card-text" style={{ fontSize: '.9rem' }}>
            {playedRoleName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActorCard;
