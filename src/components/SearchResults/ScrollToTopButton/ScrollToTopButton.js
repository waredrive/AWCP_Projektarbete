import React, { Component } from 'react';

class ScrollToTopButton extends Component {
  state = {
    showBtn: false
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onPageScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onPageScroll, false);
  }

  // Shows button if page is scrolled down more then 200px
  onPageScroll = () => {
    const { showBtn } = this.state;

    if (window.pageYOffset > 200 && !showBtn) {
      this.setState({ showBtn: true });
    } else if (window.pageYOffset < 200 && showBtn) {
      this.setState({ showBtn: false });
    }
  };

  goToTop = () => {
    window.scrollTo(0, 0);
  };

  render() {
    const { showBtn } = this.state;

    return showBtn ? (
      <button
        type="button"
        className="btn btn-dark border btn-circle btn-lg position-fixed justify-content-center align-items-center"
        style={{ zIndex: '99', bottom: '20px', right: '60px' }}
        onClick={this.goToTop}
      >
        <i className="fa fa-angle-up fa-lg pb-2" />
      </button>
    ) : null;
  }
}

export default ScrollToTopButton;
