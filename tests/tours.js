var should,
assert,
request;


should = require('should'); 
assert = require('assert');
request = require('supertest');  

module.exports = {};

module.exports.tours = function(url, cookie) {

	describe('Tours', function() {
		var id;

		it('get all tours', function(done) {

			request(url).get('/tours')
			.expect('Content-Type', /json/)
			.expect(200) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}
          		done();
			})
		});

		it('create tour', function(done) {
			var tour;

			tour = {
				name: 'test',
				description: 'description test',
		        location: 'test',
		        type: 'test',
		        pano: 'test',
		        image: 'testImage'
		    };

			request(url).post('/tours')
			.set('cookie', cookie)
			.send(tour)
			.expect('Content-Type', /json/)
			.expect(200) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}

				id = res.body.id;
          		done();
			})
		});

		it('get tour by id', function(done) {

			request(url).get('/tours/'+ id)
			.expect('Content-Type', /json/)
			.expect(200) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}
          		done();
			})
		});

		it('update tour', function(done) {
			var tour;

			tour = {
				name: 'update test',
				description: 'update description test',
			}

			request(url).put('/tours/'+ id)
			.send(tour)
			.expect(204) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}
          		done();
			})
		});

		it('delete tour', function(done) {

			request(url).delete('/tours/'+ id)
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