'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 3000;



var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy, 
    BasicStrategy = require('passport-http').BasicStrategy;
/*
 * Use Handlebars for templating
 */
var exphbs = require('express3-handlebars');
var hbs;

// For gzip compression
app.use(express.compress());

/*
 * Config for Production and Development
 */
app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  //app.use(express.bodyParser());
  app.use(express.session({ secret: 'bibliworld is super' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);

});

if (process.env.NODE_ENV === 'production') {
    // Set the default layout and locate layouts and partials
    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: 'dist/views/layouts/',
        partialsDir: 'dist/views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/dist/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/dist/assets'));

} else {
    app.engine('handlebars', exphbs({
        // Default Layout and locate layouts and partials
        defaultLayout: 'main',
        layoutsDir: 'views/layouts/',
        partialsDir: 'views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/assets'));
}

// Set Handlebars
app.set('view engine', 'handlebars');


app.all('*', function(request, response, next){
  if (!request.get('Origin')) return next();
  // use "*" here to accept any origin
  response.header('Access-Control-Allow-Origin', 'http://127.0.0.1:9000');
  response.header('Access-Control-Allow-Methods', 'GET, POST');
  response.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  response.header('Access-Control-Allow-Credentials', 'true');
  response.header('Access-Control-Allow-Max-Age', 3600);
  if ('OPTIONS' == request.method) return response.send(200);
  next();
});


passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function(username, password, done){
        return done(null, {id:1});   
    }
));

passport.use(new BasicStrategy(
  function(username, password, done) {
    return done(null, true);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});



/*
 * Routes
 */
// Index Page
/*app.get('/', function(request, response, next) {
    response.render('index');
});*/


app.get('/login',  passport.authenticate('local'), function(request, response, next){
    request.login(request.query.username, function (err) {
        response.send({
            realname : "Philou",
            login: request.query.username,
            err : err
        }); 
    });
});

app.get('/logout', function(request, response, next){
  request.logout();
});



/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);