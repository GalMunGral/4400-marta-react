import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageHeader, Panel, Button, Checkbox, Col, Form, FormControl, FormGroup, ControlLabel, Alert } from 'react-bootstrap';
import FatCol from '../../components/FatCol';
import { fetchCards, selectCard, sortCards, updateFilter, updateCardValue, updateCardOwner  } from '../../actions/admin/breezeCards';
import { closeErrorMessage, showErrorMessage } from '../../actions/error';
import TableTemplate from '../../components/TableTemplate';
import ErrorMessage from '../ErrorMessage';

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
        this.attrList = [
            { name: 'BreezecardNum', displayName: 'Card Number' },
            { name: 'Value', displayName: 'Value' },
            { name: 'BelongsTo', displayName: 'Username' }
        ];
        this.state = {
            valueUpdateDisabled: true,
            ownerUpdateDisabled: true
        };
    }

    componentWillMount() {
        const filter = this.props.filter;
        const order = this.props.order;
        this.props.fetchCards(filter, order);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isFresh) {
            const filter = nextProps.filter;
            const order = nextProps.order;
            nextProps.fetchCards(filter, order);
        }
    }

    _updateFilter() {
        const filter = {};
        filter.owner = this.ownerInput.value || null;
        filter.cardNumber = this.cardNumberInput.value || null;
        filter.showSuspended = this.showSuspendedCheckbox.checked;
        filter.minValue = this.minValueInput.value || null;
        filter.maxValue = this.maxValueInput.value || null;
        this.props.updateFilter(filter);
    }

    _resetFilter() {
        const filter = {};
        filter.owner = null;
        filter.cardNumber = null;
        filter.minValue = null;
        filter.maxValue = null;
        filter.showSuspended = false;
        this.props.updateFilter(filter);
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
                this.setState({
                    ...this.state,
                    valueUpdateDisabled: true
                });
            } else {
                this.props.showErrorMessage("Card value cannot exceed $1000! Time: " + new Date(), 1);
            }
        } else {
            this.props.showErrorMessage("Card value format error! Time: " + new Date(), 1);
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
        this.setState({
            ...this.state,
            ownerUpdateDisabled: true
        });
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
                                <Col componentClass={ControlLabel} sm={4}>
                                    Owner
                                </Col>
                                <Col sm={8}>
                                    <FormControl inputRef={ref => {
                                        this.ownerInput = ref;
                                    }}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Card Number
                                </Col>
                                <Col sm={8}>
                                <FormControl
                                    inputRef={ref => {
                                        this.cardNumberInput = ref;
                                    }}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Value between
                                </Col>
                                <Col sm={3}>
                                    <FormControl
                                        type="number"
                                        onChange={e => {
                                            if (e.target.value < 0) {
                                                e.target.value = 0;
                                            }
                                        }}
                                        inputRef={ref => {
                                            this.minValueInput = ref;
                                        }}/>
                                </Col>
                                <Col componentClass={ControlLabel} sm={1}>
                                    and
                                </Col>
                                <Col sm={3}>
                                    <FormControl
                                        type="number"
                                        onChange={e => {
                                            if (e.target.value < 0) {
                                                e.target.value = 0;
                                            }
                                        }}
                                        inputRef={ref => {
                                            this.maxValueInput = ref;
                                        }}/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col md={4} sm={4}>
                        <Checkbox inputRef={ref => {
                            this.showSuspendedCheckbox = ref;
                        }}>
                            Show suspendedCards
                        </Checkbox>
                        <Button block onClick={this._resetFilter}>Reset</Button>
                        <Button block onClick={this._updateFilter}>Update Filter</Button>
                    </Col>
                    <Col md={12}>
                        <Panel style={{maxHeight: '200px', overflowY: 'auto'}}>
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
                            <Button block bsStyle="primary"
                                onClick={this._updateCardValue}
                                disabled={this.state.valueUpdateDisabled}>
                                Set Value of Selected Card
                            </Button>
                        </FormGroup>
                        <FormGroup>
                            <Button block bsStyle="primary"
                                onClick={this._updateCardOwner}
                                disabled={this.state.ownerUpdateDisabled}>
                                Transfer Selected Card
                            </Button>
                    </FormGroup>
                    </Col>
                </Panel>
            </FatCol>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.admin.breezeCards.data,
        selected: state.admin.breezeCards.selected,
        order: state.admin.breezeCards.order,
        filter: state.admin.breezeCards.filter,
        isFresh: state.admin.breezeCards.isFresh,
        error: state.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchCards,
        selectCard,
        sortCards,
        updateFilter,
        updateCardValue,
        updateCardOwner,
        closeErrorMessage,
        showErrorMessage
    }, dispatch);
};

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
