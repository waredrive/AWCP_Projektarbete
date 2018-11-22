import React from 'react';
import { Link } from 'react-router-dom';

// Creates an individual production to be shown in carousel for recommended or similar productions.
const RecommendationAndSimilarCard = props => {
  const { backdropPath, title, id, type } = props;
  return (
    <Link to={`/${type}/${id}`}>
      <div className="card" title={title} style={{ height: '200px' }}>
        <img
          className="card-img-top"
          src={backdropPath}
          alt={title}
          style={{ height: '133px' }}
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

export default RecommendationAndSimilarCard;
