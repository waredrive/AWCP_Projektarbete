import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { fetchDetailsFromAPI } from '../../../shared/fetchFromAPI';
import { TopCast } from './TopCast/TopCast';
import { MovieHeader } from './MovieHeader/MovieHeader';
import { Backdrop } from '../../../shared/Backdrop/Backdrop';
import { Facts } from './Facts/Facts';
import { Recommendations } from './Recommendations/Recommendations';

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
    console.log(this.match);
    if (prevProps.match.params.id === match.params.id) {
      return;
    }
    this.fetchMovieFromAPI(match.params.id);
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

    const videos = movie.videos ? movie.videos.results : null;

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
          videos={videos}
        />
        <div className="bg-light">
          <div className="container bg-light">
            <div className="row">
              <div className="col-9 my-3 pr-5">
                <TopCast cast={cast} />
                <Recommendations recommendations={movie.recommendations} />
              </div>
              <div
                className="col-3 my-3 text-light rounded"
                style={{ backgroundColor: '#5C6165' }}
              >
                <Facts movie={movie} />
              </div>
            </div>
          </div>
        </div>
        <Backdrop backdropPath={movie.backdrop_path} />
      </div>
    );
  }
}

export default withRouter(MovieDetails);
