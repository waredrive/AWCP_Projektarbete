import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// This HOC acts like a middleware. It intercepts an axios instances
// request and response and shows a modal if an error is fetched.
const withErrorHandler = (WrappedComponent, axios) =>
  class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      // Creates request interceptor and sets error state to null before request is sent
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      // Creates response interceptor and sets error state to response error before
      // the response is passed on.
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error });
        }
      );
    }

    componentWillUnmount() {
      // Interceptors are unmounted
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    onGoBackClick = () => {
      const { history } = this.props;
      this.setState({ error: null });
      history.goBack();
    };

    render() {
      const { error } = this.state;
      return (
        <>
          <Modal isOpen={error !== null} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Error</ModalHeader>
            <ModalBody>{error ? error.message : null}</ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.onGoBackClick}>
                Go Back
              </Button>
            </ModalFooter>
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };

export default withErrorHandler;
