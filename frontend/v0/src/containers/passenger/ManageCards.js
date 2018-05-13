import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageHeader, Panel, Button, Col, Form, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import SlimCol from '../../components/SlimCol';
import { fetchMyCards, selectMyCard, sortMyCards, addNewCard, addValueToCard, removeCard } from '../../actions/passenger/cards';
import { closeErrorMessage, showErrorMessage } from '../../actions/error';
import TableTemplate from '../../components/TableTemplate';
import ErrorMessage from '../ErrorMessage';

class ManageCards extends Component {
    constructor(props) {
        super(props);
        this.newCardNumberInput;
        this.addValueInput;
        this.creditCardNumberInput;
        this._addValueToCard = this._addValueToCard.bind(this);
        this._addNewCard = this._addNewCard.bind(this);
        this._removeCard = this._removeCard.bind(this);
        this.attrList = [
            { name: 'BreezecardNum', displayName: 'Card Number' },
            { name: 'Value', displayName: 'Value' },
        ];
        this.state = {
            disableAddCard: true,
            disableAddValue: true
        };
    }

    componentWillMount() {
        this.props.fetchMyCards(this.props.user, this.props.order);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isFresh) {
            nextProps.fetchMyCards(this.props.user, nextProps.order);
        }
    }

    _addNewCard() {
        const cardInfo = {};
        cardInfo.Username = this.props.user;
        cardInfo.Number = this.newCardNumberInput.value;
        if (cardInfo.Number.match(/^[0-9]{16}$/)) {
            this.props.addNewCard(cardInfo);
            this.newCardNumberInput.value = null;
            this.props.closeErrorMessage();
        } else {
            this.props.showErrorMessage("Breezecard number format error! Time: " + new Date(), 1);
        }
    }

    _addValueToCard() {
        const cardInfo = {};
        const cards = this.props.cards;
        const selected = this.props.selected;
        cardInfo.Number = cards[selected].BreezecardNum;
        cardInfo.valueToAdd = this.addValueInput.value;
        if (this.creditCardNumberInput.value.match(/^[0-9]{16}$/)) {
            if (cardInfo.valueToAdd.match(/^[0-9]+(\.[0-9]{2})?$/)) {
                if (parseFloat(cardInfo.valueToAdd) + parseFloat(cards[selected].Value) <= 1000 &&
                    parseFloat(cardInfo.valueToAdd) >= 0) {
                    this.props.closeErrorMessage();
                    this.props.addValueToCard(cardInfo);
                    this.addValueInput.value = null;
                    this.creditCardNumberInput.value = null;
                } else {
                    this.props.showErrorMessage("Card value maximum exceeded! Time: " + new Date(), 1);
                }
            } else {
                this.props.showErrorMessage("Invalid number format! Time: " + new Date(), 1);
            }
        } else {
            this.props.showErrorMessage("Invalid Credit card number! Time: " + new Date(), 1);
        }
    }

    _removeCard(i) {
        const cardInfo = {};
        const cards = this.props.cards;
        cardInfo.Username = this.props.user;
        cardInfo.Number = cards[i].BreezecardNum;
        if (cards.length === 1) {
            this.props.showErrorMessage('Passenger must have at least one card! Time: ' + new Date(), 1);
        } else {
            this.props.removeCard(cardInfo);
        }
    }

    render() {
        return (
            <SlimCol>
                <ErrorMessage/>
                <PageHeader>Manage Cards</PageHeader>
                <Panel>
                    <Panel style={{maxHeight: '200px', overflowY: 'auto'}}>
                        <TableTemplate
                            attrList={this.attrList}
                            data={this.props.cards}
                            selected={this.props.selected}
                            order={this.props.order}
                            sortFunc={this.props.sortMyCards}
                            selectFunc={this.props.selectMyCard}
                            actionEnabled
                            actionName="Remove"
                            actionFunc={this._removeCard}
                        />
                    </Panel>
                    <Panel>
                        <Col md={6}>
                            <FormControl
                                placeholder="New Card Number"
                                inputRef={ref => { this.newCardNumberInput = ref; }}
                                onChange={e => this.setState({
                                    disableAddCard: e.target.value === ""
                                })}/>
                        </Col>
                        <Col md={6}>
                            <Button
                                disabled={this.state.disableAddCard}
                                onClick={this._addNewCard}>
                                Add Card
                            </Button>
                        </Col>
                    </Panel>
                    <Col md={12}>
                        <Panel header="Add Value to Selected Card">
                            <Form horizontal className="container-fluid">
                                <FormGroup>
                                    <Col md={4}>
                                        <ControlLabel>
                                            Credit Card #
                                        </ControlLabel>
                                    </Col>
                                    <Col md={8}>
                                        <FormControl
                                            placeholder="xxxx-xxxx-xxxx-xxxx"
                                            inputRef={(ref) => { this.creditCardNumberInput = ref; }}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col md={4}>
                                        <ControlLabel>
                                            Value
                                        </ControlLabel>
                                    </Col>
                                    <Col md={8}>
                                        <FormControl
                                            type="number"
                                            placeholder="0.00"
                                            onChange={e => {
                                                if (e.target.value < 0) {
                                                    this.addValueInput.value = 0;
                                                }
                                            }}
                                            inputRef={(ref) => { this.addValueInput = ref; }}
                                        />
                                    </Col>
                                </FormGroup>
                            </Form>
                            <Col mdOffset={9} md={3}>
                                <Button onClick={this._addValueToCard}>
                                    Add Value
                                </Button>
                            </Col>
                        </Panel>
                    </Col>
                </Panel>
            </SlimCol>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.currentUser.username,
        cards: state.passenger.cards.data,
        isFresh: state.passenger.cards.isFresh,
        selected: state.passenger.cards.selected,
        order: state.passenger.cards.order,
        error: state.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchMyCards,
        selectMyCard,
        sortMyCards,
        addNewCard,
        addValueToCard,
        removeCard,
        closeErrorMessage,
        showErrorMessage
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCards);

ManageCards.propTypes = {
    user: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired,
    isFresh: PropTypes.bool.isRequired,
    order: PropTypes.object.isRequired,
    fetchMyCards: PropTypes.func.isRequired,
    selectMyCard: PropTypes.func.isRequired,
    sortMyCards: PropTypes.func.isRequired,
    addNewCard: PropTypes.func.isRequired,
    addValueToCard: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    removeCard: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    closeErrorMessage: PropTypes.func.isRequired,
    showErrorMessage: PropTypes.func.isRequired,
};
