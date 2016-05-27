var AWS,
	fs,
	config,
	bucket,
	prefix,
	Q;

AWS      = require('aws-sdk');
fs       = require('fs');
config   = require('../../../config');
helper   = require('../helpers/helpers');
Q        = require('q');
bucket = 'virtualitour.files';
prefix = '/temp';

AWS.config.httpOptions = {timeout: 10000000};

function fileController () {

	this.getFile = function(req, res, next) {
		var s3,
			key;

		key = req.params.id;

		s3 = new AWS.S3({ endpoint :'https://s3-eu-west-1.amazonaws.com' });

		s3.getObject({Bucket: bucket, Key: key} , function(err, data) {
		    if (err) {
		    	console.log(err);
		    	res.send(err.message); // an error occurred
		    }else {
		    	res.writeHead(200, {'Content-Type': 'image/jpeg'});
    			res.end(data.Body); // Send the file data to the browser.
		    }    
		});
	}
	
	//upload a file to s3 amazon when file is under 5mb. 
	function uploadFile(file, key, folder) {
		var s3,
			params,
			stream,
			deferred;

		deferred = Q.defer();

		console.log("upload file");

		s3 = new AWS.S3({ endpoint :'https://s3-eu-west-1.amazonaws.com'});

		stream = fs.createReadStream(file.path);
		
		params = {
			Bucket: folder,
			Key: key,
			Body: stream,
			ContentType: file.type,
			ContentLength: file.size,
		}

		s3.upload(params, function(err, data) {
			if(err) {
				console.log(err);
				deferred.reject(err);
			}

			console.log('Successfully uploaded package. key:' + key);
		    console.log(data);
		    deferred.resolve(key);
		});

		return deferred.promise;
	}
	

	function UploadMultipart (res, file, key, folder, update) {
		this.multipartMap = {
			Parts : []
		};
		
		this.update          = update || false;
		this.response        = res;
		this.fileKey         = key;
		this.folder          = folder;
		this.startTime       = new Date();
		this.partNum         = 0;
		this.partSize        = 1024 * 1024 * 5;
		this.maxUploadTries  = 3;
		this.multiPartParams = {
			Bucket: this.folder,
		    Key: this.fileKey,
		    ContentType: file.type
		}

		this.buffer          = fs.readFileSync(file.path);
		this.s3              = new AWS.S3({ endpoint :'https://s3-eu-west-1.amazonaws.com'});
		this.numPartsLeft	 = Math.ceil(this.buffer.length / this.partSize);
	}

	UploadMultipart.prototype.beginUpload = function() {
		var self;
		console.log("Creating multipart upload for:", this.fileKey);
		
		self = this;

		self.s3.createMultipartUpload(self.multiPartParams, function(mpErr, multipart) {
				if (mpErr) { console.log('Error!', mpErr); return; }
					console.log("Got upload ID", multipart.UploadId);

				// Grab each partSize chunk and upload it as a part
				for (var rangeStart = 0; rangeStart < self.buffer.length; rangeStart += self.partSize) {
					self.partNum++;
					var end = Math.min(rangeStart + self.partSize, self.buffer.length),
			        partParams = {
			          Body: self.buffer.slice(rangeStart, end),
			          Bucket: self.folder,
			          Key: self.fileKey,
			          PartNumber: String(self.partNum),
			          UploadId: multipart.UploadId
			        };

				    // Send a single part
				    console.log('Uploading part: #', partParams.PartNumber, ', Range start:', rangeStart);
				    self.uploadPart(multipart, partParams);
				  }
			});
	}

	UploadMultipart.prototype.completeMultipartUpload = function(doneParams) {
		var self = this;

		this.s3.completeMultipartUpload(doneParams, function(err, data) {
		    if (err) {
		      console.log("An error occurred while completing the multipart upload");
		      console.log(err);
		    } else {
		      var delta = (new Date() - self.startTime) / 1000;
		      console.log('Completed upload in', delta, 'seconds');
		      console.log('Final upload data:', data);
		      if(!self.update) {
				self.response.statusCode = 200;
		      	return self.response.send({key: self.fileKey});
		      }else {
		      	self.response.statusCode = 204;
		      	return self.response("nothing");
		      } 
		      
		    }
		});
	}

	UploadMultipart.prototype.uploadPart = function(multipart, partParams, tryNum) {
		var tryNum,
			self;

		tryNum = tryNum || 1;
		self = this;

		this.s3.uploadPart(partParams, function(multiErr, mData) {
		    if (multiErr) { 
		      console.log('multiErr, upload part error:', multiErr);

		      if (tryNum < self.maxUploadTries) {
		        console.log('Retrying upload of part: #', partParams.PartNumber)
		        self.uploadPart(multipart, partParams, tryNum + 1);
		      } else {
		        console.log('Failed uploading part: #', partParams.PartNumber)
		      }
		      return;
		    }

		    self.multipartMap.Parts[this.request.params.PartNumber - 1] = {
		      ETag: mData.ETag,
		      PartNumber: Number(this.request.params.PartNumber)
		    };

		    console.log("Completed part", this.request.params.PartNumber);
		    console.log('mData', mData);
		    if (--self.numPartsLeft > 0) return; // complete only when all parts uploaded

		    var doneParams = {
		      Bucket: self.folder,
		      Key: self.fileKey,
		      MultipartUpload: self.multipartMap,
		      UploadId: multipart.UploadId
		    };

		    console.log("Completing upload...");
		    self.completeMultipartUpload(doneParams);
  		});
	}

	this.uploadFile = function(req, res, next) {
		var s3,
			UUID,
			file,
			stream,
			d,
			update;

		d    = new Date().getTime();	
		file = req.files.file;

		// generate a UUID key for the image ref.
		UUID   = helper.generateUUID(d,d);
		folder = bucket+prefix;
		update = false;
		
		if(file.size > 5242880) {
			var upMultipart = new UploadMultipart(res, file, UUID, folder, update);

			upMultipart.beginUpload();

		}else {
			uploadFile(file, UUID, folder).then(function(key) {
				return res.send({key:key});

			}, function(err) {
				res.statusCode = 500;
				return res.send({'Server error':err});
			});
		}	
	}

	this.updateFile = function(req, res, next) {
		var s3,
			file,
			d,
			key,
			update;

		file   = req.files.file;
		key    = req.params.id;
		update = true;

		if(file.size > 5242880) {
			var upMultipart = new UploadMultipart(res, file, key, bucket, update);

			upMultipart.beginUpload();

		}else {
			uploadFile(file, key, bucket).then(function(key) {
				console.log('Successfully update package. key:' + key);
				res.statusCode = 204;
			}, function(err) {
				res.statusCode = 500;
				return res.send({'Server error':err});
			});
		}
	}

	this.deleteFile = function(req, res, next) {
		var s3,
		key;

		key = req.params.id;

		// s3 = new AWS.S3({params: {Bucket: bucket, Key: UUID} });
		s3 = new AWS.S3({ endpoint :'https://s3-eu-west-1.amazonaws.com' });

		s3.deleteObject({
			Bucket: bucket,
		    Key: key
		}, function(err, data) {
        	if (err) res.send("error"); // an error occurred
	    	else {
	    		console.log(data); // successful response
	    		console.log("file delete success");
	    		res.statusCode = 204;
				return res.send("nothing");	
	    	}    
        });

	}

	this.moveFile = function(id) {
		var s3,
			key;

		key = id;

		// s3 = new AWS.S3({ endpoint :'https://s3-eu-west-1.amazonaws.com' });
		s3 = new AWS.S3({params: {Bucket: bucket}, region: 'eu-west-1'});

		return new Promise(function (resolve, reject) {
			s3.copyObject({
				CopySource: bucket + '/temp/' + key,
				Key: key
			}, function(copyErr, copyData) {
				if (copyErr) {
	          		reject(copyErr);
	        	}
		        else {
		        	resolve()
		        }
			})
		})
	}

	return this;
}

module.exports = new fileController();




// app.get('/uploadFiles/', function(req, res, next) {
// 		var s3bucket;


// 		s3bucket = new AWS.S3({params: {Bucket: 'testUploadFile', Key: 'testUpload1', region: 'eu-central-1' } });

// 		s3bucket.createBucket(function(err) {

// 	        if (err) {
// 	            console.log("Error uploading data: ", err);
// 	            res.send("error");
// 	        } else {
// 	            s3bucket.upload({Body: 'testUpload!'}, function(data) {
// 	            	console.log(data);
// 			        console.log("Successfully uploaded data to myBucket/myKey");
// 			        res.send("successfully upload.");
// 			    });
// 	        }
		    
// 		});
// 	});

// 	app.get('/listFiles/', function(req, res, next) {
// 		var s3bucket;

// 		s3bucket = new AWS.S3();

// 		s3bucket.listBuckets(function(err, data) {

// 		    if (err) {
// 		        console.log("Error:", err);
// 		        res.send(err); 
// 		    }else {

// 		    	console.log(data);

// 			    for (var index in data.Buckets) {
// 			      var bucket = data.Buckets[index];
// 			      console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
// 			    }
// 			    res.send("successfully list.");
// 		  	}
// 		});
// 	});

// 	app.get('/getFile', function(req, res, next) {
// 		var s3bucket;

// 		s3bucket = new AWS.S3();

// 		s3bucket.getObject({Bucket: 'testUploadFile', Key: 'testUpload1'} , function(err, data) {
// 		    if (err) console.log(err, err.stack); // an error occurred
// 		    else     console.log(data.Body.toString());           // successful response
// 		});

// 	})

// 	app.get('/getBucketLocation', function(req, res, next) {
// 		var s3bucket;

// 		var params = {
//   			Bucket: 'virtualitour.files' /* required */
// 		};

// 		s3bucket = new AWS.S3();

// 		s3bucket.getBucketLocation(params, function(err, data) {
// 		  if (err) console.log(err, err.stack); // an error occurred
// 		  else     console.log(data);           // successful response
// 		});
// 	});

// 	app.get('/uuid', function(req, res, next) {
// 		var d = new Date().getTime();
// 		var a = function(a,b){for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');return b}
// 		console.log(a(d,d));
// 		res.send(a(d,d));
// 	})