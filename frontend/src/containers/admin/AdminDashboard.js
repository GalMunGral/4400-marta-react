import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { closeErrorMessage } from '../../actions/error';
import { logout } from '../../actions/auth';
import Dashboard from '../../components/Dashboard';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.options = [{
      title: 'Station Management',
      route: '/stations',
    }, {
      title: 'Suspended Cards',
      route: '/suspended-cards'
    }, {
      title: 'Breeze Card Management',
      route: '/breeze-cards'
    }, {
      title: 'Passenger Flow Report',
      route: '/passenger-flow'
    }].map(option => ({
      ...option,
      callback: () => {
        props.history.push(option.route);
      }
    }));        
  }

  render() {
    return (
      <Dashboard
        header="Administrator"
        options={this.options}
        exitCallback={() => {
          this.props.logout();
          this.props.history.push('/login');
        }}
        error={this.props.error}
      />
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    logout,
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDashboard);

AdminDashboard.propTypes = {
  history: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
};