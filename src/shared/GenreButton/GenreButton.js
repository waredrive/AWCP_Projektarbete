import React from 'react';

const GenreButton = props => {
  const { name } = props;

  return (
    <button type="button" className="btn btn-light btn-sm mr-2 mt-2 disabled">
      {name.toUpperCase()}
    </button>
  );
};

export default GenreButton;
