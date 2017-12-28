import React from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import NavBar from '../components/NavBar.js';
import axios from 'axios';
import Post from './Post';

const teams = ['thehunt3fire', 'thehunt3air', 'thehunt3water', 'thehunt3earth'];

export class ChallengePosts extends React.Component {

  render(){
    const images = this.props.images;
    const challenge = this.props.challenge;

    var picsOnly = [];
    for(var i = 0; i < images.length; i++){
        var matchExpression = new RegExp(challenge,'i');
        if(images[i].picture && images[i].message && images[i].message.match(matchExpression)){
          picsOnly.push(images[i]);
        }
    }

    const post = picsOnly.map((image) =>
        <li key={image.id}>
          <Post src={image.picture} message={image.message} id={image.id} />
        </li>
    );

    return (
      <div>
        <ul>
          {post}
        </ul>
      </div>
      )
  }
}

export default class ChallengePage extends React.Component {

  constructor(){
    super();
    //Bind the this keyword to the handleChange and handleSubmit,
    //Allowing the program to change state within them
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //Initialize a default state so that things won't break
    //when pulling data takes a bit
    this.state = {
      images: []
    };
  }

  handleChange(event) {
    this.setState({value: event.target.value.toLowerCase()});
  }

  handleSubmit(event) {
    var challenge = this.state.value;
    if (challenge && challenge.length > 0){
        this.setState({challenge: challenge});
    }
    else{
      this.setState({challenge: undefined});
    }
    event.preventDefault();
  }

  componentDidMount(){
    axios.get('/allphotos').then(res => {

      if (res == "error"){
        //Print message to the screen telling user what the error was
      }
      else{
        this.setState({images: res.data, challenge: 'none'});
      }
    });
  }

  render() {

		return (
        <div>
          <NavBar/>
          <form onSubmit={this.handleSubmit}>
            <label>
            Enter Challenge:
            <textarea value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <ChallengePosts images={this.state.images} challenge={this.state.challenge}/>
        </div>
		);
	}
}
