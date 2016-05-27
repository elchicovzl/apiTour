var Pano,
	hal,
	jwt,
	config,
	docsPerPage,
	pageNumber,
	fileCtrl;

//modules
Pano = require('../models/pano');
hal = require('hal');
jwt = require('jsonwebtoken');
config = require('../../../config');
fileCtrl = require('./fileController');

function panoController () {

	this.getPanos = function (req, res, next) {

		if(!(typeof req.params.page == 'undefined')) {
			pageNumber = req.params.page;
		}else {
			pageNumber = config.pagination.defaultPageNumber;
		}
		
		return Pano.findPaginated(function(err, result) {
			var resources,
			panos;

			if(err) {
				res.status = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
        		return res.send({ error: err.message });
			} 

			panos = {};
			panos.items = result.documents;

			if(!(typeof result.nextPage == 'undefined')) {
				panos.nextPage = result.nextPage;
			}

			if(!(typeof result.prevPage == 'undefined')) {
				panos.prevPage = result.prevPage;
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
				}, '/panos?page='+pageNumber);

	    		resourceCollection.link(new hal.Link("first", "/panos?page=1"));

	    		if(!(typeof result.nextPage == 'undefined')) {
	    			resourceCollection.link(new hal.Link("next", "/panos?page="+result.nextPage));
				}
				if(!(typeof result.prevPage == 'undefined')) {
	    			resourceCollection.link(new hal.Link("prev", "/panos?page="+result.prevPage));
				}

	    		resourceCollection.link(new hal.Link("last", "/panos?page="+result.totalPages));

	    		resources = [];

	    		panos.items.forEach(function(tour, index) {
	    			var panoDeserialize;
	    			
	    			panoDeserialize = tour.toJSON();
				 	resources.push(new hal.Resource(tour.toJSON(), "/panos/"+panoDeserialize.id));
	    		});

	    		resourceCollection.embed("panos", resources);
	    		
	    		return res.send(resourceCollection);
			}
		}, config.pagination.defaultItemsPerPage, pageNumber);

	}

	this.getPano = function (req, res, next) {

		return Pano.findOne({ _id:req.params.id})
			.populate('povLinks')
			.exec(function (err, tour) {

			  if(err) {

					res.status = 500;
					console.log('Internal error(%d): %s',res.statusCode,err.message);
	        		return res.send({ error: 'Server error' });
				}else {
					var resource;

					// tour.user[0].password = undefined;
					resource = new	hal.Resource(tour.toJSON(), '/panos/'+req.params.id);
					return res.send(resource);
				}
			});
	};

	this.createPano = function (req, res, next) {
		var model,
			decoded;

		model  = {};

		if(req.params.name) model.name = req.params.name;
	    if(req.params.locationURL) model.locationURL = req.params.locationURL;
	    if(req.params.povLinks) model.povLinks = req.params.povLinks;
	    if(req.params.panoInfo) model.panoInfo = req.params.panoInfo;

	    Pano.create(model, function(err, result) {
	    	if(err) {
	    		console.log(err);
	    		return res.send({'Server error':err});
	    	}else {
	    		var resource;

	    		fileCtrl.moveFile(model.locationURL)
	    		.then(function() {
	    			resource = new hal.Resource(result.toJSON(), '/panos/'+result.id);
	    			return res.send(resource);
	    		})
	    		.catch(function (err) {
	    			res.status = 500;
	    			return res.send({'Server error':err});
	    		})
	    	}
	    });
	};

	this.updatePano = function (req, res, next) {
		var model;

		model = {};

		if(req.params.name) model.name = req.params.name;
	    if(req.params.locationURL) model.locationURL = req.params.locationURL;
	    if(req.params.povLinks) model.povLinks = req.params.povLinks;
	    if(req.params.panoInfo) model.panoInfo = req.params.panoInfo;

	    console.log("update..");
	    console.log(model.povLinks);

		Pano.where({ _id: req.params.id }).update(model, function(err, data) {
			res.statusCode = 204;
			return res.send("nothing");
		});	
	};

	this.deletePano = function (req, res, next) {

		return Pano.findById(req.params.id, function(err, pano) {
			if(!pano) {
				res.statusCode = 404;
				return res.send({ error: 'Not found' });
			}
			
			return pano.remove(function(err) {
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

		console.log(req.params.name);

		if(req.params.name && req.params.locationURL) {
			next();
		}else {
			res.statusCode = 400;
			res.send({ message:"You didn't provide a required parameter."});
		}
	}

	return this;
}

module.exports = new panoController();