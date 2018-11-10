import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const RatingBar = props => {
  const { sizeInPixels, voteAverage, voteCount } = props;
  const voteAvr = voteCount === 0 ? 'NR' : voteAverage;
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
            fill: '#007bff'
          },
          text: {
            fill: '#fff',
            fontSize: '2rem'
          },
          path: {
            stroke: '#fff'
          },
          trail: { stroke: 'transparent' }
        }}
      />
    </div>
  );
};

export default RatingBar;
