import React from 'react';
import Carousel from 'nuka-carousel';

export const Recommendations = props => {
  const { recommendations } = props;
  console.log(recommendations);
  const recommendationCards =
    recommendations && recommendations.results.length > 0 ? (
      recommendations.results.map(recommendation => (
        <div className="card">
          <img
            className="card-img-top"
            src={`https://image.tmdb.org/t/p/w185/${
              recommendation.backdrop_path
            }`}
            alt={recommendation.original_title}
          />
          <div className="card-body">
            <h6
              className="card-subtitle"
              style={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
              }}
            >
              {recommendation.original_title}
            </h6>
          </div>
        </div>
      ))
    ) : (
      <p className="ml-3">There is no cast added to this movie.</p>
    );

  return (
    <>
      <div className="row mt-5">
        <h4 className="ml-3">Recommendations</h4>
      </div>
      <div className="row d-block pr-4 pl-3">
        <Carousel
          className="border rounded"
          framePadding="20px"
          heightMode="current"
          dragging={false}
          slidesToShow={3}
          cellSpacing={15}
          renderBottomCenterControls={() => null}
        >
          {recommendationCards}
        </Carousel>
      </div>
    </>
  );
};

export default Recommendations;
