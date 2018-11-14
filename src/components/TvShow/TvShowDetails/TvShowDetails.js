import React, { Component } from 'react';
import { fetchDetailsFromAPI } from '../../../shared/fetchFromAPI';
import MovieAndTvHeader from '../../../shared/MovieAndTvHeader/MovieAndTvHeader';
import getImageUrl from '../../../shared/getImageUrl';
import Backdrop from '../../../shared/Backdrop/Backdrop';
import MovieAndTvRecommendations from '../../../shared/MovieAndTvRecommendations/MovieAndTvRecommendations';
import MovieAndTvTopCast from '../../../shared/MovieAndTvTopCast/MovieAndTvTopCast';

// import Facts from './Facts/Facts';

class TvShowDetails extends Component {
  state = {
    tvShow: {}
  };

  componentDidMount() {
    const { match } = this.props;
    this.fetchTvShowsFromAPI(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (prevProps.match.params.id === match.params.id) {
      return;
    }
    this.fetchTvShowsFromAPI(match.params.id);
  }

  fetchTvShowsFromAPI = id => {
    fetchDetailsFromAPI('tv', id).then(response => {
      console.log(response);
      this.setState({ tvShow: response });
    });
  };

  render() {
    const { tvShow } = this.state;
    const yearOfProduction = tvShow.first_air_date
      ? tvShow.first_air_date.slice(0, 4)
      : null;

    const quote = tvShow.tagline ? `"${tvShow.tagline}"` : null;
    const overview =
      tvShow.overview || "We don't have a description of this movie.";

    const cast = tvShow.credits ? tvShow.credits.cast : null;

    const crew = tvShow.credits ? tvShow.credits.crew : null;

    const videos = tvShow.videos ? tvShow.videos.results : null;

    return (
      <div>
        <MovieAndTvHeader
          backdropImagePath={tvShow.backdrop_path}
          posterImagePath={getImageUrl(
            'https://image.tmdb.org/t/p/w300',
            tvShow.poster_path,
            300,
            445
          )}
          title={tvShow.name}
          yearOfProduction={yearOfProduction}
          quote={quote}
          voteAverage={tvShow.vote_average}
          voteCount={tvShow.vote_count}
          overview={overview}
          crew={crew}
          creator={tvShow.created_by}
          homepage={tvShow.homepage}
          externalIds={tvShow.external_ids}
          videos={videos}
        />
        <div className="bg-light">
          <div className="container bg-light">
            <div className="row">
              <div className="col-9 my-3 pr-5">
                <MovieAndTvTopCast cast={cast} crew={crew} />
                <MovieAndTvRecommendations
                  type="tv"
                  recommendations={tvShow.recommendations}
                />
              </div>
              <div
                className="col-3 my-3 text-light rounded"
                style={{ backgroundColor: '#5C6165' }}
              >
                {/* <Facts movie={movie} /> */}
              </div>
            </div>
          </div>
        </div>
        <Backdrop backdropPath={tvShow.backdrop_path} />
      </div>
    );
  }
}

export default TvShowDetails;
