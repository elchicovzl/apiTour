var should,
assert,
request;


should = require('should'); 
assert = require('assert');
request = require('supertest');  

module.exports = {};

module.exports.panos = function(url) {
	
	describe('panos', function() {
		var id;

		it('get all panos', function(done) {

			request(url).get('/panos')
			.expect(200) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}
				
          		done();
			})
		});

		it('create pano', function(done) {
			var pano;

			pano = {
				name: 'test',
				locationURL: 'description test'
		    };

			request(url).post('/panos')
			.send(pano)
			.expect(200) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}

				id = res.body.id;
          		done();
			})
		});

		it('get pano by id', function(done) {

			request(url).get('/panos/'+ id)
			.expect('Content-Type', /json/)
			.expect(200) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}
          		done();
			})
		});

		it('update pano', function(done) {
			var pano;

			pano = {
				name: 'update test',
				description: 'update description test',
			}

			request(url).put('/panos/'+ id)
			.send(pano)
			.expect(204) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}
	      		done();
			})
		});

		it('delete pano', function(done) {
			var pano;

			request(url).delete('/panos/'+ id)
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