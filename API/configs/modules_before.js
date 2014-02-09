'use strict';

module.exports = function (app, express) {
	require('./modules/before/mongoose')(app);
	require('./modules/before/swagger')(app, express);
	require('./modules/before/cors')(app);
};


