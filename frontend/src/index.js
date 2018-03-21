// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


import React from 'react';
import { render } from 'react-dom';
import { configureStore, history } from './store/configureStore';
import Root from './containers/Root';
// import bootstrap from 'bootstrap'
import './assets/stylesheets/base.scss';

const store = configureStore();

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
