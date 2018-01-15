'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SupplierSchema = new Schema({
	supplierId: {
		type: "number"
	},
	make: {
		type: String
	},
	api_key: {
		type: String
	},
	storefront: {
		type: String
	}
	
});

module.exports = mongoose.model('Supplier', SupplierSchema);
