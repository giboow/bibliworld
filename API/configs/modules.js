'use strict';

module.exports = function (app) {
	require('./modules/mongoose')(app);
	require('./modules/passport')(app);
};


