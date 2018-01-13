'use strict';
module.exports = function(app) {
	var ccas = require('../controllers/ccasController');

	// CCAS Routes
	app.route('/customer')
		.get(ccas.list_all_customers)
		.post(ccas.create_a_task);


	app.route('/customer/:customerId')
		.get(ccas.read_a_task)
		.put(ccas.update_a_task)
		.delete(ccas.delete_a_task);
};

