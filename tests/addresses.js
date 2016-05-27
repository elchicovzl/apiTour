var should,
assert,
request;


should = require('should'); 
assert = require('assert');
request = require('supertest');  

module.exports = {};

module.exports.addresses = function(url) {
	
	describe('Addresses', function() {
		var id;

		it('get all addresses', function(done) {

			request(url).get('/addresses')
			.expect(200) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}
				
          		done();
			})
		});

		it('create address', function(done) {
			var address;

			address = {
				line1: 'test line1',
				line2: 'test line2',
				line3: 'test line3',
				city: 'test city',
				region: 'test region',
				postCode: 'test postCode',
				country: 'test country'
		    };

			request(url).post('/addresses')
			.send(address)
			.expect(200) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}

				id = res.body.id;
          		done();
			})
		});

		it('get address by id', function(done) {

			request(url).get('/addresses/'+ id)
			.expect('Content-Type', /json/)
			.expect(200) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}
          		done();
			})
		});

		it('update address', function(done) {
			var address;

			address = {
				name: 'update line1 test',
			}

			request(url).put('/addresses/'+ id)
			.send(address)
			.expect(204) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}
	      		done();
			})
		});

		it('delete address', function(done) {
			var address;

			request(url).delete('/addresses/'+ id)
			.expect(204) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}
	      		done();
			})
		});
	});
}