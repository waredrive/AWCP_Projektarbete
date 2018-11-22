import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Creates a rating-bar showing the average vote for a production.
const RatingBar = props => {
  const { sizeInPixels, hexColor, voteAverage, voteCount } = props;
  const voteAvrToDisplay =
    voteCount === 0 ? 'NR' : String(parseFloat(voteAverage.toFixed(1)));
  let strokeColor;

  // Creates different colors for the bar based on average vote.
  if (voteAverage >= 7) {
    strokeColor = '#1fe250';
  } else if (voteAverage >= 4) {
    strokeColor = '#eeff00';
  } else {
    strokeColor = '#ff3030';
  }

  return (
    <div
      style={{
        minWidth: `${sizeInPixels}px`,
        width: `${sizeInPixels}px`,
        cursor: 'default'
      }}
      title={`Average vote: ${voteAverage}. Votes: ${voteCount}`}
      className="d-inline-block"
    >
      <CircularProgressbar
        className="align-items-center"
        percentage={voteAverage * 10}
        text={voteAvrToDisplay}
        background
        backgroundPadding={5}
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
