import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import { MovieDetails } from '../components/Movie/MovieDetails/MovieDetails';
import { PersonDetails } from '../components/Person/PersonDetails/PersonDetails';
import { TvShowDetails } from '../components/TvShow/TvShowDetails/TvShowDetails';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <main>
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
        <Switch>
          <Route path="/search/" exact component={SearchResults} />
          <Route path="/movie/:id" exact component={MovieDetails} />
          <Route path="/tv/:id" exact component={TvShowDetails} />
          <Route path="/person/:id" exact component={PersonDetails} />
          <Route
            path="/error"
            component={() => (
              <div>TempError</div>
              // <ErrorMessage>An Error has occurred while fetching data from SL. Please try again.</ErrorMessage>
            )}
          />
          {/* <Route component={WelcomePage} /> */}
        </Switch>
      </main>
    );
  }
}

export default App;
