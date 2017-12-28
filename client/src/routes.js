import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Home from './pages/Home.js';
import ScoringPage from './pages/ScoringPage.js';
import BenPage from './pages/BenPage.js';
import ChallengePage from './pages/ChallengePage.js'


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
