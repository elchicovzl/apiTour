var Imagen,
	pageNumber,
	fileCtrl;

//modules
Imagen = require('../models/image');
hal = require('hal');
jwt = require('jsonwebtoken');
config = require('../../../config');
fileCtrl = require('./fileController');

function imageController () {

	this.getImages = function (req, res, next) {

		if(!(typeof req.params.page == 'undefined')) {
			pageNumber = req.params.page;
		}else {
			pageNumber = config.pagination.defaultPageNumber;
		}

		return Imagen.findPaginated(function(err, result) {
			var resources,
			images;

			if(err) {
				res.status = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
        		return res.send({ error: err.message });
			} 

			images = {};
			images.items = result.documents;

			if(!(typeof result.nextPage == 'undefined')) {
				images.nextPage = result.nextPage;
			}

			if(!(typeof result.prevPage == 'undefined')) {
				images.prevPage = result.prevPage;
			}

			resources = [];

			if(err) {

				res.status = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
        		return res.send({ error: 'Server error' });
			}else {
				var resourceCollection,
				resources;

				resourceCollection = new hal.Resource({
					page : pageNumber,
					pageLimit : config.pagination.defaultItemsPerPage,
					total : result.totalPages,
				}, '/images?page='+pageNumber);

	    		resourceCollection.link(new hal.Link("first", "/images?page=1"));

	    		if(!(typeof result.nextPage == 'undefined')) {
	    			resourceCollection.link(new hal.Link("next", "/images?page="+result.nextPage));
				}
				if(!(typeof result.prevPage == 'undefined')) {
	    			resourceCollection.link(new hal.Link("prev", "/images?page="+result.prevPage));
				}

	    		resourceCollection.link(new hal.Link("last", "/images?page="+result.totalPages));

	    		resources = [];

	    		images.items.forEach(function(image, index) {
	    			var imageDeserialize;
	    			
	    			imageDeserialize = image.toJSON();
				 	resources.push(new hal.Resource(image.toJSON(), "/images/"+imageDeserialize.id));
	    		});

	    		resourceCollection.embed("images", resources);
	    		
	    		return res.send(resourceCollection);
			}
		}, config.pagination.defaultItemsPerPage, pageNumber);
	}

	this.getImage = function (req, res, next) {

		return Imagen.findOne({ _id:req.params.id })
			.exec(function (err, image) {

			  if(err) {

					res.status = 500;
					console.log('Internal error(%d): %s',res.statusCode,err.message);
	        		return res.send({ error: 'Server error' });
				}else {
					var resource;

					resource = new	hal.Resource(image.toJSON(), '/images/'+req.params.id);
					return res.send(resource);
				}
			});
	}

	this.createImage = function (req, res, next) {
		var model,
			decoded;

		model  = {};

		if(req.params.name) model.name = req.params.name;
	    if(req.params.locationURL) model.locationURL = req.params.locationURL;

	    Imagen.create(model, function(err, result) {
	    	if(err) {
	    		console.log(err);
	    		return res.send({'Server error':err});
	    	}else {
	    		var resource;

	    		fileCtrl.moveFile(model.locationURL)
	    		.then(function() {
	    			resource = new hal.Resource(result.toJSON(), '/images/'+result.id);
	    			return res.send(resource);
	    		})
	    		.catch(function (err) {
	    			res.status = 500;
	    			return res.send({'Server error':err});
	    		})
	    	}
	    });
	};

	this.updateImage = function (req, res, next) {
		var model;

		model = {};

		if(req.params.name) model.name = req.params.name;
	    if(req.params.locationURL) model.locationURL = req.params.locationURL;

		Imagen.where({ _id: req.params.id }).update(model, function(err, data) {
			res.statusCode = 204;
			return res.send("nothing");
		});	
	};

	this.deleteImage = function (req, res, next) {

		return Imagen.findById(req.params.id, function(err, image) {
			if(!image) {
				res.statusCode = 404;
				return res.send({ error: 'Not found' });
			}
			
			return image.remove(function(err) {
				if(err) {
					res.statusCode = 500;
			        console.log('Internal error(%d): %s',res.statusCode,err.message);
			        return res.send({ error: 'Server error' });
				}else {
					res.statusCode = 204;
					return res.send("nothing");	
				}
			});		
		});
	};

	this.requireFields = function(req, res, next) {
		var model;

		if(req.params.name && req.params.locationURL) {
			next();
		}else {
			res.statusCode = 400;
			res.send({ message:"You didn't provide a required parameter."});
		}
	}

	return this;
}

module.exports = new imageController();