import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

// This class creates pagination bar that consist of ten pages, a previous and a next button.
// If a user is att the end of the bar and clicks the next button the next ten pages will be
// shown upp to the total amount of pages. Same if the pervious button is clicked at the start
// of the bar where the page nr 1 is the limit.
class PaginationNav extends Component {
  changePage = changedPage => {
    const { onPageChanged, currentPage, totalPages } = this.props;
    if (
      changedPage === currentPage ||
      changedPage > totalPages ||
      changedPage < 1
    ) {
      return;
    }
    onPageChanged(changedPage);
  };

  render() {
    const { currentPage, totalPages } = this.props;
    const pagination = [];

    // Calculates the start point of the bar based on current page.
    //
    const startPoint =
      Math.floor(currentPage / 10) * 10 === 0
        ? 1
        : Math.floor(currentPage / 10) * 10;

    const endPoint =
      startPoint + 10 > totalPages ? totalPages + 1 : startPoint + 10;

    // Creates pagination-buttons based on startPoint and endPoint calculated above.
    for (let i = startPoint; i < endPoint; i += 1) {
      pagination.push(
        <PaginationItem key={i} active={currentPage === i} id={i}>
          <PaginationLink onClick={() => this.changePage(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return (
      <div className="row justify-content-center">
        <Pagination aria-label="Page navigation">
          <PaginationItem disabled={currentPage <= 1}>
            <PaginationLink
              previous
              onClick={() => this.changePage(currentPage - 1)}
            />
          </PaginationItem>
          {pagination}
          <PaginationItem disabled={currentPage === totalPages}>
            <PaginationLink
              next
              onClick={() => this.changePage(currentPage + 1)}
            />
          </PaginationItem>
        </Pagination>
      </div>
    );
  }
}

export default PaginationNav;
