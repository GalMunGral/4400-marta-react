import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FatCol from '../../components/FatCol';
import { PageHeader, Panel, Col, Button, Form, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import TableTemplate from '../../components/TableTemplate';
import { fetchTripHistory, selectHistoryEntry, sortHistoryEntries, updateHistoryFilter } from '../../actions/passenger/tripHistory';
import { closeErrorMessage, showErrorMessage } from '../../actions/error';
import { checkDateFormat } from '../../utilities/dateLint';
import ErrorMessage from '../ErrorMessage';

class TripHistory extends Component {
    constructor(props) {
        super(props);
        this.startTimeInput;
        this.endTimeInput;
        this._resetFilter = this._resetFilter.bind(this);
        this._updateFilter = this._updateFilter.bind(this);
        this.attrList = [
            { name: 'Time', displayName: 'Time' },
            { name: 'SName', displayName: 'Source' },
            { name: 'DName', displayName: 'Destination' },
            { name: 'Fare', displayName: 'Fare Paid'},
            { name: 'BNumber', displayName: 'Card#'}
        ];
    }

    componentWillMount() {
        this.props.fetchTripHistory(this.props.user, this.props.filter, this.props.order);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isFresh) {
            nextProps.fetchTripHistory(nextProps.user, nextProps.filter, nextProps.order);
        }
    }

    _updateFilter() {
        const filter = {};
        filter.start = this.startTimeInput.value;
        filter.end = this.endTimeInput.value;
        if ((filter.start === "" || checkDateFormat(filter.start)) &&
            (filter.end === "" || checkDateFormat(filter.end))) {
            this.props.updateHistoryFilter(filter);
        } else {
            this.props.showErrorMessage("Date/time format error! Time: " + new Date(), 1);
        }
    }

    _resetFilter() {
        const filter = {};
        filter.start = "";
        filter.end = "";
        this.props.updateHistoryFilter(filter);
        this.startTimeInput.value = null;
        this.endTimeInput.value = null;
    }

    render() {
        return (
            <div>
                <FatCol>
                    <ErrorMessage/>
                    <PageHeader>TripHistory</PageHeader>
                    <Panel>
                        <Col md={8}>
                            <Form horizontal className="container-fluid">
                                <FormGroup>
                                    <Col componentClass={ControlLabel} md={4}>
                                        Start Time
                                    </Col>
                                    <Col md={8}>
                                        <FormControl
                                            inputRef={(ref) => { this.startTimeInput = ref; }}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col componentClass={ControlLabel} md={4}>
                                        End Time
                                    </Col>
                                    <Col md={8}>
                                        <FormControl
                                            inputRef={(ref) => { this.endTimeInput = ref; }}
                                        />
                                    </Col>
                                </FormGroup>
                            </Form>

                        </Col>
                        <Col md={4}>
                            <Form horizontal className="container-fluid">
                                <FormGroup>
                                    <Button block onClick={this._updateFilter}>
                                        Update
                                    </Button>
                                    <Button block onClick={this._resetFilter}>
                                        Reset
                                    </Button>
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col md={12}>
                            <Panel style={{maxHeight: '300px', overflowY: 'auto'}}>
                                    <TableTemplate
                                    attrList={this.attrList}
                                    data={this.props.tripHistory}
                                    selected={this.props.selected}
                                    order={this.props.order}
                                    sortFunc={this.props.sortHistoryEntries}
                                    selectFunc={this.props.selectHistoryEntry}
                                />
                        </Panel>
                        </Col>
            </Panel>
                </FatCol>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.currentUser.username,
        filter: state.passenger.tripHistory.filter,
        tripHistory: state.passenger.tripHistory.data,
        isFresh: state.passenger.tripHistory.isFresh,
        selected: state.passenger.tripHistory.selected,
        order: state.passenger.tripHistory.order,
        error: state.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchTripHistory,
        selectHistoryEntry,
        sortHistoryEntries,
        updateHistoryFilter,
        closeErrorMessage,
        showErrorMessage
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TripHistory);

TripHistory.propTypes = {
    filter: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    tripHistory: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired,
    isFresh: PropTypes.bool.isRequired,
    order: PropTypes.object.isRequired,
    fetchTripHistory: PropTypes.func.isRequired,
    selectHistoryEntry: PropTypes.func.isRequired,
    sortHistoryEntries: PropTypes.func.isRequired,
    updateHistoryFilter: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    closeErrorMessage: PropTypes.func.isRequired,
    showErrorMessage: PropTypes.func.isRequired
};
