import React from 'react';
import PersonBioListItems from './PersonBioListItems/PersonBioListItems';

const PersonBioList = props => {
  const { bioList } = props;
  return (
    <div>
      {bioList.cast && bioList.cast.length > 0 ? (
        <div>
          <h5 className="mt-3 ml-1">As Cast Member</h5>
          <PersonBioListItems members={bioList.cast} />
        </div>
      ) : null}
      {bioList.crew && bioList.crew.length > 0 ? (
        <div>
          <h5 className="mt-3 ml-1">As Crew Member</h5>
          <PersonBioListItems members={bioList.crew} />
        </div>
      ) : null}
    </div>
  );
};

export default PersonBioList;
