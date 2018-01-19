//Require dev-dependencies

let request = require('request'),
		mongoose = require('mongoose'),
		axios = require('axios');

let	chai = require('chai'),
		chaiHttp = require('chai-http'),
		should = chai.should(),
		assert = chai.assert,
		expect = chai.expect;

let ccasServer = require('../servers/ccasServer');
let Customer = require('../models/customerModel');
let rtsTokenURL = "http://localhost:3051/rainer/v10.0/nonce_token"

chai.use(chaiHttp);

//Our parent block
describe('Customers', () => {

	/* Test the /GET route */

	describe('/GET customer', () => {
		it('it should GET all the customers', (done) => {
			chai.request(ccasServer)
				.get('/customer')
				.end((err,res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
				done();
				});
		});
	});
	
	/* Test the /POST route */

	describe('/POST customer', () => {
		it('it should not POST a customer without name and address.country field', (done) => {
			let cust = {
				name: {
					firstName : "Albert",
					lastName : "Einstein"
				}
			}
			chai.request(ccasServer)
				.post('/customer')
				.send(cust)
				.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('errors');
						res.body.errors.should.have.property('address.country');
				done();
				});
		});

		it('it should POST a customer', () => {
			let cust = {
				name: {
					firstName : "Albert",
					lastName : "Einstein"
				},
				address: {
					city: "Some city",
					state: "Some state",
					country: "USA"
				}
			}

			chai.request(ccasServer)
				.post('/customer')
				.send(cust)
				.end((err,res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('_id')
					done();
			});
		});
	});

	/* Test the /GET/:id route */ 
	describe('/GET/:id customer', () => {
		it('it should GET a customer by the given id', (done) => {
			let cust = new Customer({
				name: {
					firstName: "George",
					lastName: "Martin"
					},
				address: {
					city: "Seattle",
					state: "WA",
					country: "USA"
				}
			});
			cust.save((err, book) => {
					chai.request(ccasServer)
					.get('/customer/' + cust.id)
					.send(cust)
					.end((err,res) => {
							res.should.have.status(200);
							res.body.should.be.a('object');
							res.body.should.have.property('name');
							res.body.name.should.have.property('firstName');
							res.body.name.should.have.property('lastName');
							res.body.should.have.property('address');
							res.body.address.should.have.property('city');
							res.body.address.should.have.property('state');
							res.body.address.should.have.property('country');
							res.body.should.have.property('_id').eql(cust.id);
						done();
					});
			});
		});
		
	});

}); //end of customer testing


