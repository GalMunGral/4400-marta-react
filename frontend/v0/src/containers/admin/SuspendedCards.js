import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchSuspendedCards,
  selectSuspendedCard,
  sortSuspendedCards,
  resolveConflict
} from '../../actions/admin/suspendedCards';
import { closeErrorMessage } from '../../actions/error';
import TableTemplate from '../../components/TableTemplate';
import ErrorMessage from '../ErrorMessage';
import FatCol from '../../components/FatCol';
import { PageHeader, Panel, Alert, Button, Col } from 'react-bootstrap';

class SuspendedCards extends Component {
  constructor(props) {
    super(props);
    this._assignToNewOwer = this._assignToNewOwer.bind(this);
    this.attrList = [{
      name: 'BreezecardNum',
      displayName: 'Card Number'
    }, {
      name: 'Username',
      displayName: 'New Owner'
    }, {
      name: 'DateTime',
      displayName: 'Suspension Date'
    }, {
      name: 'BelongsTo',
      displayName: 'Previous Owner'
    }];
  }

  componentWillMount() {
    this.props.fetchSuspendedCards(this.props.order);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isFresh) {
      nextProps.fetchSuspendedCards(nextProps.order);
    }
  }

  _assignToNewOwer(bool) {
    const cards = this.props.suspendedCards;
    const selected = this.props.selected;
    const BNumber = cards[selected].BreezecardNum;
    this.props.resolveConflict({
      BNumber,
      willAssignToNewOwner: bool,
      newOwnerName: cards[selected].Username
    });
  }

  render() {
    return (
      <FatCol>
        <ErrorMessage/>
        <PageHeader>Manage Suspended Cards</PageHeader>
        <Panel>

          {/* TABLE */}
          <Panel style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <TableTemplate
              attrList={this.attrList}
              data={this.props.suspendedCards}
              selected={this.props.selected}
              order={this.props.order}
              sortFunc={this.props.sortSuspendedCards}
              selectFunc={this.props.selectSuspendedCard}
            />
          </Panel>

          <Col mdOffset={3} md={6}>
            <Button block onClick={() => { this._assignToNewOwer(true); }}>
              Assign Selected Card to New Owner
            </Button>
            <Button block onClick={() => { this._assignToNewOwer(false); }}>
              Assign Selected Card to Previous Owner
            </Button>
          </Col>
        </Panel>
      </FatCol>
    );
  }
}

const mapStateToProps = state => ({
  suspendedCards: state.admin.suspendedCards.data,
  selected: state.admin.suspendedCards.selected,
  order: state.admin.suspendedCards.order,
  isFresh: state.admin.suspendedCards.isFresh,
  error: state.error,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchSuspendedCards,
    selectSuspendedCard,
    sortSuspendedCards,
    resolveConflict,
    closeErrorMessage,
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuspendedCards);

SuspendedCards.propTypes = {
  suspendedCards: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  order: PropTypes.object.isRequired,
  isFresh: PropTypes.bool.isRequired,
  fetchSuspendedCards: PropTypes.func.isRequired,
  selectSuspendedCard: PropTypes.func.isRequired,
  sortSuspendedCards: PropTypes.func.isRequired,
  resolveConflict: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  closeErrorMessage: PropTypes.func.isRequired
};