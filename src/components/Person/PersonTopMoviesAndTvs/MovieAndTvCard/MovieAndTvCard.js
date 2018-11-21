import React from 'react';
import { Link } from 'react-router-dom';

const MovieAndTvCard = props => {
  const { name, type, imagePath, id } = props;

  return (
    <div className="col-3 mb-4" style={{ minWidth: '214px' }}>
      <div className="card h-100" style={{ width: '160px' }}>
        <Link to={`/${type}/${id}`}>
          <img
            className="card-img-top"
            src={imagePath}
            alt={name}
            title={name}
          />
        </Link>
        <div className="card-body py-2 d-flex text-center justify-content-center">
          <Link to={`/${type}/${id}`}>
            <p className="card-text">{name}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieAndTvCard;
