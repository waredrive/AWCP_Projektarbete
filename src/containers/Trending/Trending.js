import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrendingCarousel from './TrendingCarousel/TrendingCarousel';
import * as actions from '../../store/actions';
import Spinner from '../../shared/Spinner/Spinner';

class Trending extends Component {
  componentDidMount() {
    const {
      onFetchTrendingMovies,
      onFetchTrendingTvShows,
      onFetchTrendingPeople
    } = this.props;
    onFetchTrendingMovies();
    onFetchTrendingTvShows();
    onFetchTrendingPeople();
  }

  render() {
    const { trendingMovies, trendingTvShows, trendingPeople } = this.props;

    return trendingMovies && trendingTvShows && trendingPeople ? (
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
    ) : (
      <Spinner />
    );
  }
}

const mapStateAsProps = state => ({
  trendingMovies: state.movies.trending,
  trendingTvShows: state.tvShows.trending,
  trendingPeople: state.people.trending
});

const mapDispatchAsProps = dispatch => ({
  onFetchTrendingMovies: (query, page) =>
    dispatch(actions.fetchTrendingMovies(query, page)),
  onFetchTrendingTvShows: (query, page) =>
    dispatch(actions.fetchTrendingTvShows(query, page)),
  onFetchTrendingPeople: (query, page) =>
    dispatch(actions.fetchTrendingPeople(query, page))
});

export default connect(
  mapStateAsProps,
  mapDispatchAsProps
)(Trending);
