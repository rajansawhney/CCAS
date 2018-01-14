'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var OrderSchema = new Schema({
	make: {
		type: String,
		required: 'Kindly enter make of the car'
	},
	model: {
		type: String,
		required: 'Kindly enter model of the car'
	},
	carPackage: {
		type: String,
		required: 'Kindly enter package specification'
	},
	customerId: {
		type: Schema.ObjectId,
		required: 'Kindly enter your customerId'
	}

});

module.exports = mongoose.model('Order', OrderSchema);
