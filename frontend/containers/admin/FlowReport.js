import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageHeader, Panel, Col, Button, Form, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { fetchReport, sortReportEntries, selectReport, updateReportFilter } from '../../actions/admin/flowReports';
import TableTemplate from '../../components/TableTemplate';
import { closeErrorMessage, showErrorMessage } from '../../actions/error';
import { checkDateFormat } from '../../utilities/dateLint';
import FatCol from '../../components/FatCol';
import ErrorMessage from '../ErrorMessage';

class FlowReport extends Component {
    constructor(props) {
        super(props);
        this.startTimeInput;
        this.endTimeInput;
        this._updateFilter = this._updateFilter.bind(this);
        this._resetFilter = this._resetFilter.bind(this);
        this.attrList = [
            { name: 'Name', displayName: 'Station Name' },
            { name: 'InFlow', displayName: 'In' },
            { name: 'OutFlow', displayName: 'Out' },
            { name: 'Flow', displayName: 'Flow' },
            { name: 'Revenue', displayName: 'Revenue' }
        ];
    }

    componentWillMount() {
        this.props.fetchReport(this.props.filter, this.props.order);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isFresh) {
            nextProps.fetchReport(nextProps.filter, nextProps.order);
        }
    }

    _updateFilter() {
        const filter = {};
        filter.startTime = this.startTimeInput.value || null;
        filter.endTime = this.endTimeInput.value || null;
        if ((filter.startTime === null || checkDateFormat(filter.startTime))
           && (filter.endTime === null || checkDateFormat(filter.endTime))) {
            this.props.updateReportFilter(filter);
        } else {
            this.props.showErrorMessage("Date/time format error!", 1);
        }
    }

    _resetFilter() {
        this.props.updateReportFilter({
            startTime: null,
            endTime: null
        });
    }

    render() {
        return (
            <FatCol>
                <ErrorMessage/>
                <PageHeader>Passenger Flow Report</PageHeader>
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
                                data={this.props.reports}
                                selected={this.props.selected}
                                order={this.props.order}
                                sortFunc={this.props.sortReportEntries}
                                selectFunc={this.props.selectReport}
                            />
                        </Panel>
                    </Col>
                </Panel>
            </FatCol>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reports: state.admin.flowReport.data,
        order: state.admin.flowReport.order,
        selected: state.admin.flowReport.selected,
        filter: state.admin.flowReport.filter,
        isFresh: state.admin.flowReport.isFresh,
        error: state.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchReport,
        sortReportEntries,
        selectReport,
        updateReportFilter,
        closeErrorMessage,
        showErrorMessage
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FlowReport);

FlowReport.propTypes = {
    reports: PropTypes.array.isRequired,
    order: PropTypes.object.isRequired,
    selected: PropTypes.number.isRequired,
    filter: PropTypes.object.isRequired,
    isFresh: PropTypes.bool.isRequired,
    fetchReport: PropTypes.func.isRequired,
    sortReportEntries: PropTypes.func.isRequired,
    selectReport: PropTypes.func.isRequired,
    updateReportFilter: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    closeErrorMessage: PropTypes.func.isRequired,
    showErrorMessage: PropTypes.func.isRequired
};
