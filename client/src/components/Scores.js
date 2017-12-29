import React from 'react';
import {Jumbotron,Panel,Grid,Row,Col} from 'react-bootstrap';

export default class Scores extends React.Component {
  render(){
    
    const earth=(
      <h3 className="text-center">Earth</h3>
    );
    const water=(
      <h3 className="text-center">Water</h3>
    );
    const fire=(
      <h3 className="text-center">Fire</h3>
    );
    const air=(
      <h3 className="text-center">Air</h3>
    );
    
    return(
      
      <Jumbotron className="container-fluid">
      
        <Grid>
          <Row>
      
            <Col sm={6} md={3}>
              <Panel header={earth} bsStyle="success">
                <h1 className="text-center">00</h1>
              </Panel>
            </Col>
      
            <Col sm={6} md={3}> 
              <Panel header={water} bsStyle="info">
                <h1 className="text-center">00</h1>
              </Panel>
            </Col>
      
            <Col sm={6} md={3}>
              <Panel header={fire} bsStyle="danger">
                <h1 className="text-center">00</h1>
              </Panel>
            </Col>
      
            <Col sm={6} md={3}>
              <Panel header={air} bsStyle="warning">
                <h1 className="text-center">00</h1>
              </Panel>
            </Col>
      
          </Row>
        </Grid>
      
      </Jumbotron>
      
    );
  }
}