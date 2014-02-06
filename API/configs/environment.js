'use strict';

module.exports = function (app, express) {
    
    var exphbs = require('express3-handlebars'),
        passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        User = require('../models/user.js');


    app.configure(function () {
        app.use(express.compress());

        app.use(express.static('public'));
        
        app.use(express.logger());
        
        app.use(express.methodOverride());
        
        app.use(express.json());
        app.use(express.urlencoded());

        app.use(express.cookieParser('your secret here'));
        app.use(express.session());

        app.use(app.router);
    });

    app.configure('development', function () {
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
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
    });

    app.configure('production', function () {
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

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
    });


    // Set Handlebars
    app.set('view engine', 'handlebars');



    // Server conf : Access control
    app.all('*', function (request, response, next) {
        if (!request.get('Origin')) {
            return next();
        }
        // use "*" here to accept any origin
        response.header('Access-Control-Allow-Origin', 'http://127.0.0.1:9000');
        response.header('Access-Control-Allow-Methods', 'GET, POST');
        response.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
        response.header('Access-Control-Allow-Credentials', 'true');
        response.header('Access-Control-Allow-Max-Age', 3600);
        if ('OPTIONS' === request.method) {
            return response.send(200);
        }
        next();
    });

};