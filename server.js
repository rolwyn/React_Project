
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Import user model
const User = require('./models/user/User');

const mongo_uri = 'mongodb://localhost/db_myproj';

mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
    if (err) {
    throw err;
    } else {
    console.log(`Successfully connected to ${mongo_uri}`);
    }
});

const app = express();
const secret = 'mysecretsshhh'; //delete this and put it in external json. import from there

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/home', (req, res) => {
  res.send('Welcome to Home Page');
});

app.get('/api/secret', (req, res) => {
  res.send('We know your secrets!');
});

app.post('/api/register', (req, res) => {
  const {email, password} = req.body;
  const user = new User({ email, password });
  user.save((err) => {
    if (err) {
      res.status(500)
        .send('User already exists or Error registering new user please try again.');
    } 
    else {
      res.status(200)
        .send('Welcome, You are registered');
    }
  })
})

app.post('/api/authenticate', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(500)
        .json({
          error: 'Internal Server Error, Please try again'
        })
    } 
    else if (!user) {
      res.status(401)
      .json({
        error: 'Incorrect Email or Password'
      })
    }
    else {
      user.isCorrectPassword(password, (err, same) => {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal Server Error, Please try again'
            })
        }
        else if (!same) {
          res.status(401)
          .json({
            error: 'Incorrect Email or Password'
          })
        }
        else {
          //Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.sendStatus(200);
        }
      })
    }
  })
})

app.listen(process.env.PORT || 3000);