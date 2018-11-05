import React, { Component } from 'react';
import axios from './axios-settings';

class App extends Component {
  state = {
    testData: null
  };

  componentDidMount() {
    this.testApiCall();
  }

  testApiCall = () =>
    axios
      .get(
        `search/multi?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&language=en-US&query=lord&page=1&include_adult=false`
      )
      .then(response => {
        this.setState({ testData: response.data });
      });

  render() {
    let rend = null;
    const data = this.state;
    if (data.testData) {
      console.log(data.testData.results);
      rend = data.testData.results.map(answser => answser.title);
      console.log(rend);
    }

    return <div className="text-light">{rend}</div>;
  }
}

export default App;
