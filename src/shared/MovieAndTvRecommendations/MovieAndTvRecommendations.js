import React from 'react';
import Carousel from 'nuka-carousel';
import RecommendationCard from './RecommendationCard/RecommendationCard';
import { getImageUrl } from '../helperMethods';
import CarouselButton from '../CarouselButton/CarouselButton';

const MovieAndTvRecommendations = props => {
  const { recommendations, type } = props;
  const recommendationCards =
    recommendations && recommendations.results.length > 0
      ? recommendations.results.map(recommendation => (
          <RecommendationCard
            type={type}
            key={recommendation.id}
            id={recommendation.id}
            backdropPath={getImageUrl(
              recommendation.backdrop_path,
              'w300',
              'h169'
            )}
            title={recommendation.title || recommendation.name}
          />
        ))
      : null;

  return (
    <>
      <div className="row mt-5 pt-5">
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
            disableKeyboardControls
            wrapAround
            cellAlign="center"
            easing="easeQuadInOut"
            renderBottomCenterControls={() => null}
            renderCenterRightControls={({ nextSlide }) => (
              <CarouselButton orientation="right" onButtonClick={nextSlide} />
            )}
            renderCenterLeftControls={({ previousSlide }) => (
              <CarouselButton
                orientation="left"
                onButtonClick={previousSlide}
              />
            )}
          >
            {recommendationCards}
          </Carousel>
        ) : (
          <p>There are no recommendations.</p>
        )}
      </div>
    </>
  );
};

export default MovieAndTvRecommendations;
