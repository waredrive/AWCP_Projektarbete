import React from 'react';
import Carousel from 'nuka-carousel';
import RecommendationAndSimilarCard from './RecommendationAndSimilarCard/RecommendationAndSimilarCard';
import { getImageUrl, arrayExistsIsNotEmpty } from '../helperMethods';
import CarouselButton from '../CarouselButton/CarouselButton';

const RecommendationsAndSimilar = props => {
  const { recommendations, type, header, notFoundText } = props;
  const recommendationCards = arrayExistsIsNotEmpty(recommendations.results)
    ? recommendations.results.map(recommendation => (
        <RecommendationAndSimilarCard
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
      <div className="row mt-5">
        <h4 className="ml-3">{header}</h4>
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
          <p>{notFoundText}</p>
        )}
      </div>
    </>
  );
};

export default RecommendationsAndSimilar;
