import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer.js';

export default function Root({ store }) {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
