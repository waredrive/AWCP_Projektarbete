import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PersonSummaryCard from '../../../components/Person/PersonSummaryCard/PersonSummaryCard';
import PaginationNav from '../../../shared/PaginationNav/PaginationNav';
import { getImageUrl } from '../../../shared/helperMethods';
import Spinner from '../../../shared/Spinner/Spinner';

// A page showing all the people found when searching a given query.
class PeopleSearchResults extends Component {
  onShowDetailsClickHandler = id => {
    const { history } = this.props;
    history.push(`/person/${id}`);
  };

  render() {
    const { searchResults, onPageChange } = this.props;

    const searchPage = searchResults
      ? searchResults.results.map(result => (
          <PersonSummaryCard
            id={result.id}
            key={result.id}
            name={result.name}
            knownFor={result.known_for}
            profilePath={getImageUrl(result.profile_path, 'w154')}
            onShowDetailsClick={() => this.onShowDetailsClickHandler(result.id)}
          />
        ))
      : null;

    const pagination = searchResults ? (
      <PaginationNav
        currentPage={searchResults.page}
        totalPages={searchResults.total_pages}
        onPageChanged={page => onPageChange(page)}
      />
    ) : null;

    return (
      <div>
        {searchPage || <Spinner />}
        {pagination}
      </div>
    );
  }
}

export default withRouter(PeopleSearchResults);
