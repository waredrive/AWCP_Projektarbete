import React from 'react';
import { formatEmptyFields } from '../helperMethods';

// Formats fields used in facts sidebars in person/movie/tv-show detail pages.
const FactField = props => {
  const { text, headline, functionToRunOnText } = props;

  return (
    <div>
      <h6>{headline}</h6>
      <p>{formatEmptyFields(text, functionToRunOnText)}</p>
    </div>
  );
};

export default FactField;
