var User,
hal,
jwt,
config,
docsPerPage,
pageNumber,
pageLimit;

//modules
User = require('../models/user');
Tour = require('../models/tour');
hal = require('hal');
jwt = require('jsonwebtoken');
config = require('../../../config');


function tourController () {

	this.getTours = function (req, res, next) {

		if(!(typeof req.params.page == 'undefined')) {
			pageNumber = req.params.page;
		}else {
			pageNumber = config.pagination.defaultPageNumber;
		}

		if(!(typeof req.params.pageLimit == 'undefined')) {
			pageLimit = req.params.pageLimit;
		}else {
			pageLimit = config.pagination.defaultPageNumber;
		}

		return Tour.findPaginated({},{},{populate:'image'}, function(err, result) {
			var resources,
			tours;

			if(err) {
				res.status = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
        		return res.send({ error: err.message });
			} 

			tours = {};
			tours.items = result.documents;

			if(!(typeof result.nextPage == 'undefined')) {
				tours.nextPage = result.nextPage;
			}

			if(!(typeof result.prevPage == 'undefined')) {
				tours.prevPage = result.prevPage;
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
					pageLimit : pageLimit,
					total : result.totalPages,
				}, '/tours?page='+pageNumber);

	    		resourceCollection.link(new hal.Link("first", "/tours?page=1"));

	    		if(!(typeof result.nextPage == 'undefined')) {
	    			resourceCollection.link(new hal.Link("next", "/tours?page="+result.nextPage));
				}
				if(!(typeof result.prevPage == 'undefined')) {
	    			resourceCollection.link(new hal.Link("prev", "/tours?page="+result.prevPage));
				}

	    		resourceCollection.link(new hal.Link("last", "/tours?page="+result.totalPages));

	    		resources = [];

	    		tours.items.forEach(function(tour, index) {
	    			var tourDeserialize;
	    			
	    			tourDeserialize = tour.toJSON();
				 	resources.push(new hal.Resource(tour.toJSON(), "/tours/"+tourDeserialize.id));
	    		});

	    		resourceCollection.embed("tours", resources);
	    		
	    		return res.send(resourceCollection);
			}
		}, pageLimit, pageNumber);
		
	};

	this.getTour = function (req, res, next) {

		return Tour.findOne({ _id:req.params.id})
			.populate('user')
			.populate('pano')
			.populate('image')
			.populate('floorplan')
			.exec(function (err, tour) {

			  if(err) {

					res.status = 500;
					console.log('Internal error(%d): %s',res.statusCode,err.message);
	        		return res.send({ error: 'Server error' });
				}else {
					var resource;

					tour.user[0].password = undefined;
					resource = new	hal.Resource(tour.toJSON(), '/tours/'+req.params.id);
					return res.send(resource);
				}
			});
	};

	this.createTour = function (req, res, next) {
		var model,
		decoded;

		model  = {};

		if(req.params.name) model.name = req.params.name;
	    if(req.params.description) model.description = req.params.description;
	    if(req.params.location) model.location = req.params.location;
	    if(req.params.type) model.type = req.params.type;

	    if(req.params.user) model.user = req.params.user.id;

	    if(req.params.panos) model.pano = req.params.panos;

	    if(req.params.images) model.image = req.params.images;
	
	    if(req.params.floorplans) model.floorplan = req.params.floorplans;
		

	 //    try {
		//     decoded = jwt.verify(req.session.token, config.security.secretToken);
		// } catch(err) {
		//   // err
		//   permisions = false;
		//   res.statusCode = 401;
		//   return res.send({"message":"require permisions."});
		// }

			// if (decoded) model.user = decoded.id;

		    Tour.create(model, function(err, result) {
		    	if(err) {
		    		console.log(err);
		    		return res.send({'Server error':err});
		    	}else {
		    		var resource;

		    		resource = new hal.Resource(result.toJSON(), '/tours/'+result.id);
		    		return res.send(resource);
		    	}
		    });
	};

	this.updateTour = function (req, res, next) {
		var model;

		model = {};

		if(req.params.name) model.name = req.params.name;
	    if(req.params.description) model.description = req.params.description;
	    if(req.params.location) model.location = req.params.location;
	    if(req.params.type) model.type = req.params.type;

	    model.pano      = [];
	    model.image     = [];
	    model.floorplan = [];

	    if(req.params.pano && req.params.pano.length > 0) {

	    	req.params.pano.forEach(function(v) {
	    		if(v.hasOwnProperty('id')) {
	    			model.pano.push(v.id);
	    		}
	    	});
	    }

	    if(req.params.image && req.params.image.length > 0) {

	    	if(req.params.image[0].hasOwnProperty('id')) {
	    		model.image.push(req.params.image[0].id);
	    	}
	    }

	    if(req.params.floorplan && req.params.floorplan.length > 0) {

	    	if(req.params.floorplan[0].hasOwnProperty('id')) {
	    		model.floorplan.push(req.params.floorplan[0].id);
	    	}
	    }

	    console.log(model.pano);

		Tour.findByIdAndUpdate(req.params.id, model, {}, function(err, data) {
			console.log(err);
			// console.log(data);
			res.statusCode = 204;
			return res.send("nothing");
		});
	};

	this.deleteTour = function (req, res, next) {

		return Tour.findById(req.params.id, function(err, tour) {
			if(!tour) {
				res.statusCode = 404;
				return res.send({ error: 'Not found' });
			}
			
			return tour.remove(function(err) {
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

	//method validate tour form fields required
	this.requireFields = function(req, res, next) {
		var model;

		if(req.params.name && req.params.description) {
			next();
		}else {
			res.statusCode = 400;
			res.send({ message:"You didn't provide a required parameter."});
		}
	  
	}

	return this;
}

module.exports = new tourController();
