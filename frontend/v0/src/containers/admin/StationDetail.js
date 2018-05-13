import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Panel, Col, Button, Form, FormGroup, ControlLabel, FormControl, PageHeader, HelpBlock, Checkbox, Alert } from 'react-bootstrap';
import SlimCol from '../../components/SlimCol';
import FatCol from '../../components/FatCol';
import { closeErrorMessage,  showErrorMessage } from '../../actions/error';
import { updateFare } from '../../actions/admin/stations';
import ErrorMessage from '../ErrorMessage';

class StationDetail extends Component {
    constructor(props) {
        super(props);
        this.fareInput;
        this.intersectionInput;
        this.openClosedCheckbox;
        this._updateFare = this._updateFare.bind(this);
    }

    componentDidMount() {
        if (this.props.station !== undefined) {
            const station = this.props.station;
            this.fareInput.value = station.EnterFare;
            this.openClosedCheckbox.checked = station.ClosedStatus === "Open" ? true : false;
            if (this.intersectionInput !== undefined) {
                this.intersectionInput.value = station.Intersection;
            }
            this.openClosedCheckbox.checked = station.ClosedStatus === "Open";
        }
    }

    _updateFare() {
        const stationInfo = {};
        stationInfo.id = this.props.station.StopID;
        stationInfo.fare = parseFloat(this.fareInput.value);
        if (stationInfo.fare >= 0 && stationInfo.fare <= 50) {
            if (this.intersectionInput === undefined) {
                stationInfo.intersection = null;
                stationInfo.isBusStation = false;
                stationInfo.isTrainStation = true;
            } else {
                stationInfo.intersection = this.intersectionInput.value;
                stationInfo.isBusStation = true;
                stationInfo.isTrainStation = false;
            }
            stationInfo.isOpen = this.openClosedCheckbox.checked;
            this.props.updateFare(stationInfo);
            this.props.history.goBack();
        } else {
            this.props.showErrorMessage("Fare must be between $0 and $50!", 1);
        }
    }

    render() {
        if (this.props.station === undefined) {
            return <Redirect to="/stations"/>;
        }
        const station = this.props.station;
        return (
            <div>
                <FatCol>
                    <ErrorMessage/>
                    <PageHeader>Station Detail - {this.props.station.Name}</PageHeader>
                </FatCol>
                <SlimCol>
                    <Panel>
                        <Form horizontal className="container-fluid">
                            <FormGroup>
                                <Col smOffset={1} sm={8}>
                                    <h3>{station.Name}</h3>
                                </Col>
                                <Col sm={2}>
                                    <h3 style={{ color: '#d9534f' }}>
                                        {station.StopID}
                                    </h3>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>
                                Fare
                            </Col>
                            <Col sm={6}>
                                <FormControl
                                    type="number"
                                    onChange={e => {
                                        if (e.target.value < 0) {
                                            this.fareInput.value = 0;
                                        }
                                    }}
                                    placeholder={this.props.station.EnterFare}
                                    inputRef={ref => { this.fareInput = ref; }}
                                />
                            </Col>
                            <Col sm={3}>
                                <Button
                                    onClick={this._updateFare}>
                                    Update
                                </Button>
                            </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Nearest Intersection
                                </Col>
                                <Col sm={6}>
                                    {
                                        !this.props.station.IsTrain ? (
                                            <FormControl
                                                type="text"
                                                placeholder={this.props.station.Intersection}
                                                inputRef={ref => { this.intersectionInput = ref; }}
                                            />
                                        )
                                        : (
                                            <HelpBlock>
                                                Not available for train stations
                                            </HelpBlock>
                                        )
                                    }
                                </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col mdOffset={2} md={10}>
                                        <Checkbox inputRef={ref => {
                                            this.openClosedCheckbox = ref;
                                        }}>
                                            Open Station
                                        </Checkbox>
                                        <HelpBlock>
                                            When checked, passengers can enter at this station.
                                        </HelpBlock>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Panel>
                </SlimCol>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const stations = state.stations.data;
    const selected = state.admin.stations.selected;
    return {
        station: stations[selected],
        error: state.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateFare,
        closeErrorMessage,
        showErrorMessage
    }, dispatch);
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StationDetail);

StationDetail.propTypes = {
    station: PropTypes.object,
    history: PropTypes.any.isRequired,
    updateFare: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    closeErrorMessage: PropTypes.func.isRequired,
    showErrorMessage: PropTypes.func.isRequired

};