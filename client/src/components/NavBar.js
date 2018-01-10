import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

export default class NavBar extends React.Component {
  render(){
    return(

      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">#TheHunt4</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1}><Link to="/scoring">Score Posts</Link></NavItem>

          <NavDropdown eventKey={3} title="View Scored Posts" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>ALL DAYS</MenuItem>
                  <MenuItem divider />
            <MenuItem eventKey={3.2}>Day One</MenuItem>
            <MenuItem eventKey={3.3}>Day Two</MenuItem>
            <MenuItem eventKey={3.4}>Day Three</MenuItem>
            <MenuItem eventKey={3.5}>Day Four</MenuItem>
            <MenuItem eventKey={3.6}>Day Five</MenuItem>
          </NavDropdown>

          <NavDropdown eventKey={4} title="View Unscored Posts" id="basic-nav-dropdown">
            <MenuItem eventKey={4.1}>ALL DAYS</MenuItem>
                  <MenuItem divider />
            <MenuItem eventKey={4.2}>Day One</MenuItem>
            <MenuItem eventKey={4.3}>Day Two</MenuItem>
            <MenuItem eventKey={4.4}>Day Three</MenuItem>
            <MenuItem eventKey={4.5}>Day Four</MenuItem>
            <MenuItem eventKey={4.6}>Day Five</MenuItem>
          </NavDropdown>

          <NavItem eventKey={5}><Link to="/challenges/">Score A Challenge</Link></NavItem>
          <NavItem eventKey={6}><Link to="/allUnscored">View All Unscored Posts</Link></NavItem>
          <NavItem eventKey={7}><Link to="/unscoredByDate">Unscored By Day</Link></NavItem>
          <NavItem eventKey={8}><Link to="/addChallenge">Add New Challenges</Link></NavItem>
          <NavItem eventKey={9}><Link to="/userScores">View The Player Leaderboard</Link></NavItem>
          <NavItem eventKey={10}><Link to="/teamScores">View The Daily Score For Each Team</Link></NavItem>


        </Nav>
      </Navbar>

    );
  }
}
