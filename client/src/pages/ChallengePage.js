import React from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import Post from '../components/Post';
import NavBar from '../components/NavBar.js';


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
          <Post image={image} challengeList={this.props.challengeList}/>
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
      images: [],
      challenge: "none",
      challengeList: {}
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

    const challenges = {};
    var entryList = [];

    //Get the ids of all graded images
    axios.get('/getChallenges')
    .then( res => {
      entryList = res.data;

      for(var i = 0; i < entryList.length; i++){
        challenges[entryList[i].challenge] = entryList[i].score;
      }
      this.setState({challengeList: challenges});
    })

    .catch( err => {
      console.log(err);
      throw err;
    });

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
          <ChallengePosts images={this.state.images} challenge={this.state.challenge}
              challengeList={this.state.challengeList}/>
        </div>
		);
	}
}
