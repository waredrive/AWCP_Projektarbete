import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieAndTvTopCast from '../../../shared/MovieAndTvTopCast/MovieAndTvTopCast';
import MovieAndTvHeader from '../../../shared/MovieAndTvHeader/MovieAndTvHeader';
import Backdrop from '../../../shared/Backdrop/Backdrop';
import MovieFacts from './MovieFacts/MovieFacts';
import RecommendationsAndSimilar from '../../../shared/RecommendationsAndSimilar/RecommendationsAndSimilar';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../shared/Spinner/Spinner';

class MovieDetails extends Component {
  componentDidMount() {
    const { match, onFetchMovie } = this.props;
    onFetchMovie(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const { match, onFetchMovie } = this.props;
    if (prevProps.match.params.id === match.params.id) {
      return;
    }
    onFetchMovie(match.params.id);
  }

  render() {
    const { movie, match } = this.props;

    const cast = movie && movie.credits ? movie.credits.cast : null;

    const crew = movie && movie.credits ? movie.credits.crew : null;

    return movie && match.params.id.startsWith(String(movie.id)) ? (
      <div>
        <MovieAndTvHeader production={movie} />
        <div className="bg-light">
          <div className="container bg-light">
            <div className="row">
              <div className="col-9 my-3 pr-5">
                <MovieAndTvTopCast cast={cast} crew={crew} />
                <RecommendationsAndSimilar
                  recommendations={movie.similar}
                  type="movie"
                  header="Similar Movies"
                  notFoundText="There are no movies similar to this one."
                />
                <RecommendationsAndSimilar
                  recommendations={movie.recommendations}
                  type="movie"
                  header="Recommended Movies"
                  notFoundText="There are no recommendations based on this movie."
                />
              </div>
              <div
                className="col-3 my-3 text-light rounded"
                style={{ backgroundColor: '#5C6165' }}
              >
                <MovieFacts movie={movie} />
              </div>
            </div>
          </div>
        </div>
        <Backdrop backdropPath={movie.backdrop_path} />
      </div>
    ) : (
      <Spinner />
    );
  }
}

const mapStateAsProps = state => ({
  movie: state.movies.details
});

const mapDispatchAsProps = dispatch => ({
  onFetchMovie: id => dispatch(actions.fetchMovieDetails(id))
});

export default connect(
  mapStateAsProps,
  mapDispatchAsProps
)(MovieDetails);
