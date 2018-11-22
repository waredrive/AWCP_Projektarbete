import React from 'react';
import PersonBioList from './PersonBioList/PersonBioList';

// Creates separate list for person being a crew member and cast member.
const PersonBioLists = props => {
  const { credits } = props;

  return credits.cast.length > 0 || credits.crew.length > 0 ? (
    <>
      <PersonBioList productions={credits.cast} headline="As Cast Member" />
      <PersonBioList productions={credits.crew} headline="As Crew Member" />
    </>
  ) : (
    <p className="mt-3 ml-1">There is no starring list for this person.</p>
  );
};

export default PersonBioLists;
