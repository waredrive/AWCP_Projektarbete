import React from 'react';

// A badge showing number of results for given production.
const ResultBadge = props => {
  const { type } = props;

  let badge = null;

  if (type) {
    const bootstrapClasses =
      type.total_results > 0
        ? 'badge badge-pill badge-success ml-1'
        : 'badge badge-pill badge-danger ml-1';

    badge = (
      <span className={bootstrapClasses} style={{ verticalAlign: 'top' }}>
        {type.total_results}
      </span>
    );
  }

  return <>{badge}</>;
};

export default ResultBadge;
