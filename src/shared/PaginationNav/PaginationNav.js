import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class PaginationNav extends Component {
  changePage = page => {
    const { onPageChanged, currentPage, totalPages } = this.props;
    if (page === currentPage || page > totalPages || page < 1) {
      return;
    }
    onPageChanged(page);
  };

  render() {
    const { currentPage, totalPages } = this.props;
    const pagination = [];

    const startPoint =
      Math.floor(currentPage / 10) * 10 === 0
        ? 1
        : Math.floor(currentPage / 10) * 10;

    const endPoint =
      startPoint + 10 > totalPages ? totalPages + 1 : startPoint + 10;

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
