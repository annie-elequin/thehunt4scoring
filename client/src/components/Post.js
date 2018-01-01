import React from 'react';
import axios from 'axios';
import {Grid,Row,Col} from 'react-bootstrap';

const teams = ['thehunt3fire', 'thehunt3air', 'thehunt3water', 'thehunt3earth'];

function findChallenge(message, challengeList){

  var challenge = "none";

  //Find appropriate challenge

  return challenge;
}

export default class Post extends React.Component {

  constructor(){
    super();
    //Bind the this keyword to the handleChange and handleSubmit,
    //Allowing the program to change state within them
    this.handleBonusChange = this.handleBonusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //Initialize a default state so that things won't break
    //when pulling data takes a bit
    this.state = {bonus: 0, base: 0};
  }

  handleBonusChange(event) {
    this.setState({bonus: event.target.value});
  }

  handleSubmit(event) {
    var score = parseInt(this.state.bonus) + parseInt(this.state.base);
    var team = "none";


    for(var i = 0; i < teams.length; i++){
      var matchExpression = new RegExp(teams[i],'i');

      if(this.props.image.message.match(matchExpression)){
        team = teams[i];
        console.log("Team is ", teams[i]);
      }
    }

    const url = '/scorePhoto/' + this.props.image.id + "/" + score.toString() + '/' +
      team + "/" + this.props.image.updated_time;
    console.log(url);

    axios.get(url)
      .then(res => {
        //Tell the calling page that this component has been graded
        if(this.props.scoreHandler){
          this.props.scoreHandler(this.props.image.id);
        }
    });

    event.preventDefault();
  }


  render(){
    //Id is in a XXXXXXXX_XXXXXXXX format where the first number is the page
    //id and the second number is the post id.
    const postId = this.props.id.split('_')[1];
    const link = "https://www.facebook.com/groups/TheHunt3/permalink/" + postId;
    return(
      <div>
          <a href={link} target="_blank">
            <img src={this.props.src} alt={this.props.id}/>
          </a>
          <p>{this.props.message}</p>
          <form onSubmit={this.handleSubmit}>
            <label>
            Enter Bonus Points:
            <textarea value={this.state.bonus} onChange={this.handleBonusChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
      </div>
    );
  }
}
