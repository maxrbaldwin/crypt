const Router = require('express').Router();
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const { fetchGithubUser } = require('@db');

/*
PASSPORT DOES:

*/

const clientID = 'cc58efa4d397ef8aee7c';
const clientSecret = 'ac87d8ab2deebb6e0331535d35b0caf22a3f6ae5';
const callbackURL = 'http://localhost:3000/auth/github/callback';

Router.use(passport.initialize());
Router.use(passport.session());

passport.use(
  new GitHubStrategy({
    clientID,
    clientSecret,
    callbackURL, 
  },
  async (accessToken, refreshToken, profile, cb) => {
    const parseGithubUser = prof => ({ id: profile.id, username: profile.username })
    const user = await fetchGithubUser(parseGithubUser(profile));
    return cb(false, user);
  }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});
// auth/github
Router.get('/auth/github', passport.authenticate('github'));
// auth/github/callback
Router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    const id = req.user.id;
    // Successful authentication, redirect home.
    res.redirect(`/api/v1/p/${id}`);
  }
);

module.exports = Router;