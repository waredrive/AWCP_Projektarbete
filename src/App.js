import React, { Component } from 'react';
import axios from './axios-settings';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  testApiCall = () => 'hello';

  render() {
    return <div>{testApiCall}</div>;
  }
}

export default App;
