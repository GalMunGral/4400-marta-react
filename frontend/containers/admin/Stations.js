import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchStations } from '../../actions/stations';
import { selectStation, sortStations } from '../../actions/admin/stations';
import { closeErrorMessage } from '../../actions/error';
import FatCol from '../../components/FatCol';
import TableTemplate from '../../components/TableTemplate';
import ErrorMessage from '../ErrorMessage';
import { PageHeader, Panel, Col, Button, Alert } from 'react-bootstrap';

class Stations extends Component {
  constructor(props) {
    super(props);
    this._generatePath = this._generatePath.bind(this);
    this.attrList = [{
      name: 'Name',
      displayName: 'Station Name'
    }, {
      name: 'StopID',
      displayName: 'Station ID'
    }, {
      name: 'EnterFare',
      displayName: 'Fare' 
    }, {
      name: 'ClosedStatus',
      displayName: 'Status'
    }];
  }

  componentWillMount() {
    this.props.fetchStations(this.props.order);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isFresh) {
      nextProps.fetchStations(nextProps.order);
    }
  }

  _generatePath() {
    const stations = this.props.stations;
    const selected = this.props.selected;
    const name = stations[selected].Name;
    const formattedName = name.toLowerCase().replace(/ /, '-');
    return `/station-detail/${formattedName}`;
  }

  render() {
    return (
      <FatCol>
        <ErrorMessage/>
        <PageHeader>Station Listing</PageHeader>
        <Panel>
          {/* TABLE */}
          <Panel style={{maxHeight: '400px', overflowY: 'auto'}}>
            <TableTemplate
              attrList={this.attrList}
              data={this.props.stations}
              selected={this.props.selected}
              order={this.props.order}
              sortFunc={this.props.sortStations}
              selectFunc={this.props.selectStation}
            />
          </Panel>

          <Col md={3}>
            <Button
              bsStyle="primary"
              onClick={() => {
                this.props.history.push('/create-new-station');
              }}
            >
              Create New Station
            </Button>
          </Col>
          <Col md={3} mdOffset={6}>
            <Button
              onClick={() => {
                this.props.history.push(this._generatePath());
              }}
            >
              View Station
            </Button>
          </Col>
        </Panel>
      </FatCol>
    );
  }
}

const mapStateToProps = state => ({
  stations: state.stations.data,
  isFresh: state.admin.stations.isFresh,
  selected: state.admin.stations.selected,
  order: state.admin.stations.order,
  error: state.error
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchStations,
    selectStation,
    sortStations,
    closeErrorMessage
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stations);

Stations.propTypes = {
  stations: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  isFresh: PropTypes.bool.isRequired,
  order: PropTypes.object.isRequired,
  fetchStations: PropTypes.func.isRequired,
  selectStation: PropTypes.func.isRequired,
  sortStations: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  closeErrorMessage: PropTypes.func.isRequired
};