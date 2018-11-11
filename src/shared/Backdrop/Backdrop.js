import React from 'react';
import styled from 'styled-components';

export const Backdrop = props => {
  const { children, backdropPath } = props;
  const Div = styled.div`
    position: relative;
    :after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      background: url(https://image.tmdb.org/t/p/original/${backdropPath})
        no-repeat center;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.1;
      filter: grayscale(100%);
    }
  `;
  return <Div>{children}</Div>;
};
export default Backdrop;
