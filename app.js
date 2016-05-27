var restify,
restifyOAuth2,
ip_addr,
port,
app,
config,
routes,
hal,
session,
tests;

restify = require('restify');
restifyOAuth2 = require("restify-oauth2");
hal = require('hal');
config = require('./config');
session = require('client-sessions');

process.env['AWS_ACCESS_KEY_ID'] = config.s3_access.accessKeyId;
process.env['AWS_SECRET_ACCESS_KEY'] = config.s3_access.accessKey;


app = restify.createServer({
	name : 'virtualitourAPI',
	version: '0.0.1'
});

app.use(restify.queryParser());
app.use(restify.bodyParser());

app.use(session({
  cookieName: 'session',
  secret: config.security.secretSession,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));

app.use(function logger(req,res,next) {
  console.log(new Date(),req.connection.remoteAddress,req.method,req.url);
  next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS'); 
  next();
});

app.on('uncaughtException',function(request, response, route, error){
  console.error(error.stack);
  response.send(error);
});

//add time to request long
app.use(function (req, res, next) {
  req.connection.setTimeout(10000000);
  res.connection.setTimeout(10000000);
  next();  
});

app.listen(config.server.port, config.server.ip_addr, function() {
	console.log('%s Active in %s ', app.name, app.url);
  
});

routes = require('./api/v1/route')(app);
// tests = require('./tests/test')(app);	


