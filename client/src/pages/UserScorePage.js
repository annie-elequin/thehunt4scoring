import React from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar.js';

export class UserScore extends React.Component {

  render(){

    return(
      <tr>
        <td> {this.props.user} </td>
        <td> {this.props.score} </td>
      </tr>
    );
  }
}

export default class UserScorePage extends React.Component {

  constructor(){
    super();
    this.state = {idToUser: {}, idToScore: {}};
  }

  componentDidMount(){

    var postList = [];
    //We track score by user id instead of user name because the former is unique
    //while the latter is not
    var idToScore = {};
    var idToUser = {};

    axios.get('/scoredPosts')
    .then( res => {
      postList = res.data;

      console.log("postList", postList);
      //Find each user's total
      for(var i = 0; i < postList.length; i++){
        var id = postList[i].userId;
        //Create id to user mapping if it doesn't exist
        if(!(id in idToUser)){
          idToUser[id] = postList[i].name;
          idToScore[id] = postList[i].score;
        }
        else{
          idToScore[id] += postList[i].score;
        }
      }

      this.setState({idToScore: idToScore, idToUser: idToUser});
    })
    .catch( err => {
      console.log(err);
      throw err;
    });

  }

  render(){

    const idToScore = this.state.idToScore;
    const idToUser = this.state.idToUser;

    var scores = [];

    const ids = Object.keys(idToScore);
    for(var i = 0; i < ids.length; i++){
      const id = ids[i];
      scores.push({id: id, score: idToScore[id]});
    }

    scores.sort((a,b) => {return b.score - a.score});

    const UsersElement = scores.map((userScore) =>
        <UserScore user={idToUser[userScore.id]} score={userScore.score} />
    );

    return(
      <div>
        <NavBar/>
        <table>
          <tr>
            <th> User: </th>
            <th> Score: </th>
          </tr>
          {UsersElement}
        </table>
      </div>

    );
  }
}
