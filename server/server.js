const express = require('express');
const PORT = 5001;
const app = express();
const apiRouter = require('./routers/apiRouter');
const passport = require('passport');
const { facebook_app_secret } = require('../secrets');
const FacebookStrategy = require('passport-facebook').Strategy;
const secret = require('../secrets');

app.use('/api', apiRouter, (req, res) => {
  console.log(res.locals.data);
  res.status(200).send(res.locals.data);
})

//initialize passport
app.use(passport.initialize());

//facebook strategy
passport.use(
  new FacebookStrategy({
    // options for the google strategy
    clientID: secret.facebook_app_id,
    clientSecret: secret.facebook_app_secret,
    callbackURL: '/facebooklogin/callback',
    profileFields: ['id', 'displayName'],
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(profile);
  // passport callback function
    // check if user already exists in DB
    // db.query(`SELECT * FROM users WHERE _id='${profile.id}'`)
    //   .then((user) => {
    //     // if the returned object's row property (an array) is empty, we know we're dealing with a new user
    //     if (user.rows.length) {
    //       done(null, user.rows[0]);
    //     // otherwise we want to add the user to our DB
    //     } else {
    //       const queryText = `INSERT INTO users (_id, username, skill, language, readyStatus) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    //       const queryParams = [profile.id, profile.displayName, 'Easy', 'Javascript', false];
    //       db.query(queryText, queryParams)
    //       .then((newUser) => {
    //         done(null, newUser.rows[0]);
    //       })
    //       .catch(err => console.log(err))
    //     }
    //   })
    //   .catch(err => console.log(err));
    }
));

//facebook login route
app.get('/facebooklogin', passport.authenticate('facebook', {session: false}));

//facebook callback
app.get('/facebooklogin/callback', passport.authenticate('facebook', {session: false}), (req, res) => {
  res.sendStatus(200);
})

app.use((err, req, res, next) => {
  let defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };

  let errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
});

app.listen(PORT, () => console.log(`🚀 Listening on PORT ${PORT}`));