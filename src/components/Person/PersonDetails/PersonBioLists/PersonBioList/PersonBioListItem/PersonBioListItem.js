import React from 'react';

const PersonBioListItem = props => {
  const { year, nameOfProduction, job } = props;

  return (
    <li className="list-group-item my-1">
      <p>
        <span className="d-inline-block" style={{ width: '4rem' }}>
          {year}
        </span>
        <span className="font-weight-bold">{nameOfProduction}</span>
        <span className="font-italic">{job}</span>
      </p>
    </li>
  );
};

export default PersonBioListItem;
