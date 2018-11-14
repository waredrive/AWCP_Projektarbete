import React from 'react';
import { Link } from 'react-router-dom';

export const RecommendationCard = props => {
  const { backdropPath, title, id } = props;

  return (
    <Link to={`/movie/${id}`}>
      <div className="card" title={title} style={{ height: '200px' }}>
        <img
          className="card-img-top"
          src={`https://image.tmdb.org/t/p/w300/${backdropPath}`}
          alt={title}
        />
        <div className="card-body">
          <h6
            className="card-subtitle"
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textDecoration: 'none !important'
            }}
          >
            {title}
          </h6>
        </div>
      </div>
    </Link>
  );
};

export default RecommendationCard;
