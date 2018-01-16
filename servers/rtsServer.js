var express = require('express'),
		app = express(),
		port = 3051,
		bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('../routes/rtsRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('RTS server started on: ' + port);

app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
});
