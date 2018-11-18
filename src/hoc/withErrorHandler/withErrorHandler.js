import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const withErrorHandler = (WrappedComponent, axios) =>
  class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    onGoBackClick = () => {
      const { history } = this.props;
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
