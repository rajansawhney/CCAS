'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		Customer = mongoose.model('Customer'),
		Order = mongoose.model('Order'),
		Supplier = mongoose.model('Supplier'),
		axios = require('axios'),
		_ = require('lodash');

let acmeURL = 'http://localhost:3050/acme/api/v45.1/order';
let rtsTokenURL = 'http://localhost:3051/rainier/v10.0/nonce_token';
let rtsOrderURL = 'http://localhost:3051/rainier/v10.0/request_customized_model';

/* Customer functions */

exports.list_all_customers = function(req, res) {
	Customer.find({}, function(err, customer) {
			if (err)
				res.send(err);
			//console.log("customer objects:\n" + customer)
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
			console.log("customer details added:\n" + customer)
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
	//If request has the right access token as query. Else say " Access denied "
	if( req.query.pin === '1123' ) {
		Order.find({}, function(err, order) {
				if (err)
					res.send(err);
				res.json({	report: "Orders Report",
										orders : order
								});
		});
	}
	else
		res.send("ACCESS DENIED");			
};


exports.create_an_order = function(req, res) {
	var new_order = new Order(req.body);
	//if Customer.findById
	const  custId  = req.body.customerId;
	console.log("\nCustomer id:" + custId);
	try {
		Customer.findById(req.body.customerId, function(err,cust){
			if(err)
				res.send(err); 
			//If customer exists
			if(cust){
				//If customer's country in USA
				if(!["usa","united states of america","united states"].includes(cust.address.country.toLowerCase()))
					res.send("CCAS does provide shipping services to " + cust.address.country + ". Apologies")
				if(["acme","acme autos"].includes((req.body.make).toLowerCase()))
					new_order.supplierId = 111;
				else if(["rainier","rainier transportation solution","rts"].includes((req.body.make).toLowerCase()))
					new_order.supplierId = 222;
				else
					res.send("Incorrect \"Make\" entered. Enter either ACME Autos or Rainier Transportation Solution");

				//Get orderId number from respective supplier
				//ACME
				if(new_order.supplierId === 111){
					Supplier.find( {supplierId : 111}, function(err,supplierData){
							if (err){
								res.send(err);
							}
							//console.log("\nsupplierData.api_key = " + _.get(supplierData,"0.api_key"));
							if(supplierData){	
								const acme_api_key = supplierData[0].api_key;
								console.log("\nacme api key retreived from supplierData -- " + acme_api_key);
								const orderReq = 
									{ api_key : acme_api_key,
										model : new_order.model,
										carPackage : new_order.carPackage
									}
								//console.log("\norder req is:" + JSON.stringify(orderReq));

								//function get_order_id(){
								//throw new Error("New error")
								//axios post request at acmeAPI url with orderReq(data)
								axios.post(acmeURL,orderReq)
									.then(function(response){
										console.log("\nresponse.data.order is --" + JSON.stringify(response.data.order));
										new_order.orderId = _.toNumber(response.data.order); //store response obtained from acmeAPI
										console.log("\nnew order:" + new_order);
										
										//save order in the Order schema
										new_order.save(function(err, order) {
											if (err)
												res.send(err);
											res.json({
																	message: "Order placed successfully",
																	order_details: order,
																	link: "http://localhost:3000/order/order-"+new_order.orderId
															});
										});
									})
									.catch(function(error){
										res.send({
																message: "Verify if you're connected to the Acme API",
																error: error.response		
														});
									});
									//}
									/*
									Promise.resolve()
										.then(get_order_id)
										.catch(err => {
											res.send({
																message: "Verify if you're connected to the Acme API",
																error: err		
															});
										})
										.then(ok => {
											console.log(ok.message)
										});
									*/	
							}
					});
				}
				//RTS
				if(new_order.supplierId === 222) {
					Supplier.find( {supplierId : 222}, function(err,supplierData){
							if (err){
								res.send(err);
							}
							//console.log("\nsupplierData.storefront = " + _.get(supplierData,"0.storefront"));
							if(supplierData){	
								const rts_storefront = supplierData[0].storefront;
								console.log("\nstorefront key retreived from supplierData -- " + rts_storefront);

								const tokenReq = { storefront: rts_storefront	};
									
								const orderReq = 
									{ token : "",
										model : new_order.model,
										carPackage : new_order.carPackage
									};

								//axios get request at rtsAPI url with storefront(params)
								axios.get(rtsTokenURL,{ params: tokenReq })
									.then(function(response){
										//console.log("\nresponse keys -- \n" + Object.keys(response));
										orderReq.token = response.data.nonce_token;
										console.log("\ntoken received at CCAS:" + orderReq.token);

										if(orderReq.token){
											//axios post request at rtsAPI url with orderReq(data)
											axios.post(rtsOrderURL,orderReq)
												.then(function(response){
													console.log("\nresponse.data is --" + JSON.stringify(response.data.order_id));
													new_order.orderId = _.toNumber(response.data.order_id); //store response obtained from acmeAPI
													console.log("\nnew order:" + new_order);
										
													//save order in the Order schema
													new_order.save(function(err, order) {
														if (err)
															res.send(err);
														res.json({
																	message: "Order placed successfully",
																	order_details: order,
																	link: "http://localhost:3000/order/order-"+new_order.orderId
																	});
													});
												})
												.catch(function(error){
													res.send(error);
												});
											}
											else
												res.send("Please provide the token to place the order");
										})//end of then of first axios
										.catch(function(error){
											res.send(error);
										});
								console.log("\norder req is:" + JSON.stringify(orderReq));
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


exports.read_an_order = function(req, res) {
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

/* Supplier functions */

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
