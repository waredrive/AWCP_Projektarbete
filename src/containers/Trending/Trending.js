import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrendingCarousel from '../../components/Trending/TrendingCarousel/TrendingCarousel';
import * as actions from '../../store/actions';
import Spinner from '../../shared/Spinner/Spinner';

// Shows carousels with trending people/movies/tv-shows.
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
    const {
      trendingMovies,
      trendingTvShows,
      trendingPeople,
      moviesLoading,
      tvShowsLoading,
      peopleLoading
    } = this.props;

    return !moviesLoading && !tvShowsLoading && !peopleLoading ? (
      <div className="container">
        <TrendingCarousel
          headLine="Trending Movies"
          type="movie"
          productions={trendingMovies}
        />

        <TrendingCarousel
          headLine="Trending Tv Shows"
          type="tv"
          productions={trendingTvShows}
        />

        <TrendingCarousel
          headLine="Trending People"
          type="person"
          productions={trendingPeople}
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
  trendingPeople: state.people.trending,
  moviesLoading: state.movies.trendingLoading,
  tvShowsLoading: state.tvShows.trendingLoading,
  peopleLoading: state.people.trendingLoading
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
