import React, { Component } from 'react';
import axios from './axios-settings';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  testApiCall = () => 'Hello';

  render() {
    const test = this.testApiCall();
    return <div>{test}</div>;
  }
}

export default App;
