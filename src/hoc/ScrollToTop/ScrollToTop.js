import { Component } from 'react';
import { withRouter } from 'react-router-dom';

// This HOC makes the window scroll upp to the top of a page when routing
// to an internal component within the router.
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default withRouter(ScrollToTop);
