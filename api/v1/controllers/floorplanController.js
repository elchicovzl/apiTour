var Floorplan,
	pageNumber,
	fileCtrl;

//modules
Floorplan = require('../models/floorplan');
hal = require('hal');
jwt = require('jsonwebtoken');
config = require('../../../config');
fileCtrl = require('./fileController');

function floorplanController () {

	this.getFloorplans = function (req, res, next) {

		if(!(typeof req.params.page == 'undefined')) {
			pageNumber = req.params.page;
		}else {
			pageNumber = config.pagination.defaultPageNumber;
		}

		return Floorplan.findPaginated(function(err, result) {
			var resources,
				floorplans;

			if(err) {
				res.status = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
        		return res.send({ error: err.message });
			} 

			floorplans = {};
			floorplans.items = result.documents;

			if(!(typeof result.nextPage == 'undefined')) {
				floorplans.nextPage = result.nextPage;
			}

			if(!(typeof result.prevPage == 'undefined')) {
				floorplans.prevPage = result.prevPage;
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
				}, '/floorplans?page='+pageNumber);

	    		resourceCollection.link(new hal.Link("first", "/floorplans?page=1"));

	    		if(!(typeof result.nextPage == 'undefined')) {
	    			resourceCollection.link(new hal.Link("next", "/floorplans?page="+result.nextPage));
				}
				if(!(typeof result.prevPage == 'undefined')) {
	    			resourceCollection.link(new hal.Link("prev", "/floorplans?page="+result.prevPage));
				}

	    		resourceCollection.link(new hal.Link("last", "/floorplans?page="+result.totalPages));

	    		resources = [];

	    		floorplans.items.forEach(function(floorplan, index) {
	    			var floorplanDeserialize;
	    			
	    			floorplanDeserialize = floorplan.toJSON();
				 	resources.push(new hal.Resource(floorplan.toJSON(), "/floorplans/"+floorplanDeserialize.id));
	    		});

	    		resourceCollection.embed("floorplans", resources);
	    		
	    		return res.send(resourceCollection);
			}
		}, config.pagination.defaultItemsPerPage, pageNumber);
	}

	this.getFloorplan = function (req, res, next) {

		return Floorplan.findOne({ _id:req.params.id })
			.exec(function (err, image) {

			  if(err) {

					res.status = 500;
					console.log('Internal error(%d): %s',res.statusCode,err.message);
	        		return res.send({ error: 'Server error' });
				}else {
					var resource;

					resource = new	hal.Resource(image.toJSON(), '/floorplans/'+req.params.id);
					return res.send(resource);
				}
			});
	}

	this.createFloorplan = function (req, res, next) {
		var model,
			decoded;

		model  = {};

		if(req.params.name) model.name = req.params.name;
	    if(req.params.locationURL) model.locationURL = req.params.locationURL;
	    if(req.params.status) model.status = req.params.status;

	    Floorplan.create(model, function(err, result) {
	    	if(err) {
	    		console.log(err);
	    		return res.send({'Server error':err});
	    	}else {
	    		var resource;

	    		fileCtrl.moveFile(model.locationURL)
	    		.then(function() {
	    			resource = new hal.Resource(result.toJSON(), '/floorplans/'+result.id);
	    			return res.send(resource);
	    		})
	    		.catch(function (err) {
	    			res.status = 500;
	    			return res.send({'Server error':err});
	    		})
	    	}
	    });
	};

	this.updateFloorplan = function (req, res, next) {
		var model;

		model = {};

		if(req.params.name) model.name = req.params.name;
	    if(req.params.locationURL) model.locationURL = req.params.locationURL;
	    if(req.params.links) model.links = req.params.links;
	    if(req.params.status) model.status = req.params.status;

		Floorplan.where({ _id: req.params.id }).update(model, function(err, data) {
			res.statusCode = 204;
			return res.send("nothing");
		});	
	};

	this.deleteFloorplan = function (req, res, next) {

		return Floorplan.findById(req.params.id, function(err, image) {
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

module.exports = new floorplanController();