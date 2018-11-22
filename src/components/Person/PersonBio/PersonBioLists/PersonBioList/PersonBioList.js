import React from 'react';
import PersonBioListItem from './PersonBioListItem/PersonBioListItem';

// Formats the list of all production given.
const PersonBioList = props => {
  const { productions, headline } = props;

  const getYearFromDateStr = date => new Date(date).getFullYear();

  // Sorts array immutably based on productions release date or first air date,
  // if none of those fields exist, the result will get higher order so
  // it appears at the top of the list.
  const getSortedArrByDateDesc = arr =>
    arr.length > 0
      ? [...arr].sort(
          (objA, objB) =>
            !objA.release_date && !objB.first_air_date
              ? -1
              : new Date(objB.release_date || objB.first_air_date) -
                new Date(objA.release_date || objA.first_air_date)
        )
      : [];

  const list = getSortedArrByDateDesc(productions).map(production => {
    let job = '';

    if (production.character) {
      job = ` as ${production.character}`;
    } else if (production.job) {
      job = ` - ${production.job}`;
    }

    return (
      <PersonBioListItem
        year={
          getYearFromDateStr(
            production.release_date || production.first_air_date
          ) || null
        }
        nameOfProduction={production.title || production.name}
        job={job}
        type={production.title ? 'movie' : 'tv'}
        id={production.id}
        key={String(production.id) + (production.character || production.job)}
      />
    );
  });

  return list.length > 0 ? (
    <div>
      <h5 className="mt-3 ml-1">{headline}</h5>
      <ul className="list-group">{list}</ul>
    </div>
  ) : null;
};

export default PersonBioList;
