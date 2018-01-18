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
//						res.body.errors.address.country.should.have.property('kind').eql('required');
				done();
				});
		});
	});

}); //end of customer testing

/*
describe('RTS testing', function(){
	describe('Nonce_token check', function(){
		it('status', function() {
			axios.get( rtsTokenURL, { params: {storefront:"ccas-bb9630c04f"}} )
				.then(function(response){
					console.log("response is -- \n" + JSON.stringify(response.data));
					expect(response.data.nonce_token).to.equal("ff6bfd673ab6ae03d8911");
				done();
			})
			.catch(function(error){
				console.log(error.stack);
			});
		});
	});
});
*/
