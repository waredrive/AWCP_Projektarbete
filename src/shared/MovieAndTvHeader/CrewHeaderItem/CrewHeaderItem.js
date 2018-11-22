import React from 'react';
import { Link } from 'react-router-dom';

// Formats the top three crew members on movies/tv-shows headers.
const CrewHeaderItem = props => {
  const { personJob, personId, personName } = props;

  return (
    <div>
      <Link to={`/person/${personId}`} className="light">
        <h5 className="mb-0">{personName}</h5>
      </Link>
      <p>{personJob}</p>
    </div>
  );
};

export default CrewHeaderItem;
