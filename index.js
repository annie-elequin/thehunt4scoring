import express from 'express';
import axios from 'axios';

var mongodb = require('mongodb');

const app = express();

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});


app.get('/allphotos', (request, response) => {
  const token = process.env.USER_TOKEN;
  const pageId = process.env.PAGE_ID;


  axios.get('https://graph.facebook.com/' + pageId +
              '/feed?access_token=' + token + '&fields=picture,message')
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

app.get('/scorePhoto/:photoId/:score/:team', (request, response) =>{
  //Do DB stuff
  const id = request.params.photoId;
  const score = parseInt(request.params.score);
  const team = request.params.team;
  const time = new Date();


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

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}. 🚢`);
});
