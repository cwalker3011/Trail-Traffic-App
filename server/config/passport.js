const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const secret = require('../../secrets');

passport.use(
  new FacebookStrategy({
    // options for the google strategy
    clientID: secret.facebook_app_id,
    clientSecret: secret.facebook_app_secret,
    callbackURL: '/auth/facebook/redirect',
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