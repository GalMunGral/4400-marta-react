import React from 'react';
import SlimCol from './SlimCol';
import ErrorMessage from '../containers/ErrorMessage';
import { PageHeader, Panel, Button } from 'react-bootstrap';

const Dashboard = ({ header, options, exitCallback, error }) => (
  <SlimCol>
    <ErrorMessage error={error}/>
    <PageHeader>{header}</PageHeader>
    <Panel>
      {options.map(option => (
        <Button key={option.route} block onClick={option.callback}>
          {option.title}
        </Button>
      ))}
      <Button bsStyle="primary" block onClick={exitCallback}>
        Logout
      </Button>
    </Panel>
  </SlimCol>
);

export default Dashboard;