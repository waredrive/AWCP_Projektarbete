import React, { Component } from 'react';
import { fetchDetailsFromAPI } from '../../../shared/fetchFromAPI';
import { TopCast } from './TopCast/TopCast';
import { MovieHeader } from './MovieHeader/MovieHeader';
import { Facts } from './Facts/Facts';

export class MovieDetails extends Component {
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
    this.fetchFromApi(match.params.stationId);
  }

  fetchMovieFromAPI = id => {
    fetchDetailsFromAPI('movie', id).then(response => {
      console.log(response);
      this.setState({ movie: response });
    });
  };

  render() {
    const { movie } = this.state;
    const yearOfProduction = movie.release_date
      ? movie.release_date.slice(0, 4)
      : null;
    const posterImagePath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
      : 'https://imgplaceholder.com/185x278/393939/8A8A8A/fa-image';

    const quote = movie.tagline ? `"${movie.tagline}"` : null;
    const overview =
      movie.overview || "We don't have a description of this movie.";

    const cast = movie.credits ? movie.credits.cast : null;

    const crew = movie.credits ? movie.credits.crew : null;

    return (
      <div>
        <MovieHeader
          backdropImagePath={movie.backdrop_path}
          posterImagePath={posterImagePath}
          title={movie.title}
          yearOfProduction={yearOfProduction}
          quote={quote}
          voteAverage={movie.vote_average}
          voteCount={movie.vote_count}
          overview={overview}
          crew={crew}
          homepage={movie.homepage}
          externalIds={movie.external_ids}
        />
        <div className="bg-light">
          <div className="container bg-light">
            <div className="row">
              <TopCast cast={cast} />
              <Facts movie={movie} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
