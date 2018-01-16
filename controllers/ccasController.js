'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		Customer = mongoose.model('Customer'),
		Order = mongoose.model('Order'),
		Supplier = mongoose.model('Supplier'),
		axios = require('axios'),
		_ = require('lodash');

let acmeURL = 'http://localhost:3051/acme/api/v45.1/order';
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
		Customer.findById(req.body.customerId, function(err,data){
			if(err)
				res.send(err); 
			//If customer exists
			if(data){
				if(["acme","acme autos"].includes((req.body.make).toLowerCase()))
					new_order.supplierId = 111;
				else if(["rainier","rainier transportation solution","rts"].includes((req.body.make).toLowerCase()))
					new_order.supplierId = 222;
				else
					res.send("Incorrect \"Make\" entered. Enter either ACME Autos or Rainier Transportation Solution");

				//Get orderId number from respective supplier
				if(new_order.supplierId === 111){
					Supplier.find( {supplierId : 111}, function(err,supplierData){
							if (err){
								res.send(err);
							}
							console.log("\nsupplierData retrieved -- \n " + supplierData[0]);
							console.log("\nsupplierData.api_key = " + _.get(supplierData,"0.api_key"));
							if(supplierData){	
								const acme_api_key = supplierData[0].api_key;
								console.log("\nacme api key retreived from supplierDB --" + acme_api_key);
								const orderReq = 
									{ api_key : acme_api_key,// access from supplier table using supplier_id
										model : new_order.model,
										carPackage : new_order.carPackage
									}
								console.log("\norder req is:" + JSON.stringify(orderReq));

								//axios post request at acmeAPI url with orderReq(data)
								axios.post(acmeURL,orderReq)
									.then(response => {
										console.log('here');
										console.log("\nresponse is = " + JSON.stringify(_.get(response.data,"order")));
										//console.log("\norder_id received from acme: " + response[0].order);
										new_order.orderId = _.get(response.data,"order"); //store response obtained from acmeAPI
										console.log("\norder id:" + new_order.orderId);

										//save order in the database
										console.log("\nnew order is ---\n"+new_order);
										new_order.save(function(err, order) {
												if (err)
													res.send(err);
												res.send("Order placed successfully!\nOrder details:\n" + order +
																"\n\n**\nThe order can be viewed @ " +
																"http://localhost:3000/order/order-"+new_order.orderId);
												});
									})
									.catch(function(error){
										res.send(error);
									});
							}
					});
				}
			}
			else{
				res.send("Invalid CustomerId. CustomerId does not exist in the database");
			}
		});				
		
	}//end of try
	catch(err){
		console.log('Error while adding to database',err);
		res.send(err);
	}	
};


	/*
	if(_.toString(req.params.orderId).includes("order-")){
		const searchId = _toNumber(_.trimStart(req.params.orderId,'-' ));
		console.log("\nsearchId is = " + searchId);
		Order.find({orderId : _.toNumber(req.params.orderId)}, function(err, order) {		
			if (err)
				res.send(err);
			res.json(order);
		});
	}
	else{*/
exports.read_an_order = function(req, res) {
	console.log("\nreq.params.orderId = " + req.params.orderId);
	console.log("\ntype of orderId = " + typeof(req.param.orderId));
	if(_.toString(req.params.orderId).includes("order-")){
		const searchId = _.toNumber(_.toString(req.params.orderId).split('-')[1]);
		console.log("\nsearchId is = " + searchId);
		Order.find({orderId : searchId}, function(err, order) {		
			if (err)
				res.send(err);
			res.json(order);
		});
	}
	else{
	Order.findById(req.params.orderId, function(err, order) {		
			if (err)
				res.send(err);
			res.json(order);
			});
	}
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

exports.list_all_suppliers = function(req, res) {
	Supplier.find({}, function(err, supplier) {
			if (err)
				res.send(err);
			res.json(supplier);
			});
};

exports.create_a_supplier = function(req, res) {
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
