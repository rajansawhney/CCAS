'use strict';

var _ = require('lodash');

exports.get_nonce_token = function(req, res){
	console.log("\n\nrequest received : \n " + JSON.stringify(req.query.storefront));	
	console.log("\n\nStorefront received -- " + req.query.storefront);
	if(!req.query.storefront)
		res.send("Kindly input the storefront to receive the nonce_token");
	else if(req.query.storefront === 'ccas-bb9630c04f')
	{
		res.send( { nonce_token: 'ff6bfd673ab6ae03d8911' } );
	}
	else
		res.send("Incorrect storefront provided. Please verify the storefront");
};

exports.get_order_id = function(req, res) {
	res.send("POST request with {token, model, carPackage}");
};

exports.create_an_order = function(req, res) {
	console.log("\n\nRequest received by rts : \n " + JSON.stringify(req.body));
	console.log("Token received -- " + req.body.token);
	if(!req.body.token)
		res.send("Token not found");
	else if(req.body.token === 'ff6bfd673ab6ae03d8911') {
		const order_id = _.random(1000000,9999999,false); //random number between 1000000 and 9999999 (inclusive) 
		console.log("Order Id is -- " + order_id);
		res.send( { order_id : _.toString(order_id) } );	
	}
	else
		res.send("Incorrect token provided. Please verify the token or request the token again");
};


