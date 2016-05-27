var should,
assert,
request,
winston,
config,
mongoose,
users,
panos,
panoInfo,
povLinks,
addresses,
tours,
files;  

mongoose = require('mongoose');
config = require('../config');
should = require('should'); 
assert = require('assert');
request = require('supertest');

users = require('./users');
panos = require('./panos');
panoInfo = require('./panoInfoElements');
povLinks = require('./povLinks');
addresses = require('./addresses');
tours = require('./tours');
files = require('./file');  

describe('Routing', function() {
	var url,
	cookie;

	this.timeout(5000); //sets timeout to 5 sec

	url = config.server.ip_addr + ":" + config.server.port;

	before(function(done) {
	    // In our tests we use the test db
	    mongoose.connect(config.db.dbPath);
	    done();
	});

	describe('Access - login', function() {

		it('login', function(done) {

			request(url).post('/login')
			.send({username:'root', password:'root'})
			.expect(200) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}

				cookie = res.headers['set-cookie'];

				//tests
				users.users(url);
				tours.tours(url, cookie);
				panos.panos(url);
				panoInfo.panoInfoElements(url);
				povLinks.POVLinks(url, cookie);
				addresses.addresses(url);
				files.files(url);

         		done();
			})
		});
	});
});
