'use strict';

module.exports = function (app) {
    require('../routes/index')(app);
    require('../routes/user')(app);
};