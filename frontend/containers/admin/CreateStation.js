import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Panel, Col, Button, Form, FormGroup, ControlLabel, FormControl, PageHeader, Checkbox, HelpBlock, Radio, Alert } from 'react-bootstrap';
import SlimCol from '../../components/SlimCol';
import FatCol from '../../components/FatCol';
import { closeErrorMessage, showErrorMessage } from '../../actions/error';
import { createStation } from '../../actions/admin/stations';
import ErrorMessage from '../ErrorMessage';

class CreateStation extends Component {
    constructor(props) {
        super(props);
        this.stationNameInput;
        this.stationIdInput;
        this.fareInput;
        this.createBusStationRadio;
        this.createTrainStationRadio;
        this.intersectionInput;
        this.openStationCheckbox;
        this._createStation = this._createStation.bind(this);
    }

    _createStation() {
        const stationInfo = {};
        stationInfo.stationName = this.stationNameInput.value;
        stationInfo.stationId = this.stationIdInput.value;
        stationInfo.fare = parseFloat(this.fareInput.value);
        stationInfo.isOpen = this.openStationCheckbox.checked;
        const isBusStation = this.createBusStationRadio.checked;
        const isTrainStation = this.createTrainStationRadio.checked;
        if (stationInfo.stationName
        && stationInfo.stationId
        && stationInfo.fare) {
            if (stationInfo.fare < 0 || stationInfo.fare > 50) {
                this.props.showErrorMessage("Fare must be between $0 and $50! Time: " + new Date(), 1);
                return;
            }
            if (isBusStation && !isTrainStation) {
                stationInfo.isBusStation = true;
                stationInfo.isTrainStation = false;
                stationInfo.intersection = this.intersectionInput.value;
                if (!stationInfo.intersection) {
                    this.props.showErrorMessage("Please fill out all fields! Time: " + new Date(), 1);
                    return;
                }
            } else if (isTrainStation && !isBusStation) {
                stationInfo.isBusStation = false;
                stationInfo.isTrainStation = true;
                stationInfo.intersection = null;
            } else {
                this.props.showErrorMessage("You must select either bus or train! Time:" + new Date, 1);
                return;
            }
            this.props.closeErrorMessage();
            this.props.createStation(stationInfo);
            this.props.history.goBack();
        } else {
            this.props.showErrorMessage("Please fill out all fields! Time: " + new Date(), 1);
        }
    }

    render() {
        return (
            <div>
                <FatCol>
                    <ErrorMessage/>
                    <PageHeader>Create New Station</PageHeader>
                </FatCol>
                <SlimCol>
                    <Panel>
                        <Form horizontal className="container-fluid">
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2} md={3}>
                                    Station Name
                                </Col>
                                <Col sm={10} md={8}>
                                    <FormControl
                                        placeholder="Stations Name"
                                        inputRef={ref => { this.stationNameInput = ref; }}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2} md={3}>
                                    Station ID
                                </Col>
                                <Col sm={10} md={8}>
                                    <FormControl
                                        placeholder="Station ID"
                                        inputRef={ref => { this.stationIdInput = ref; }}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2} md={3}>
                                    Entry Fare
                                </Col>
                                <Col sm={10} md={8}>
                                    <FormControl
                                        type="number"
                                        placeholder="Entry Fare"
                                        onChange={e => {
                                            if (e.target.value < 0) {
                                                e.target.value = 0;
                                            }
                                        }}
                                        inputRef={ref => { this.fareInput = ref; }}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2} md={3}>
                                    Station Type
                                </Col>
                                <Col sm={10} md={8}>
                                    <Radio
                                        name="selectStationType"
                                        inputRef={ref => {
                                            this.createBusStationRadio = ref;
                                        }}
                                        onClick={() => {
                                            this.intersectionInput.disabled = false;
                                        }}>
                                        Bus Station
                                    </Radio>
                                    <ControlLabel style={{color: 'grey'}}>
                                        Nearest Intersection
                                    </ControlLabel>
                                    <FormControl inputRef={ref => { this.intersectionInput = ref; }}/>
                                    <Radio
                                        name="selectStationType"
                                        inputRef={ref => {
                                            this.createTrainStationRadio = ref;
                                        }}
                                        onClick={() => {
                                            this.intersectionInput.disabled = true;
                                        }}>
                                        Train Station
                                    </Radio>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col mdOffset={3} md={10}>
                                    <Checkbox inputRef={ref => { this.openStationCheckbox = ref; }}>
                                        Open Station
                                    </Checkbox>
                                    <HelpBlock>
                                        When checked, passengers can enter at this station.
                                    </HelpBlock>
                                </Col>
                            </FormGroup>
                        </Form>
                        <Button bsStyle="primary" block onClick={this._createStation}>
                            Create Station
                        </Button>
                    </Panel>
                </SlimCol>
            </div>
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
        createStation,
        closeErrorMessage,
        showErrorMessage
    }, dispatch);
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateStation);

CreateStation.propTypes = {
    history: PropTypes.object.isRequired,
    createStation: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    closeErrorMessage: PropTypes.func.isRequired,
    showErrorMessage: PropTypes.func.isRequired
};
