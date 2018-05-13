import React, { Component } from 'react';
import { connect } from 'react-redux';
import { testAction } from '../actions/testActions';

const Container = ({ callback, value }) => (
  <div>
    <button onClick={callback}>
      click
    </button>
    <p>{value}</p>
  </div> 
)

const mapStateToProps = state => ({
  value: state.val
})

const mapDispatchToProps = dispatch => ({
  callback: () => dispatch(testAction(Math.random()))
})

let TestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)

export default TestContainer;
