import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  // state = {
  //   testData: null
  // };

  // componentDidMount() {
  //   this.testApiCall();
  // }

  // testApiCall = () =>
  //   axios
  //     .get(
  //       `search/multi?api_key=${
  //         process.env.REACT_APP_TMDB_API_KEY
  //       }&language=en-US&query=lord&page=1&include_adult=false`
  //     )
  //     .then(response => {
  //       this.setState({ testData: response.data });
  //     });

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
              {/* <Route path="/:stationName/:stationId" component={SearchResults} /> */}
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
