import React from 'react';
import PersonBioList from './PersonBioList/PersonBioList';

const PersonBioLists = props => {
  const { credits } = props;

  return credits.cast.length > 0 || credits.crew.length > 0 ? (
    <>
      <PersonBioList members={credits.cast} headline="As Cast Member" />
      <PersonBioList members={credits.crew} headline="As Crew Member" />
    </>
  ) : (
    <p className="mt-3 ml-1">There is no starring list for this person.</p>
  );
};

export default PersonBioLists;
