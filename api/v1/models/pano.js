module.exports = (function userSchema () {
	var mongoose,
	collectionName,
	schema,
	pano,
	panoModel,
	mongoosePages,
	Schema;

	mongoose = require('./db').mongoose;
	mongoosePages = require('mongoose-pages');
	collectionName = 'panos';

	Schema    = mongoose.Schema;

	povLinks = {
		description : String,
		heading     : String,
		pano        : String
	}

	POVLinks = mongoose.Schema(povLinks);

	schema = {
		name: {
			type: String,
			required: true
		},
		locationURL: {
			type: String,
			required: true
		},
		povLinks: [POVLinks],
		panoInfo: {
			type: String,
			require: false,
			default: "Add info information to the floorplan."
		},
	};

	pano = mongoose.Schema(schema);

	mongoosePages.skip(pano);

	pano.set('toJSON', {
	     transform: function (doc, ret, options) {	
	         ret.id = ret._id;
	         ret.items = ret.documents;
	         delete ret._id;
	         delete ret.__v;
	     }
	});

	panoModel = mongoose.model(collectionName, pano);

	return panoModel;
})();