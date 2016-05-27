module.exports = (function userSchema () {
	var mongoose,
		collectionName,
		schema,
		floorplan,
		floorplanModel,
		mongoosePages,
		Schema;

	mongoose = require('./db').mongoose;
	mongoosePages = require('mongoose-pages');
	collectionName = 'floorplans';

	Schema = mongoose.Schema;

	links = {
		idLink   : String,
		pano     : String,
		panoName : String,
		position : {
			left : String,
			top  : String
		},
		percentPos : {
			left : String,
			top  : String
		}
	}

	Links = mongoose.Schema(links);

	schema = {
		name: {
			type: String,
			required: true
		},
		locationURL: {
			type: String,
			required: true
		},
		status : {
			type: Boolean,
			required: true,
			default: "0"
		},
		links : [Links]
	};

	floorplan = mongoose.Schema(schema);

	mongoosePages.skip(floorplan);

	floorplan.set('toJSON', {
	     transform: function (doc, ret, options) {	
	         ret.id = ret._id;
	         ret.items = ret.documents;
	         delete ret._id;
	         delete ret.__v;
	     }
	});

	floorplanModel = mongoose.model(collectionName, floorplan);

	return floorplanModel;
})();