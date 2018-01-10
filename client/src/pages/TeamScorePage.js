import React from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar.js';
import {fbToJsDate} from '../dateHandling.js';

export class OneDayScore extends React.Component{

  render(){
    return(
      <p>{this.props.date} : {this.props.score}</p>
    );
  }

}

export class TeamPosts extends React.Component{

  render(){

    var scoreByDate = {};

    console.log("Posts for ", this.props.team, this.props.posts);

    this.props.posts.forEach((post) =>{
      //Have to convert to a date object to get all those nice date features
      const jsDate = fbToJsDate(post.date);
      const date = jsDate.getMonth() + "/" + jsDate.getDate() +
                  "/" + jsDate.getFullYear();

      console.log("Score by date  for ", this.props.team, " was ", scoreByDate);
      if (date in scoreByDate){
        scoreByDate[date] += post.score;
      }
      else{
        scoreByDate[date] = post.score;
      }
      console.log("ScoreByDate is now ", scoreByDate);
    });

    var testElement = <p> testTag </p>;

    var DaysElement = Object.keys(scoreByDate).map((teamDay) =>
      <li key={teamDay}>
        <OneDayScore date={teamDay} score={scoreByDate[teamDay]} />
      </li>
    );

    console.log("testElement", testElement);
    console.log("DaysElement ", DaysElement);

    return(
      <div>
        <b>Team {this.props.team}</b>
        <ul>
          {DaysElement}
        </ul>
      </div>
    );
  }



}

export default class TeamScorePage extends React.Component {

  constructor(){
    super();
    this.state = {postData: {fire: [], water: [], earth: [], air: []}};
  }

  componentDidMount(){

    var postData = {fire: [], water: [], earth: [], air: []};

    axios.get('/scoredPosts')
    .then( res => {
      res.data.forEach((post) => {
        if(post.team == "thehunt3fire"){
          postData.fire.push(post);
        }
        else if (post.team == "thehunt3water") {
          postData.water.push(post);
        }
        else if (post.team == "thehunt3earth"){
          postData.earth.push(post);
        }
        //Note, this is an elif instead of an else because we don't want air to
        //get points for all posts that don't specify a team
        else if (post.team == "thehunt3air"){
          postData.air.push(post);
        }
      });

    this.setState({postData: postData});

    })
    .catch( err => {
      console.log(err);
      throw err;
    });
  }

  render(){

    console.log("state postData", this.state.postData);

    return(
      <div>
        <NavBar/>
        <TeamPosts posts={this.state.postData.fire} team="fire"/>
        <TeamPosts posts={this.state.postData.water} team="water"/>
        <TeamPosts posts={this.state.postData.earth} team="earth"/>
        <TeamPosts posts={this.state.postData.air} team="air"/>
      </div>
    );
  }
}
