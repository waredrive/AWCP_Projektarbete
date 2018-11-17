import React, { Component } from 'react';
import { fetchTrendingFromAPI } from '../../shared/fetchFromAPI';
import TrendingCarousel from './TrendingCarousel/TrendingCarousel';

class Trending extends Component {
  state = {
    trendingMovies: [],
    trendingTvShows: [],
    trendingPeople: []
  };

  componentDidMount() {
    Promise.all([
      fetchTrendingFromAPI('movie'),
      fetchTrendingFromAPI('tv'),
      fetchTrendingFromAPI('person')
    ]).then(([res1, res2, res3]) =>
      this.setState({
        trendingMovies: res1,
        trendingTvShows: res2,
        trendingPeople: res3
      })
    );
  }

  render() {
    const { trendingMovies, trendingTvShows, trendingPeople } = this.state;

    return (
      <div className="container">
        <TrendingCarousel
          headLine="Trending Movies"
          type="movie"
          results={trendingMovies.results}
        />
        <TrendingCarousel
          headLine="Trending Tv Shows"
          type="tv"
          results={trendingTvShows.results}
        />
        <TrendingCarousel
          headLine="Trending People"
          type="person"
          results={trendingPeople.results}
        />
      </div>
    );
  }
}

export default Trending;
