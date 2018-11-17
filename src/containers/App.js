import React, { Component } from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import Trending from './Trending/Trending';
import SearchResults from './SearchResults/SearchResults';
import MovieDetails from '../components/Movie/MovieDetails/MovieDetails';
import PersonDetails from '../components/Person/PersonDetails/PersonDetails';
import TvShowDetails from '../components/TvShow/TvShowDetails/TvShowDetails';
import FullCastAndCrew from '../shared/FullCastAndCrew/FullCastAndCrew';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <main>
        <nav className="navbar navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            <i className="fa fa-home fa-2x" />
          </Link>
        </nav>
        <div className="bg-light">
          <div className="container-fluid" style={{ minWidth: '480px' }}>
            <div className="row justify-content-center">
              <div
                className="col-md-12 mx-0 px-0"
                style={{ maxWidth: '1100px' }}
              >
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
        {/* TODO: create search/movie search/tv and search/person */}
        <Switch>
          <Route path="/" exact component={Trending} />
          <Route path="/search" exact component={SearchResults} />
          <Route path="/movie/:id" exact component={MovieDetails} />
          <Route path="/movie/:id/credits" exact component={FullCastAndCrew} />
          <Route path="/tv/:id" exact component={TvShowDetails} />
          <Route path="/tv/:id/credits" exact component={FullCastAndCrew} />
          <Route path="/person/:id" exact component={PersonDetails} />
          {/* <Route
            path="/error"
            component={() => (
              <div>TempError</div>
              <ErrorMessage>An Error has occurred while fetching data from SL. Please try again.</ErrorMessage>
            )}
          /> */}
          <Redirect to="/" />
        </Switch>
      </main>
    );
  }
}

export default App;
