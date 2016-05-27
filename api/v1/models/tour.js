module.exports = (function userSchema () {
	var mongoose,
	collectionName,
	schema,
	tour,
	TourModel,
	User,
	Pano,
	Imagen,
	mongoosePages,
	Schema;

	User = require('../models/user');
	Pano = require('../models/pano');
	Imagen = require('../models/image');

	mongoose = require('./db').mongoose;
	mongoosePages = require('mongoose-pages');
	Schema = mongoose.Schema;
	collectionName = 'tours';

	schema = {
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		location: {
			type: String,
			required: true,
			default: "London"
		},
		type: {
			type: Boolean,
			required: true,
			default: "House"
		},
		user: [{
			type: Schema.ObjectId, ref: 'users'
		}],
		pano: [{
			type: Schema.ObjectId, ref: 'panos'
		}],
		image: [{
			type: Schema.ObjectId, ref: 'image'
		}],
		floorplan: [{
			type: Schema.ObjectId, ref: 'floorplans'
		}],
		createdDate: {
			type: Date,
			required: true,
			default: Date.now
		}
	};

	tour = mongoose.Schema(schema);

	mongoosePages.skip(tour);

	tour.set('toJSON', {
	     transform: function (doc, ret, options) {	
	         ret.id = ret._id;
	         ret.items = ret.documents;
	         delete ret._id;
	         delete ret.__v;
	     }
	});

	TourModel = mongoose.model(collectionName, tour);
	
	return TourModel;
})();
