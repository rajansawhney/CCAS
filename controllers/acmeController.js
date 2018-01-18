'use strict';

var _ = require('lodash');

exports.get_order_id = function(req, res) {
	res.send("POST request with {api_key, model, carPackage}");
};

exports.create_an_order = function(req, res) {
	console.log("\n\n Request received by acme : \n " + JSON.stringify(req.body));
	console.log("API_key received -- " + req.body.api_key);
	// if api_key matches, then procees to generate order_id
	if(!req.body.api_key)
		res.send("API_key not found");
	else if(req.body.api_key === 'cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6'){
		const order_id = _.random(1000000,9999999,false); //random number between 1000000 and 9999999 (inclusive) 
		console.log("Order Id is -- " + order_id);
		res.send({order: _.toString(order_id)});	
	}
	else
		res.send("Unregistered API_key provided. Please verify the API_key");

};


