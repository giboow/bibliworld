'use strict';

module.exports = function (app, express) {
	require('./modules/after/swagger')(app, express);
};


