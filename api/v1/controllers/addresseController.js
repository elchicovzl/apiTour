var User,
hal,
jwt,
config,
docsPerPage,
pageNumber,
Addresses;

hal = require('hal');
jwt = require('jsonwebtoken');
config = require('../../../config');
Addresses = require('../models/addresses');

function addresseController () {

	this.getAddresses = function(req, res, next) {

		if(!(typeof req.params.page == 'undefined')) {
			pageNumber = req.params.page;
		}else {
			pageNumber = config.pagination.defaultPageNumber;
		}

		return Addresses.findPaginated(function(err, result) {
			var resources,
			addresses;

			if(err) {
				res.status = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
        		return res.send({ error: err.message });
			}

			addresses = {};
			addresses.items = result.documents;

			if(!(typeof result.nextPage == 'undefined')) {
				addresses.nextPage = result.nextPage;
			}

			if(!(typeof result.prevPage == 'undefined')) {
				addresses.prevPage = result.prevPage;
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
				}, '/addresses?page='+pageNumber);

	    		resourceCollection.link(new hal.Link("first", "/addresses?page=1"));

	    		if(!(typeof result.nextPage == 'undefined')) {
	    			resourceCollection.link(new hal.Link("next", "/addresses?page="+result.nextPage));
				}
				if(!(typeof result.prevPage == 'undefined')) {
	    			resourceCollection.link(new hal.Link("prev", "/addresses?page="+result.prevPage));
				}

	    		resourceCollection.link(new hal.Link("last", "/addresses?page="+result.totalPages));

	    		resources = [];

	    		addresses.items.forEach(function(address, index) {
	    			var addressDeserialize;
	    			
	    			addressDeserialize = address.toJSON();
				 	resources.push(new hal.Resource(address.toJSON(), "/addresses/"+addressDeserialize.id));
	    		});

	    		resourceCollection.embed("addresses", resources);
	    		
	    		return res.send(resourceCollection);
			}
		}, config.pagination.defaultItemsPerPage, pageNumber);

	}

	this.getAddress = function(req, res, next) {

		return Addresses.findOne({ _id:req.params.id})
			.populate('user')
			.exec(function (err, addresse) {

			  if(err) {

					res.status = 500;
					console.log('Internal error(%d): %s',res.statusCode,err.message);
	        		return res.send({ error: 'Server error' });
				}else {
					var resource;

					// addresse.user[0].password = undefined;
					resource = new	hal.Resource(addresse.toJSON(), '/addresses/'+req.params.id);
					return res.send(resource);
				}
			});
	}

	this.createAddress = function(req, res, next) {
		var model,
		decoded;

		model  = {};

		if(req.params.line1) model.line1 = req.params.line1;
		if(req.params.line2) model.line2 = req.params.line2;
		if(req.params.line3) model.line3 = req.params.line3;
	    if(req.params.city) model.city = req.params.city;
	    if(req.params.region) model.region = req.params.region;
	    if(req.params.postCode) model.postCode = req.params.postCode;
	    if(req.params.country) model.country = req.params.country;

	 //    try {
		//     decoded = jwt.verify(req.session.token, config.security.secretToken);
		// } catch(err) {
		//   // err
		//   permisions = false;
		//   return res.send({"message":"require permisions."});
		// }

			// if (decoded) model.user = decoded.id;

	    Addresses.create(model, function(err, result) {
	    	if(err) {
	    		console.log(err);
	    		return res.send({'Server error':err});
	    	}else {
	    		var resource;

	    		resource = new hal.Resource(result.toJSON(), '/addresses/'+result.id);
	    		return res.send(resource);
	    	}
	    });

	}

	this.updateAddress = function(req, res, next) {
		var model;

		model = {};

		if(req.params.line1) model.line1 = req.params.line1;
		if(req.params.line2) model.line2 = req.params.line2;
		if(req.params.line3) model.line3 = req.params.line3;
	    if(req.params.city) model.city = req.params.city;
	    if(req.params.region) model.region = req.params.region;
	    if(req.params.postCode) model.postCode = req.params.postCode;
	    if(req.params.country) model.country = req.params.country;

		Addresses.where({ _id: req.params.id }).update(model, function(err, data) {
			res.statusCode = 204;
			return res.send("nothing");
		});	


	}

	this.deleteAddress = function(req, res, next) {

		return Addresses.findById(req.params.id, function(err, address) {
			if(!address) {
				res.statusCode = 404;
				return res.send({ error: 'Not found' });
			}
			
			return address.remove(function(err) {
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

	this.requireFields = function(req, res, next) {
		var model;

		if(req.params.line1) {
			next();
		}else {
			res.statusCode = 400;
			res.send({ message:"You didn't provide a required parameter."});
		}
	  
	}

	return this;
}

module.exports = new addresseController();