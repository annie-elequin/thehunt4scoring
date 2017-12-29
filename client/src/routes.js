import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Home from './Home.js';
import ScoringPage from './ScoringPage.js';
import BenPage from './BenPage.js';
import ChallengePage from './ChallengePage.js'


export default class Routes extends React.Component {
	render() {
		return (
			<HashRouter>
				<div>
					<Route exact path="/" component={Home} />
					<Route exact path="/scoring" component={ScoringPage} />
      		<Route exact path="/test" component={BenPage} />
          <Route path='/challenges' component={ChallengePage} />

				</div>
			</HashRouter>
		);
	}
}
