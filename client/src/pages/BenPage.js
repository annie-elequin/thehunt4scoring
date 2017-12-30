import React from 'react';
import ReactDOM from 'react-dom';
import {Grid,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import Post from '../components/Post';
import NavBar from '../components/NavBar.js';

const teams = ['#thehunt3fire', '#thehunt3air', '#thehunt3water', '#thehunt3earth'];

export class UnscoredPosts extends React.Component {

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

  //This keeps the list of ids updated
  handlePostScored(id){
    var ids = this.state.ids;
    ids[id] = true;
    this.setState({ids:ids});
  }

  render(){
    const images = this.props.images;

    var picsOnly = [];
    const ids = this.state.ids;

    console.log(ids);

    //Filter to find only pictures that haven't been graded yet
    for(var i = 0; i < images.length; i++){
        console.log(images[i].id);
        if(images[i].picture && images[i].id && !(images[i].id in ids)){
          picsOnly.push(images[i]);
        }
    }

    const post = picsOnly.map((image) =>
        <li key={image.id}>
          <Post src={image.picture} message={image.message} id={image.id} scoreHandler={this.handlePostScored}/>
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

export default class BenPage extends React.Component {

  constructor(){
    super();
    //Initialize a default state so that things won't break
    //when pulling data takes a bit
    this.state = {
      images: []
    };
  }

  componentDidMount(){

  /*axios.get('/login').then( res => {
    console.log(res)
  })
  .error( err => {
    console.log(err);
  });  */




    axios.get('/allphotos').then(res => {

      if (res == "error"){
        //Print message to the screen telling user what the error was
        alert("there was an error");
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
          <UnscoredPosts images={this.state.images}/>
        </div>
		);
	}
}
