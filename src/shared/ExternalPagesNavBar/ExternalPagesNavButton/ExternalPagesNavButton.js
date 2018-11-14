import React from 'react';
import './ExternalPagesNavButton.css';

export const ExternalPagesNavButton = props => {
  const { title, icon, href } = props;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <button
        type="button"
        className="btn btn-outline-light btn-circle btn-lg d-inline-flex ml-4 justify-content-center"
        title={title}
      >
        <i className={icon} />
      </button>
    </a>
  );
};

export default ExternalPagesNavButton;
