var request = require('request'),
		axios = require('axios'),
		assert = require('chai').assert,
		expect = require('chai').expect;

let rtsTokenURL = "http://localhost:3011/rainer/v10.0/"

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
				console.log("error!",error.stack);
			};
		});
	});
});
