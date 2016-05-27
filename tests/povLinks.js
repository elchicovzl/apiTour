var should,
assert,
request;


should = require('should'); 
assert = require('assert');
request = require('supertest');  

module.exports = {};

module.exports.POVLinks = function(url, cookie) {

	describe('POVLinks', function() {
		var id;

		it('gel all POVLinks', function(done) {

			request(url).get('/povLinks')
			.expect('Content-Type', /json/)
			.expect(200) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}
				
          		done();
			})
		});

		it('create POVLinks', function(done) {
			var povL;

			povL = {
				title: 'test',
				positionPhotosphere: 'test',
		        positionFlorplan: 'test'
		    };

			request(url).post('/povLinks')
			.set('cookie', cookie)
			.send(povL)
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

		it('get POVLinks by id', function(done) {

			request(url).get('/povLinks/'+ id)
			.expect('Content-Type', /json/)
			.expect(200) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}
          		done();
			})
		});

		it('update POVLinks', function(done) {
			var povL;

			povL = {
				title: 'update test'
			}

			request(url).put('/povLinks/'+ id)
			.send(povL)
			.expect(204) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}
          		done();
			})
		});

		it('delete POVLinks', function(done) {

			request(url).delete('/povLinks/'+ id)
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