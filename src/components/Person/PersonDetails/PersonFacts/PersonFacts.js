import React from 'react';
import './PersonFacts.module.css';
import FactField from '../../../../shared/FactField/FactField';

const TvShowFacts = props => {
  const { person } = props;
  const genders = { 1: 'Female', 2: 'Male' };
  const gender = genders[person.gender];

  const alsoKnownAs =
    person.also_known_as && person.also_known_as.length > 0
      ? person.also_known_as.map(altName => (
          <span key={altName} className="my-0 d-block">
            {altName}
          </span>
        ))
      : null;

  const knownCredits = person.combined_credits
    ? person.combined_credits.cast.length + person.combined_credits.crew.length
    : null;

  const homepage = person.homepage ? (
    <a
      className="light"
      href={person.homepage}
      target="_blank"
      rel="noopener noreferrer"
      style={{ wordWrap: 'break-word' }}
    >
      {person.homepage}
    </a>
  ) : null;

  return (
    <div className="ml-3 py-4 pr-3 position-sticky sticky-top">
      <h5>Personal Info</h5>
      <FactField headline="Known For" text={person.known_for_department} />
      <FactField headline="Gender" text={gender} />
      <FactField headline="Known Credits" text={knownCredits} />
      <FactField headline="Birthday" text={person.birthday} />
      {person.deathday ? (
        <FactField headline="Day of Death" text={person.deathday} />
      ) : null}
      <FactField headline="Place of Birth" text={person.place_of_birth} />
      <FactField headline="Official Site" text={homepage} />
      <FactField headline="Also Known As" text={alsoKnownAs} />
    </div>
  );
};

export default TvShowFacts;
