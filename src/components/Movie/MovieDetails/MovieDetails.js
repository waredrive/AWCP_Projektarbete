import React, { Component } from 'react';
import { fetchDetailsFromAPI } from '../../../shared/fetchFromAPI';
import MovieAndTvTopCast from '../../../shared/MovieAndTvTopCast/MovieAndTvTopCast';
import MovieAndTvHeader from '../../../shared/MovieAndTvHeader/MovieAndTvHeader';
import Backdrop from '../../../shared/Backdrop/Backdrop';
import MovieFacts from './MovieFacts/MovieFacts';
import MovieAndTvRecommendations from '../../../shared/MovieAndTvRecommendations/MovieAndTvRecommendations';
import { getImageUrl } from '../../../shared/helperMethods';

class MovieDetails extends Component {
  state = {
    movie: {}
  };

  componentDidMount() {
    const { match } = this.props;
    this.fetchMovieFromAPI(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (prevProps.match.params.id === match.params.id) {
      return;
    }
    this.fetchMovieFromAPI(match.params.id);
  }

  fetchMovieFromAPI = id => {
    fetchDetailsFromAPI('movie', id).then(response => {
      this.setState({ movie: response });
    });
  };

  render() {
    const { movie } = this.state;
    const yearOfProduction = movie.release_date
      ? movie.release_date.slice(0, 4)
      : null;

    const quote = movie.tagline ? `"${movie.tagline}"` : null;
    const overview =
      movie.overview || "We don't have a description of this movie.";

    const cast = movie.credits ? movie.credits.cast : null;

    const crew = movie.credits ? movie.credits.crew : null;

    const videos = movie.videos ? movie.videos.results : null;

    return (
      <div>
        <MovieAndTvHeader
          backdropImagePath={movie.backdrop_path}
          posterImagePath={getImageUrl(
            'https://image.tmdb.org/t/p/w300',
            movie.poster_path,
            300,
            445
          )}
          title={movie.title}
          yearOfProduction={yearOfProduction}
          quote={quote}
          voteAverage={movie.vote_average}
          voteCount={movie.vote_count}
          overview={overview}
          crew={crew}
          homepage={movie.homepage}
          externalIds={movie.external_ids}
          videos={videos}
        />
        <div className="bg-light">
          <div className="container bg-light">
            <div className="row">
              <div className="col-9 my-3 pr-5">
                <MovieAndTvTopCast cast={cast} crew={crew} />
                <MovieAndTvRecommendations
                  recommendations={movie.recommendations}
                  type="movie"
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
    );
  }
}

export default MovieDetails;
