var express = require('express'),
		app = express(),
		port = process.env.PORT || 3000,
		mongoose = require('mongoose'),
		Customer = require('./models/customerModel'), //created model loading here
		bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CCASdb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./routes/ccasRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('CCAS RESTful API server started on: ' + port);

app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
});
