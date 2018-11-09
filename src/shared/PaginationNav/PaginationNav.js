import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export const PaginationNav = props => {
  const { currentPage, totalPages } = props;
  const pagination = [];
  let disableNext = false;
  let disablePrevious = false;
  let startPoint = 1;
  let endPoint = 1;

  if (Math.floor(currentPage / 10) * 10 === 0) {
    startPoint = 1;
    disablePrevious = true;
  } else {
    startPoint = Math.floor(currentPage / 10) * 10;
    disablePrevious = false;
  }

  if (startPoint + 10 > totalPages) {
    endPoint = totalPages + 1;
    disableNext = true;
  } else {
    endPoint = startPoint + 10;
    disableNext = false;
  }

  for (let i = startPoint; i < endPoint; i += 1) {
    pagination.push(
      <PaginationItem key={i} active={currentPage === i} id={i}>
        <PaginationLink href="#">{i}</PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <div className="row justify-content-center">
      <Pagination aria-label="Page navigation">
        <PaginationItem disabled={disablePrevious}>
          <PaginationLink previous href="#" />
        </PaginationItem>
        {pagination}
        <PaginationItem disabled={disableNext}>
          <PaginationLink next href="#" />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default PaginationNav;
