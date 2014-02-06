'use strict';

var express = require('express');
var app = express();


var config = require('./configs/config.js');
app.set('config', config);

require('./configs/environment.js')(app, express);
require('./configs/modules.js')(app);
require('./configs/routes.js')(app);

app.listen(config.server.port);