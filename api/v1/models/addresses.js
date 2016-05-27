module.exports = (function addressesSchema () {
	var mongoose,
		collectionName,
		schema,
		addresses,
		AddressesModel,
		User,
		mongoosePages,
		Schema;

	User = require('../models/user');

	mongoose = require('./db').mongoose;
	mongoosePages = require('mongoose-pages');
	Schema = mongoose.Schema;
	collectionName = 'addresses';

	schema = {
		line1: {
			type: String,
			required: true
		},
		line2: {
			type: String,
			required: true
		},
		line3: {
			type: String,
			required: true
		},
		city: {
			type: String,
			required: true
		},
		postCode: {
			type: String,
			required: true
		},
		country: {
			type: String,
			required: true
		},
		region: {
			type: String,
			required: true
		},
		user: [{
			type: Schema.ObjectId, ref: 'users'
		}],
		createdDate: {
			type: Date,
			required: true,
			default: Date.now
		}
	};

	addresses = mongoose.Schema(schema);

	mongoosePages.skip(addresses);

	addresses.set('toJSON', {
	     transform: function (doc, ret, options) {	
	         ret.id = ret._id;
	         ret.items = ret.documents;
	         delete ret._id;
	         delete ret.__v;
	     }
	});

	AddressesModel = mongoose.model(collectionName, addresses);
	
	return AddressesModel;
})();