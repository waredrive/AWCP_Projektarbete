import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieAndTvTopCast from '../../../shared/MovieAndTvTopCast/MovieAndTvTopCast';
import MovieAndTvHeader from '../../../shared/MovieAndTvHeader/MovieAndTvHeader';
import Backdrop from '../../../shared/Backdrop/Backdrop';
import TvShowFacts from './TvShowFacts/TvShowFacts';
import MovieAndTvRecommendations from '../../../shared/MovieAndTvRecommendations/MovieAndTvRecommendations';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../shared/Spinner/Spinner';

class TvShowDetails extends Component {
  componentDidMount() {
    const { match, onFetchTvShow } = this.props;
    onFetchTvShow(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const { match, onFetchTvShow } = this.props;
    if (prevProps.match.params.id === match.params.id) {
      return;
    }
    onFetchTvShow(match.params.id);
  }

  render() {
    const { tvShow, match } = this.props;

    const cast = tvShow && tvShow.credits ? tvShow.credits.cast : null;

    const crew = tvShow && tvShow.credits ? tvShow.credits.crew : null;

    return tvShow && match.params.id.startsWith(String(tvShow.id)) ? (
      <div>
        <MovieAndTvHeader production={tvShow} />
        <div className="bg-light">
          <div className="container bg-light">
            <div className="row">
              <div className="col-9 my-3 pr-5">
                <MovieAndTvTopCast cast={cast} crew={crew} />
                <MovieAndTvRecommendations
                  recommendations={tvShow.recommendations}
                  type="tv"
                />
              </div>
              <div
                className="col-3 my-3 text-light rounded"
                style={{ backgroundColor: '#5C6165' }}
              >
                <TvShowFacts tvShow={tvShow} />
              </div>
            </div>
          </div>
        </div>
        <Backdrop backdropPath={tvShow.backdrop_path} />
      </div>
    ) : (
      <Spinner />
    );
  }
}

const mapStateAsProps = state => ({
  tvShow: state.tvShows.details
});

const mapDispatchAsProps = dispatch => ({
  onFetchTvShow: id => dispatch(actions.fetchTvShowDetails(id))
});

export default connect(
  mapStateAsProps,
  mapDispatchAsProps
)(TvShowDetails);
