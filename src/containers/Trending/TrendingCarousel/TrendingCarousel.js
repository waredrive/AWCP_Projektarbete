import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'nuka-carousel';
import { getImageUrl, arrayExistsIsNotEmpty } from '../../../shared/helperMethods';
import CarouselButton from '../../../shared/CarouselButton/CarouselButton';

const TrendingCarousel = props => {
  const { headLine, type, results } = props;

  const resultsToDisplay =
  arrayExistsIsNotEmpty(results)
      ? results.map(result => (
          <Link to={`${type}/${result.id}`} key={result.id}>
            <img
              className="border rounded"
              src={getImageUrl(
                result.poster_path || result.profile_path,
                'w185'
              )}
              alt={result.name || result.title}
              title={result.name || result.title}
              style={{ height: '278px' }}
            />
          </Link>
        ))
      : null;

  return (
    <div className="bg-light rounded p-4 my-5">
      <div className="row">
        <h4 className="ml-3">{headLine}</h4>
      </div>
      <div className="row d-block">
        {resultsToDisplay ? (
          <Carousel
            framePadding="20px"
            heightMode="max"
            dragging={false}
            slidesToShow={5}
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
            {resultsToDisplay}
          </Carousel>
        ) : (
          <p>There are no recommendations.</p>
        )}
      </div>
    </div>
  );
};

export default TrendingCarousel;
