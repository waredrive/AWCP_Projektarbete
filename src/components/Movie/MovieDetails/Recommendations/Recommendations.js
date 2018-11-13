import React from 'react';
import Carousel from 'nuka-carousel';
import { RecommendationCard } from '../../../../shared/RecommendationCard/RecommendationCard';

export const Recommendations = props => {
  const { recommendations } = props;
  console.log(recommendations);
  const recommendationCards =
    recommendations && recommendations.results.length > 0 ? (
      recommendations.results.map(recommendation => (
        <RecommendationCard
          key={recommendation.id}
          backdropPath={recommendation.backdrop_path}
          title={recommendation.title}
        />
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
