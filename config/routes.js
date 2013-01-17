
var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , async = require('async')

module.exports = function (app, passport, auth) {

  // user routes
  var users = require('./modules/user')
  //app.get('/api/login', users.login)
  //app.get('/api/signup', users.signup)
  //app.get('/api/signout', users.logout)
  app.post('/api/users', users.create)
  app.post('/api/users/session', passport.authenticate('local', {failureFlash: 'Invalid email or password.'}), users.session)
  app.delete('/api/users/session/:sessionId', users.signout)
  app.get('/api/users/:userId', users.show)
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email', 'user_about_me'], failureRedirect: '/login' }), users.signin)
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), users.authCallback)
  app.get('/auth/github', passport.authenticate('github', { failureRedirect: '/login' }), users.signin)
  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), users.authCallback)
  app.get('/auth/twitter', passport.authenticate('twitter', { failureRedirect: '/login' }), users.signin)
  app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), users.authCallback)
  app.get('/auth/google', passport.authenticate('google', { failureRedirect: '/login', scope: 'https://www.google.com/m8/feeds' }), users.signin)
  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', scope: 'https://www.google.com/m8/feeds' }), users.authCallback)

  app.param('userId', function (req, res, next, id) {
    User
      .findOne({ _id : id })
      .exec(function (err, user) {
        if (err) return next(err)
        if (!user) return next(new Error('Failed to load User ' + id))
        req.profile = user
        next()
      })
  })

  // dish routes
  var dishes = require('./modules/dish');
  app.get('/dishes', dishes.findAll);
  app.get('/dishes/:id', dishes.findById);
  app.post('/dishes', dishes.addDish);
  app.put('/dishes/:id', dishes.updateDish);
  app.delete('/dishes/:id', dishes.deleteDish);

  app.get('/test', function(req, res) {
    console.log("hello world");
    console.log(req.route);
  })

  // home route
  //app.get('/', index)

}
