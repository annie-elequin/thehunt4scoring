import React from 'react';
import NavBar from '../components/NavBar.js';
import axios from 'axios'

export class ChallengeList extends React.Component{

  render(){
    //Take each challenge and make a table row from it
    const challenges = this.props.challenges;

    const challengeElement = Object.keys(challenges).map((challengeKey) =>
        <tr key={challengeKey}>
          <td>{challengeKey}</td>
          <td>{challenges[challengeKey]}</td>
          <td><input type="button" value="Delete" class="delete"
            onClick={() => this.props.removeRow(challengeKey)}/></td>
        </tr>
    );

    return(
      <table>
      <tr>
        <th>Challenge</th>
        <th>Score</th>
        <th></th>
      </tr>
      {challengeElement}
      </table>
    );
  }
}

export default class AddChallengePage extends React.Component {
  constructor(){
    super();

    this.handleChallengeChange = this.handleChallengeChange.bind(this);
    this.handleScoreChange = this.handleScoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeRow = this.removeRow.bind(this);

    this.state  = {currentChallenge: "", currentScore: 0, challenges: {}};
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
      this.setState({challenges: challenges});
    })

    .catch( err => {
      console.log(err);
      throw err;
    });
  }

  handleChallengeChange(event){
    var challenge = event.target.value;

    //Strip hashtags from input to ensure consistency in labeling
    if(challenge && challenge[0] === "#"){
      challenge = challenge.slice(1,challenge.length);
    }

    this.setState({currentChallenge: challenge})
  }

  handleScoreChange(event){
    this.setState({currentScore: event.target.value});
  }

  handleSubmit(event){
    const challenge = this.state.currentChallenge;
    if(challenge){

      const score = this.state.currentScore;

      var url = '/newChallenge/' + challenge + '/' + score;

      //Make the database call to add or update the challenge
      axios.get(url)
      .then( res => {
        console.log(res)
      })
      .catch( err =>{
        console.log(err);
        throw err;
      });

      //Add or update the challenge within the table being displayed
      var challenges = this.state.challenges;
      console.log("challenges were:", challenges);
      challenges[challenge] = score;
      this.setState({challenges: challenges});
      console.log("Now challenges are ", this.state.challenges);
    }

    //Don't refresh page, that would be silly
    event.preventDefault();
  }

  removeRow(challenge){
    console.log("Remove Row Called");

    if(challenge){

      var url = '/removeChallenge/' + challenge;

      //Make database call to remove the challenge
      axios.get(url)
      .then( res => {
        console.log(res)
      })
      .catch( err =>{
        console.log(err);
        throw err;
      });

      //Remove the challenge from the list currently displayed
      var newChallenges = this.state.challenges;
      delete newChallenges[challenge];

      this.setState({challenges: newChallenges});
    }
  }

  render() {
		return (
        <div>
          <NavBar/>
          <form onSubmit={this.handleSubmit}>
            <label>
            Enter New Challenge:
            <input type="text" name="challengeBox"
              value={this.state.currentChallenge} onChange={this.handleChallengeChange} />
            </label>
            <label>
            Enter Score:
            <input type="number" name="scoreBox"
              value={this.state.currentScore} onChange={this.handleScoreChange} />
            </label>

            <input type="submit" value="Submit" />
          </form>
          <ChallengeList challenges={this.state.challenges} removeRow={this.removeRow}/>
        </div>
		);
	}
}
