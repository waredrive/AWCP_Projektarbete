import React from 'react';
import { Route, Redirect, Switch, Link, withRouter } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import Trending from './Trending/Trending';
import SearchResults from './SearchResults/SearchResults';
import MovieDetails from '../components/Movie/MovieDetails/MovieDetails';
import PersonDetails from '../components/Person/PersonDetails/PersonDetails';
import TvShowDetails from '../components/TvShow/TvShowDetails/TvShowDetails';
import CastAndCrew from './CastAndCrew/CastAndCrew';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import axios from '../axios-instance';

const App = () => (
  <main>
    <nav className="navbar navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        <i className="fa fa-home fa-2x" />
      </Link>
    </nav>
    <div className="bg-light">
      <div className="container-fluid" style={{ minWidth: '480px' }}>
        <div className="row justify-content-center">
          <div className="col-md-12 mx-0 px-0" style={{ maxWidth: '1100px' }}>
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
    <Switch>
      <Route path="/" exact component={Trending} />
      <Route path="/search" exact component={SearchResults} />
      <Route path="/movie/:id" exact component={MovieDetails} />
      <Route path="/tv/:id" exact component={TvShowDetails} />
      <Route path="/person/:id" exact component={PersonDetails} />
      <Route path="/:type/:id/credits" exact component={CastAndCrew} />
      <Redirect to="/" />
    </Switch>
  </main>
);

export default withRouter(withErrorHandler(App, axios));
