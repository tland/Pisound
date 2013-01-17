module.exports = function(options) {
	var express = require('express')
		, fs = require('fs')
		, passport = require('passport');		

	var app = express();

	// Load configurations
	var env = process.env.NODE_ENV || 'development'
	  , config = require('./config/config')[env]
	  , auth = require('./config/middlewares/authorization')
	  , mongoose = require('mongoose')

	// Bootstrap db connection
	mongoose.connect(config.db)

	// Bootstrap models
	var models_path = __dirname + '/config/models'
	fs.readdirSync(models_path).forEach(function (file) {
	  require(models_path+'/'+file)
	})

	// bootstrap passport config
	require('./config/passport')(passport, config)

	var app = express()
	// express settings
	require('./config/express')(app, config, passport)

	// Bootstrap routes
	require('./config/routes')(app, passport, auth)

	// Start the app by listening on <port>
	var port = process.env.PORT || 8000

	app.listen(port);
	console.log('Express listening on port '+ port);

	return app;
};
