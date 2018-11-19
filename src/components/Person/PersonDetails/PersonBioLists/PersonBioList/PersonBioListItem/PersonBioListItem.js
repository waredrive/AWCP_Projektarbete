import React from 'react';
import { Link } from 'react-router-dom';

const PersonBioListItem = props => {
  const { year, nameOfProduction, job, type, id } = props;

  return (
    <li className="list-group-item my-1">
      <div className="row">
        <div className="d-inline-block col-1">{year}</div>
        <div className="d-inline-block col-11">
          <Link to={`/${type}/${id}`}>
            <span className="font-weight-bold">{nameOfProduction}</span>
          </Link>
          <span className="font-italic">{job}</span>
        </div>
      </div>
    </li>
  );
};

export default PersonBioListItem;
