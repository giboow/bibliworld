'use strict';

var express = require('express');
var app = express();


var config = require('./configs/config.js');
app.set('config', config);

require('./configs/environment.js')(app, express);
require('./configs/modules_before.js')(app, express);
require('./configs/routes.js')(app);
require('./configs/modules_after.js')(app, express);

app.listen(config.server.port);