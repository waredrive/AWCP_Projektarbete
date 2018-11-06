import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <main className="container">
        <div className="row">
          <div className="col-md-12 my-5" style={{ minWidth: '480px' }}>
            <SearchBar />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12" style={{ minWidth: '480px' }}>
            <Switch>
              <Route path="/search" component={SearchResults} />
              <Route
                path="/error"
                component={() => (
                  <div>TempError</div>
                  // <ErrorMessage>An Error has occurred while fetching data from SL. Please try again.</ErrorMessage>
                )}
              />
              {/* <Route component={WelcomePage} /> */}
            </Switch>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
