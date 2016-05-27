module.exports = (function userSchema () {
	var mongoose,
		collectionName,
		schema,
		image,
		imageModel,
		mongoosePages;

	mongoose = require('./db').mongoose;
	mongoosePages = require('mongoose-pages');
	collectionName = 'image';

	schema = {
		name: {
			type: String,
			required: true
		},
		locationURL: {
			type: String,
			required: true
		}
	};

	image = mongoose.Schema(schema);

	mongoosePages.skip(image);

	image.set('toJSON', {
	     transform: function (doc, ret, options) {	
	         ret.id = ret._id;
	         ret.items = ret.documents;
	         delete ret._id;
	         delete ret.__v;
	     }
	});

	imageModel = mongoose.model(collectionName, image);

	return imageModel;
})();