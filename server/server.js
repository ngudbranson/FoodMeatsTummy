const express = require('express');
const path = require('path');
const parser = require('body-parser');
const PORT = 3000;
const db = require('../db/db.js');

const app = express();

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(parser.json());
app.use(parser.urlencoded({
  extended: true,
}));
app.use(allowCrossDomain);

// a very naive solution that essentially only allows one user to be accessing 
// the service at any given time
const profileInfo = {
  name: '',
  favMeal: '',
  employment: '',
  dietaryRestrictions: '',
};

const answers = {}

app.post('/api/name', (req, res) => {
  profileInfo['name'] = req.body.result;
  res.send('Post received');
});

app.post('/api/fav_meal', (req, res) => {
  profileInfo['favMeal'] = req.body.result;
  res.send('Post received');
});

app.post('/api/job', (req, res) => {
  profileInfo['employment'] = req.body.result;
  res.send('Post received');
});

app.post('/api/dietary_restrictions', (req, res) => {
  profileInfo['dietaryRestrictions'] = req.body.result;
  res.send('Post received');
});

app.post('/questionnaire/:id', (req, res) => {
  answers[`question${req.body.id}`] = req.body.result;
  res.send('Post received');
});

app.get('/api/current_user', (req, res) => {
  res.send(profileInfo.name);
});

app.get('/api/current_answers', (req, res) => {
  db.getRecommendations((err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.use(express.static(path.join(__dirname, '../public')));