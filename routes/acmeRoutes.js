'use strict';
module.exports = function(app) {
	var acme = require('../controllers/acmeController');

	// ACME Routes
	/* Customer */
	app.route('/acme/api/v45.1/order')
		.get(acme.get_order_id) // get order
		.post(acme.create_an_order); // post order

};

