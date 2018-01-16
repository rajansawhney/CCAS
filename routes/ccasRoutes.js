'use strict';
module.exports = function(app) {
	var ccas = require('../controllers/ccasController');

	// CCAS Routes
	/* Customer */
	app.route('/customer')
		.get(ccas.list_all_customers)
		.post(ccas.create_a_customer);

	app.route('/customer/:customerId')
		.get(ccas.read_a_customer)
		.put(ccas.update_a_customer)
		.delete(ccas.delete_a_customer);

	/* Order */	
	app.route('/order')
		.get(ccas.list_all_orders)
		.post(ccas.create_an_order);

	app.route('/order/:orderId')
		.get(ccas.read_an_order)
		.put(ccas.update_an_order)
		.delete(ccas.delete_an_order);

	/* Supplier */
	app.route('/supplier')
		.get(ccas.list_all_suppliers)
		.post(ccas.create_a_supplier)
	
	//Not working
	app.route('/supplier/:supplierId')
		.get(ccas.read_a_supplier)
		.put(ccas.update_a_supplier)
		.delete(ccas.delete_a_supplier)

};

