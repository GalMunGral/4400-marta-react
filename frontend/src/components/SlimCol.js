import React from 'react';
import { Grid, Col } from 'react-bootstrap';

const SlimCol = ({ children }) => (
  <Grid>
    <Col md={3}/>
    <Col md={6}>{children}</Col>
    <Col md={3}/>
  </Grid>
)

export default SlimCol
