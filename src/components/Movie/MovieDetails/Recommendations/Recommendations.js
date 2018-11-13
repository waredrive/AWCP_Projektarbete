import React from 'react';
import Carousel from 'nuka-carousel';
import { RecommendationCard } from '../../../../shared/RecommendationCard/RecommendationCard';

export const Recommendations = props => {
  const { recommendations } = props;
  const recommendationCards =
    recommendations && recommendations.results.length > 0
      ? recommendations.results.map(recommendation => (
          <RecommendationCard
            key={recommendation.id}
            backdropPath={recommendation.backdrop_path}
            title={recommendation.title}
          />
        ))
      : null;

  return (
    <>
      <div className="row mt-5">
        <h4 className="ml-3">Recommendations</h4>
      </div>
      <div className="row d-block pr-4 pl-3">
        {recommendationCards ? (
          <Carousel
            className="border rounded"
            framePadding="20px"
            heightMode="max"
            dragging={false}
            slidesToShow={3}
            cellSpacing={15}
            wrapAround
            renderBottomCenterControls={() => null}
          >
            {recommendationCards}
          </Carousel>
        ) : (
          <p>There are no recommendations added to this movie.</p>
        )}
      </div>
    </>
  );
};

export default Recommendations;
