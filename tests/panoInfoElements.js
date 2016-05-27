var should,
assert,
request;


should = require('should'); 
assert = require('assert');
request = require('supertest');  

module.exports = {};

module.exports.panoInfoElements = function(url) {

	describe('panoInfoElements', function() {
		var id;

		it('get all panoInfoElements', function(done) {

			request(url).get('/panoInfoElements')
			.expect('Content-Type', /json/)
			.expect(200) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}
          		done();
			})
		});

		it('create panoInfoElement', function(done) {
			var panoInfo;

			panoInfo = {
				title: 'test',
				description: 'test',
				positionPane: 'test'
			};

			request(url).post('/panoInfoElements')
			.send(panoInfo)
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

		it('get panoInfoElement by id', function(done) {

			request(url).get('/panoInfoElements/'+ id)
			.expect('Content-Type', /json/)
			.expect(200) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}
          		done();
			})
		});

		it('update panoInfoElement', function(done) {
			var panoInfo;

			panoInfo = {
				title: 'update test'
			};

			request(url).put('/panoInfoElements/'+ id)
			.send(panoInfo)
			.expect(204) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}
          		done();
			})
		});

		it('delete panoInfoElement', function(done) {

			request(url).delete('/panoInfoElements/'+ id)
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