import React from 'react';
import { Grid, Col } from 'react-bootstrap';

const FatCol = ({ children }) => (
  <Grid>
    <Col md={2}/>
    <Col md={8}>{children}</Col>
    <Col md={2}/>
  </Grid>
);

export default FatCol;
