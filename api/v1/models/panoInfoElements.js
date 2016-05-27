module.exports = (function userSchema () {
	var mongoose,
	collectionName,
	schema,
	panoInfo,
	panoInfoModel,
	mongoosePages;

	mongoose = require('./db').mongoose;
	mongoosePages = require('mongoose-pages');
	collectionName = 'panoInfoElements';

	schema = {
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		positionPane: {
			type: String,
			required: true
		}
	};

	panoInfo = mongoose.Schema(schema);

	mongoosePages.skip(panoInfo);

	panoInfo.set('toJSON', {
	     transform: function (doc, ret, options) {	
	         ret.id = ret._id;
	         ret.items = ret.documents;
	         delete ret._id;
	         delete ret.__v;
	     }
	});

	panoInfoModel = mongoose.model(collectionName, panoInfo);

	return panoInfoModel;
})();