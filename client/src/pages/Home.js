import React from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import NavBar from '../components/NavBar.js';
import Scores from '../pages/Scores.js';

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
