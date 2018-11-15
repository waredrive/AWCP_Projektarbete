import React from 'react';
import { Link } from 'react-router-dom';

const PersonBioListItem = props => {
  const { year, nameOfProduction, job, type, id } = props;

  return (
    <li className="list-group-item my-1">
      <span className="d-inline-block" style={{ width: '4rem' }}>
        {year}
      </span>
      <Link to={`/${type}/${id}`}>
        <span className="font-weight-bold">{nameOfProduction}</span>
      </Link>
      <span className="font-italic">{job}</span>
    </li>
  );
};

export default PersonBioListItem;
