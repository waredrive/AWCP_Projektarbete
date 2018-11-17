import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrendingCarousel from './TrendingCarousel/TrendingCarousel';
import * as actions from '../../store/actions';

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

  // This is a solution for a bug in the nuka-carousel package,
  // as stated in https://github.com/FormidableLabs/nuka-carousel/issues/265
  componentDidUpdate() {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  render() {
    const { trendingMovies, trendingTvShows, trendingPeople } = this.props;

    return (
      <div className="container">
        {trendingMovies ? (
          <TrendingCarousel
            headLine="Trending Movies"
            type="movie"
            results={trendingMovies.results}
          />
        ) : null}
        {trendingTvShows ? (
          <TrendingCarousel
            headLine="Trending Tv Shows"
            type="tv"
            results={trendingTvShows.results}
          />
        ) : null}
        {trendingPeople ? (
          <TrendingCarousel
            headLine="Trending People"
            type="person"
            results={trendingPeople.results}
          />
        ) : null}
      </div>
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
