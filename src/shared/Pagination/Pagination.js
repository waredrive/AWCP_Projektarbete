import React from 'react';

export const Pagination = props => {
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
    let style = 'page-item';
    if (currentPage === i) {
      style = 'page-item active';
    }
    pagination.push(
      <li className={style} key={i}>
        <a className="page-link" id={i}>
          {i}
        </a>
      </li>
    );
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a className={disablePrevious ? 'page-link disabled' : 'page-link'}>
            Previous
          </a>
        </li>
        {pagination}
        <li className="page-item">
          <a className={disableNext ? 'page-link disabled' : 'page-link'}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
