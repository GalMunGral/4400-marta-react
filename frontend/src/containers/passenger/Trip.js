import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel, Col, Button, Form, FormGroup, ControlLabel, FormControl, PageHeader, Alert } from 'react-bootstrap';
import SlimCol from '../../components/SlimCol';
import { fetchMyCards, selectMyCard } from '../../actions/passenger/cards';
import { fetchStations } from '../../actions/stations';
import { startTrip, endTrip, completeTrip, reset } from '../../actions/passenger/currentTrip';
import { closeErrorMessage, showErrorMessage } from '../../actions/error';
import { logout } from '../../actions/auth';
import ErrorMessage from '../ErrorMessage';

class Trip extends Component {
    constructor(props) {
        super(props);
        this.cardSelect;
        this.startStationSelect;
        this.endStationSelect;
        this._startTrip = this._startTrip.bind(this);
        this._endTrip = this._endTrip.bind(this);
    }

    componentWillMount() {
        const user = this.props.username;
        this.props.fetchMyCards(user, this.props.order);
        this.props.fetchStations({attr: 'Name', asc: true});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.startStationIndex !== null
        && nextProps.endStationIndex !== null) {
            const currentTrip = nextProps.currentTrip;
            const startIndex = currentTrip.startStationIndex;
            currentTrip.startID = nextProps.stations[startIndex].StopID;
            const endIndex = currentTrip.endStationIndex;
            currentTrip.endID = nextProps.stations[endIndex].StopID;
            currentTrip.breezecardNum = nextProps.cards[nextProps.selected].BreezecardNum;
            nextProps.completeTrip(currentTrip);
        }
        if (!nextProps.isFresh) {
            nextProps.fetchMyCards(nextProps.username, nextProps.order);
        }
    }

    _startTrip() {
        const startStationIndex = parseInt(this.startStationSelect.value, 10);
        const fare = this.props.stations[startStationIndex].EnterFare;
        const balance = parseFloat(this.props.cards[this.props.selected].Value);
        if (balance >= fare) {
            this.props.startTrip(startStationIndex, fare);
        } else {
            this.props.showErrorMessage("Insufficient fund! Time: " + new Date(), 1);
        }
    }

    _endTrip() {
        const endStationIndex = parseInt(this.endStationSelect.value, 10);
        this.props.endTrip(endStationIndex);
    }

    render() {
        return (
            <SlimCol>
                <ErrorMessage/>
                <PageHeader>Welcome to MARTA</PageHeader>
                <Panel>
                    <Panel>
                        <Form horizontal className="container-fluid">
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2} md={3}>
                                    Breeze Card
                                </Col>
                                <Col md={5}>
                                {this.props.currentTrip.startStationIndex === null ? (
                                    <FormControl
                                        componentClass="select"
                                        inputRef={ref => { this.cardSelect = ref; }}
                                        onChange={e => {
                                            this.props.selectMyCard(parseInt(e.target.value, 10));
                                        }}>
                                        {this.props.cards.map((card, i) => (
                                            <option key={i} value={i}>{card.BreezecardNum}</option>
                                        ))}
                                    </FormControl>
                                ) : (
                                    <ControlLabel>
                                        {this.props.cards[this.props.selected]
                                        ? this.props.cards[this.props.selected].BreezecardNum
                                        : null}
                                    </ControlLabel>
                                )}
                                </Col>
                                <Col md={4}>
                                    <Button block onClick={() => {
                                        this.props.history.push('/my-cards');
                                    }}>
                                        Manage Cards
                                    </Button>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} md={3}>
                                    Balance
                                </Col>
                                <Col componentClass={ControlLabel} mdOffset={1} style={{color: 'green'}}>
                                    {this.props.cards[this.props.selected]
                                    ? '$ ' + this.props.cards[this.props.selected].Value
                                    : null}
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2} md={3}>
                                    Start At
                                </Col>
                                <Col md={5}>
                                    {
                                        this.props.currentTrip.startStationIndex === null ? (
                                            <FormControl
                                                componentClass="select"
                                                placeholder="Select Start Station"
                                                inputRef={(ref) => { this.startStationSelect = ref; }}
                                                >
                                                {this.props.stations.map((station, i) => (
                                                    <option key={i} value={i}>{station.Name}</option>
                                                ))}
                                            </FormControl>
                                        ) : (
                                            <ControlLabel>
                                                {this.props.stations[this.props.currentTrip.startStationIndex].Name}
                                            </ControlLabel>
                                        )
                                    }
                                </Col>
                                <Col md={4}>
                                    {this.props.currentTrip.startStationIndex === null ? (
                                        <Button block bsStyle="warning" onClick={this._startTrip}>
                                            Start Trip
                                        </Button>
                                    ) : (
                                        this.props.currentTrip.endStationIndex === null ? (
                                            <h5 style={{color: 'green'}}>Trip in Progress</h5>
                                        ) : null
                                    )}
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2} md={3}>
                                    Ending At
                                </Col>
                                <Col md={5}>
                                    {this.props.currentTrip.endStationIndex === null ? (
                                        <FormControl
                                            componentClass="select"
                                            placeholder="Select End Station"
                                            inputRef={ref => { this.endStationSelect = ref; }}
                                            >
                                            {this.props.stations.map((station, i) => (
                                                <option key={i} value={i}>{station.Name}</option>
                                            ))}
                                        </FormControl>
                                    ) : (
                                        <ControlLabel>
                                            {this.props.stations[this.props.currentTrip.endStationIndex].Name}
                                        </ControlLabel>
                                    )}
                                </Col>
                                <Col md={4}>
                                    {this.props.currentTrip.endStationIndex === null ? (
                                        <Button block bsStyle="warning"
                                            disabled={this.props.currentTrip.startStationIndex === null}
                                            onClick={this._endTrip}>
                                            End Trip
                                        </Button>
                                    ) : null}
                                </Col>
                            </FormGroup>
                        </Form>
                    </Panel>
                        <Col md={4}>
                            <Button block onClick={() => {
                                this.props.history.push('/trip-history');
                            }}>
                                View Trip History
                            </Button>
                        </Col>
                    <Col mdOffset={4} md={4}>
                        <Button block bsStyle="primary" onClick={() => {
                            this.props.logout();
                            this.props.history.push('/login');
                        }}>
                            Logout
                        </Button>
                    </Col>
                </Panel>
            </SlimCol>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        order: state.passenger.cards.order,
        username: state.currentUser.username,
        isFresh: state.passenger.cards.isFresh,
        cards: state.passenger.cards.data,
        selected: state.passenger.cards.selected,
        stations: state.stations.data,
        startStationIndex: state.passenger.currentTrip.startStationIndex,
        endStationIndex: state.passenger.currentTrip.endStationIndex,
        currentTrip: state.passenger.currentTrip,
        error: state.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchMyCards,
        selectMyCard,
        fetchStations,
        startTrip,
        endTrip,
        completeTrip,
        reset,
        logout,
        closeErrorMessage,
        showErrorMessage
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Trip);

Trip.propTypes = {
    isFresh: PropTypes.bool.isRequired,
    order: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired,
    stations: PropTypes.array.isRequired,
    currentTrip: PropTypes.object.isRequired,
    startStationIndex: PropTypes.number,
    endStationIndex: PropTypes.number,
    selectMyCard: PropTypes.func.isRequired,
    fetchMyCards: PropTypes.func.isRequired,
    fetchStations: PropTypes.func.isRequired,
    startTrip: PropTypes.func.isRequired,
    endTrip: PropTypes.func.isRequired,
    completeTrip: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    reset: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    closeErrorMessage: PropTypes.func.isRequired,
    showErrorMessage: PropTypes.func.isRequired
};