import React, { Component } from 'react';
import { fetchDetailsFromAPI } from '../../../shared/fetchFromAPI';
import { ActorCard } from '../../../shared/ActorCard/ActorCard';
import { MovieHeader } from './MovieHeader/MovieHeader';

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

    const actorCards = movie.credits
      ? movie.credits.cast
          .slice(0, 5)
          .map(cast => (
            <ActorCard
              key={cast.id}
              actorName={cast.name}
              playedRoleName={cast.character}
              imagePath={`https://image.tmdb.org/t/p/w185/${cast.profile_path}`}
            />
          ))
      : null;

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
        />
        <div className="bg-light">
          <div className="container bg-light">
            <div className="row">
              <div className="col-9 my-3 pr-5">
                <div className="row">
                  <h4 className="ml-3">Top Cast</h4>
                </div>
                <div className="row d-flex align-items-stretch float-left">
                  {actorCards}
                </div>
              </div>
              <div
                className="col-3 my-3 mt-5"
                style={{ backgroundColor: '#5C6165' }}
              >
                <div className="ml-3 mt-3">
                  <h5 className="text-light">Facts</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
