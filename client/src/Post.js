import React from 'react';
import axios from 'axios';
import {Grid,Row,Col} from 'react-bootstrap';

const teams = ['thehunt3fire', 'thehunt3air', 'thehunt3water', 'thehunt3earth'];

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

      if(this.props.message.match(matchExpression)){
        team = teams[i];
        console.log("Team is ", teams[i]);
      }
    }

    const url = '/scorePhoto/' + this.props.id + "/" + score.toString() + '/' + team;
    console.log(url);

    axios.get(url)
      .then(res => {
        //Tell the calling page that this component has been graded
        if(this.props.scoreHandler){
          this.props.scoreHandler(this.props.id);
        }
    });

    event.preventDefault();
  }


  render(){
    return(
      <div>
          <img src={this.props.src} alt={this.props.id}/>
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
