import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeErrorMessage } from '../../actions/error';
import { login } from '../../actions/auth';
import SlimCol from '../../components/SlimCol';
import {
  Panel,
  Col,
  Button,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  PageHeader,
  Alert
} from 'react-bootstrap';

import ErrorMessage from '../ErrorMessage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.usernameInput;
    this.passwordInput;
    this._login = this._login.bind(this);
  }

  _login() {
    const credentials = {
      username: this.usernameInput.value,
      password: this.passwordInput.value
    };
    this.props.login(credentials);
  }

  render() {
    const user = this.props.currentUser;
    if (user.isLoggedIn) {
      switch(user.userType) {
        case 'ADMIN': return <Redirect to="/admin-dashboard"/>;
        case 'PASSENGER': return <Redirect to="/my-trip"/>;
        default:
      }
    }
    return (
      <SlimCol>
        <ErrorMessage/>
        <PageHeader>Login</PageHeader>
        <Panel>
          <Form horizontal className="container-fluid">
            <FormGroup controlId="usernameInput">
              <Col componentClass={ControlLabel} sm={2} md={3}>Username</Col>
              <Col sm={10} md={8}>
                <FormControl
                  placeholder="Username"
                  inputRef={ref => { this.usernameInput = ref; }}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="passwordInput">
              <Col componentClass={ControlLabel} sm={2} md={3}>Password</Col>
              <Col sm={10} md={8}>
                <FormControl
                  type="password"
                  placeholder="Password"
                  inputRef={ref => { this.passwordInput = ref; }}
                />
              </Col>
            </FormGroup>
          </Form>
          <Button bsStyle="primary" block onClick={this._login}>Login</Button>
          <Button
            block
            onClick={() => { this.props.history.push('/registration'); }}
          >
            Register
          </Button>
        </Panel>
      </SlimCol>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  error: state.error
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    login,
    closeErrorMessage
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

Login.propTypes = {
  login: PropTypes.func.isRequired,
  currentUser: PropTypes.any.isRequired,
  history: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  closeErrorMessage: PropTypes.func.isRequired,
};