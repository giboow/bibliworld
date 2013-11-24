'use strict';

var express = require('express');
var app = express();
var port = 3000;

var config = require('./configs/config.js');
app.set('config', config);

require('./configs/modules.js')(app);
require('./configs/environment.js')(app, express);
require('./configs/routes.js')(app);

app.listen(process.env.PORT || port);