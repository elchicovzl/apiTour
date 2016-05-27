module.exports = function(app) {
	var fs,
		user,
		tour,
		pano,
	 	povLink, 
	 	file, 
	 	panoInfoElements, 
	 	address,
	 	imagen,
	 	floorPlan, 
	 	AWS, 
	 	config; 

	fs                = require('fs');
	user 			  = require('./controllers/userController');
	tour 			  = require('./controllers/tourController');
	pano 			  = require('./controllers/panoController');
	povLink 		  = require('./controllers/povLinkController');
	file 			  = require('./controllers/fileController');
	panoInfoElements  = require('./controllers/panoInfoElementController');
	address 		  = require('./controllers/addresseController');
	imagen 			  = require('./controllers/imageController');
	floorplans		  = require('./controllers/floorplanController');
	AWS 			  = require('aws-sdk');
	config 			  = config = require('../../config');


	app.get('/', function(req, res, next) {
		return res.send("Welcome to Virtualitour API");
	});

	app.post('/forgot', user.forgot);
	app.post('/validToken', user.validToken);
	app.post('/resetPassword', user.resetPassword);

	/**
	 * @api {post} /login login - init session.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/login
	 * @apiVersion 0.1.0
	 * @apiName login
	 * @apiGroup Access
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiParam {String} username UserName of the User.
	 * @apiParam {String} password password of the User.
	 * 
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "code": 0,
	 *       "response": true
	 *     }
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "UserNotFound"
	 *     }
	 */
	app.post('/login', user.login);

	/**
	 * @api {get} /logout logout - close session.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/logout
	 * @apiVersion 0.1.0
	 * @apiName logout
	 * @apiGroup Access
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 * @apiSuccess {Bool} true/false  True o false.
	 *
	 * 
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "code": 0,
	 *       "response": true
	 *     }
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "UserNotFound"
	 *     }
	 */
	app.get('/logout', user.logout);

 	/**
	 * @api {get} /users/ get all users.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/users
	 * @apiVersion 0.1.0
	 * @apiName getUsers
	 * @apiGroup User
	 *
	 * @apiSuccess {Number} code  Código 0 good.
     * 
	 * @apiParam {Number} [page=1] page of the pagination.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "embedded": 
	 *           {
	 *            "users":
	 *            {
	 *                [
     *                    "0": 
     *                        {
     *                             "links" : 
     *                                {
     *                                    "self" : 
     *                                        {
     *                                            "href": "String"	
     *                                        } 	
     *                                 },
     *                             "email" : "String",
     *                             "id" : "String",
     *                             "name" : "String",
     *                             "lastName" : "String",
     *                             "userName" : "String",
     *                             "avatar" : "String"
     *                        }	
	 *                 ]
	 *            }
	 *         },
	 *         "links" : 
	 *              {
     *               "first" : "String",
     *               "last" : "String",
     *               "next" : "String",
     *               "prev" : "String",
     *               "self" : "String"
	 *              }
	 *  
	 *       "page" : "Number",
	 *       "pageLimit" : "Number",
	 *       "total" : "Number",
	 *     }
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "UserNotFound"
	 *     }
	 */
	app.get('/users', user.requireLogin, user.getUsers);

	/**
	 * @api {get} /users/:id get one  user by Id.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/users/:id
	 * @apiVersion 0.1.0
	 * @apiName getUser
	 * @apiGroup User
	 *
	 * @apiParam {String} id ID of the User.
	 * 
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "links" :
	 *            {
     *                 "self" : 
     *                     {
     *                          "href": "String"    	
     *                     } 
	 *            },      
	 *            "email" : "String",
	 *            "id" : "String",
	 *            "name" : "String",
	 *            "lastName" : "String",
	 *            "userName" : "String",
	 *            "avatar" : "String"
	 *     }
	 *
	 * @apiError UserNotFound The id of the User was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 400 Not Found
	 *     {
	 *       "error": "UserNotFound"
	 *     }
	 */
	app.get('/users/:id', user.requireLogin, user.getUser);

	/**
	 * @api {post} /users create user.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/users
	 * @apiVersion 0.1.0
	 * @apiName createUser
	 * @apiGroup User
	 *
	 * @apiParam {String} name Name of the User (Required).
	 * @apiParam {String} lastName LastName of the User (Required).
	 * @apiParam {String} userName UserName of the User (Required).
	 * @apiParam {String} email email of the User (Required).
	 * @apiParam {String} password of the User (Required).
	 * @apiParam {String} [avatar] Avatar of the User.
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "links" :
	 *            {
     *                 "self" : 
     *                     {
     *                          "href": "String"    	
     *                     } 
	 *            },      
	 *            "email" : "String",
	 *            "id" : "String",
	 *            "name" : "String",
	 *            "lastName" : "String",
	 *            "userName" : "String",
	 *            "avatar" : "String"
	 *     }
	 *
	 * @apiError UserNotFound The id of the User was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "UserNotFound"
	 *     }
	 */
	app.post('/users', user.requireLogin, user.requireFields ,user.createUser);

	/**
	 * @api {put} /users/:id update user.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/users/ 
	 * @apiVersion 0.1.0
	 * @apiName updateUser
	 * @apiGroup User
	 *
	 * @apiParam {String} id id of the User (Required). 
	 * @apiParam {String} name Name of the User.
	 * @apiParam {String} lastName LastName of the User.
	 * @apiParam {String} userName UserName of the User.
	 * @apiParam {String} email email of the User.
	 * @apiParam {String} password of the User.
	 * @apiParam {String} [avatar] Avatar of the User.
	 *
	 * @apiSuccess {Number} code  Código 200 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 204 OK
	 *
	 * @apiError UserNotFound The id of the User was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "UserNotFound"
	 *     }
	 */
	app.put('/users/:id', user.requireLogin, user.updateUser);

	/**
	 * @api {delete} /users/:id delete user.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/users/:id 
	 * @apiVersion 0.1.0
	 * @apiName deleteUser
	 * @apiGroup User
	 *
	 * @apiParam {String} id id of the User (Required). 
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 204 OK
	 *
	 * @apiError UserNotFound The id of the User was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "UserNotFound"
	 *     }
	 */
	app.del('/users/:id', user.requireLogin, user.deleteUser);


	// **-----------------  api routes for TOUR. --------------------------**

	/**
	 * @api {get} /tours tours - get all tours.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/tours
	 * @apiVersion 0.1.0
	 * @apiName tours
	 * @apiGroup Tour
	 *
	 * @apiSuccess {Number} code  Código 200 good.
	 * 
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
     *          "links": 
     *              {
     *                  "self": 
     *                      {
     *                          "href": "String"
     *                      }
     *              },
     *          "embedded": 
     *              {
     *                  "tours": 
     *                      [
     *                          {
     *                               "name": "String",
     *                               "description": "String",
     *                               "location": "String",
     *                               "type": "Boolean",
     *                               "createdDate": "Date",
     *                               "embedded" : 
     *                                   {
	 *                                       "panos": "Array",
	 *                                       "images": "Array"     
     *                                   },
     *                               "links": 
     *                                   {
     *                                       "self": 
     *                                           {
     *                                               "href": "String"
     *                                           }
     *                                   }
     *                          },
     *                      ]    
     *              },
     *              "links" : 
	 *                  {
     *                       "first" : "String",
     *                       "last" : "String",
     *                       "next" : "String",
     *                       "prev" : "String",
     *                       "self" : "String"
	 *                  },
	 *              "page" : "Number",
	 *              "pageLimit" : "Number",
	 *              "total" : "Number",
     *     }
     *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "TourNotFound"
	 *     }
	 */
	app.get('/tours' ,user.requireLogin ,tour.getTours);

	/**
	 * @api {get} /tours/:id get tour - get one tour by id.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/tours/:id
	 * @apiVersion 0.1.0
	 * @apiName getTour
	 * @apiGroup Tour
	 *
	 * @apiSuccess {Number} code  Código 200 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
 	 *     {
	 *       "links" :
	 *            {
     *                 "self" : 
     *                     {
     *                          "href": "String"    	
     *                     } 
	 *            },
	 *       "name": "String",
     *       "description": "String",
     *       "location": "String",
     *       "type": "Boolean",
     *       "createdDate": "Date",
     *       "embedded" : 
     *           {
	 *               "panos": "Array",
	 *               "images": "Array"     
     *           }      
	 *     }
	 *
 	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "TourNotFound"
	 *     }	
	 */
	 app.get('/tours/:id' ,user.requireLogin, tour.getTour);

	 /**
	 * @api {post} /tours create tour.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/tours
	 * @apiVersion 0.1.0
	 * @apiName createTour
	 * @apiGroup Tour
	 *
	 * @apiParam {String} name Name of the tour (Required).
	 * @apiParam {String} description Description of the tour (Required).
	 * @apiParam {String} location Location of the tour (Required).
	 * @apiParam {Boolean} type Type of the Tour (Required).
	 * @apiParam {Date} createdDate Create date of the Tour (Required).
	 * @apiParam {String} pano Photosphere entity ref of the Tour.
	 * @apiParam {String} image image entity ref of the Tour.
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "links" :
	 *            {
     *                 "self" : 
     *                     {
     *                          "href": "String"    	
     *                     } 
	 *            },
	 *       "id": "String",
	 *       "name": "String",
     *       "description": "String",
     *       "location": "String",
     *       "type": "Boolean",
     *       "createdDate": "Date",
     *       "embedded" : 
     *           {
	 *               "panos": "Array",
	 *               "images": "Array"     
     *           }      
	 *     }
	 *
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "TourNotFound"
	 *     }
	 */
	app.post('/tours' ,user.requireLogin, tour.requireFields, tour.createTour);

	/**
	 * @api {put} /tours/:id update tour.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/tours/ 
	 * @apiVersion 0.1.0
	 * @apiName updateTour
	 * @apiGroup Tour
	 *
	 * @apiParam {String} id id of the tour (Required). 
	 * @apiParam {String} name Name of the tour (Required).
	 * @apiParam {String} description Description of the tour (Required).
	 * @apiParam {String} location Location of the tour (Required).
	 * @apiParam {Boolean} type Type of the Tour (Required).
	 * @apiParam {Date} createdDate Create date of the Tour (Required).
	 * @apiParam {String} photosphereId Photosphere entity ref of the Tour (Required).
	 * @apiParam {String} imagesId image entity ref of the Tour (Required).
	 *
	 * @apiSuccess {Number} code  Código 200 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 204 OK
	 *
	 * @apiError TourNotFound The id of the Tour was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "TourNotFound"
	 *     }
	 */
	app.put('/tours/:id' ,user.requireLogin, tour.updateTour);

	/**
	 * @api {delete} /tours/:id delete tour.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/tours/:id 
	 * @apiVersion 0.1.0
	 * @apiName deleteTour
	 * @apiGroup Tour
	 *
	 * @apiParam {String} id id of the Tour (Required). 
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 204 OK
	 *
	 * @apiError TourNotFound The id of the Tour was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "UserNotFound"
	 *     }
	 */
	app.del('/tours/:id' ,user.requireLogin, tour.deleteTour);


	// **-----------------  api routes for Pano. --------------------------**

	/**
	 * @api {get} /panos panos - get all panos.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/panos
	 * @apiVersion 0.1.0
	 * @apiName pano
	 * @apiGroup Pano
	 *
	 * @apiSuccess {Number} code  Código 200 good.
	 * 
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
     *          "links": 
     *              {
     *                  "self": 
     *                      {
     *                          "href": "http://localhost:8080/panos"
     *                      }
     *              },
     *          "embedded": 
     *              {
     *                  "panos": 
     *                      [
     *                          {
     *                               "name": "String",
     *                               "locationURL": "String",
     *                               "embedded" : 
     *                                   {
	 *                                       "povLinks": "Array",
	 *                                       "panoInfoElements": "Array"     
     *                                   },
     *                               "links": 
     *                                   {
     *                                       "self": 
     *                                           {
     *                                               "href": "String"
     *                                           }
     *                                   }
     *                          },
     *                      ]    
     *              },
     *              "links" : 
	 *                  {
     *                       "first" : "String",
     *                       "last" : "String",
     *                       "next" : "String",
     *                       "prev" : "String",
     *                       "self" : "String"
	 *                  },
	 *              "page" : "Number",
	 *              "pageLimit" : "Number",
	 *              "total" : "Number",
     *     }
     *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "TourNotFound"
	 *     }
	 */
	app.get('/panos' ,user.requireLogin ,pano.getPanos);

	/**
	 * @api {get} /panos/:id get pano - get one pano by id.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/panos/:id
	 * @apiVersion 0.1.0
	 * @apiName getPano
	 * @apiGroup Pano
	 *
	 * @apiSuccess {Number} code  Código 200 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
 	 *     {
	 *       "links" :
	 *            {
     *                 "self" : 
     *                     {
     *                          "href": "String"    	
     *                     } 
	 *            },
	 *       "name": "String",
     *       "locationURL": "String",
     *       "embedded" : 
     *           {
	 *               "povLinks": "Array",
	 *               "panoInfoElements": "Array"     
     *           }      
	 *     }
	 *
 	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "TourNotFound"
	 *     }	
	 */
	 app.get('/panos/:id', user.requireLogin, pano.getPano);

	 /**
	 * @api {post} /panos create pano.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/panos
	 * @apiVersion 0.1.0
	 * @apiName createPano
	 * @apiGroup Pano
	 *
	 * @apiParam {String} name Name of the pano (Required).
	 * @apiParam {String} locationURL location of the pano (Required).
	 * @apiParam {String} povLinks ref to point of view  of the pano.
	 * @apiParam {String} panoInfoElements ref to panoInfoElemnts entity of the pano.
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "links" :
	 *            {
     *                 "self" : 
     *                     {
     *                          "href": "String"    	
     *                     } 
	 *            },
	 *       "id": "String",
	 *       "name": "String",
     *       "locationURL": "String",
     *       "embedded" : 
     *           {
	 *               "povLinks": "Array",
	 *               "panoInfoElements": "Array"     
     *           }      
	 *     }
	 *
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "TourNotFound"
	 *     }
	 */
	app.post('/panos', user.requireLogin, pano.requireFields, pano.createPano);

	/**
	 * @api {put} /panos/:id update pano.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/panos/ 
	 * @apiVersion 0.1.0
	 * @apiName updatePano
	 * @apiGroup Pano
	 *
	 * @apiParam {String} id id of the pano (Required). 
	 * @apiParam {String} name Name of the tour (Required).
	 * @apiParam {String} locationURL location of the pano (Required).
	 * @apiParam {String} povLinks ref to point of view  of the pano.
	 * @apiParam {String} panoInfoElements ref to panoInfoElemnts entity of the pano.
	 *
	 * @apiSuccess {Number} code  Código 200 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 204 OK
	 *
	 * @apiError PanoNotFound The id of the Pano was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "PanoNotFound"
	 *     }
	 */
	app.put('/panos/:id', user.requireLogin, pano.updatePano);

	/**
	 * @api {delete} /panos/:id delete pano.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/panos/:id 
	 * @apiVersion 0.1.0
	 * @apiName deletePano
	 * @apiGroup Pano
	 *
	 * @apiParam {String} id id of the Pano (Required). 
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 204 OK
	 *
	 * @apiError PanoNotFound The id of the Pano was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "PanoNotFound"
	 *     }
	 */
	app.del('/panos/:id', user.requireLogin, pano.deletePano);


	// app.post("/uploads", function(req,res) {
	// 	var tmp_path = req.files.image.path;
	// 	var target_path = 'uploads/';

	// 	fs.readFile(tmp_path, function(err, data) {
	// 		console.log(data);
	// 	  // var path = __dirname + '/' + file.name;
	// 	  fs.writeFile(target_path + 'algo.jpg', data, function(err) {
	// 	  	if (err) console.log(err);
		  	
	// 	  });
	// 	});
	// });


	// **-----------------  api routes for POVLinks. --------------------------**

	/**
	 * @api {get} /povLinks povLinks - get all povLinks.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/povLinks
	 * @apiVersion 0.1.0
	 * @apiName get all povLinks
	 * @apiGroup POVLink
	 *
	 * @apiSuccess {Number} code  Código 200 good.
	 * 
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
     *          "links": 
     *              {
     *                  "self": 
     *                      {
     *                          "href": "String"
     *                      }
     *              },
     *          "embedded": 
     *              {
     *                  "povLinks": 
     *                      [
     *                          {
     *                               "title": "String",
     *                               "positionPhotosphere": "String",
     *                               "positionFlorplan": "String",
     *                               "embedded" : 
     *                                   {
	 *                                       "pano": "Array"
     *                                   },
     *                               "links": 
     *                                   {
     *                                       "self": 
     *                                           {
     *                                               "href": "String"
     *                                           }
     *                                   }
     *                          },
     *                      ]    
     *              },
     *              "links" : 
	 *                  {
     *                       "first" : "String",
     *                       "last" : "String",
     *                       "next" : "String",
     *                       "prev" : "String",
     *                       "self" : "String"
	 *                  },
	 *              "page" : "Number",
	 *              "pageLimit" : "Number",
	 *              "total" : "Number",
     *     }
     *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "POVLinkNotFound"
	 *     }
	 */
	app.get('/povLinks', user.requireLogin, povLink.getPOVLinks);

	/**
	 * @api {get} /povLinks/:id get povLink - get one povLink by id.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/povLinks/:id
	 * @apiVersion 0.1.0
	 * @apiName getPOVLinks
	 * @apiGroup POVLink
	 *
	 * @apiSuccess {Number} code  Código 200 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
 	 *     {
	 *       "links" :
	 *            {
     *                 "self" : 
     *                     {
     *                          "href": "String"    	
     *                     } 
	 *            },
	 *       "id": "String",
	 *       "title": "String",
     *       "positionPhotosphere": "String",
     *       "positionFlorplan": "String",
     *       "embedded" : 
     *           {
	 *               "pano": "Array"
     *           }      
	 *     }
	 *
 	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "POVLinkNotFound"
	 *     }	
	 */
	 app.get('/povLinks/:id', user.requireLogin, povLink.getPOVLink);

	/**
	 * @api {post} /povLinks create povLink.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/povLinks
	 * @apiVersion 0.1.0
	 * @apiName createPOVLinks
	 * @apiGroup POVLink
	 *
	 * @apiParam {String} title title of the povLink (Required).
	 * @apiParam {String} positionPhotosphere positionPhotosphere of the povLink (Required).
	 * @apiParam {String} positionFlorplan positionFlorplan the povLink.
	 * @apiParam {String} pano ref to pano entity of the pano.
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "links" :
	 *            {
     *                 "self" : 
     *                     {
     *                          "href": "String"    	
     *                     } 
	 *            },
	 *       "id": "String",
	 *       "title": "String",
     *       "positionPhotosphere": "String",
     *       "positionFlorplan": "String",
     *       "embedded" : 
     *           {
	 *               "pano": "Array"
     *           }      
	 *     }
	 *
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "POVLinkNotFound"
	 *     }
	 */
	app.post('/povLinks',user.requireLogin, povLink.requireFields, povLink.createPOVLinks);

	/**
	 * @api {put} /povLinks/:id update povLinks.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/povLinks/:id 
	 * @apiVersion 0.1.0
	 * @apiName updatePOVLinks
	 * @apiGroup POVLink
	 *
	 * @apiParam {String} id id of the pano (Required). 
	 * @apiParam {String} title title of the povLink (Required).
	 * @apiParam {String} positionPhotosphere positionPhotosphere of the povLink (Required).
	 * @apiParam {String} positionFlorplan positionFlorplan the povLink.
	 * @apiParam {String} pano ref to pano entity of the pano.
	 *
	 * @apiSuccess {Number} code  Código 200 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 204 OK
	 *
	 * @apiError POVLinksNotFound The id of the POVLink was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "POVLinkNotFound"
	 *     }
	 */
	app.put('/povLinks/:id', user.requireLogin, povLink.updatePOVLinks);

	/**
	 * @api {delete} /povLinks/:id delete povLinks.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/povLinks/:id 
	 * @apiVersion 0.1.0
	 * @apiName deletePOVLinks
	 * @apiGroup POVLink
	 *
	 * @apiParam {String} id id of the povLinks (Required). 
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 204 OK
	 *
	 * @apiError POVLinksNotFound The id of the povLinks was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "POVLinksNotFound"
	 *     }
	 */
	app.del('/povLinks/:id', user.requireLogin, povLink.deletePOVLinks);


	// **-----------------  api routes for Files. --------------------------**

	/**
	 * @api {get} /files/:id get file by id.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/files/:id 
	 * @apiVersion 0.1.0
	 * @apiName getFile
	 * @apiGroup File
	 *
	 * @apiParam {String} id id of the file (Required). 
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 204 OK
	 *     {
     *       "ContentType" : 'application/octet-stream',
     *       "Body" : "Image"  
     *     }
	 * @apiError fileNotFound The id of the file was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "fileNotFound"
	 *     }
	 */
	app.get('files/:id', file.getFile);

	/**
	 * @api {post} /files upload file.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/files
	 * @apiVersion 0.1.0
	 * @apiName uploadFile
	 * @apiGroup File
	 *
	 * @apiParam {String} id id of the file (Required). 
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 204 OK
	 *     {
	 *       "key": "String"
	 *     }
	 * @apiError fileNotFound The id of the file was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "fileNotFound"
	 *     }
	 */
	app.post('/files', file.uploadFile);
	

	/**
	 * @api {put} /files/:id update file.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/files
	 * @apiVersion 0.1.0
	 * @apiName updateFile
	 * @apiGroup File
	 *
	 * @apiParam {String} id id of the file (Required). 
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 204 OK
	 *
	 * @apiError fileNotFound The id of the file was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "fileNotFound"
	 *     }
	 */
	app.put('/files/:id', file.updateFile);

	/**
	 * @api {del} /files/:id delete file.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/files
	 * @apiVersion 0.1.0
	 * @apiName deleteFile
	 * @apiGroup File
	 *
	 * @apiParam {String} id id of the file (Required). 
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 204 OK
	 *
	 * @apiError fileNotFound The id of the file was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "fileNotFound"
	 *     }
	 */
	app.del('/files/:id', file.deleteFile);


	// **-----------------  api routes for Addresses. --------------------------**

	/**
	 * @api {get} /addresses addresses - get all addresses.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/addresses
	 * @apiVersion 0.1.0
	 * @apiName get all addresses
	 * @apiGroup Addresses
	 *
	 * @apiSuccess {Number} code  Código 200 good.
	 * 
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
     *          "links": 
     *              {
     *                  "self": 
     *                      {
     *                          "href": "String"
     *                      }
     *              },
     *          "embedded": 
     *              {
     *                  "addresses": 
     *                      [
     *                          {
     *                               "line1": "String",
     *                               "line2": "String",
     *                               "line3": "String",
     *                               "city": "String",
     *                               "region": "String",
     *                               "postCode": "String",
     *                               "country": "String"
     *                          },
     *                      ]    
     *              },
     *              "links" : 
	 *                  {
     *                       "first" : "String",
     *                       "last" : "String",
     *                       "next" : "String",
     *                       "prev" : "String",
     *                       "self" : "String"
	 *                  },
	 *              "page" : "Number",
	 *              "pageLimit" : "Number",
	 *              "total" : "Number",
     *     }
     *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "AddressesNotFound"
	 *     }
	 */
	 app.get('/addresses/', user.requireLogin, address.getAddresses);

	 /**
	 * @api {get} /addresses/:id address - get one address by id.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/addresses/:id
	 * @apiVersion 0.1.0
	 * @apiName getAddress
	 * @apiGroup Addresses
	 *
	 * @apiSuccess {Number} code  Código 200 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
 	 *     {
	 *       "links" :
	 *            {
     *                 "self" : 
     *                     {
     *                          "href": "String"    	
     *                     } 
	 *            },
	 *       "line1": "String",
     *       "line2": "String",
     *       "line3": "String",
     *       "city": "String",
     *       "region": "String",
     *       "postCode": "String",
     *       "country": "String"
	 *     }
	 *
 	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "addresskNotFound"
	 *     }	
	 */
	 app.get('/addresses/:id', user.requireLogin, address.getAddress);

	 /**
	 * @api {post} /addresses create address.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/addresses
	 * @apiVersion 0.1.0
	 * @apiName createAddress
	 * @apiGroup Addresses
	 *
	 * @apiParam {String} line1 line of the address (Required).
	 * @apiParam {String} line2 line of the address (Required).
	 * @apiParam {String} line3 line of  the address.
	 * @apiParam {String} city city of the address.
	 * @apiParam {String} region region of the address.
	 * @apiParam {String} postCode postCode of the address.
	 * @apiParam {String} country country of the address.
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "links" :
	 *            {
     *                 "self" : 
     *                     {
     *                          "href": "String"    	
     *                     } 
	 *            },
	 *       "id": "String",
	 *       "line1": "String",
     *       "line2": "String",
     *       "line3": "String",
     *       "city": "String",
     *       "region": "String",
     *       "postCode": "String",
     *       "country": "String"
	 *     }
	 *
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "AddressesNotFound"
	 *     }
	 */
	app.post('/addresses', user.requireLogin, address.requireFields, address.createAddress);

	/**
	 * @api {put} /addresses/:id update address.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/addresses
	 * @apiVersion 0.1.0
	 * @apiName updateAddress
	 * @apiGroup Addresses
	 *
	 * @apiParam {String} id id of the address (Required). 
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 204 OK
	 *
	 * @apiError addressNotFound The id of the address was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "addressNotFound"
	 *     }
	 */
	app.put('/addresses/:id', user.requireLogin, address.updateAddress);

	/**
	 * @api {del} /addresses/:id delete address.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/addresses
	 * @apiVersion 0.1.0
	 * @apiName deleteAddress
	 * @apiGroup Addresses
	 *
	 * @apiParam {String} id id of the address (Required). 
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 204 OK
	 *
	 * @apiError fileNotFound The id of the address was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "addressNotFound"
	 *     }
	 */
	app.del('/addresses/:id', user.requireLogin, address.deleteAddress);


	// **-----------------  api routes for PanoInfoElements. --------------------------**

	/**
	 * @api {get} /panoInfoElements get all panoInfoElements.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/panoInfoElements
	 * @apiVersion 0.1.0
	 * @apiName get all panoInfoElements
	 * @apiGroup PanoInfoElements
	 *
	 * @apiSuccess {Number} code  Código 200 good.
	 * 
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
     *          "links": 
     *              {
     *                  "self": 
     *                      {
     *                          "href": "String"
     *                      }
     *              },
     *          "embedded": 
     *              {
     *                  "panoInfoElements": 
     *                      [
     *                          {
     *                               "title": "String",
     *                               "description": "String",
     *                               "positionPane": "String"
     *                          },
     *                      ]    
     *              },
     *              "links" : 
	 *                  {
     *                       "first" : "String",
     *                       "last" : "String",
     *                       "next" : "String",
     *                       "prev" : "String",
     *                       "self" : "String"
	 *                  },
	 *              "page" : "Number",
	 *              "pageLimit" : "Number",
	 *              "total" : "Number",
     *     }
     *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "panoInfoElementsNotFound"
	 *     }
	 */
	app.get('/panoInfoElements', user.requireLogin, panoInfoElements.getPanoInfoElements);

	/**
	 * @api {get} /panoInfoElements/:id  get one panoInfoElement by id.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/panoInfoElements/:id
	 * @apiVersion 0.1.0
	 * @apiName getPanoInfoElement
	 * @apiGroup PanoInfoElements
	 *
	 * @apiSuccess {Number} code  Código 200 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
 	 *     {
	 *       "links" :
	 *            {
     *                 "self" : 
     *                     {
     *                          "href": "String"    	
     *                     } 
	 *            },
	 *       "title": "String",
     *       "description": "String",
     *       "positionPane": "String"
	 *     }
	 *
 	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "panoInfoElementsNotFound"
	 *     }	
	 */
	app.get('/panoInfoElements/:id', user.requireLogin, panoInfoElements.getPanoInfoElement);

	/**
	 * @api {post} /panoInfoElements create panoInfoElements.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/panoInfoElements
	 * @apiVersion 0.1.0
	 * @apiName createPanoInfoElements
	 * @apiGroup PanoInfoElements
	 *
	 * @apiParam {String} title title of the panoInfoElements (Required).
	 * @apiParam {String} description description of the panoInfoElements (Required).
	 * @apiParam {String} positionPane position  of pane  the panoInfoElements.
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "links" :
	 *            {
     *                 "self" : 
     *                     {
     *                          "href": "String"    	
     *                     } 
	 *            },
	 *       "id": "String",
	 *       "title": "String",
     *       "description": "String",
     *       "positionPane": "String",
	 *     }
	 *
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "panoInfoElementsNotFound"
	 *     }
	 */
	app.post('/panoInfoElements' ,user.requireLogin, panoInfoElements.requireFields, panoInfoElements.createPanoInfoElement);

	/**
	 * @api {put} /panoInfoElements/:id update panoInfoElement.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/panoInfoElements
	 * @apiVersion 0.1.0
	 * @apiName updatePanoInfoElements
	 * @apiGroup PanoInfoElements
	 *
	 * @apiParam {String} id id of the panoInfoElements (Required). 
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 204 OK
	 *
	 * @apiError panoInfoElementsNotFound The id of the panoInfoElements was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "panoInfoElementsNotFound"
	 *     }
	 */
	app.put('/panoInfoElements/:id', user.requireLogin, panoInfoElements.updatePanoInfoElement);

	/**
	 * @api {del} /panoInfoElements/:id delete panoInfoElement.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/panoInfoElements
	 * @apiVersion 0.1.0
	 * @apiName deletePanoInfoElements
	 * @apiGroup PanoInfoElements
	 *
	 * @apiParam {String} id id of the panoInfoElements (Required). 
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 204 OK
	 *
	 * @apiError fileNotFound The id of the panoInfoElements was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "panoInfoElementsNotFound"
	 *     }
	 */
	app.del('/panoInfoElements/:id', user.requireLogin, panoInfoElements.deletePanoInfoElement);


	// **-----------------  api routes for images . --------------------------**

	/**
	 * @api {get} /images get all images.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/images
	 * @apiVersion 0.1.0
	 * @apiName get all images
	 * @apiGroup Images
	 *
	 * @apiSuccess {Number} code  Código 200 good.
	 * 
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
     *          "links": 
     *              {
     *                  "self": 
     *                      {
     *                          "href": "String"
     *                      }
     *              },
     *          "embedded": 
     *              {
     *                  "images": 
     *                      [
     *                          {
     *                               "name": "String",
     *                               "locationURL": "String"
     *                          },
     *                      ]    
     *              },
     *              "links" : 
	 *                  {
     *                       "first" : "String",
     *                       "last" : "String",
     *                       "next" : "String",
     *                       "prev" : "String",
     *                       "self" : "String"
	 *                  },
	 *              "page" : "Number",
	 *              "pageLimit" : "Number",
	 *              "total" : "Number",
     *     }
     *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "imagesNotFound"
	 *     }
	 */
	app.get('/images', user.requireLogin, imagen.getImages);

	/**
	 * @api {get} /images/:id  get one image by id.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/images/:id
	 * @apiVersion 0.1.0
	 * @apiName getImage
	 * @apiGroup Images
	 *
	 * @apiSuccess {Number} code  Código 200 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
 	 *     {
	 *       "links" :
	 *            {
     *                 "self" : 
     *                     {
     *                          "href": "String"    	
     *                     } 
	 *            },
	 *       "name": "String",
     *       "locationURL": "String"
	 *     }
	 *
 	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "imagesNotFound"
	 *     }	
	 */
	app.get('/images/:id', user.requireLogin, imagen.getImage);

	/**
	 * @api {post} /images create images.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/images
	 * @apiVersion 0.1.0
	 * @apiName createImage
	 * @apiGroup Images
	 *
	 * @apiParam {String} name title of the images (Required).
	 * @apiParam {String} locationURL description of the images (Required).
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "links" :
	 *            {
     *                 "self" : 
     *                     {
     *                          "href": "String"    	
     *                     } 
	 *            },
	 *       "id": "String",
	 *       "name": "String",
     *       "locationURL": "String",
	 *     }
	 *
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "imagesNotFound"
	 *     }
	 */
	app.post('/images', user.requireLogin, imagen.requireFields, imagen.createImage);

	/**
	 * @api {put} /images/:id update images.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/images
	 * @apiVersion 0.1.0
	 * @apiName updateImages
	 * @apiGroup Images
	 *
	 * @apiParam {String} id id of the images (Required). 
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 204 OK
	 *
	 * @apiError imagesNotFound The id of the images was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "imagesNotFound"
	 *     }
	 */
	app.put('/images/:id', user.requireLogin, imagen.updateImage);

	/**
	 * @api {del} /images/:id delete image.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/images
	 * @apiVersion 0.1.0
	 * @apiName deleteImages
	 * @apiGroup Images
	 *
	 * @apiParam {String} id id of the image (Required). 
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 204 OK
	 *
	 * @apiError fileNotFound The id of the image was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "imagesNotFound"
	 *     }
	 */
	app.del('/images/:id', user.requireLogin, imagen.deleteImage);


	// **-----------------  api routes for floorplans . --------------------------**

	/**
	 * @api {get} /floorplans get all floorplans.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/floorplans
	 * @apiVersion 0.1.0
	 * @apiName get all floorplans
	 * @apiGroup Floorplans
	 *
	 * @apiSuccess {Number} code  Código 200 good.
	 * 
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
     *          "links": 
     *              {
     *                  "self": 
     *                      {
     *                          "href": "String"
     *                      }
     *              },
     *          "embedded": 
     *              {
     *                  "floorplans": 
     *                      [
     *                          {
     *                               "name": "String",
     *                               "locationURL": "String"
     *                          },
     *                      ]    
     *              },
     *              "links" : 
	 *                  {
     *                       "first" : "String",
     *                       "last" : "String",
     *                       "next" : "String",
     *                       "prev" : "String",
     *                       "self" : "String"
	 *                  },
	 *              "page" : "Number",
	 *              "pageLimit" : "Number",
	 *              "total" : "Number",
     *     }
     *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "floorplansNotFound"
	 *     }
	 */
	app.get('/floorplans', user.requireLogin, floorplans.getFloorplans);

	/**
	 * @api {get} /floorplans/:id  get one image by id.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/floorplans/:id
	 * @apiVersion 0.1.0
	 * @apiName getFloorplan
	 * @apiGroup Floorplans
	 *
	 * @apiSuccess {Number} code  Código 200 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
 	 *     {
	 *       "links" :
	 *            {
     *                 "self" : 
     *                     {
     *                          "href": "String"    	
     *                     } 
	 *            },
	 *       "name": "String",
     *       "locationURL": "String"
	 *     }
	 *
 	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "floorplansNotFound"
	 *     }	
	 */
	app.get('/floorplans/:id', user.requireLogin, floorplans.getFloorplan);

	/**
	 * @api {post} /floorplans create floorplans.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/floorplans
	 * @apiVersion 0.1.0
	 * @apiName createFloorplan
	 * @apiGroup Floorplans
	 *
	 * @apiParam {String} name title of the floorplans (Required).
	 * @apiParam {String} locationURL description of the floorplans (Required).
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "links" :
	 *            {
     *                 "self" : 
     *                     {
     *                          "href": "String"    	
     *                     } 
	 *            },
	 *       "id": "String",
	 *       "name": "String",
     *       "locationURL": "String",
	 *     }
	 *
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "floorplansNotFound"
	 *     }
	 */
	app.post('/floorplans', user.requireLogin, floorplans.requireFields, floorplans.createFloorplan);

	/**
	 * @api {put} /floorplans/:id update floorplans.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/floorplans
	 * @apiVersion 0.1.0
	 * @apiName updatefloorplans
	 * @apiGroup Floorplans
	 *
	 * @apiParam {String} id id of the floorplans (Required). 
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 204 OK
	 *
	 * @apiError floorplansNotFound The id of the floorplans was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "floorplansNotFound"
	 *     }
	 */
	app.put('/floorplans/:id', user.requireLogin, floorplans.updateFloorplan);

	/**
	 * @api {del} /floorplans/:id delete Floorplan.
	 * @apiSampleRequest http://virtualitour.jortech.com.ve/floorplans
	 * @apiVersion 0.1.0
	 * @apiName deletefloorplans
	 * @apiGroup Floorplans
	 *
	 * @apiParam {String} id id of the Floorplan (Required). 
	 *
	 * @apiSuccess {Number} code  Código 0 good.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 204 OK
	 *
	 * @apiError fileNotFound The id of the Floorplan was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "floorplansNotFound"
	 *     }
	 */
	app.del('/floorplans/:id', user.requireLogin, floorplans.deleteFloorplan);

};