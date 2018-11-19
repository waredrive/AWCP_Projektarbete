import React from 'react';
import PersonBioListItem from './PersonBioListItem/PersonBioListItem';

const PersonBioListItems = props => {
  const { members } = props;

  const getYearFromDateStr = date => new Date(date).getFullYear();

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

  const list = getSortedArrByDateDesc(members).map(member => {
    let job = '';

    if (member.character) {
      job = ` as ${member.character}`;
    } else if (member.job) {
      job = ` - ${member.job}`;
    }

    return (
      <PersonBioListItem
        year={
          getYearFromDateStr(member.release_date || member.first_air_date) ||
          null
        }
        nameOfProduction={member.title || member.name}
        job={job}
        type={member.title ? 'movie' : 'tv'}
        id={member.id}
        key={String(member.id) + (member.character || member.job)}
      />
    );
  });

  return list ? <ul className="list-group">{list}</ul> : null;
};

export default PersonBioListItems;
