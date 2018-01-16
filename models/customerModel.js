'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CustomerSchema = new Schema({
	name: {
		firstName: {
			type: String,
			required: 'Kindly enter your firstName' 
		},
		lastName: {
			type: String,
			required: 'Kindly enter your lastName'
		}
	},
	address: {
		city: {
			type: String
		},
		state: {
			type: String
		},
		country: {
			type: String,
			required: 'Kindly enter your country'
		}
	}
});

module.exports = mongoose.model('Customer', CustomerSchema);
