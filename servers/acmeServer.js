var express = require('express'),
		app = express(),
		port = 3050,
		bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('../routes/acmeRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('ACME server started on: ' + port);

app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
});
