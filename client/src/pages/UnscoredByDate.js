import React from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import NavBar from '../components/NavBar.js';
import Post from '../components/Post';

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
    axios.get('/allids')
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
        const photoDate = images[i].updated_time;
        if(images[i].picture && photoDate < endDate && photoDate >= startDate &&
            images[i].id && !(images[i].id in ids)){
          picsOnly.push(images[i]);
        }
    }

    const post = picsOnly.map((image) =>
        <li key={image.id}>
          <Post src={image.picture} message={image.message} id={image.id}
            scoreHandler={this.handlePostScored}/>
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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //Initialize a default state so that things won't break
    //when pulling data takes a bit
    this.state = {
      images: []
    };
  }

  handleStartChange(event) {
    this.setState({start: new Date(event.target.value)});
  }
  handleEndChange(event){
    this.setState({end: new Date(event.target.value)});
  }

  handleSubmit(event) {
    this.setState({start: this.state.start});
    this.setState({end: this.state.end});

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
            <input type="date" name="startDate" value={this.state.start} onChange={this.handleStartChange} />
            <input type="date" name="endDate" value={this.state.end} onChange={this.handleEndChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <UnscoredDatePosts images={this.state.images} challenge={this.state.challenge}
            start = {this.state.start} end = {this.state.end} />
        </div>
		);
	}
}
