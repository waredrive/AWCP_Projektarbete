import React from 'react';
import PersonBioListItem from './PersonBioListItem/PersonBioListItem';

const PersonBioList = props => {
  const getYearFromDateString = date => new Date(date).getFullYear();

  const getSortedArrByDateDesc = arr =>
    arr.length > 0
      ? [...arr].sort(
          (a, b) =>
            !a.release_date || a.first_air_date
              ? -1
              : new Date(b.release_date || b.first_air_date) -
                new Date(a.release_date || a.first_air_date)
        )
      : [];

  const { bioList } = props;
  let cast = null;
  let crew = null;

  if (bioList) {
    cast = getSortedArrByDateDesc(bioList.cast).map(bioItem => (
      <PersonBioListItem
        year={
          getYearFromDateString(
            bioItem.release_date || bioItem.first_air_date
          ) || null
        }
        nameOfProduction={bioItem.title || bioItem.name}
        job={bioItem.character ? ` as ${bioItem.character}` : ''}
        type={bioItem.title ? 'movie' : 'tv'}
        id={bioItem.id}
        key={bioItem.id + bioItem.character}
      />
    ));

    crew = getSortedArrByDateDesc(bioList.crew).map(bioItem => (
      <PersonBioListItem
        year={
          getYearFromDateString(
            bioItem.release_date || bioItem.first_air_date
          ) || null
        }
        nameOfProduction={bioItem.title || bioItem.name}
        job={bioItem.job ? ` - ${bioItem.job}` : ''}
        type={bioItem.title ? 'movie' : 'tv'}
        id={bioItem.id}
        key={bioItem.id + bioItem.job}
      />
    ));
  }
  return (
    // TODO: fix so the headlines dissapears if no results or add text
    <div>
      <div>
        <h5 className="mt-3 ml-1">As Cast Member</h5>
        <ul className="list-group">{cast}</ul>
      </div>
      <div>
        <h5 className="mt-3 ml-1">As Crew Member</h5>
        <ul className="list-group">{crew}</ul>
      </div>
    </div>
  );
};

export default PersonBioList;
