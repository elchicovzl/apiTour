var User,
hal,
jwt,
config,
docsPerPage,
pageNumber,
PanoInfoElements;

hal = require('hal');
jwt = require('jsonwebtoken');
config = require('../../../config');
PanoInfoElements = require('../models/panoInfoElements');

function panoInfoElementController () {

	this.getPanoInfoElements = function(req, res, next) {

		if(!(typeof req.params.page == 'undefined')) {
			pageNumber = req.params.page;
		}else {
			pageNumber = config.pagination.defaultPageNumber;
		}

		return PanoInfoElements.findPaginated(function(err, result) {
			var resources,
			panoInfoElems;

			if(err) {
				res.status = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
        		return res.send({ error: err.message });
			}

			panoInfoElems = {};
			panoInfoElems.items = result.documents;

			if(!(typeof result.nextPage == 'undefined')) {
				panoInfoElems.nextPage = result.nextPage;
			}

			if(!(typeof result.prevPage == 'undefined')) {
				panoInfoElems.prevPage = result.prevPage;
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
				}, '/panoInfoElements?page='+pageNumber);

	    		resourceCollection.link(new hal.Link("first", "/panoInfoElements?page=1"));

	    		if(!(typeof result.nextPage == 'undefined')) {
	    			resourceCollection.link(new hal.Link("next", "/panoInfoElements?page="+result.nextPage));
				}
				if(!(typeof result.prevPage == 'undefined')) {
	    			resourceCollection.link(new hal.Link("prev", "/panoInfoElements?page="+result.prevPage));
				}

	    		resourceCollection.link(new hal.Link("last", "/panoInfoElements?page="+result.totalPages));

	    		resources = [];

	    		panoInfoElems.items.forEach(function(panoInfoElem, index) {
	    			var panoInfoElementDeserialize;
	    			
	    			panoInfoElementDeserialize = panoInfoElem.toJSON();
				 	resources.push(new hal.Resource(panoInfoElem.toJSON(), "/panoInfoElements/"+panoInfoElementDeserialize.id));
	    		});

	    		resourceCollection.embed("panoInfoElements", resources);
	    		
	    		return res.send(resourceCollection);
			}
		}, config.pagination.defaultItemsPerPage, pageNumber);
	}

	this.getPanoInfoElement = function(req, res, next) {

		return PanoInfoElements.findOne({ _id:req.params.id})
			// .populate('user')
			.exec(function (err, panoInfoElement) {

			  if(err) {

					res.status = 500;
					console.log('Internal error(%d): %s',res.statusCode,err.message);
	        		return res.send({ error: 'Server error' });
				}else {
					var resource;

					// panoInfoElement.user[0].password = undefined;
					resource = new	hal.Resource(panoInfoElement.toJSON(), '/panoInfoElements/'+req.params.id);
					return res.send(resource);
				}
			});
	}

	this.createPanoInfoElement = function(req, res, next) {
		var model,
		decoded;

		model  = {};

		if(req.params.title) model.title = req.params.title;
	    if(req.params.description) model.description = req.params.description;
	    if(req.params.positionPane) model.positionPane = req.params.positionPane;

	 //    try {
		//     decoded = jwt.verify(req.session.token, config.security.secretToken);
		// } catch(err) {
		//   // err
		//   permisions = false;
		//   return res.send({"message":"require permisions."});
		// }

			// if (decoded) model.user = decoded.id;

		    PanoInfoElements.create(model, function(err, result) {
		    	if(err) {
		    		console.log(err);
		    		return res.send({'Server error':err});
		    	}else {
		    		var resource;

		    		resource = new hal.Resource(result.toJSON(), '/panoInfoElements/'+result.id);
		    		return res.send(resource);
		    	}
		    });
	}

	this.updatePanoInfoElement = function(req, res, next) {
		var model;

		model = {};

		if(req.params.title) model.title = req.params.title;
	    if(req.params.description) model.description = req.params.description;
	    if(req.params.positionPane) model.locationpositionPane = req.params.positionPane;

		PanoInfoElements.where({ _id: req.params.id }).update(model, function(err, data) {
			res.statusCode = 204;
			return res.send("nothing");
		});	
	}

	this.deletePanoInfoElement = function(req, res, next) {

		return PanoInfoElements.findById(req.params.id, function(err, panoInfoElem) {
			if(!panoInfoElem) {
				res.statusCode = 404;
				return res.send({ error: 'Not found' });
			}
			
			return panoInfoElem.remove(function(err) {
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
	}

	//method validate tour form fields required
	this.requireFields = function(req, res, next) {
		var model;

		if(req.params.title && req.params.description && req.params.positionPane) {
			next();
		}else {
			res.statusCode = 400;
			res.send({ message:"You didn't provide a required parameter."});
		}
	  
	}

	return this;
}

module.exports = new panoInfoElementController();
