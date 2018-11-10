import React, { Component } from 'react';
import { fetchDetailsFromAPI } from '../../../shared/fetchFromAPI';
import { RatingBar } from '../../../shared/RatingBar/RatingBar';
import './MovieDetails.css';

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

  // https://image.tmdb.org/t/p/original/pIUvQ9Ed35wlWhY2oU6OmwEsmzG.jpg
  render() {
    const { movie } = this.state;
    const yearOfProduction = movie.release_date
      ? movie.release_date.slice(0, 4)
      : null;
    const posterImagePath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
      : 'https://imgplaceholder.com/185x278/393939/8A8A8A/fa-image';

    return (
      <div className="container text-light">
        <div
          className="row"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${
              movie.backdrop_path
            }")`,
            opacity: '0.5',
            filter: 'grayscale(100%)'
          }}
        >
          <div className="col-12 my-3">
            <img
              className="float-left border rounded mr-5"
              src={posterImagePath}
              title={movie.title}
              alt={`Poster of ${movie.title}`}
            />
            <h1 className="mb-0">{movie.title}</h1>
            <h3 className="font-weight-light">({yearOfProduction})</h3>
            <div className="my-5 d-inline-block">
              <RatingBar
                sizeInPixels={60}
                voteAverage={movie.vote_average}
                voteCount={movie.vote_count}
              />
            </div>
            <h4>Overview</h4>
            <p>
              {movie.overview
                ? movie.overview
                : "We don't have a description of this movie."}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
