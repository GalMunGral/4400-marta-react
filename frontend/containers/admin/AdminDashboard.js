import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Panel, Button, PageHeader, Alert } from 'react-bootstrap';
import SlimCol from '../../components/SlimCol';
import { closeErrorMessage } from '../../actions/error';
import { logout } from '../../actions/auth';
import ErrorMessage from '../ErrorMessage';

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const history = this.props.history;
        return (
            <SlimCol>
                <ErrorMessage/>
                <PageHeader>Administrator</PageHeader>
                <Panel>
                    <Button block onClick={() => {
                        history.push('/stations');
                    }}>
                        Station Management
                    </Button>
                    <Button block onClick={() => {
                        history.push('/suspended-cards');
                    }}>
                        Suspended Cards
                    </Button>
                    <Button block onClick={() => {
                        history.push('/breeze-cards');
                    }}>
                        Breeze Card Management
                    </Button>
                    <Button block onClick={() => {
                        history.push('/passenger-flow');
                    }}>
                        Passenger Flow Report
                    </Button>
                    <Button bsStyle="primary" block onClick={() => {
                        this.props.logout();
                        history.push('/login');
                    }}>
                        Logout
                    </Button>
                </Panel>
            </SlimCol>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logout,
        closeErrorMessage
    }, dispatch);
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminDashboard);

AdminDashboard.propTypes = {
    history: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    closeErrorMessage: PropTypes.func.isRequired
};