var POVLink,
hal,
jwt,
config,
docsPerPage,
pageNumber;

//modules
POVLink = require('../models/povLinks');
hal = require('hal');
jwt = require('jsonwebtoken');
config = require('../../../config');



function povLinkController () {

	this.getPOVLinks = function (req, res, next) {

		if(!(typeof req.params.page == 'undefined')) {
			pageNumber = req.params.page;
		}else {
			pageNumber = config.pagination.defaultPageNumber;
		}
		
		return POVLink.findPaginated(function(err, result) {
			var resources,
			povLinks;

			if(err) {
				res.status = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
        		return res.send({ error: err.message });
			} 

			povLinks = {};
			povLinks.items = result.documents;

			if(!(typeof result.nextPage == 'undefined')) {
				povLinks.nextPage = result.nextPage;
			}

			if(!(typeof result.prevPage == 'undefined')) {
				povLinks.prevPage = result.prevPage;
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
				}, '/povLinks?page='+pageNumber);

	    		resourceCollection.link(new hal.Link("first", "/povLinks?page=1"));

	    		if(!(typeof result.nextPage == 'undefined')) {
	    			resourceCollection.link(new hal.Link("next", "/povLinks?page="+result.nextPage));
				}
				if(!(typeof result.prevPage == 'undefined')) {
	    			resourceCollection.link(new hal.Link("prev", "/povLinks?page="+result.prevPage));
				}

	    		resourceCollection.link(new hal.Link("last", "/povLinks?page="+result.totalPages));

	    		resources = [];

	    		povLinks.items.forEach(function(tour, index) {
	    			var povLinksDeserialize;
	    			
	    			povLinksDeserialize = tour.toJSON();
				 	resources.push(new hal.Resource(tour.toJSON(), "/povLinks/"+povLinksDeserialize.id));
	    		});

	    		resourceCollection.embed("povLinks", resources);
	    		
	    		return res.send(resourceCollection);
			}
		}, config.pagination.defaultItemsPerPage, pageNumber);

	};

	this.getPOVLink = function (req, res, next) {

		return POVLink.findOne({ _id:req.params.id})
			.populate('panos')
			.exec(function (err, povLink) {

			  if(err) {

					res.status = 500;
					console.log('Internal error(%d): %s',res.statusCode,err.message);
	        		return res.send({ error: 'Server error' });
				}else {
					var resource;

					resource = new	hal.Resource(povLink.toJSON(), '/povLinks/'+req.params.id);
					return res.send(resource);
				}
			});
	};

	this.createPOVLinks = function (req, res, next) {
		var model,
		decoded;

		model  = {};

		if(req.params.description) model.title = req.params.description;
	    if(req.params.positionPhotosphere) model.positionPhotosphere = req.params.positionPhotosphere;
	    if(req.params.positionFloorplan) model.positionFloorplan = req.params.positionFloorplan;
	    if(req.params.pano) model.pano = req.params.panos;

	    POVLink.create(model, function(err, result) {
	    	if(err) {
	    		console.log(err);
	    		return res.send({'Server error':err});
	    	}else {
	    		var resource;

	    		resource = new hal.Resource(result.toJSON(), '/povLinks/'+result.id);
	    		return res.send(resource);
	    	}
	    });
	};

	this.updatePOVLinks = function (req, res, next) {
		var model;

		model = {};

		if(req.params.title) model.title = req.params.title;
	    if(req.params.positionPhotosphere) model.positionPhotosphere = req.params.positionPhotosphere;
	    if(req.params.positionFlorplan) model.positionFlorplan = req.params.positionFlorplan;
	    if(req.params.pano) model.panos = req.params.panos;

		POVLink.where({ _id: req.params.id }).update(model, function(err, data) {
			res.statusCode = 204;
			return res.send("nothing");
		});	
	};

	this.deletePOVLinks = function (req, res, next) {

		return POVLink.findById(req.params.id, function(err, povLink) {
			if(!povLink) {
				res.statusCode = 404;
				return res.send({ error: 'Not found' });
			}
			
			return povLink.remove(function(err) {
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

	//method validate pano form fields required
	this.requireFields = function(req, res, next) {
		var model;

		if(req.params.title && req.params.positionPhotosphere) {
			next();
		}else {
			res.statusCode = 400;
			res.send({ message:"You didn't provide a required parameter."});
		}
	}

	return this;
}

module.exports = new povLinkController();