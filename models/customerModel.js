'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CustomerSchema = new Schema({
	cName: {
		type: String,
		required: 'Kindly enter your full name'
	},
	cAddress: {
		type: String,
		default: 'Eugene'
	}

});

module.exports = mongoose.model('Customer', CustomerSchema);
