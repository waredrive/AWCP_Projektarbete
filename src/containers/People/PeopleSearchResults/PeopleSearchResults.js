import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PersonSummaryCard from '../../../components/Person/PersonSummaryCard/PersonSummaryCard';
import PaginationNav from '../../../shared/PaginationNav/PaginationNav';
import { getImageUrl } from '../../../shared/helperMethods';

class PeopleSearchResults extends Component {
  onShowDetailsClickHandler = id => {
    const { history } = this.props;
    history.push(`/person/${id}`);
  };

  render() {
    const { searchResults, onPageChange } = this.props;

    const searchPage = [];
    let pagination = null;

    if (searchResults) {
      searchResults.results.forEach(result => {
        const knownFor = result.known_for
          ? result.known_for.map(
              production => production.title || production.name
            )
          : [];

        searchPage.push(
          <PersonSummaryCard
            id={result.id}
            key={result.id}
            name={result.name}
            knownFor={knownFor}
            profilePath={getImageUrl(result.profile_path, 'w154')}
            onShowDetailsClick={() => this.onShowDetailsClickHandler(result.id)}
          />
        );
      });

      pagination =
        searchPage.length > 0 ? (
          <PaginationNav
            currentPage={searchResults.page}
            totalPages={searchResults.total_pages}
            onPageChanged={page => onPageChange(page)}
          />
        ) : null;
    }
    return (
      // TODO: Add spinner
      <div>
        {searchPage}
        {pagination}
      </div>
    );
  }
}

export default withRouter(PeopleSearchResults);
