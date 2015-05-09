/**
 * Created by abhiroop on 5/6/14.
 * Modified by syndbg.
 */

'use strict';

var express = require('express'),
  path = require('path'),
  passport = require('passport'),
  morgan = require('morgan'),
  compress = require('compression'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  LocalStrategy = require('passport-local').Strategy,
  serverStatic = require('serve-static'),
  FIFA = require('./fifa').FIFA;

var USERS = [{username: 'admin', password: 'admin'}];

var getUser = function(username, password) {
  for (var user of USERS) {
    if (user.username === username && user.password === password) {
      return user;
    }
  }
  return null;
};


var app = express();
app.use(morgan());
app.use(compress());
app.use(bodyParser());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.use(methodOverride());
app.use(cookieParser());

app.use(session({
  secret: 'almvnirtgd#$DFsa25452*AYD*D*S!@!#adsda))Ddsadsax',
  cookie: {httpOnly: true, secure: false, maxAge: 86400000},
  store: new session.MemoryStore()
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(function(username, password, done) {
  var user = getUser(username, password);
  if (user !== null) {
    done(null, user);
  } else {
    done(null, false, {msg: 'Incorrect username or password'});
  }
}));



app.use('/', serverStatic(path.join(__dirname, '/app')));

var isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send({
      msg: 'Please login to access this information'
    }, 400);
  }
};

app.get('/api/team', function(req, res) {
  res.send(FIFA.TEAMS_LIST);
});

app.post('/api/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send({loginStatus: false, msg: 'Unable to login'}, 400);
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.send({msg: 'Error logging in', err: err}, 500);
      }
      return res.send({loginStatus: true, user: user});
    });
  })(req, res, next);
});


app.post('/api/register', function(req, res, next) {
  var message = 'Registered';
  var givenUsername = req.body.username;
  var givenPassword = req.body.password

  if (!(givenUsername && givenPassword)) {
    res.send({msg:'Unable to register. You must provide an username and password'}, 400);
    return next();
  }
  for (var user of USERS) {
    if (user.username === givenUsername) {
      res.send({msg:'Unable to register. An user with the given username already exists'}, 400);
      return next();
    }
  }
  USERS.push({username: givenUsername, password: givenPassword});
  res.send({msg: 'Registered username: ' + givenUsername}, 201);
});


app.get('/api/session', isLoggedIn, function(req, res) {
  res.send({
    loginStatus: true,
    user: req.user
  });
});

app.get('/api/team/:code', isLoggedIn, function(req, res) {
  var code = req.params.code;
  res.send(FIFA.TEAM_DETAILS[code]);
});

app.get('/api/logout', function(req, res) {
  req.logout();
  res.redirect('/#/login');
});

var port = process.env.PORT || 8000;
app.listen(port);
console.log('Please go to http://localhost:' + port);
