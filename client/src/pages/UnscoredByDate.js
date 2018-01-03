import React from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import NavBar from '../components/NavBar.js';
import Post from '../components/Post.js';
import {htmlToJsDate, fbToJsDate} from '../dateHandling.js'

const teams = ['thehunt3fire', 'thehunt3air', 'thehunt3water', 'thehunt3earth'];

export class UnscoredDatePosts extends React.Component {

  constructor(){
    super();

    this.handlePostScored = this.handlePostScored.bind(this);
    this.state = {ids: {}};

  }

  componentDidMount(){
    //I wish this could be a set, but we'll have to hack around with an object
    const ids = {};
    var entryList = [];

    //Get the ids of all graded images
    axios.get('/scoredPosts')
    .then( res => {
      entryList = res.data;

      for(var i = 0; i < entryList.length; i++){
        //Store all the ids as keys in an object to get constant time lookup
        //ideally there would be a set object to save a byte per entry, but
        //we can't always get what we want
        ids[entryList[i]._id] = true;
      }
      this.setState({ids: ids});
    })
    .catch( err => {
      console.log(err);
    });
  }

  handlePostScored(id){
    var ids = this.state.ids;
    ids[id] = true;
    this.setState({ids:ids});
  }



  render(){
    const images = this.props.images;
    const startDate = this.props.start;
    const endDate = this.props.end;
    const ids = this.state.ids;

    var picsOnly = [];
    for(var i = 0; i < images.length; i++){
        const photoDate = fbToJsDate(images[i].updated_time);

        if(images[i].picture && photoDate < endDate && photoDate >= startDate &&
            images[i].id && !(images[i].id in ids)){
          picsOnly.push(images[i]);
        }
    }

    const post = picsOnly.map((image) =>
        <li key={image.id}>
          <Post image={image} scoreHandler={this.handlePostScored}
            challengeList={this.props.challengeList}/>
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

export default class UnscoredByDatePage extends React.Component {

  constructor(){
    super();
    //Bind the this keyword to the handleChange and handleSubmit,
    //Allowing the program to change state within them
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //Initialize a default state so that things won't break
    //when pulling data takes a bit
    this.state = {
      images: [],
      challengeList: {}
    };
  }

  handleStartChange(event) {
    const date = event.target.value;
    //Convert from 2017-010-31 to [2017, 10, 31]
    const jsDate = htmlToJsDate(date);

    this.setState({start: jsDate, formStart: date});
  }
  handleEndChange(event){
    const date = event.target.value;
    //Convert from 2017-010-31 to [2017, 10, 31]
    const jsDate = htmlToJsDate(date);

    this.setState({end: jsDate, formEnd: date});
  }

  handleSubmit(event) {
    this.setState({start: this.state.start});
    this.setState({end: this.state.end});

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
        this.setState({images: res.data});
      }
    });
  }

  render() {

		return (
        <div>
          <NavBar/>
          <form onSubmit={this.handleSubmit}>
            <label>
            Start Date:
            <input type="date" name="startDate" value={this.state.formStart} onChange={this.handleStartChange} />
            </label>
            <label>
            End Date:
            <input type="date" name="endDate" value={this.state.formEnd} onChange={this.handleEndChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <UnscoredDatePosts images={this.state.images} challenge={this.state.challenge}
            start = {this.state.start} end = {this.state.end}  challengeList={this.state.challengeList}/>
        </div>
		);
	}
}
