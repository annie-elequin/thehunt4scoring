import React from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import NavBar from '../components/NavBar.js';
import Scores from '../components/Scores.js';






export default class Home extends React.Component {
	render() {    
		return (
        <div>
      

      
          <NavBar/>
      
          <Grid>
      
            <Row>
              <Scores/>
            </Row>
      
          </Grid>
      
        </div>
		);
	}
}