import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  fetchCards,
  selectCard,
  sortCards,
  updateFilter,
  updateCardValue,
  updateCardOwner
} from '../../actions/admin/breezeCards';
import { closeErrorMessage, showErrorMessage } from '../../actions/error';
import FatCol from '../../components/FatCol';
import ErrorMessage from '../ErrorMessage';
import TableTemplate from '../../components/TableTemplate';
import {
  PageHeader,
  Panel,
  Button,
  Checkbox,
  Col,
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  Alert
} from 'react-bootstrap';

class BreezeCards extends Component {
  constructor(props) {
    super(props);
    this.ownerInput;
    this.cardNumberInput;
    this.minValueInput;
    this.maxValueInput;
    this.newValueInput;
    this.newOwnerInput;
    this.showSuspendedCheckbox;
    this._updateFilter = this._updateFilter.bind(this);
    this._resetFilter = this._resetFilter.bind(this);
    this._updateCardOwner = this._updateCardOwner.bind(this);
    this._updateCardValue = this._updateCardValue.bind(this);
    
    this.attrList = [{
      name: 'BreezecardNum',
      displayName: 'Card Number'
    }, {
      name: 'Value',
      displayName: 'Value'
    }, {
      name: 'BelongsTo',
      displayName: 'Username'
    }];

    this.state = {
      valueUpdateDisabled: true,
      ownerUpdateDisabled: true
    };
  }

  componentWillMount() {
    this.props.fetchCards(
      this.props.filter,
      this.props.order
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFresh) return;
    nextProps.fetchCards(
      nextProps.filter,
      nextProps.order
    );
  }

  _updateFilter() {
    this.props.updateFilter({
      owner: this.ownerInput.value || null,
      cardNumber: this.cardNumberInput.value || null,
      showSuspended: this.showSuspendedCheckbox.checked,
      minValue: this.minValueInput.value || null,
      maxValue: this.maxValueInput.value || null,
    });
  }

  _resetFilter() {
    this.props.updateFilter({
      owner: null,
      cardNumber: null,
      minValue: null,
      maxValue: null,
      showSuspended: false,
    });
    this.ownerInput.value = null;
    this.cardNumberInput.value = null;
    this.minValueInput.value = null;
    this.maxValueInput.value = null;
    this.newValueInput.value = null;
    this.newOwnerInput.value = null;
    this.showSuspendedCheckbox.checked = false;
  }

  _updateCardValue() {
    const cardInfo = {};
    const cards = this.props.cards;
    const selected = this.props.selected;
    cardInfo.Number = cards[selected].BreezecardNum;
    cardInfo.newValue = this.newValueInput.value;
    if (cardInfo.newValue.match(/^[0-9]+(\.[0-9]{2})?$/)) {
      const num = parseFloat(cardInfo.newValue);
      if (num >= 0 && num <= 1000) {
        this.props.updateCardValue(cardInfo);
        this.newValueInput.value = null;
        this.setState({ ...this.state, valueUpdateDisabled: true });
      } else {
        this.props.showErrorMessage(
          `Card value cannot exceed $1000! Time: ${new Date()}`,
          1
        );
      }
    } else {
      this.props.showErrorMessage(
        `Card value format error! Time: ${new Date()}`,
        1
      );
    }
  }

  _updateCardOwner() {
    const cardInfo = {};
    const cards = this.props.cards;
    const selected = this.props.selected;
    cardInfo.Number = cards[selected].BreezecardNum;
    cardInfo.newOwner = this.newOwnerInput.value;
    this.props.updateCardOwner(cardInfo);
    this.newOwnerInput.value = null;
    this.setState({ ...this.state, ownerUpdateDisabled: true });
  }

  render() {
    return (
      <FatCol>
        <ErrorMessage/>
        <PageHeader>Manage Breeze Cards</PageHeader>
        <Panel>
          <Col md={8} sm={8}>
            <Form horizontal className="container-fluid">
              <FormGroup>
                <Col componentClass={ControlLabel} sm={4}>Owner</Col>
                <Col sm={8}>
                  <FormControl inputRef={ref => { this.ownerInput = ref; }}/>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={4}>Card Number</Col>
                <Col sm={8}>
                  <FormControl
                    inputRef={ref => { this.cardNumberInput = ref; }}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={4}>Value between</Col>
                <Col sm={3}>
                  <FormControl
                    type="number"
                    inputRef={ref => { this.minValueInput = ref; }}
                    onChange={e => {
                      if (e.target.value < 0) e.target.value = 0;
                    }}
                  />
                </Col>
                <Col componentClass={ControlLabel} sm={1}>and</Col>
                <Col sm={3}>
                  <FormControl
                    type="number"
                    inputRef={ref => { this.maxValueInput = ref; }}
                    onChange={e => { 
                      if (e.target.value < 0) e.target.value = 0;
                    }}
                  />
                </Col>
              </FormGroup>
            </Form>
          </Col>
          <Col md={4} sm={4}>
            <Checkbox inputRef={ref => { this.showSuspendedCheckbox = ref; }}>
              Show suspendedCards
            </Checkbox>
            <Button block onClick={this._resetFilter}>Reset</Button>
            <Button block onClick={this._updateFilter}>Update Filter</Button>
          </Col>
          
          {/* TABLE */}
          <Col md={12}>
            <Panel style={{ maxHeight: '200px', overflowY: 'auto' }}>
              <TableTemplate
                attrList={this.attrList}
                data={this.props.cards}
                selected={this.props.selected}
                order={this.props.order}
                sortFunc={this.props.sortCards}
                selectFunc={this.props.selectCard}
              />
            </Panel>
          </Col>

          <Col md={4}>
            <Form horizontal className="container-fluid">
              <FormGroup>
                <FormControl
                  inputRef={ref => { this.newValueInput = ref; }}
                  onChange={e => {
                    this.setState({
                      ...this.state,
                      valueUpdateDisabled: e.target.value === ""
                    });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <FormControl
                  inputRef={ref => { this.newOwnerInput = ref; }}
                  onChange={e => {
                    this.setState({
                      ...this.state,
                      ownerUpdateDisabled: e.target.value === ""
                    });
                  }}
                />
              </FormGroup>
            </Form>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Button
                block
                bsStyle="primary"
                onClick={this._updateCardValue}
                disabled={this.state.valueUpdateDisabled}
              >
                Set Value of Selected Card
              </Button>
            </FormGroup>
            <FormGroup>
              <Button
                block
                bsStyle="primary"
                onClick={this._updateCardOwner}
                disabled={this.state.ownerUpdateDisabled}
              >
                Transfer Selected Card
              </Button>
            </FormGroup>
          </Col>
        </Panel>
      </FatCol>
    );
  }
}

const mapStateToProps = state => ({
  cards: state.admin.breezeCards.data,
  selected: state.admin.breezeCards.selected,
  order: state.admin.breezeCards.order,
  filter: state.admin.breezeCards.filter,
  isFresh: state.admin.breezeCards.isFresh,
  error: state.error,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchCards,
    selectCard,
    sortCards,
    updateFilter,
    updateCardValue,
    updateCardOwner,
    closeErrorMessage,
    showErrorMessage,
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BreezeCards);

BreezeCards.propTypes = {
  cards: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  order: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  isFresh: PropTypes.bool.isRequired,
  fetchCards: PropTypes.func.isRequired,
  selectCard: PropTypes.func.isRequired,
  sortCards: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
  updateCardValue: PropTypes.func.isRequired,
  updateCardOwner: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  closeErrorMessage: PropTypes.func.isRequired,
  showErrorMessage: PropTypes.func.isRequired
};
