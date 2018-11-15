import React from 'react';
import './PersonFacts.module.css';
import { formatEmptyFields } from '../../../../shared/helperMethods';

const TvShowFacts = props => {
  const { person } = props;
  const genders = { 1: 'Female', 2: 'Male' };
  const gender = genders[person.gender];
  const dayOfDeath = person.deathday ? (
    <div>
      <h6>Day of Death</h6>
      <p>{formatEmptyFields(person.deathday)}</p>
    </div>
  ) : null;

  const alsoKnownAs =
    person.also_known_as && person.also_known_as.length > 0
      ? person.also_known_as.map(name => (
          <p key={name} className="my-0">
            {name}
          </p>
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
    >
      {person.homepage}
    </a>
  ) : null;

  return (
    <div className="ml-3 py-4 pr-3 position-sticky sticky-top">
      <h5>Personal Info</h5>
      <div>
        <h6>Known For</h6>
        <p>{formatEmptyFields(person.known_for_department)}</p>
      </div>
      <div>
        <h6>Gender</h6>
        <div className="mb-3 mt-1">{formatEmptyFields(gender)}</div>
      </div>
      <div>
        <h6>Known Credits</h6>
        <div className="mb-3 mt-1">{formatEmptyFields(knownCredits)}</div>
      </div>
      <div>
        <h6>Birthday</h6>
        <div className="mb-3 mt-1">{formatEmptyFields(person.birthday)}</div>
      </div>
      {dayOfDeath}
      <div>
        <h6>Place of Birth</h6>
        <p>{formatEmptyFields(person.place_of_birth)}</p>
      </div>
      <div>
        <h6>Official Site</h6>
        <p>{formatEmptyFields(homepage)}</p>
      </div>
      <div>
        <h6>Also Known As</h6>
        {formatEmptyFields(alsoKnownAs)}
      </div>
    </div>
  );
};

export default TvShowFacts;
