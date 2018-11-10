import React, { Component } from 'react';
import { fetchDetailsFromAPI } from '../../../shared/fetchFromAPI';

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
    return <div>{this.state.movie.title}</div>;
  }
}

export default MovieDetails;
