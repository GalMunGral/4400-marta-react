import React from 'react';
import { Grid, Col } from 'react-bootstrap';

const FatCol = ({ children }) => (
  <Grid>
    <Col md={1}/>
    <Col md={9}>{children}</Col>
    <Col md={1}/>
  </Grid>
);

export default FatCol;
