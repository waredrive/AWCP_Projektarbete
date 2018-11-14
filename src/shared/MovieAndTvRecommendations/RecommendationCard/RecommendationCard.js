import React from 'react';
import { Link } from 'react-router-dom';

const RecommendationCard = props => {
  const { backdropPath, title, id, type } = props;
  return (
    <Link to={`/${type}/${id}`}>
      <div className="card" title={title} style={{ height: '200px' }}>
        <img className="card-img-top" src={backdropPath} alt={title} />
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
