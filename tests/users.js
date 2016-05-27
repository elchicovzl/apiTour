var should,
assert,
request;


should = require('should'); 
assert = require('assert');
request = require('supertest');  

module.exports = {};

module.exports.users = function(url) {

	describe('Users', function() {
		var id;

		it('get all users', function(done) {

			request(url).get('/users')
			.expect('Content-Type', /json/)
			.expect(200) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}
          		done();
			})
		});

		it('create user', function(done) {
			var user;

			user = {
				name: 'test',
				lastName: 'lastname test',
		        userName: 'test',
		        email: 'test@test.com',
		        password: 'test',
		        avatar: 'testAvatar'
		    };

			request(url).post('/users')
			.send(user)
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

		it('duplicate username in create request', function(done) {
			var user;

			user = {
				name: 'test',
				lastName: 'lastname test',
		        userName: 'test',
		        email: 'test2@test.com',
		        password: 'test',
		        avatar: 'testAvatar'
		    };

			request(url).post('/users')
			.send(user)
			.expect('Content-Type', /json/)
			.expect(409) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}

          		done();
			})
		});

		it('duplicate email', function(done) {
			var user;

			user = {
				name: 'test',
				lastName: 'lastname test',
		        userName: 'test2',
		        email: 'test@test.com',
		        password: 'test',
		        avatar: 'testAvatar'
		    };

			request(url).post('/users')
			.send(user)
			.expect('Content-Type', /json/)
			.expect(409) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}

          		done();
			})
		});

		it('get user by id', function(done) {

			request(url).get('/users/'+ id)
			.expect('Content-Type', /json/)
			.expect(200) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}
          		done();
			})
		});

		it('update user', function(done) {
			var user;
			
			user = {
				name: 'updateTest',
				lastName: 'update lastname test'
		    };

			request(url).put('/users/'+ id)
			.send(user)
			.expect(204) //Status code
			.end(function(err, res) {
				if (err) {
					throw err;
				}
				
          		done();
			})
		});

		it('delete user', function(done) {

			request(url).delete('/users/'+ id)
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