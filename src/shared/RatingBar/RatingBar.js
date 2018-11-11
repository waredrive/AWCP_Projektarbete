import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const RatingBar = props => {
  const { sizeInPixels, hexColor, voteAverage, voteCount } = props;
  const voteAvr = voteCount === 0 ? 'NR' : voteAverage;
  let strokeColor;

  if (voteAverage >= 6.6) {
    strokeColor = '#1fe250';
  } else if (voteAverage >= 3.3) {
    strokeColor = '#eeff00';
  } else {
    strokeColor = '#ff3030';
  }

  return (
    <div
      style={{ minWidth: `${sizeInPixels}px`, width: `${sizeInPixels}px` }}
      title={`Average vote: ${voteAverage}. Votes: ${voteCount}`}
    >
      <CircularProgressbar
        percentage={voteAverage * 10}
        text={voteAvr}
        background
        backgroundPadding={6}
        styles={{
          background: {
            fill: `${hexColor}`
          },
          text: {
            fill: '#fff',
            fontSize: '2rem'
          },
          path: {
            stroke: `${strokeColor}`
          },
          trail: { stroke: 'transparent' }
        }}
      />
    </div>
  );
};

export default RatingBar;
