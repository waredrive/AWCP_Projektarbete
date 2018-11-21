import React, { Component } from 'react';

class ScrollToTopButton extends Component {
  state = {
    showBtn: false
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onPageScroll, false);
  }

  // Shows button if page is scrolled more then 200px
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

    window.addEventListener('scroll', this.onPageScroll, false);

    return showBtn ? (
      <button
        type="button"
        className="btn btn-dark border btn-circle btn-lg position-fixed"
        style={{ zIndex: '99', bottom: '20px', right: '60px' }}
        onClick={this.goToTop}
      >
        <i className="fa fa-angle-up fa-lg" />
      </button>
    ) : null;
  }
}

export default ScrollToTopButton;
