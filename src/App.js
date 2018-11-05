import React, { Component } from 'react';
import axios from './axios-settings';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  testApiCall = () => {
    axios.get(
      `search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false`
    );
  };

  render() {
    return <div>{test}</div>;
  }
}

export default App;
