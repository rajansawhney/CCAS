'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		Customer = mongoose.model('Customer'),
		Order = mongoose.model('Order'),
		Supplier = mongoose.model('Supplier');

/* Customer functions */

exports.list_all_customers = function(req, res) {
	Customer.find({}, function(err, customer) {
			if (err)
				res.send(err);
			res.json(customer);
			});
};

exports.create_a_customer = function(req, res) {
	var new_customer = new Customer(req.body);
	new_customer.save(function(err, customer) {
			if (err)
				res.send(err);
			res.json(customer);
			});
};


exports.read_a_customer = function(req, res) {
	Customer.findById(req.params.customerId, function(err, customer) {		
			if (err)
				res.send(err);
			res.json(customer);
			});
};

exports.update_a_customer = function(req, res) {
	Customer.findOneAndUpdate({_id: req.params.customerId}, req.body, {new: true}, function(err, customer) {
			if (err)
				res.send(err);
			res.json(customer);
		});
};

exports.delete_a_customer = function(req, res) {
	Customer.remove({_id: req.params.customerId	}, function(err, customer) {
			if (err)
				res.send(err);
			res.json({ message: 'Customer successfully deleted' });
		});
};


/* Order functions */

exports.list_all_orders = function(req, res) {
	Order.find({}, function(err, order) {
			if (err)
				res.send(err);
			res.json(order);
			});
};


exports.create_an_order = function(req, res) {
	var new_order = new Order(req.body);
	//if Customer.findById
	const  custId  = req.body.customerId;
	console.log("Customer id:" + custId);
	try {
	//console.log("Type is ----"+typeof(customerId));
	//if(typeof(customerId) !== Schema.ObjectId){
	//	throw new Error('Incorrect typecasting. CustomerId is not of ObjectId type');
	//}
		Customer.findById(req.body.customerId, function(err,data){
			if(err){
				throw err;
				res.send(err); 
				console.log(JSON.stringify(err));
			}
			if(data){
				if(["acme","acme autos"].includes((req.body.make).toLowerCase()))
					new_order.supplierId = 111;
				else if(["rainier","rainier transportation solution","rts"].includes((req.body.make).toLowerCase()))
					new_order.supplierId = 222;
				else
					res.send("Incorrect \"Make\" entered. Enter either ACME Autos or Rainier Transportation Solution");
				new_order.save(function(err, order) {
					if (err)
						res.send(err);
					res.json(order);
				});
			}
			else{
				//console.log("Invalid CustomerId. CustomerId does not exist in the database");
				res.send("Invalid CustomerId. CustomerId does not exist in the database");
			}
		});
	}

	catch(err){
		console.log('Error while adding to database',err);}
	return
};


exports.read_an_order = function(req, res) {
	Order.findById(req.params.orderId, function(err, order) {		
			if (err)
				res.send(err);
			res.json(order);
			});
};

exports.update_an_order = function(req, res) {
	Order.findOneAndUpdate({_id: req.params.orderId}, req.body, {new: true}, function(err, order) {
			if (err)
				res.send(err);
			res.json(order);
		});
};

exports.delete_an_order = function(req, res) {
	Order.remove({_id: req.params.orderId	}, function(err, order) {
			if (err)
				res.send(err);
			res.json({ message: 'Order successfully deleted' });
		});
};

/* Supplier functions */

exports.list_all_suppliers = function(req, res) {
	console.log("listing all suppliers");
	Supplier.find({}, function(err, supplier) {
			if (err)
				res.send(err);
			res.json(supplier);
			});
};

exports.create_a_supplier = function(req, res) {
	console.log("here");
	var new_supplier = new Supplier(req.body);
	new_supplier.save(function(err, supplier) {
			if (err)
				res.send(err);
			res.json(supplier);
			});
};

exports.read_a_supplier = function(req, res) {
	Supplier.findById(req.params.supplierId, function(err, supplier) {		
			if (err)
				res.send(err);
			res.json(supplier);
			});
};

exports.update_a_supplier = function(req, res) {
	Supplier.findOneAndUpdate({_id: req.params.supplierId}, req.body, {new: true}, function(err, supplier) {
			if (err)
				res.send(err);
			res.json(supplier);
		});
};

exports.delete_a_supplier = function(req, res) {
	Supplier.remove({_id: req.params.supplierId	}, function(err, supplier) {
			if (err)
				res.send(err);
			res.json({ message: 'supplier successfully deleted' });
		});
};
