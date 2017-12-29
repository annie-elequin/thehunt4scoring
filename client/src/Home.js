import React from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import NavBar from './NavBar.js';
import Scores from './Scores.js';






export default class Home extends React.Component {
	render() {
		return (
        <div>
          <Grid>
          <NavBar/>
            <Row>
              <Scores/>
            </Row>
          </Grid>
        </div>
		);
	}
}
