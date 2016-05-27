var should,
assert,
request;


should = require('should'); 
assert = require('assert');
request = require('supertest');  

module.exports = {};

module.exports.files = function(url) {

	describe('Files', function() {
		var id;
		this.timeout(30000);

		it('upload file', function(done) {

			request(url).post('/files')
			.field('name', 'file')
			.attach('file', './tests/test.jpg')
			.expect(200) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}

				id = res.body.key;
          		done();
			})
		});

		it('get a file by id', function(done) {

			request(url).get('/files/'+ id)
			.expect('Content-Type', 'image/jpeg')
			.expect(200) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}

          		done();
			})
		});

		it('update a file by id', function(done) {

			request(url).put('/files/'+ id)
			.field('name', 'file')
			.attach('file', './tests/test.jpg')
			.expect(204) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}

          		done();
			})
		});

		it('delete a file by id', function(done) {

			request(url).delete('/files/'+ id)
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