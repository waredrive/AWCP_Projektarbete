import React, { Component } from 'react';
import ModalVideo from 'react-modal-video';

// Creates a play-button and attaches a modal for displaying the trailer.
class PlayTrailerButton extends Component {
  state = {
    isOpen: false
  };

  openModal = () => {
    this.setState({ isOpen: true });
  };

  render() {
    const { isOpen } = this.state;
    const { video } = this.props;

    return (
      <>
        <ModalVideo
          channel={video.site.toLowerCase()}
          isOpen={isOpen}
          videoId={video.key}
          onClose={() => this.setState({ isOpen: false })}
        />
        <button
          type="button"
          className="btn btn-outline-light btn-circle btn-lg d-inline-flex mr-4 justify-content-center"
          title="Watch Trailer"
          onClick={this.openModal}
        >
          <i className="fa fa-play fa-lg" />
        </button>
      </>
    );
  }
}

export default PlayTrailerButton;
