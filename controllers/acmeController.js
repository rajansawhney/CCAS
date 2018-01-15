'use strict';

var _ = require('lodash');

exports.get_order_id = function(req, res) {
	res.send("POST request with {api_key, model, package}");
};

exports.create_an_order = function(req, res) {
	var order_id = _.random(100,999,false); //random number between 100 and 99 (inclusive) 
	console.log("Order Id is -- " + order_id);
	console.log("API_key received -- " + req.body.api_key);
	if(req.body.api_key === 'cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6')
		res.send({order: _.toString(order_id)});	
	else
		res.send("Unregistered API_key provided. Please verify the API_key");

};


