'use strict';
module.exports = function(app) {
	var rts = require('../controllers/rtsController');

	// RTS Routes

	app.route('/rainier/v10.0/nonce_token')
		.get(rts.get_nonce_token) // get nonce token 

	app.route('/rainier/v10.0/request_customized_model')
		.post(rts.create_an_order); // post order

};

