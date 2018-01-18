var express = require('express'),
		app = express(),
		port = process.env.PORT || 3000,
		mongoose = require('mongoose'),
		Customer = require('../models/customerModel'), //created model loading here
		Order = require('../models/orderModel'),
		Supplier = require('../models/supplierModel'),	
		bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CCASdb')
/*
mongoose.connect('mongodb://localhost/CCASdb', function() {})
	.then( () => {
			console.log("Connected to CCASdb");
	})
	.catch( err => {
		console.error("Unable to connect to CCASdb. Check if MongoDB instance is running" +
								"\nRun mongodb instance in another terminal using: mongod and test" +
								"\n\nError:\n", err.stack);
	});
*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('../routes/ccasRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('CCAS server started on: ' + port);

app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
});
