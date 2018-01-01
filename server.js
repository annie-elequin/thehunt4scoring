import express from 'express';
import axios from 'axios';
require('dotenv').config();


//This is the express app. It was called index.js in the tutorial, but was
//renamed to server.js to make a clearer distinction between it and src/index.js

var mongodb = require('mongodb');

const app = express();

app.use(express.static(`${__dirname}/client/build`));

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/client/public/index.html`);
});


app.get('/allphotos', (request, response) => {
  const token = process.env.USER_TOKEN;
  const pageId = process.env.PAGE_ID;


  axios.get('https://graph.facebook.com/' + pageId +
              '/feed?access_token=' + token + '&fields=picture,message,updated_time&limit=100')
         .then(res => {
           return response.send(res.data.data);
         })
         .catch(error => {
           return response.send('error');
         });
})

app.get('/allids', (request, response) =>{
  const uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DBPORT+'/'+process.env.DB;

  mongodb.MongoClient.connect(uri, function(err, db) {
    if(err){
      console.log(err);
      throw err;
    }

    var scores = db.collection('scores');

    //Return all documents in the selection
    scores.find({}).toArray().then(docs =>{
      response.send(docs);
    })
  });
})

//app.get('/newChallenge/:challenge/:score'){
//
//}

app.get('/getChallenges', (request, response) =>{
  const uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DBPORT+'/'+process.env.DB;

  mongodb.MongoClient.connect(uri, function(err, db) {
    if(err){
      console.log(err);
      throw err;
    }

    var challengeCollection = db.collection('challenges');

    //Return all documents in the selection
    challengeCollection.find({}).toArray().then(docs =>{
      response.send(docs);
    })
  });
})

app.get('/removeChallenge/:challenge', (request, response) =>{
  const challenge = request.params.challenge;

  //If passed an undefined challenge, the remove function will wipe the entire
  //collection. This if statement is all that stands between us and that dark day
  if(challenge){
    const uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DBPORT+'/'+process.env.DB;

    mongodb.MongoClient.connect(uri, function(err, db) {
      if(err){
        console.log(err);
        throw err;
      }

      var challengeCollection = db.collection('challenges');

      challengeCollection.remove(
        //Find documents with the challenge we're removing (should just be one)
        {_id: {$eq: challenge}},

        (err, result) => {
          if(err) throw err;
        }
      )
    });

    return response.send('challenge removed!');
  }
  else{
    response.send("No challenge received");
  }
})

app.get('/newChallenge/:challenge/:score', (request, response) =>{
  const challenge = request.params.challenge;
  const score = parseInt(request.params.score, 10);
  const time = new Date();

  const uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DBPORT+'/'+process.env.DB;

  const challengeDoc = {_id: challenge, challenge: challenge, score: score, date: time};

  mongodb.MongoClient.connect(uri, function(err, db) {
    if(err){
      console.log(err);
      throw err;
    }

    var challengeCollection = db.collection('challenges');

    challengeCollection.update(
      //Find documents with the same image id as the one we're updating
      {_id: {$eq: challenge}},
      //Replace them with the challenge information provided
      challengeDoc,
      //If the image hasn't already been scored, go ahead and insert its score
      {upsert: true},

      (err, result) => {
        if(err) response.send(err);
      }
    )
    console.log("Update ended");
  });

  return response.send('Got it!');
})

app.get('/scorePhoto/:photoId/:score/:team/:date', (request, response) =>{
  //Do DB stuff
  const id = request.params.photoId;
  const score = parseInt(request.params.score, 10);
  const team = request.params.team;
  const time = request.params.date;


  const uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DBPORT+'/'+process.env.DB;

  const scoreDoc = {_id: id, score: score, team: team, date: time};

  mongodb.MongoClient.connect(uri, function(err, db) {
    if(err){
      console.log(err);
      throw err;
    }

    var scores = db.collection('scores');

    scores.update(
      //Find documents with the same image id as the one we're updating
      {_id: {$eq: id}},
      //Replace them with the score information provided
      scoreDoc,
      //If the image hasn't already been scored, go ahead and insert its score
      {upsert: true},

      (err, result) => {
        if(err) throw err;

        if(result.nUpserted > 0){
          console.log("Inserted score!");
        }
        else{
          console.log("Updated score!");
        }
      }
    )
    console.log("Update ended");
  });

  return response.send('Got it!');
})

app.get('/login', (request, response) => {

  const uri = 'https://facebook.com/v2.11/dialog/oauth?' +
  'client_id=' + process.env.APP_ID +
  '&redirect_uri=https://www.facebook.com/connect/login_success.html';
//  '&state={optional-state-param}'
  axios.get(uri)
  .then(res =>{
    console.log(res);
    return response.sendFile(res.data);
  })
  .catch(error =>{
    console.log(error);
    return response.send(error);
  })

})

const listener = app.listen(process.env.PORT || 5000, () => {
  console.log(`Your app is listening on port ${listener.address().port}.`);
});
