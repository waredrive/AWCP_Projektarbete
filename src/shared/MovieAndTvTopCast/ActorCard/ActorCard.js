import React from 'react';
import { Link } from 'react-router-dom';

const ActorCard = props => {
  const { actorName, playedRoleName, imagePath, id } = props;

  return (
    <div className="col">
      <div className="card h-100" style={{ width: '132px' }}>
        <Link to={`/person/${id}`}>
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
        </Link>
        <div className="card-body">
          <Link to={`/person/${id}`}>
            <h6 className="card-subtitle mb-2">{actorName}</h6>
          </Link>
          <p className="card-text" style={{ fontSize: '.9rem' }}>
            {playedRoleName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActorCard;
