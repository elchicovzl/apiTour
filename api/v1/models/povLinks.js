module.exports = (function userSchema () {
	var mongoose,
	collectionName,
	schema,
	povLink,
	povLinkModel,
	mongoosePages,
	Schema,
	PanoInfo;

	PanoInfo = require('../models/panoInfoElements');

	mongoose = require('./db').mongoose;
	mongoosePages = require('mongoose-pages');
	collectionName = 'povLinks';

	Schema = mongoose.Schema;

	schema = {
		title: {
			type: String,
			required: true
		},
		positionPhotosphere: {
			type: String,
			required: true
		},
		positionFloorplan: {
			type: String
			// required: true
		},
		pano: [{
			type: Schema.ObjectId, ref: 'panos'
		}]

	};

	povLink = mongoose.Schema(schema);

	mongoosePages.skip(povLink);

	povLink.set('toJSON', {
	     transform: function (doc, ret, options) {	
	         ret.id = ret._id;
	         ret.items = ret.documents;
	         delete ret._id;
	         delete ret.__v;
	     }
	});

	povLinkModel = mongoose.model(collectionName, povLink);

	return povLinkModel;
})();