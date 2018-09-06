/*  EXPRESS SETUP  */

const express = require('express');
const app = express();

app.get('/', (req, res) => res.sendFile('auth.html', { root : __dirname}));
app.get('/privacy', (req, res) => res.sendFile('privacy.html', { root : __dirname}));

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));

/*  PASSPORT SETUP  */

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("You have successfully logged in"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*  FACEBOOK AUTH  */

const FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_APP_ID = '254740235370990';
const FACEBOOK_APP_SECRET = '58460d489b455d6d2bef5ac388630803';

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
  }
));

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success');
  });

  /*  GITHUB AUTH  */

const GitHubStrategy = require('passport-github').Strategy;

const GITHUB_CLIENT_ID = "283749a55df87e515f68"
const GITHUB_CLIENT_SECRET = "d15b3a66f47ac79f8fe0eb2bd585499f7a9b0aab";

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
  }
));

app.get('/auth/github/',
  passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success');
  });

   /*  Google AUTH  */

// const GoogleStrategy = require('passport-google-oauth').Strategy;

// const GOOGLE_CLIENT_ID = "117086953488-qs31f60r87sr1mgktk7nl24s1cq9th0l.apps.googleusercontent.com"
// const GOOGLE_CLIENT_SECRET = "5i2V60Q1g3nBaxwCf0p7uK9C";

// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//       return cb(null, profile);
//   }
// ));

// app.get('/auth/google/',
//   passport.authenticate('google'));

// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/error' }),
//   function(req, res) {
//     res.redirect('/success');
//   });