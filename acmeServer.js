var express = require('express'),
		app = express(),
		port = 3051,
//		mongoose = require('mongoose'),
		/*
		Customer = require('./models/customerModel'), //created model loading here
		Order = require('./models/orderModel'),
		Supplier = require('./models/supplierModel'),	
		*/
		bodyParser = require('body-parser');

// mongoose instance connection url connection
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/CCASdb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./routes/acmeRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('ACME server started on: ' + port);

app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
});
