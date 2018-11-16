import React from 'react';
import { Link } from 'react-router-dom';

const MovieAndTvCard = props => {
  const { name, type, imagePath, id } = props;

  return (
    <div className="col">
      <div className="card h-100" style={{ width: '145px' }}>
        <Link to={`/${type}/${id}`}>
          <img
            className="card-img-top"
            src={imagePath}
            alt={name}
            // style={{
            //   objectPosition: 'top',
            //   objectFit: 'cover',
            //   height: '185px'
            // }}
            title={name}
          />
        </Link>
        <div className="card-body">
          <Link to={`/${type}/${id}`}>
            <h6 className="card-subtitle mb-2">{name}</h6>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieAndTvCard;
