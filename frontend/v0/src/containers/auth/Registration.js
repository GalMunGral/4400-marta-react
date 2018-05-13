import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Panel, Col, Button, Form, FormGroup, ControlLabel, FormControl, PageHeader, Radio, Alert } from 'react-bootstrap';
import SlimCol from '../../components/SlimCol';
import FatCol from '../../components/FatCol';
import { closeErrorMessage, showErrorMessage } from '../../actions/error';
import { register } from '../../actions/auth';
import ErrorMessage from '../ErrorMessage';

class  Registraion extends Component {
    constructor(props) {
        super(props);
        this.usernameInput;
        this.emailInput;
        this.passwordInput;
        this.passwordInput2;
        this.createNewCardRadio;
        this.useExistingCardRadio;
        this.cardNumberInput;
        this._register = this._register.bind(this);
    }

    componentDidMount() {
        this.useExistingCardRadio.checked = true;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser.isLoggedIn) {
            nextProps.history.push('/login');
        }
    }

    _register() {
        if (this.passwordInput.value && this.passwordInput2.value
            && this.usernameInput.value
            && this.emailInput.value
            && this.passwordInput.value
            && (this.createNewCardRadio.checked || this.cardNumberInput.value)
        ) {
            const userInfo = {};
            userInfo.username = this.usernameInput.value;
            userInfo.email = this.emailInput.value;
            userInfo.password = this.passwordInput.value;
            userInfo.cardNo = this.useExistingCardRadio.checked
                                ? this.cardNumberInput.value
                                : null;
            if (this.passwordInput.value === this.passwordInput2.value) {
                if (this.emailInput.value.match(/^.+?@.+?\..+$/)) {
                    if (userInfo.cardNo === null || userInfo.cardNo.match(/^[0-9]{16}$/)) {
                        this.props.closeErrorMessage();
                        this.props.register(userInfo);
                    } else {
                        this.props.showErrorMessage("Incorrect Breezecard number! Time: " + new Date(), 1);
                    }
                } else {
                    this.props.showErrorMessage("Invalid email address! Time: " + new Date(), 1);
                }
            } else {
                this.props.showErrorMessage("Two passwords do not match! Time: " + new Date(), 1);
            }
        } else {
            this.props.showErrorMessage("Please fill out all fields! Time:" + new Date(), 1);
        }
    }

    render() {
        return (
            <div>
            <FatCol>
                <ErrorMessage/>
                <PageHeader>Registration</PageHeader>
            </FatCol>
            <SlimCol>
                <Panel>
                    <Form horizontal>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2} md={4}>
                                Username
                            </Col>
                            <Col sm={10} md={7}>
                                <FormControl
                                    placeholder="Username"
                                    inputRef={ref => { this.usernameInput = ref; }}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2} md={4}>
                                Email
                            </Col>
                            <Col sm={10} md={7}>
                                <FormControl
                                    placeholder="Email address"
                                    inputRef={ref => { this.emailInput = ref; }}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2} md={4}>
                                Password
                            </Col>
                            <Col sm={10} md={7}>
                                <FormControl
                                    type="password"
                                    placeholder="Password"
                                    inputRef={ref => { this.passwordInput = ref; }}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                          <Col componentClass={ControlLabel} sm={2} md={4}>
                                Confirm Password
                            </Col>
                            <Col sm={10} md={7}>
                                <FormControl
                                    type="password"
                                    placeholder="Confirm your password"
                                    inputRef={ref => { this.passwordInput2 = ref; }}
                                />
                            </Col>
                        </FormGroup>
                    </Form>
                    <Panel header="Breeze Card">
                        <Radio name="chooseCardType" inputRef={ ref => {
                            this.useExistingCardRadio = ref;
                        }}>
                          Use my existing Breeze Card
                        </Radio>
                        <Col>
                            <FormControl
                                placeholder="Card Number"
                                inputRef={ref => { this.cardNumberInput = ref; }}
                            />
                        </Col>
                        <Radio name="chooseCardType" inputRef={ ref => {
                            this.createNewCardRadio = ref;
                        }}>
                            Get a new Breeze Card
                        </Radio>
                    </Panel>
                    <Button bsStyle="primary" block onClick={this._register}>
                        Register
                    </Button>
                </Panel>
            </SlimCol>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        error: state.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        register,
        closeErrorMessage,
        showErrorMessage
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Registraion);

Registraion.propTypes = {
    register: PropTypes.func.isRequired,
    currentUser: PropTypes.any.isRequired,
    history: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    closeErrorMessage: PropTypes.func.isRequired,
    showErrorMessage: PropTypes.func.isRequired
};
