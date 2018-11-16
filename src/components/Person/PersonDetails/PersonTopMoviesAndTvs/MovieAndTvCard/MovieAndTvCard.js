import React from 'react';
import { Link } from 'react-router-dom';

const MovieAndTvCard = props => {
  const { name, type, imagePath, id } = props;

  return (
    <div className="col mb-4">
      <div className="card h-100" style={{ width: '160px' }}>
        <Link to={`/${type}/${id}`}>
          <img
            className="card-img-top"
            src={imagePath}
            alt={name}
            title={name}
          />
        </Link>
        <div className="card-body py-2 d-flex justify-content-center align-content-center">
          <Link to={`/${type}/${id}`}>
            <h6 className="card-subtitle mb-2">{name}</h6>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieAndTvCard;
