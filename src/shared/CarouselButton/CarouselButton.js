import React from 'react';

const CarouselButton = props => {
  const { onButtonClick, orientation } = props;

  let icon;

  if (orientation === 'right') {
    icon = 'fa fa-angle-right fa-lg';
  } else if (orientation === 'left') {
    icon = 'fa fa-angle-left fa-lg';
  }
  return (
    <button
      type="button"
      className="btn btn-light btn-circle btn-lg justify-content-center align-items-center"
      onClick={onButtonClick}
    >
      <i className={icon} />
    </button>
  );
};

export default CarouselButton;
