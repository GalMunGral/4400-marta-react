import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { closeErrorMessage } from '../actions/error';
import { Alert } from 'react-bootstrap';

class ErrorMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.error.unread ? (
        <Alert
          bsStyle={this.props.error.level ? "danger" : "success"}
          onDismiss={this.props.closeErrorMessage}
        >
          {this.props.error.level ? <h4>Error</h4> : null}
          <p>{this.props.error.message}</p>
        </Alert>
      ) : null
    );
  }
}

const mapStateToProps = state => ({
  error: state.error
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    closeErrorMessage,
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorMessage);

ErrorMessage.propTypes = {
  error: PropTypes.object.isRequired,
  closeErrorMessage: PropTypes.func.isRequired,
};