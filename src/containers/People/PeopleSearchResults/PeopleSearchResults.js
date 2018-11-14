import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { fetchSearchesFromAPI } from '../../../shared/fetchFromAPI';
import PersonSummaryCard from '../../../components/Person/PersonSummaryCard/PersonSummaryCard';
import PaginationNav from '../../../shared/PaginationNav/PaginationNav';
import { getImageUrl } from '../../../shared/helperMethods';

class PeopleSearchResults extends Component {
  state = {
    fetchedPeople: [],
    activePage: 1,
    fetchedPages: []
  };

  componentDidMount() {
    this.fetchPeopleFromAPI();
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;
    const { activePage, fetchedPages } = this.state;
    if (
      prevProps.searchQuery === searchQuery &&
      prevState.activePage !== activePage &&
      !fetchedPages.includes(activePage)
    ) {
      this.fetchPeopleFromAPI(activePage, false);
    } else if (prevProps.searchQuery !== searchQuery) {
      this.fetchPeopleFromAPI();
    }
  }

  fetchQueryString = () => {
    const { location } = this.props;
    const queryParam = new URLSearchParams(location.search);
    return queryParam.get('query');
  };

  fetchPeopleFromAPI = (page = 1, isNewSearch = true) => {
    const { searchQuery } = this.props;

    fetchSearchesFromAPI(searchQuery, 'person', page).then(response => {
      const { fetchedPeople, fetchedPages } = this.state;
      let people = [];
      let pages = [];
      if (!isNewSearch) {
        people = [...fetchedPeople];
        pages = [...fetchedPages];
      }
      people.push(response);
      pages.push(page);

      this.setState({
        fetchedPeople: people,
        activePage: page,
        fetchedPages: pages
      });
    });
  };

  onPageChangedHandler = page => {
    this.setState({ activePage: page });
  };

  onShowDetailsClickHandler = id => {
    const { history } = this.props;
    history.push(`/person/${id}`);
  };

  render() {
    const { fetchedPages, fetchedPeople, activePage } = this.state;

    const searchPage = [];
    let pagination = null;

    if (fetchedPages.includes(activePage)) {
      const searchResultsForChosenPage = fetchedPeople
        .filter(show => show.page === activePage)
        .map(result => result);

      searchResultsForChosenPage[0].results.forEach(result => {
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
            profilePath={getImageUrl(
              'https://image.tmdb.org/t/p/w154',
              result.profile_path,
              154,
              231
            )}
            onShowDetailsClick={() => this.onShowDetailsClickHandler(result.id)}
          />
        );
      });

      pagination =
        searchPage.length > 0 ? (
          <PaginationNav
            currentPage={activePage}
            totalPages={searchResultsForChosenPage[0].total_pages}
            onPageChanged={page => this.onPageChangedHandler(page)}
          />
        ) : null;
    }
    return (
      <div>
        {searchPage}
        {pagination}
      </div>
    );
  }
}

export default withRouter(PeopleSearchResults);
