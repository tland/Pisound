var mongoose = require('mongoose')
  , User = mongoose.model('User')

exports.signin = function (req, res) {  
}

// auth callback
exports.authCallback = function (req, res, next) {
}

// login
exports.login = function (req, res) {
}

// sign up
exports.signup = function (req, res) {
}

// logout
exports.logout = function (req, res) {
}

// signout
exports.signout = function (req, res) {
  console.log(">>> logout");  
  console.log(req.session);
  req.logout()
  // Logout by clearing the session
  req.session.regenerate(function(err){
    // Generate a new csrf token so the user can login again
    // This is pretty hacky, connect.csrf isn't built for rest
    // I will probably release a restful csrf module
    // csrf.generate(req, res, function () {
      res.send({auth: false, _csrf: req.session._csrf});    
    //});
  });
}

// session
exports.session = function (req, res) {
  console.log(">>> session");
  console.log(req.session);
  // This checks the current users auth
  // It runs before Backbones router is started
  // we should return a csrf token for Backbone to use
  if(typeof req.session.passport.user !== 'undefined'){
    console.log(">> user authenticated");
    console.log(req.session);
    res.send({auth: true, 
      id: req.session.passport.user,
      access_token: req.session.id,
      username: req.session.username, 
      _csrf: req.session._csrf
    });
  } else {
    console.log(">> user not existing");
    res.send({auth: false, _csrf: req.session._csrf});
  }   
}

// signup
exports.create = function (req, res) {
  console.log(">>> create");
  console.log(req.session);
  console.log(req.body);
  var user = new User(req.body);
  user.provider = 'local';
  user.save(function (err) {
    if (err) {
      console.log(">> err");
      console.log(err);
      res.send({ errors: err.errors, user: user })
    }
      console.log(">> logged in");
      console.log(err);
      console.log(user);
    req.logIn(user, function(err) {
      if (err) return res.send({ errors: err.errors})
    })
  });

  console.log(">> success");
  console.log(req.session);

  // Login
  // Here you would pull down your user credentials and match them up
  // to the request
  req.session.username = req.body.username;
  res.send({auth: true, 
    id: req.session.passport.user,
    access_token: req.session.id,
    username: req.session.username});
}

// show profile
exports.show = function (req, res) {
  console.log(">>> show");
  console.log(req.profile)
  var user = req.profile
  res.send({
      username: user.name
    , user: user
  })
}