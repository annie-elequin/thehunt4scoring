import React from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import NavBar from './NavBar.js';
import SinglePost from './SinglePost.js';


const posts = {
  one:{from: "Annie", message: "hello"},
  two:{from: "Ben", message: "this is ben"}
}

export default class ScoringPage extends React.Component {

  constructor(){
    super();
    this.state = {
      src: "https://www.what-dog.net/Images/faces2/scroll0015.jpg",
      name: "Annie",
      message: "hello world"
    }
  }

	render() {
		return (
        <div>
          <NavBar/>
          hi there
          <SinglePost src={this.state.src} name={this.state.name} message={this.state.message}/>
        </div>
		);
	}
}
